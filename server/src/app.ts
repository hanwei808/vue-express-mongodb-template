import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import errorhandler from 'errorhandler';
import session, { SessionOptions } from 'express-session';
import MongoStore from 'connect-mongo';
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

app.use(session(sessionOptions));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/api', router);

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler());
}

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
