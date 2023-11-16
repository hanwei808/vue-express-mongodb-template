import mongoose from 'mongoose'
import { md5 } from '../utils/md5'
import baseSchema from './base'

const userSchema = new mongoose.Schema({
    ...baseSchema,
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      set: value => md5(value)
    },
    bio: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default: null
    }
  })

  export default userSchema
