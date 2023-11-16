
import { login, users, logout } from '../controllers/user';
import auth from '../middleware/auth'
import { login as vlLogin } from '../validator/user'
import { Route } from '../types/route';
 
const user: Route[] = [
  {
    method: 'post',
    path: '/login',
    middleware: [auth],
    validator: [vlLogin],
    controller: login,
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
    path: '/logout',
    middleware: [],
    validator: [],
    controller: logout
  }
]

export default user