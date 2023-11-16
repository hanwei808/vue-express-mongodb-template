import { body } from 'express-validator';
import { validate } from '../middleware/validate';
import models from '../models/index';
import { md5 } from '../utils/md5';

export const register = validate([
  body('user.username')
    .notEmpty().withMessage('用户名不能为空')
    .custom(async username => {
      const user = await models.User.findOne({ username });
      if (user) {
        return Promise.reject(new Error('用户名已存在'));

      }
    }),

  body('user.password').notEmpty().withMessage('密码不能为空'),

  body('user.email')
    .notEmpty().withMessage('邮箱不能为空')
    // .isEmail().withMessage('邮箱格式不正确')
    .bail()
    .custom(async email => {
      const user = await models.User.findOne({ email });
      if (user) {
        return Promise.reject(new Error('邮箱已存在'));
      }
    })
]);

export const login = [
    validate([
        body('user.username').notEmpty().withMessage('用户名不能为空'),
        body('user.password').notEmpty().withMessage('密码不能为空')
    ]),
    validate([
        body('user.username').custom(async (username, { req }) => {
          const user = await models.User.findOne({ username })
              .select(['username', 'password', 'email', 'bio', 'image', ]);
          if (!user) {
              return Promise.reject(new Error('用户不存在'));
          }

          // 将数据挂载到请求对象中，后续的中间件也可以使用了
          (req as any).user = user;
        })
    ]),
    validate([
        body('user.password').custom(async (password, { req }) => {
          if (md5(password) !== (req as any).user.password) {
              return Promise.reject(new Error('密码错误'));
          }
        })
    ])
];
