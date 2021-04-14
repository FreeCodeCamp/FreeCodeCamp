const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const createDebugger = require('debug');
const nodemon = require('nodemon');
const SmeeClient = require('smee-client');

const log = createDebugger('fcc:start:development');

if (process.env.WEBHOOK_PROXY_URL) {
  const paypalPayloadHandler = new SmeeClient({
    source: process.env.WEBHOOK_PROXY_URL,
    target: process.env.API_LOCATION + '/hooks/update-paypal',
    logger: { info: log, error: log }
  });

  const paypalevents = paypalPayloadHandler.start();

  process.on('exit', () => {
    log('Stopping webhook proxy client.');
    paypalevents.close(() => {
      log('Webhook proxy client is stopped.');
    });
  });
} else {
  log('Webhook client is not configured.');
  log('This can be ignored when not working with webhooks locally.');
}

nodemon({
  ext: 'js json',
  // --silent squashes an ELIFECYCLE error when the server exits
  exec: 'npm run --silent babel-dev-server',
  watch: path.resolve(__dirname, './server'),
  spawn: true,
  env: {
    DEBUG: 'fcc*'
  }
});

nodemon.on('restart', function nodemonRestart(files) {
  log('App restarted due to: ', files);
});
