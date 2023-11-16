import { ResponseData } from '../class/index';
import user from './user'

let allCtrls = {
    user
}
Object.keys(allCtrls).forEach(name => {
    console.log('name', name)
    Object.keys(allCtrls[name]).forEach(key => {
        const ctrl = allCtrls[name][key]
        allCtrls[name][key] = async (req, res) => {
            const data = await ctrl(req, res)
            const responseData = new ResponseData(data.status, data.message, data.data)
            res.status(data.status)[data.type](responseData)
        }
    })
})

export default allCtrls