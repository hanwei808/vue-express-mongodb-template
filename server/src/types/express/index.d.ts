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
    accessToken?: any;
    refreshToken?: any;
    captcha?: any;
  }
}