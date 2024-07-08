const AppError = require('../utils/AppError');
const InputChecker = require('../utils/InputChecker');
const diskStorage = require('../providers/DiskStorage')

class DishService{
    constructor(dishRepository){
        this.dishRepository = dishRepository;
    }

    async create({name, category, price, description, ingredients, picture}){

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

        

        const dish = {
            name: name.toLowerCase(), 
            category: category.toLowerCase(),
            price, 
            description: description.toLowerCase(), 
            ingredients,
            picture
        }

        const dishCreated = await this.dishRepository.createDish(dish);

        if(!dishCreated){
            throw new AppError('It was not possible to save the dish into the database!', 500);
        }
        
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

    async update(dishId, dishUpdated){
        const dish = await this.getById(dishId);

        // Validations
        if(dishUpdated.name){
            const isNewNameValid = InputChecker.text(dishUpdated.name);

            if(!isNewNameValid)
                throw new AppError('The name is invalid!');
            dish.name = dishUpdated.name;
        }

        if(dishUpdated.category){
            const isNewCategoryValid = InputChecker.text(dishUpdated.category);
            if(!isNewCategoryValid)    
                throw new AppError('The category is invalid!');
            dish.category = dishUpdated.category;
        }

        if(dishUpdated.price){
            const isNewPriceValid = InputChecker.price(dishUpdated.price);
            if(!isNewPriceValid)
                throw new AppError('The price is invalid!');
            dish.price = dishUpdated.price;
        }

        if(dishUpdated.description){
            dish.description = dishUpdated.description;
        }

        if(dishUpdated.picture){
            dish.picture = dishUpdated.picture
        }
        
        if(dishUpdated.ingredients){
            await this.updateDishIngredients(dish.id, dishUpdated.ingredients);
        }

        await this.dishRepository.updateDish(dish);
        
        return true;
    }

    async updateDishIngredients(dishId, newIngredients) {
        await this.dishRepository.deleteDishIngredients(dishId);
    
        for (const ingredient of newIngredients) {
            if (ingredient.id === null) {
                const data = await this.dishRepository.getByIngredientName(ingredient.name);
                
                if (data && data.id) {
                    ingredient.id = data.id;
                }
                else {
                    const newIngredient = await this.dishRepository.createIngredient({ name: ingredient.name });
                    ingredient.id = newIngredient;
                }
            }
        }
        await this.dishRepository.createDishIngredients(dishId, newIngredients);
    }

    async getIngredientsByDishId(id){
        const ingredients = await this.dishRepository.getDishIngredients(id);
        return ingredients ? ingredients : [];
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