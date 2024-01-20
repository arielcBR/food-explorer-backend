const DishRepository = require('../repositories/DishRepository');
const UserRepository = require('../repositories/UserRepository');
const DishCreateService = require('../services/DishCreate');
const UserCreateService = require('../services/UserCreate');
const AppError = require("../utils/AppError");



class OrderCreate{
    status = ['canceled', 'pending', 'preparing', 'delivering', 'finished'];

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

    async getOrderDetails(orderId){
        if(!orderId)
            throw new AppError('Order id not sent');

        const orderDetails = await this.orderRepository.getOrderDetails(orderId);
        return orderDetails;
    }

    async updateOrder(orderId, orderStatus){
        if(!orderId)
            throw new AppError('Order id not sent!');

        const order = await this.orderRepository.getOrderById(orderId);

        if(!order)
            throw new AppError('Order does not exist in the database!');

        const isOrderStatusValid = this.status.includes(orderStatus.toLowerCase());

        if(!isOrderStatusValid)
            throw new AppError('Order status is not valid!');

        await this.orderRepository.updateOrder(orderId, orderStatus);

        return true;
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