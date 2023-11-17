import express, { Express, Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import session, { SessionOptions } from 'express-session'
import MongoStore from 'connect-mongo'
import cors from 'cors'
import { dbUri, jwtSecret } from './config/config.default'
import router from './routers/index'
// import './models/index';

const app: Express = express();

const PORT = process.env.PORT || 3000

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
app.use(session(sessionOptions))

// 跨域
app.use(cors())
// 数据结构
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// 日志
morgan.token('custom', function (req, res) {
  // 返回自定义字符串
  return "sessionID: " + req.sessionID;
})
app.use(morgan(':method :url :custom'))

app.use('/api', router)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
});
