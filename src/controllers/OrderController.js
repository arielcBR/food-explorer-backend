const DishRepository = require('../repositories/DishRepository');
const OrderRepository = require('../repositories/OrderRepository');
const UserRepository = require('../repositories/UserRepository');
const DishCreateService = require('../services/DishCreate');
const OrderCreateService = require('../services/OrderCreate');
const UserCreateService = require('../services/UserCreate');
const AppError = require('../utils/AppError');

class OrderController{
    async create(req, res){
        const { userId, dishes } = req.body;

        const orderRepository = new OrderRepository();
        const orderCreateService = new OrderCreateService(orderRepository);

        const orderId = await orderCreateService.create(userId, dishes);

        res.json({order_id: orderId});
    }

    async index(req, res){
        const { userId } = req.params;

        const orderRepository = new OrderRepository();
        const orderCreateService = new OrderCreateService(orderRepository);

        const ordersId = await orderCreateService.getOrders(userId);
        
        res.json(ordersId);
    }

    async get(req, res){
        const { orderId } = req.query;

        const orderRepository = new OrderRepository();
        const orderCreateService = new OrderCreateService(orderRepository);

        const ordersDetails = await orderCreateService.getOrderDetails(orderId);

        if(!ordersDetails.length) 
            return res.json({message: 'Order is empty'});

        res.json(ordersDetails);
    }
}

module.exports = new OrderController();