const DishCreateService = require('./DishService');
const UserCreateService = require('./UserService');
const AppError = require("../utils/AppError");

class OrderService{
    status = ['canceled', 'pending', 'preparing', 'delivering', 'finished'];

    constructor(orderRepository, userRepository, dishRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository; 
        this.dishRepository = dishRepository;
    }

    async create(userId, dishes){
        if(!userId)
            throw new AppError('User not sent!');

        if(!dishes || !dishes.length)
            throw new AppError('Dishes not sent!');

        const isUserValid = await this.validateUser(userId, this.userRepository);

        if(!isUserValid)
            throw new AppError('User not found!');
        
        for (const item of dishes) {
            const isDishValid = await this.validateDish(item.id, this.dishRepository);
            
            if (!isDishValid) 
                throw new AppError(`Dish not found!`);
        }

        const order = await this.orderRepository.create(userId, dishes, this.dishRepository);
        
        return order;
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
        if(!orderStatus)
            throw new AppError('Order status not sent!');

        const isOrderStatusValid = this.status.includes(orderStatus);

        if(!isOrderStatusValid)
            throw new AppError('Order status sent is invalid!');
       
        if(!orderId || orderId <= 0)
            throw new AppError('Order not sent or invalid!');

        const order = await this.orderRepository.getOrderById(orderId);
        
        if(!order)
            throw new AppError('Order does not exist in the database!');


        const orderUpdated = await this.orderRepository.updateOrder(orderId, orderStatus);

        return orderUpdated;
    }

    async validateUser(userId, userRepository) {
        const userCreateService = new UserCreateService(userRepository);
        const isUserValid = await userCreateService.getById(userId);

        return isUserValid;
    }
    
    async validateDish(dishId, dishRepository){
        const dishCreateService = new DishCreateService(dishRepository);
        const isDishValid = await dishCreateService.getById(dishId);

        return isDishValid;
    }

}

module.exports = OrderService;