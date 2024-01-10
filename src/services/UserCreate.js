const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');
const InputChecker = require('../utils/InputChecker');

class UserCreate{
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute({name, email, password, isAdmin = false}){
        const isNameValid = InputChecker.text(name);
        const isEmailValid = InputChecker.email(email);
        const isPasswordValid = InputChecker.password(password);

        if(!isNameValid)
            throw new AppError('The name is not valid!');
        if(!isEmailValid)
            throw new AppError('The email is not valid!');
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
}

module.exports = UserCreate;