const UserRepository = require('../repositories/UserRepository');   
const SessionCreateService = require('../services/SessionCreate');

class SessionController{
    async signIn(req, res){
        const { email, password } = req.body;

        const userRepository = new UserRepository();
        const sessionCreateService = new SessionCreateService(userRepository);

        const token = await sessionCreateService.execute({email, password});

        return res.status(201).json(token);
    }
}

module.exports = new SessionController();