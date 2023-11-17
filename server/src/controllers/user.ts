
import { Handler } from '../types/route';
import models from '../models/index'
import { jwtSecret } from '../config/config.default'
import { sign } from '../utils/jwt'
import svgCaptcha from 'svg-captcha'

const register: Handler = async (req, res) => {
  const user = new models.User(req.body.user)
  await user.save()

  const token = await sign({
    _id: user._id
  }, jwtSecret, {
    expiresIn: 60 * 60 * 24
  })
  req.session.user = user
  req.session.token = token

  return {
    status: 200,
    code: 0,
    message: 'success',
    type: 'json',
    data: {
      user: {
        username: user.username,
        email: user.email,
        bio: user.bio,
        image: user.image
      },
      token
    }
  }
}

const login: Handler = async (req, res) => {
    const user = req.user
    const token = await sign({
      _id: user._id
    }, jwtSecret, {
      expiresIn: 60 * 60 * 24
    })

    req.session.user = user
    req.session.token = token

    return {
      status: 200,
      code: 0,
      message: 'success',
      type: 'json',
      data: {
        user,
        token
      }
    }
}

const logout: Handler = async (req, res) => {
  req.session.user = null
  return {
    type: 'redirect',
    path: '/'
  }
}

const users: Handler = async (req, res) => {
  const users = await models.User.find()
  return {
    status: 200,
    code: 0,
    message: 'success',
    type: 'json',
    data: {
      users
    }
  }
}

const currentUser: Handler = async (req, res) => {
  return {
    status: 200,
    code: 0,
    message: 'success',
    type: 'json',
    data: {
      user: req.session.user,
      token: req.session.token
    }
  }
}

const captcha: Handler = async (req, res) => {
  const captcha = svgCaptcha.create();
  req.session.captcha = captcha.text;
  res.type('svg');
  return {
    status: 200,
    code: 0,
    message: 'success',
    type: 'send',
    data: captcha.data
  }
}

export default {
  register,
  login,
  logout,
  users,
  currentUser,
  captcha
}