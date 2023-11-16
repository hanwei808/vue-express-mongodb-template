import 'express';
import 'express-session'

declare module 'express' {
  interface Request {
    user?: any;
  }
}

declare module 'express-session' {
  interface SessionData {
    user?: any;
    token?: any;
    captcha?: any;
  }
}