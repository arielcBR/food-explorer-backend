const { verify } = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const authConfig = require('../configs/auth');

function ensureAuthentication(req, res, next){
    const authHeader = req.headers.authorization;
    // console.log(authHeader);

    if(!authHeader)
        throw new AppError('JWT Token not sent', 401);

    const [, token] = authHeader.split(' ');

    try {
        const {sub: user_id} = verify(token, authConfig.jwt.secret);
        req.user = {
            id: Number(user_id)
        }
        return next();

    } catch (error) {
        throw new AppError('Invalided JWT Token', 401);
    }
}

module.exports = ensureAuthentication;