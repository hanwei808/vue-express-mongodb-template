import { Request, Response, NextFunction } from 'express';
import { Session } from 'express-session';
import { verify } from '../utils/jwt';
import { jwtSecret } from '../config/config.default';
import models from '../models/index';

export default async (req: Request & { session: Session & { user?: string } }, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization;
        token = token ? token.split('Bearer ')[1] : null;
        if (!token) res.status(401).end()
        const decodeToken = await verify(token, jwtSecret)
        req.user = await models.User.findById(decodeToken._id)
        next()
    } catch (error) {
        return res.status(401).end();
    }
};