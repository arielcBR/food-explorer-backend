const knex = require("../database/knex");

class DishRepository{
    async createDish({name, category, price, description, ingredients, picture}){
        const [dishId] = await knex('dishes').insert({name, category, price, description, picture});
        await this.createDishIngredients(dishId, ingredients);

        return dishId;
    }

    async createDishIngredients(dishId, ingredients){
        for (const ingredient of ingredients) {
            if (!ingredient.length) 
                continue;

            // Check if the ingredient already exists in the DB
            const [ingredientExists] = await knex('ingredients').where({ name: ingredient });

            // If it does not exist, then add the new ingredient to the DB
            if (!ingredientExists) {
                const [newIngredientId] = await knex('ingredients').insert({ name: ingredient });
                
                await knex('dish_ingredients').insert({
                    dish_id: dishId, 
                    ingredient_id: newIngredientId
                });
            } 
            
            // If it exists, then link to the dish and add to the DB
            else {
                await knex('dish_ingredients').insert({
                    dish_id: dishId, 
                    ingredient_id: ingredientExists.id
                });
            }
        }

        return;
    }
}

module.exports = DishRepository;