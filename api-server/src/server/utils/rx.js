import debugFactory from 'debug';
import moment from 'moment';
import Rx, { AsyncSubject, Observable } from 'rx';

const debug = debugFactory('fcc:rxUtils');

export function saveInstance(instance) {
  return new Rx.Observable.create(function (observer) {
    if (!instance || typeof instance.save !== 'function') {
      debug('no instance or save method');
      observer.onNext();
      return observer.onCompleted();
    }
    return instance.save(function (err, savedInstance) {
      if (err) {
        return observer.onError(err);
      }
      debug('instance saved');
      observer.onNext(savedInstance);
      return observer.onCompleted();
    });
  });
}

// alias saveInstance
export const saveUser = saveInstance;

// observeQuery(Model: Object, methodName: String, query: Any) => Observable
export function observeQuery(Model, methodName, query) {
  return Rx.Observable.fromNodeCallback(Model[methodName], Model)(query);
}

// observeMethod(
//   context: Object, methodName: String
// ) => (query: Any) => Observable
export function observeMethod(context, methodName) {
  return Rx.Observable.fromNodeCallback(context[methodName], context);
}

// must be bound to an observable instance
// timeCache(amount: Number, unit: String) => Observable
export function timeCache(time, unit) {
  const source = this;
  let cache;
  let expireCacheAt;
  return Observable.create(observable => {
    // if there is no expire time set
    // or if expireCacheAt is smaller than now,
    // set new expire time in MS and create new subscription to source
    if (!expireCacheAt || expireCacheAt < Date.now()) {
      // set expire in ms;
      expireCacheAt = moment().add(time, unit).valueOf();
      cache = new AsyncSubject();
      source.subscribe(cache);
    }
    return cache.subscribe(observable);
  });
}
