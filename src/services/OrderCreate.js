class OrderCreate{
    constructor(orderRepository){
        this.orderRepository = orderRepository;
    }

    async execute({userId, dishes}){
        const orderId = await this.orderRepository.create(userId, dishes);
        
        return orderId;
    }
}

module.exports = OrderCreate;