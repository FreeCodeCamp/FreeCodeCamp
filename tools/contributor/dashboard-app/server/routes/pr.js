const router = require('express').Router();
const { PR } = require('../models');
const { reqLimiter } = require('../req-limiter');

router.get('/:number', reqLimiter, async (request, response) => {
  const prs = await PR.find({}).then((data) => data);
  prs.sort((a, b) => a._id - b._id);
  const indices = prs.reduce((obj, { _id }, index) => {
    obj[_id] = index;
    return obj;
  }, {});
  const { number: refNumber } = request.params;
  const index = indices[refNumber];

  if (!index && index !== 0) {
    response.json({
      ok: true,
      message: `Unable to find an open PR with #${refNumber}.`,
      results: []
    });
    return;
  }

  const pr = prs[index];
  const results = [];
  const { filenames: refFilenames } = pr;

  prs.forEach(({ _id: number, filenames, username, title }) => {
    if (number !== +refNumber) {
      const matchedFilenames = filenames.filter((filename) => {
        return refFilenames.includes(filename);
      });
      if (matchedFilenames.length) {
        results.push({ number, filenames: matchedFilenames, username, title });
      }
    }
  });

  if (!results.length) {
    let msg = `No other open PRs with matching filenames of PR #${refNumber}`;
    response.json({ ok: true, message: msg, results: [] });
    return;
  }
  response.json({ ok: true, results });
});

module.exports = router;
