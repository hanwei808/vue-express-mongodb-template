
import { register, login, logout, currentUser, users } from '../controllers/user';
import auth from '../middleware/auth'
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
    middleware: [auth],
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
]

export default user