const {StatusCodes} = require('http-status-codes')
const auth = (req, res, next) => {
    const headers = req.headers.name
    if(!headers || headers !== 'hicham'){
        return res.status(StatusCodes.UNAUTHORIZED).send('You are not authorized')
    }
    next()
}

module.exports = auth