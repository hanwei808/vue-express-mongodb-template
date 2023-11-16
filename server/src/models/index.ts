import mongoose from "mongoose";
import { dbUri } from "../config/config.default";
import userSchema from "./user";

mongoose.connect(dbUri);

const db = mongoose.connection;

// 当连接失败的时候
db.on('error', err => {
    console.log('MongoDB 数据库连接失败', err)
})
  
// 当连接成功的时候
db.once('open', function () {
    console.log('MongoDB 数据库连接成功')
})

export default {
    User: mongoose.model('User', userSchema)
}
