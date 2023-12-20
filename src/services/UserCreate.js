const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');
const InputChecker = require('../utils/InputChecker');

class UserCreate{
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute({name, email, password}){
        const nameIsValid = InputChecker.name(name);
        const emailIsValid = InputChecker.email(email);
        const passwordIsValid = InputChecker.password(password);

        if(!nameIsValid)
            throw new AppError('The name is not valid!');
        else if(!emailIsValid)
            throw new AppError('The email is not valid!');
        else if(!passwordIsValid)
            throw new AppError('The password does not fit the pattern, try another one!');

        const doesUserExist = await this.userRepository.findByEmail(email);

        if(doesUserExist)
            throw new AppError('The user is already registered!');
        
        const hashedPassword = await bcrypt.hash(password, 8);
        const userCreated = await this.userRepository.create({
            name: name.toLowerCase(),
            password: hashedPassword,
            email: email
        });

        return userCreated;

    }
}

module.exports = UserCreate;