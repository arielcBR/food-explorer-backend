const knex = require('../database/knex');

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

    async getOrders(userId) {
        const orders = await knex('orders').where({ user_id: userId });
    
        if (!orders.length) {
          return [];
        }
    
        return orders;
    }

    async getOrderById(orderId){
        try {
            const [order] = await knex('orders').where({id: orderId});
            return order;
        } catch (error) {
            console.error(error);
        }
    }

    async getOrderDetails(orderId){
        try {
            const orderDetails = await knex('order_dishes').where({order_id: orderId});

            let dishes = [];

            for (const item of orderDetails) {
                const [dish] = await knex('dishes').where({id: item.dish_id});
                dish.quantity = item.quantity;
                dishes.push(dish);
            }
            return dishes;

        } catch (error) {
            console.error(error);
        }
    }

    async updateOrder(orderId, orderStatus){
        try {
            await knex('orders')
                .where({id: orderId})
                .update({
                    status: orderStatus, 
                    updated_at: knex.fn.now()
                });

            return;
        } catch (error) {
            console.error(error);
        }
    }
}


module.exports = OrderRepository;