const DishRepository = require('../repositories/DishRepository');
const UserRepository = require('../repositories/UserRepository');
const OrderRepository = require('../repositories/OrderRepository');
const OrderCreateService = require('../services/OrderService');

class OrderController{
    async create(req, res){
        const { userId, dishes } = req.body;

        const dishRepository = new DishRepository();
        const userRepository = new UserRepository ();
        const orderRepository = new OrderRepository();
        const orderCreateService = new OrderCreateService(orderRepository, userRepository, dishRepository);

        const orderId = await orderCreateService.create(userId, dishes);

        res.status(201).json({order_id: orderId});
    }

    async index(req, res){
        const { userId } = req.params;

        const userRepository = new UserRepository ();
        const orderRepository = new OrderRepository();
        const orderCreateService = new OrderCreateService(orderRepository, userRepository);

        const ordersId = await orderCreateService.getOrders(userId);
        
        res.json(ordersId);
    }

    async get(req, res){
        const { orderId } = req.query;

        const userRepository = new UserRepository ();
        const orderRepository = new OrderRepository();
        const orderCreateService = new OrderCreateService(orderRepository, userRepository);

        const ordersDetails = await orderCreateService.getOrderDetails(orderId);

        if(!ordersDetails.length) 
            return res.json({message: 'Order is empty'});

        res.json(ordersDetails);
    }

    async update(req, res){
        const { orderStatus, orderId } = req.body;

        const orderRepository = new OrderRepository();
        const orderCreateService = new OrderCreateService(orderRepository);

        const status = await orderCreateService.updateOrder(orderId, orderStatus);

        if(!status)
            return res.json({message: `It was not possible to update the order n° ${orderId}`})

        return res.json({message: `Order ${orderId} updated successfully!`});
    }
}

module.exports = new OrderController();