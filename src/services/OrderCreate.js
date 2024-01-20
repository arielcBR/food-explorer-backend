const DishRepository = require('../repositories/DishRepository');
const OrderRepository = require('../repositories/OrderRepository');
const UserRepository = require('../repositories/UserRepository');
const DishCreateService = require('../services/DishCreate');
const OrderCreateService = require('../services/OrderCreate');
const UserCreateService = require('../services/UserCreate');
const AppError = require("../utils/AppError");

class OrderCreate{
    constructor(orderRepository){
        this.orderRepository = orderRepository;
    }

    async create(userId, dishes){

        if(!userId)
            throw new AppError('User not sent!');

        if(!dishes.length)
            throw new AppError('Dishes not sent!');
     
        const isUserValid = await this.validateUser(userId);

        if(!isUserValid)
            throw new AppError('User not find!');
        
        for (const item of dishes) {
            const isDishValid = await this.validateDish(item.id);
            
            if (!isDishValid) 
                throw new AppError(`Dish id: ${item.id} sent is invalid`);
        }

        const orderId = await this.orderRepository.create(userId, dishes);
        
        return orderId;
    }

    async getOrders(userId){
        const isUserValid = await this.validateUser(userId);

        if(!isUserValid)
            throw new AppError('User not find!');

        const orders = await this.orderRepository.getOrders(userId);
        
        if(!orders.length)
            throw new AppError('There is not any orders yet!', 404);
            
        const ordersId = orders.map(order => order.id);
        
        return ordersId;
    }

    async validateUser(userId){
        const userRepository = new UserRepository();
        const userCreateService = new UserCreateService(userRepository);

        const isUserValid = await userCreateService.getById(userId);

        return isUserValid;
    }

    async validateDish(dishId){
        const dishRepository = new DishRepository();
        const dishCreateService = new DishCreateService(dishRepository);

        const isDishValid = await dishCreateService.getById(dishId);
        return isDishValid;
    }
}

module.exports = OrderCreate;