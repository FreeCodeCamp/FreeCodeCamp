const router = require('express').Router();
const { PR } = require('../models');
const { reqLimiter } = require('../req-limiter');

const createPareto = (reportObj) =>
  Object.keys(reportObj)
    .reduce((arr, filename) => {
      const { count, prs } = reportObj[filename];
      if (count > 1) {
        arr.push({ filename, count, prs });
      }
      return arr;
    }, [])
    .sort((a, b) => b.count - a.count);

router.get('/', reqLimiter, async (reqeust, response) => {
  const prs = await PR.find({}).then((data) => data);
  prs.sort((a, b) => a._id - b._id);
  const reportObj = prs.reduce((obj, pr) => {
    const { _id: number, filenames, username, title } = pr;
    filenames.forEach((filename) => {
      if (obj[filename]) {
        const { count, prs } = obj[filename];
        obj[filename] = {
          count: count + 1,
          prs: prs.concat({ number, username, title })
        };
      } else {
        obj[filename] = { count: 1, prs: [{ number, username, title }] };
      }
    });
    return obj;
  }, {});

  response.json({ ok: true, pareto: createPareto(reportObj) });
});

module.exports = router;
