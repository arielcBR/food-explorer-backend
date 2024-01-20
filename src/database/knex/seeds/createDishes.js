const DishRepository = require('../../../repositories/DishRepository');
const DishCreateService = require('../../../services/DishService');

exports.seed = async function(knex) {
    const dishes  = require('../files/dishes');

    const dishRepository = new DishRepository();
    const dishCreateService = new DishCreateService(dishRepository);

    for (const dish of dishes) {
        try {
            await dishCreateService.create(dish);
        } 
        catch (error) {
            console.error(error);
        }
    }
};
