const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');
const InputChecker = require('../utils/InputChecker');

class UserService{
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async create({name, email, password, isAdmin = false}){
        const isNameValid = InputChecker.text(name);
        const isEmailValid = InputChecker.email(email);
        const isPasswordValid = InputChecker.password(password);

        if(!isNameValid)
            throw new AppError('The name is not valid, try it again!');
        if(!isEmailValid)
            throw new AppError('The email is not valid, try it again!');
        if(!isPasswordValid)
            throw new AppError('The password does not fit the pattern, try another one!');

        const doesUserExist = await this.userRepository.findByEmail(email);

        if(doesUserExist)
            throw new AppError('The user is already registered!');
        
        const hashedPassword = await bcrypt.hash(password, 8);
        const userCreated = await this.userRepository.create({
            name: name.toLowerCase(),
            password: hashedPassword,
            email: email,
            isAdmin: isAdmin
        });

        return userCreated;

    }

    async getById(id){
        if(!id === undefined)
            throw new AppError('The id is not being sent!');

        if(!Number(id) <= 0)
            throw new AppError('The id is invalid!');

        const user = await this.userRepository.findById(id);

        return user;
    }
}

module.exports = UserService;