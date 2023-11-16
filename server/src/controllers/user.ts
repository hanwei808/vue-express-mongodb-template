
import { Handler } from '../types/route';
import models from '../models/index'
import { jwtSecret } from '../config/config.default'
import { sign } from '../utils/jwt'
import svgCaptcha from 'svg-captcha'

export const register: Handler = async (req, res) => {
  const user = new models.User(req.body.user)
  await user.save()
  req.session.user = user
  res.status(200).json({
    user
  })
}

export const login: Handler = async (req, res) => {
    const user = req.user
    const token = await sign({
      _id: user._id
    }, jwtSecret, {
      expiresIn: 60 * 60 * 24
    })

    req.session.user = user
    req.session.token = token

    res.status(200).json({
      user,
      token
    })
}

export const logout: Handler = async (req, res) => {
  req.session.user = null
  res.redirect('/')
}

export const users: Handler = async (req, res) => {
  const users = await models.User.find()
  res.status(200).json({
    users
  })
}

export const currentUser: Handler = async (req, res) => {
  res.status(200).json({
    user: req.session.user,
    token: req.session.token
  })
}

export const captcha: Handler = async (req, res) => {
  console.log('controller captcha')
  const captcha = svgCaptcha.create();
  req.session.captcha = captcha.text;
  res.type('svg');
  res.status(200).send(captcha.data);
}