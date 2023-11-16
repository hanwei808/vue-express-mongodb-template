
import Ctrl from '../controllers/index';
import { login as vlLogin, register as vlRegister } from '../validator/user'
import { Route } from '../types/route';
 
const user: Route[] = [
  {
    method: 'post',
    path: '/register',
    middleware: [],
    validator: [vlRegister],
    controller: Ctrl.user.register,
  },
  {
    method: 'post',
    path: '/login',
    middleware: [],
    validator: [vlLogin],
    controller: Ctrl.user.login,
  },
  {
    method: 'get',
    path: '/logout',
    middleware: [],
    validator: [],
    controller: Ctrl.user.logout
  },
  {
    method: 'get',
    path: '/users',
    validator: [],
    middleware: [],
    controller: Ctrl.user.users
  },
  {
    method: 'get',
    path: '/currentUser',
    middleware: [],
    validator: [],
    controller: Ctrl.user.currentUser
  },
  {
    method: 'get',
    path: '/captcha',
    validator: [],
    middleware: [],
    controller: Ctrl.user.captcha
  }
]

export default user