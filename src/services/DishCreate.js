const AppError = require('../utils/AppError');
const InputChecker = require('../utils/InputChecker');

class DishCreate{
    constructor(dishRepository){
        this.dishRepository = dishRepository;
    }

    async execute({name, category, price, description, ingredients, picturePath}){
        const isNameValid = InputChecker.text(name);
        const isPriceValid = InputChecker.price(price);
        const isDescriptionValid = InputChecker.text(description);

        if(!isNameValid)
            throw new AppError('The name is not valid!');
        if(!isPriceValid)
            throw new AppError('The price is not valid!');
        if(!isDescriptionValid)
            throw new AppError('The description is not valid!');

        const dishCreated = await this.dishRepository.createDish({
            name, 
            category,
            price, 
            description, 
            ingredients,
            picture: picturePath
        });
        
        return dishCreated;

    }
}

module.exports = DishCreate;