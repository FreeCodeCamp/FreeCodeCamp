const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const config = require('../../lib/config');
const { pareto, pr, search, info, allRepos } = require('./routes');
const { reqLimiter } = require('./req-limiter');

// May need to uncomment the following to get rateLimit to work properly since we are using reverse-proxy
// app.set('trust proxy', 1);

app.use(express.static(path.join(__dirname, '../client/build')));

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  response.header('Access-Control-Allow-Methods', 'GET');
  next();
});

const landingPage = path.join(__dirname, '../client/build/index.html');
app.get('/', reqLimiter, (req, res) => res.sendFile(landingPage));

app.use('/pr', pr);
app.use('/search', search);
app.use('/pareto', pareto);
app.use('/info', info);
app.use('/all-repos', allRepos);

// 404
app.use(function (req, res) {
  const message = 'Route' + req.url + ' Not found.';
  console.log(message);
  return res.status(404).send({ message });
});

// 500 - Any server error
app.use(function (err, req, res) {
  console.log('error: ' + err);
  return res.status(500).send({ error: err });
});

if (mongoose.connection.readyState === 0) {
  // connect to mongo db
  const mongoUri = config.mongo.host;

  const promise = mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  promise
    .then(() => {
      console.log('MongoDB is connected');
      const portNum = process.env.PORT || 3000;
      app.listen(portNum, () => {
        console.log(`server listening on port ${portNum}`);
      });
    })
    .catch((err) => {
      console.log(err);
      console.log('MongoDB connection unsuccessful');
    });
}

module.exports = app;
