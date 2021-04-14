import _ from 'lodash';
import { login } from 'passport/lib/http/request';
import { Observable } from 'rx';

// make login polymorphic
// if supplied callback it works as normal
// if called without callback it returns an observable
// login(user, options?, cb?) => Void|Observable
function login$(...args) {
  if (_.isFunction(_.last(args))) {
    return login.apply(this, args);
  }
  return Observable.fromNodeCallback(login).apply(this, args);
}

export default function passportLogin() {
  return (req, res, next) => {
    req.login = req.logIn = login$;
    next();
  };
}
