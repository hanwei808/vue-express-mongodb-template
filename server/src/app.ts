import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import errorhandler from 'errorhandler';
import session, { SessionOptions } from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors'
import { dbUri, jwtSecret } from './config/config.default';
import router from './routers/index';
// import './models/index';

const app: Express = express();

const PORT = process.env.PORT || 3000;

const sessionOptions: SessionOptions = {
    secret: jwtSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    store: MongoStore.create({ 
        mongoUrl: dbUri,
        ttl: 60 * 60 * 24,
      }),
};

app.use(cors())

app.use(session(sessionOptions));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

morgan.token('custom', function (req, res) {
  // 返回自定义字符串
  console.log('req.body', req.body)
  return req.headers;
});

app.use(morgan(':method :url :custom'));

app.use('/api', router);

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler());
}

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
