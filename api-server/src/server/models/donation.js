import debug from 'debug';
import { Observable } from 'rx';

import { reportError } from '../middlewares/sentry-error-handler.js';
import InMemoryCache from '../utils/in-memory-cache';

const log = debug('fcc:boot:donate');
const fiveMinutes = 1000 * 60 * 5;

export default function initializeDonation(Donation) {
  let activeDonationUpdateInterval = null;
  const activeDonationCountCacheTTL = fiveMinutes;
  const activeDonationCountCache = InMemoryCache(0, reportError);
  const activeDonationsQuery$ = () =>
    Donation.find$({
      // eslint-disable-next-line no-undefined
      where: { endDate: undefined }
    }).map(instances => instances.length);
  function cleanUp() {
    if (activeDonationUpdateInterval) {
      clearInterval(activeDonationUpdateInterval);
    }
    return;
  }

  process.on('exit', cleanUp);

  Donation.on('dataSourceAttached', () => {
    Donation.find$ = Observable.fromNodeCallback(Donation.find.bind(Donation));
    Donation.findOne$ = Observable.fromNodeCallback(
      Donation.findOne.bind(Donation)
    );

    seedTheCache()
      .then(setupCacheUpdateInterval)
      .catch(err => {
        const errMsg = `Error caught seeding the cache: ${err.message}`;
        err.message = errMsg;
        reportError(err);
      });
  });

  function seedTheCache() {
    return new Promise((resolve, reject) =>
      Observable.defer(activeDonationsQuery$).subscribe(count => {
        log('activeDonor count: %d', count);
        activeDonationCountCache.update(() => count);
        return resolve();
      }, reject)
    );
  }

  function setupCacheUpdateInterval() {
    activeDonationUpdateInterval = setInterval(
      () =>
        Observable.defer(activeDonationsQuery$).subscribe(
          count => {
            log('activeDonor count: %d', count);
            return activeDonationCountCache.update(() => count);
          },
          err => {
            const errMsg = `Error caught updating the cache: ${err.message}`;
            err.message = errMsg;
            reportError(err);
          }
        ),
      activeDonationCountCacheTTL
    );
    return null;
  }

  function getCurrentActiveDonationCount$() {
    return Observable.of(activeDonationCountCache.get());
  }

  Donation.getCurrentActiveDonationCount$ = getCurrentActiveDonationCount$;
}
