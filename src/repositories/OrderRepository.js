const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class OrderRepository{
    async create(userId, dishes){
            let transaction;
    
            try {
                transaction = await knex.transaction();
    
                if (!dishes.length) {
                    await transaction.rollback();
                    return false;
                }
    
                const [ orderId ] = await transaction('orders').insert({ user_id: userId });
    
                for (const dish of dishes) {
                    const [getDishPrice] = await transaction('dishes').where({ id: dish.id }).select('price');
                    dish.price = getDishPrice.price;
    
                    await transaction('order_dishes').insert({
                        order_id: orderId,
                        dish_id: dish.id,
                        quantity: dish.quantity,
                        price: dish.price
                    });
                }
    
                await transaction.commit();
                return orderId;
                
            } 
            catch (error) {
                console.error(error);
    
                if (transaction) {
                    await transaction.rollback();
                }
    
                return false;
            }
    }
}

module.exports = OrderRepository;