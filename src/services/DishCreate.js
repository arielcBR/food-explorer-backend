const AppError = require('../utils/AppError');
const InputChecker = require('../utils/InputChecker');

class DishCreate{
    constructor(dishRepository){
        this.dishRepository = dishRepository;
    }

    async create({name, category, price, description, ingredients, picturePath}){
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
            name: name.toLowerCase(), 
            category: category.toLowerCase(),
            price, 
            description: description.toLowerCase(), 
            ingredients,
            picture: picturePath
        });
        
        return dishCreated;

    }

    async getAll(){
        const dishes = await this.dishRepository.getAllDishes();
        return dishes;
    }

    async get(id){
        const [dish] = await this.dishRepository.getDish(id);
        return dish;
    }

    async delete(id){
        const dish = await this.get(id);

        if(!dish)
            return false;

        else{
            const status = await this.dishRepository.deleteDish(id);
            
            return true;
        }

    }
}

module.exports = DishCreate;