import 'express';
import 'express-session'

declare module 'express' {
  interface Request {
    user?: any; // 您可以根据需要使用更具体的类型
  }
}

declare module 'express-session' {
  interface SessionData {
    user?: any; // 您可以根据需要使用更具体的类型
  }
}