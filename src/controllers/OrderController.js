const OrderRepository = require('../repositories/OrderRepository');
const OrderCreateService = require('../services/OrderService');

class OrderController{
    async create(req, res){
        const { userId, dishes } = req.body;

        const orderRepository = new OrderRepository();
        const orderCreateService = new OrderCreateService(orderRepository);

        const orderId = await orderCreateService.create(userId, dishes);

        res.status(201).json({order_id: orderId});
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