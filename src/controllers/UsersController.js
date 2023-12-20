const UserRepository = require('../repositories/UserRepository');   
const UserCreateService = require('../services/UserCreate');

class UsersController{
    async create(req, res){
        const { name, email, password } = req.body;

        const userRepository = new UserRepository();
        const userCreateService = new UserCreateService(userRepository);

        await userCreateService.execute({name, email, password});
        
        return res.status(201).json();
    }
}

module.exports = new UsersController();