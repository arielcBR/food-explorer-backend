const DishCreateService = require('../services/DishService');

class OrderRepositoryInMemory{
    orders = [];
    order_dishes = [];

    async create(userId, dishes, dishRepository){
        const dishService = new DishCreateService(dishRepository);

        const order = {
            id: Math.floor(Math.random() * 1000) + 1,
            user_id: userId,
            status: 'preparing',
            created_at: new Date(),
            updated_at: new Date()
        };

        this.orders.push(order);

        for (const dish of dishes) {
            const getDishPrice = await dishService.getById(dish.id);
            dish.price = getDishPrice.price;

            const order_dish = {
                order_id: order.id,
                dish_id: dish.id,
                quantity: dish.quantity,
                price: dish.price
            };

            this.order_dishes.push(order_dish);
        }

        return order;
    }

    async getOrderById(orderId) {
        const order = this.orders.find(order => order.id === orderId);
        return order;
    }
    
    async updateOrder(orderId, orderStatus){
        const orderUpdated = await this.getOrderById(orderId);

        orderUpdated.status = orderStatus;
        orderUpdated.updated_at = new Date();

        this.orders = this.orders.map(item => (item.id === orderId ? orderUpdated : item));
        return orderUpdated;
    }

}

module.exports = OrderRepositoryInMemory;