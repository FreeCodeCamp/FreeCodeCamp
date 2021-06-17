const router = require('express').Router();
const { ALL_REPOS } = require('../models');
const { reqLimiter } = require('../req-limiter');

router.get('/', reqLimiter, async (request, response) => {
  let allRepos = await ALL_REPOS.find({}).then((data) => data);
  allRepos.sort((a, b) => a._id - b._id);
  allRepos = allRepos.reduce((allReposArr, aRepo) => {
    const { _id, prs } = aRepo;
    if (prs.length) {
      prs.sort((a, b) => a._id - b._id);
      return allReposArr.concat({ _id, prs });
    }
    return allRepos;
  }, []);

  response.json({ ok: true, allRepos });
});

module.exports = router;
