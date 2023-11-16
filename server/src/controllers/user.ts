
import { Handler } from '../types/route';
import models from '../models/index'
 
export const login: Handler = (req, res) => {
  const user = req.user
  console.log('controller login user', user)
    // 3. 保持登陆状态
    req.session.user = user

    // 4. 跳转到首页
    res.status(200).json({
      user
    })
}

export const logout: Handler = async (req, res) => {
  // 清除用户登录状态
  req.session.user = null
  // 跳转到首页
  res.redirect('/')
}

export const register: Handler = async (req, res) => {
  // 1. 数据验证
  // 2. 验证通过，创建新的用户
  const user = new models.User(req.body.user)
  await user.save()

  // 3. 保持登陆状态
  req.session.user = user

  // 4. 跳转到首页
  res.status(200).json({
    user
  })
}

export const users: Handler = async (req, res) => {
  console.log('controller users')
  const users = await models.User.find()
  res.status(200).json({
    users
  })
}