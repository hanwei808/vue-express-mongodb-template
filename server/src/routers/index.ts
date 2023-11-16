import express from 'express'
import { Route } from '../types/route'
import userRouter from './user'

const router = express.Router()

const allRouter: Route[] = [...userRouter]

allRouter.forEach((route) => {
    const { method, path, middleware, validator, controller } = route;
    router[method](path, ...middleware, ...validator, controller);
  });

router.use(router)

export default router
