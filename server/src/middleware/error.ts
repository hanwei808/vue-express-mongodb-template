import util from 'util'

const error = (err, req, res, next) => {
    res.status(500).json({
        error: util.format(err)
    })
}

export default error