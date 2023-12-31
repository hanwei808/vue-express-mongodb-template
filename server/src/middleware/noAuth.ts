import { Request, Response, NextFunction } from 'express';

const noAuth = async (req: Request, res: Response, next: NextFunction) => {
  // 检查有没有 Session user
  const sessionUser = req.session.user;
  if (sessionUser) {
    return res.redirect('/');
  }
  next();
};

export default noAuth;
