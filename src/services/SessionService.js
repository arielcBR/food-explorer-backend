const AppError = require('../utils/AppError');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

const jwtConfig = require('../configs/auth');

class SessionService{
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute({ email, password }){
        
        const user = await this.userRepository.findByEmail(email);

        if(!user)
            throw new AppError('The email and/or password incorrect!', 401);

        const didPasswordMatch = await bcrypt.compare(password, user.password);

        if(!didPasswordMatch)
            throw new AppError('The email or password are incorrect!', 401);

        const { secret, expiresIn } = jwtConfig.jwt;
        
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        });
        
        return {user, token};
    }
}

module.exports = SessionService;