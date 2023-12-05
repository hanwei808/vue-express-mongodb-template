
import { Handler } from '../types/route';
import models from '../models/index'
import { jwtSecret } from '../config/config.default'
import { sign, verify } from '../utils/jwt'
import svgCaptcha from 'svg-captcha'

const AccessTokenExpiresIn = 60 * 10
const refreshTokenExpiresIn = 60 * 60 * 24

const newToken = (userId, expiresIn) => sign({
  _id: userId
}, jwtSecret, {
  expiresIn
})

const verifyRefreshToken: Handler = async (req, res) => {
  let token = req.headers.authorization;
  token = token ? token.split('Bearer ')[1] : null;
  try {
    if (token) {
      const decodeToken = await verify(token, jwtSecret)
      const accessToken = await newToken(decodeToken._id, AccessTokenExpiresIn)
      req.session.accessToken = accessToken
      return {
        status: 200,
        code: 0,
        message: 'success',
        type: 'json',
        data: {
          accessToken
        }
      }
    }
  } catch (error) {
    return {
      status: 401,
      code: 401,
      message: 'fail',
      type: 'json',
      data: {}
    }
  }

  return {
    status: 401,
    code: 401,
    message: 'fail',
    type: 'json',
    data: {}
  }
}

const register: Handler = async (req, res) => {
  const user = new models.User(req.body.user)
  await user.save()

  const accessToken = await newToken(user._id, AccessTokenExpiresIn)
  const refreshToken = await newToken(user._id, refreshTokenExpiresIn)

  req.session.user = user
  req.session.accessToken = accessToken
  req.session.refreshToken = refreshToken

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
      accessToken,
      refreshToken
    }
  }
}

const login: Handler = async (req, res) => {
    const user = req.user

    const accessToken = await newToken(user._id, AccessTokenExpiresIn)
    const refreshToken = await newToken(user._id, refreshTokenExpiresIn)

    req.session.user = user
    req.session.accessToken = accessToken
    req.session.refreshToken = refreshToken

    return {
      status: 200,
      code: 0,
      message: 'success',
      type: 'json',
      data: {
        user,
        accessToken,
        refreshToken
      }
    }
}

const logout: Handler = async (req, res) => {
  req.session.user = null
  req.session.accessToken = null
  req.session.refreshToken = null
  return {
    status: 200,
    code: 0,
    message: 'success',
    type: 'json',
    data: {}
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
      user: {
        username: req.user.username,
        email: req.user.email,
        bio: req.user.bio,
        image: req.user.image
      }
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
  verifyRefreshToken,
  register,
  login,
  logout,
  users,
  currentUser,
  captcha
}