class DishRepositoryInMemory{
    ingredients = [];
    dishes = [];
    dish_ingredients = [];

    async createDish ({name, category, price, description, ingredients, picturePath}){
        let response;
        
        const dish = {
            id: Math.floor(Math.random() * 1000) + 1,
            name,
            category,
            price,
            description,
            ingredients,
            picturePath,
            created_at: new Date(),
            updated_at: new Date()
        };

        this.dishes.push(dish);
        
        for (const ingredient of ingredients) {
            if (!ingredient.length) 
                continue;

            const doesIngredientExist = this.ingredients.find(item => item.name === ingredient.name);

            // If it does not exist, then add the new ingredient to the DB
            if (!doesIngredientExist) {
                const newIngredient = {
                    id: Math.floor(Math.random() * 1000) + 1,
                    name: ingredient.toLowerCase(),
                    created_at: new Date(),
                    updated_at: new Date()  
                };
                
                this.ingredients.push(newIngredient);
            } 
            
            // If it exists, then link to the dish and add to the DB
            else {
                const dish_ingredient = {
                    id: Math.floor(Math.random() * 1000) + 1,
                    dish_id: ingredient.toLowerCase(),
                    ingredient_id: '',
                    created_at: new Date(),
                    updated_at: new Date()  
                };
                this.dish_ingredients.push(dish_ingredient);
            }
        }

        response = {
            statusCode: 201,
            body: {
                id: dish.id,
                name,
                category,
                price,
                description,
                ingredients,
                picturePath,
                created_at: new Date(),
                updated_at: new Date()
            }
        }
        return response;
    }

    async getDishById(dishId) {
        const dish = this.dishes.find(item => item.id == dishId);
        return dish;
    }

    async updateDish({ id, name, category, price, description, picture }) {
        const dishUpdated = {
            id,
            name,
            category,
            price,
            description,
            picture,
            updated_at: new Date(),
        };
        
        this.dishes = this.dishes.map(dish => (dish.id === id ? dishUpdated : dish));
        
        return dishUpdated;
    }

    async deleteDish(id) {
        const deletedDishIndex = this.dishes.findIndex(dish => dish.id === id);
    
        if (deletedDishIndex !== -1) {
            this.dishes.splice(deletedDishIndex, 1);
    
            this.dish_ingredients = this.dish_ingredients.filter(item => item.dish_id !== id);
    
            return true; 
        }
    
        return false;
    }
    
    async getDishIngredients(id) {
        const ingredients = this.dish_ingredients
            .filter(item => item.dish_id === id)
            .map(item => {
                const ingredient = this.ingredients.find(ing => ing.id === item.ingredient_id);
                return ingredient ? { id: ingredient.id } : null;
            })
            .filter(Boolean);

        return ingredients;
    }

    async createDishIngredients(dishId, ingredients){
        for (const ingredient of ingredients) {
            if (!ingredient.length) 
                continue;

            // Check if the ingredient already exists in the DB
            const doesIngredientExist = this.ingredients.find(item => item.name === ingredient);

            // If it does not exist, then add the new ingredient to the DB
            if (!doesIngredientExist) {
                const newIngredient = {
                    id: Math.floor(Math.random() * 1000) + 1,
                    name: ingredient.toLowerCase(),
                    created_at: new Date(),
                    updated_at: new Date()  
                };
                
                this.ingredients.push(newIngredient);
            } 


            // If it exists, then link to the dish and add to the DB

            else {
                const dish_ingredient = {
                    id: Math.floor(Math.random() * 1000) + 1,
                    dish_id: dishId.id,
                    ingredient_id: doesIngredientExist.id,
                    created_at: new Date(),
                    updated_at: new Date()  
                };

                this.dish_ingredients.push(dish_ingredient);
        }

        return;
    }

    };
}

module.exports = DishRepositoryInMemory;