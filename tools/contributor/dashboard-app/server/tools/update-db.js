const mongoose = require('mongoose');
const getRepos = require('./get-repos');
const getPRs = require('./get-prs');
const getFilenames = require('./getFilenames');
const { PR, INFO, ALL_REPOS } = require('../models');

const { mongo } = require('../../../lib/config');

// added to prevent deprecation warning when findOneAndUpdate is used
mongoose.set('useFindAndModify', false);

// connect to mongo db
const mongoUri = mongo.host;
const db = mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const lastUpdate = new Date();

db.then(async () => {
  const reposToAdd = await getRepos();
  await ALL_REPOS.deleteMany();
  await ALL_REPOS.insertMany(reposToAdd);

  // update PRs for freeCodeCamp repo
  const oldPRs = await PR.find({}).then((data) => data);
  const oldIndices = oldPRs.reduce((obj, { _id }, index) => {
    obj[_id] = index;
    return obj;
  }, {});

  const openPRs = await getPRs();

  const newIndices = {};
  for (let i = 0; i < openPRs.length; i++) {
    const {
      number,
      updated_at: updatedAt,
      title,
      user: { login: username }
    } = openPRs[i];

    newIndices[number] = i;
    let oldPrData = oldPRs[oldIndices[number]];
    const oldUpdatedAt = oldPrData ? oldPrData.updatedAt : null;
    if (!oldIndices.hasOwnProperty(number)) {
      // insert a new pr
      const filenames = await getFilenames(number);
      await PR.create({ _id: number, updatedAt, title, username, filenames });
      console.log('added PR# ' + number);
    } else if (updatedAt > oldUpdatedAt) {
      // update an existing pr
      const filenames = await getFilenames(number);
      await PR.findOneAndUpdate(
        { _id: number },
        { updatedAt, title, username, filenames }
      );
      console.log('updated PR #' + number);
    }
  }
  for (let pr of oldPRs) {
    const { _id: number } = pr;
    if (!newIndices.hasOwnProperty(number)) {
      // delete pr because it is no longer open
      await PR.deleteOne({ _id: number });
      console.log('deleted PR #' + number);
    }
  }
})
  .then(async () => {
    // update info collection
    const [{ firstPR, lastPR }] = await PR.aggregate([
      {
        $group: {
          _id: null,
          firstPR: { $min: '$_id' },
          lastPR: { $max: '$_id' }
        }
      }
    ]);
    const numPRs = await PR.countDocuments();
    const info = {
      lastUpdate,
      numPRs,
      prRange: `${firstPR}-${lastPR}`
    };
    await INFO.updateOne({}, info, { upsert: true }).catch((err) => {
      console.log(err);
    });
    mongoose.connection.close();
  })
  .catch((err) => {
    mongoose.connection.close();
    throw err;
  });
