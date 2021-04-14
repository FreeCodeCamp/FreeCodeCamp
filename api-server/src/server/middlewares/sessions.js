import MongoStoreFactory from 'connect-mongo';
import session from 'express-session';

const MongoStore = MongoStoreFactory(session);
const sessionSecret = process.env.SESSION_SECRET;
const url = process.env.MONGODB || process.env.MONGOHQ_URL;

export default function sessionsMiddleware() {
  return session({
    // 900 day session cookie
    cookie: { maxAge: 900 * 24 * 60 * 60 * 1000 },
    // resave forces session to be resaved
    // regardless of whether it was modified
    // this causes race conditions during parallel req
    resave: false,
    saveUninitialized: true,
    secret: sessionSecret,
    store: new MongoStore({ url })
  });
}
