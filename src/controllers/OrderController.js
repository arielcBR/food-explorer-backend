const OrderRepository = require('../repositories/OrderRepository');
const OrderCreateService = require('../services/OrderCreate');

class OrderController{
    async create(req, res){
        const { userId } = req.body;
        const { dishes } = req.body;

        const orderRepository = new OrderRepository();
        const orderCreateService = new OrderCreateService(orderRepository);

        const orderId = await orderCreateService.execute({userId, dishes});

        res.json({order_id: orderId});
    }
}

module.exports = new OrderController();