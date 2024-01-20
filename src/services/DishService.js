const AppError = require('../utils/AppError');
const InputChecker = require('../utils/InputChecker');

class DishService{
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
        try {
            const dishes = await this.dishRepository.getAllDishes();

            if(!dishes)
                throw new AppError('Dish not found!', 404);

            return dishes;
        } 
        catch (error) {
            console.error(error);
            throw new AppError(error);
        }
    }

    async getById(id){
        const dish = await this.dishRepository.getDishById(id);

        return dish;
    }

    async delete(id){
        const dish = await this.getById(id);

        if(!dish)
            throw new AppError('Dish not found!', 404);

        else{
            const status = await this.dishRepository.deleteDish(id);

            if (!status)
                throw new AppError('Dish could not be deleted!');
            
            return true;
        }

    }

    async update(dishId, newDishPicture, dishUpdated){
        const dish = await this.getById(dishId);

        // Dish not found
        if(!dish)
            throw new AppError('Dish not found!', 404);

        else{

            if(newDishPicture)
                dish.picture = newDishPicture.path;
    
            if(dishUpdated.name){
                const isNewNameValid = InputChecker.text(dishUpdated.name);
                if(isNewNameValid)
                    dish.name = dishUpdated.name;
            }
    
            if(dishUpdated.category){
                const isNewCategoryValid = InputChecker.text(dishUpdated.category);
                if(isNewCategoryValid)    
                    dish.category = dishUpdated.category;
            }
    
            if(dishUpdated.price){
                const isNewPriceValid = InputChecker.price(dishUpdated.price);
                if(isNewPriceValid)
                    dish.price = dishUpdated.price;
            }
    
            if(dishUpdated.description)
                dish.description = dishUpdated.description;
            
            await this.dishRepository.updateDish(dish);
            
            if(dishUpdated.ingredients){
                await this.updateDishIngredients(dish.id, dishUpdated.ingredients);
            }
            
        }

        return true;
    }

    async updateDishIngredients(dishId, newIngredients){
    
        const ingredients = await this.dishRepository.getDishIngredients(dishId);

        for (const ingredient of ingredients) {
            await this.dishRepository.deleteDishIngredients(ingredient.id);
        }

        await this.dishRepository.createDishIngredients(dishId, newIngredients);
    }

    async searchDishes(dish){
        const allDishes = await this.dishRepository.searchDishes(dish);
        
        const uniqueDishes = allDishes.reduce((unique, dish) => {
            if (!unique.some((uniqueDish) => uniqueDish.id === dish.id)) {
                unique.push(dish);
            }
            return unique;
        }, []);

        return uniqueDishes;
    }

}

module.exports = DishService;