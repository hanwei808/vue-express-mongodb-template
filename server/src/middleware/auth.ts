import { Request, Response, NextFunction } from 'express';
import { Session } from 'express-session';

export default async (req: Request & { session: Session & { user?: string } }, res: Response, next: NextFunction) => {
    // 检查有没有 Session user
    const sessionUser = req.session.user;
    if (sessionUser) {
        return next();
    }

    // 重定向到登录页
    // 302 Location /login
    res.redirect('/login');
};