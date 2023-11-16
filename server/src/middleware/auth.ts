import { Request, Response, NextFunction } from 'express';
import { Session } from 'express-session';

export default async (req: Request & { session: Session & { user?: string } }, res: Response, next: NextFunction) => {
    try {
        // 检查有没有 Session user
        const sessionUser = req.session.user;
        if (sessionUser) {
            return next();
        } else {
            // 重定向到登录页
            res.redirect('/login');
        }
    } catch (error) {
        throw error.message;
    }
    
};