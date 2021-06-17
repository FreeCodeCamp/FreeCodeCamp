const router = require('express').Router();
const { PR } = require('../models');
const { reqLimiter } = require('../req-limiter');

router.get('/', reqLimiter, async (request, response) => {
  const prs = await PR.find({}).then((data) => data);
  prs.sort((a, b) => a._id - b._id);
  const indices = prs.reduce((obj, { _id }, index) => {
    obj[_id] = index;
    return obj;
  }, {});
  const value = request.query.value;

  if (value) {
    const filesFound = {};
    prs.forEach(({ _id: number, filenames, username, title }) => {
      filenames.forEach((filename) => {
        if (filename.toLowerCase().includes(value.toLowerCase())) {
          const fileCount = prs[indices[number]].filenames.length;
          const prObj = { number, fileCount, username, title };

          if (filesFound.hasOwnProperty(filename)) {
            filesFound[filename].push(prObj);
          } else {
            filesFound[filename] = [prObj];
          }
        }
      });
    });

    let results = Object.keys(filesFound)
      .map((filename) => ({ filename, prs: filesFound[filename] }))
      .sort((a, b) => {
        if (a.filename === b.filename) {
          return 0;
        } else {
          return a.filename < b.filename ? -1 : 1;
        }
      });
    if (!results.length) {
      response.json({ ok: true, message: 'No matching results.', results: [] });
      return;
    }
    response.json({ ok: true, results });
  }
});

module.exports = router;
