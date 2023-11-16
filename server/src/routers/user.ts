
import { register, login, logout, currentUser, users, captcha } from '../controllers/user';
import { login as vlLogin, register as vlRegister } from '../validator/user'
import { Route } from '../types/route';
 
const user: Route[] = [
  {
    method: 'post',
    path: '/register',
    middleware: [],
    validator: [vlRegister],
    controller: register,
  },
  {
    method: 'post',
    path: '/login',
    middleware: [],
    validator: [vlLogin],
    controller: login,
  },
  {
    method: 'get',
    path: '/logout',
    middleware: [],
    validator: [],
    controller: logout
  },
  {
    method: 'get',
    path: '/users',
    validator: [],
    middleware: [],
    controller: users
  },
  {
    method: 'get',
    path: '/currentUser',
    middleware: [],
    validator: [],
    controller: currentUser
  },
  {
    method: 'get',
    path: '/captcha',
    validator: [],
    middleware: [],
    controller: captcha
  }
]

export default user