const knex = require("../database/knex");

class DishRepository{
    async createDish({name, category, price, description, ingredients, picture}){
        let transaction;

        try{
            transaction = await knex.transaction();

            const [dishId] = await transaction('dishes').insert({name, category, price, description, picture});

            for (const ingredient of ingredients) {
                if (!ingredient.length) 
                    continue;
    
                // Check if the ingredient already exists in the DB
                const [ingredientExists] = await transaction('ingredients').where({ name: ingredient });
    
                // If it does not exist, then add the new ingredient to the DB
                if (!ingredientExists) {
                    const [newIngredientId] = await transaction('ingredients').insert({ name: ingredient.toLowerCase() });
                    
                    await transaction('dish_ingredients').insert({
                        dish_id: dishId, 
                        ingredient_id: newIngredientId
                    });
                } 
                
                // If it exists, then link to the dish and add to the DB
                else {
                    await transaction('dish_ingredients').insert({
                        dish_id: dishId, 
                        ingredient_id: ingredientExists.id
                    });
                }
            }
            
            await transaction.commit();
            return dishId;
        }
        catch(error){
            console.log(error);
            transaction.rollback();
            return false;
        }


    }

    async getAllDishes(){
        const dishes = await knex('dishes').select();
        return dishes;
    }

    async getDishById(id){
        const [dish] = await knex('dishes').select().where({id: id});
        return dish;
    }

    async deleteDish(id){
        const dish = await knex('dishes').delete().where({id: id});
        return dish;
    }

    async updateDish({id, name, category, price, description, picture}){
        await knex('dishes').update({name, category, price, description, picture}).where({id: id});
        return; 
    }

    async getDishIngredients(id){
        const ingredients = await knex('dish_ingredients')
            .where({ dish_id: id })
            .join('ingredients', 'dish_ingredients.ingredient_id', 'ingredients.id')
            .select('ingredients.id', 'ingredients.name');

        return ingredients;
    }

    async deleteDishIngredients(id){
        await knex('dish_ingredients').delete().where({ingredient_id: id});
        return;
    }

    async searchDishes(dish){
        const dishesByName = await knex('dishes').where('name', 'like', `%${dish}%`);
        
        const dishesByIngredient = await knex('dishes')
        .distinct('dishes.id', 'dishes.name', 'dishes.category', 'dishes.price', 'dishes.description', 'dishes.picture')
        .join('dish_ingredients', 'dishes.id', 'dish_ingredients.dish_id')
        .join('ingredients', 'dish_ingredients.ingredient_id', 'ingredients.id')
        .where('ingredients.name', 'like', `%${dish}%`);

        const allDishes = [...dishesByName, ...dishesByIngredient];
        console.log(allDishes);

        return allDishes;
    }
}

module.exports = DishRepository;