const AppError = require('../utils/AppError');
const InputChecker = require('../utils/InputChecker');

class DishService{
    constructor(dishRepository){
        this.dishRepository = dishRepository;
    }

    async create({name, category, price, description, ingredients, picturePath}){

        const isNameValid = InputChecker.text(name);
        const isCategoryValid = InputChecker.text(category);
        const isPriceValid = InputChecker.price(price);
        const isDescriptionValid = InputChecker.text(description);
        const areIngredientsValid = (!ingredients.length) ? false : true;

        if(!isNameValid)
            throw new AppError('The name is not valid!');
        if(!isCategoryValid)
            throw new AppError('The category is not valid!');       
        if(!isPriceValid)
            throw new AppError('The price is not valid!');
        if(!isDescriptionValid)
            throw new AppError('The description is not valid!');
        if(!areIngredientsValid)
            throw new AppError('The ingredient list cannot be empty!');

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
        if(!newDishPicture && !dishUpdated)
            throw new AppError('No updates provided. Please provide a new picture and/or updated dish details.');
        
        const dish = await this.getById(dishId);

        if(!dish)
            throw new AppError('Dish not found!', 404);
        
        if(newDishPicture)
            dish.picture = newDishPicture;

        if(dishUpdated){
            if(dishUpdated.name){
                const isNewNameValid = InputChecker.text(dishUpdated.name);
                if(isNewNameValid)
                    dish.name = dishUpdated.name;
                else 
                    throw new AppError('The name is invalid!');
            }
    
            if(dishUpdated.category){
                const isNewCategoryValid = InputChecker.text(dishUpdated.category);
                if(isNewCategoryValid)    
                    dish.category = dishUpdated.category;
                else 
                    throw new AppError('The category is invalid!');
            }
    
            if(dishUpdated.price){
                const isNewPriceValid = InputChecker.price(dishUpdated.price);
                if(isNewPriceValid)
                    dish.price = dishUpdated.price;
                else 
                    throw new AppError('The price is invalid!');
            }
    
            if(dishUpdated.description)
                dish.description = dishUpdated.description;

            if(dishUpdated.ingredients.length){
                await this.updateDishIngredients(dish.id, dishUpdated.ingredients);
            }
        }
        
        await this.dishRepository.updateDish(dish);
        
        return true;
    }

    async updateDishIngredients(dishId, newIngredients){
        const ingredients = await this.dishRepository.getDishIngredients(dishId);

        for (const ingredient of ingredients) {
            const ingredientToDelete = await this.dishRepository.deleteDishIngredients(ingredient.id);
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