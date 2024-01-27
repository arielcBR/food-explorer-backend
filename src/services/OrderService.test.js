const DishCreateService = require('./DishService');
const OrderCreateService = require('./OrderService');
const UserCreateService = require('./UserService');
const DishRepositoryInMemory = require('../repositories/DishRepositoryInMemory');
const OrderRepositoryInMemory = require('../repositories/OrderRepositoryInMemory');
const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory');

describe('POST /orders', () => {
    let dishService;
    let orderService;
    let userService;
    let dishRepositoryInMemory;
    let orderRepositoryInMemory;
    let userRepositoryInMemory;

    let user;
    let dish1;
    let dish2;

    beforeEach(async () => {
        dishRepositoryInMemory = new DishRepositoryInMemory();
        dishService = new DishCreateService(dishRepositoryInMemory);
        
        userRepositoryInMemory = new UserRepositoryInMemory();
        userService = new UserCreateService(userRepositoryInMemory);

        orderRepositoryInMemory = new OrderRepositoryInMemory();
        orderService = new OrderCreateService(orderRepositoryInMemory, userRepositoryInMemory, dishRepositoryInMemory);

        const userBody = await userService.create({
            name: "user test",
            email: "user@test.com",
            password: "abcde1!"
        });

        user = userBody.body;

        const dishBody1 = await dishService.create({
            name: "Cheesecake de frutos rojos",
            category: "postre",
            price: 24.99,
            description: "El tradicional postre, cremoso y rico",
            ingredients: ["arandonos", "queso crema", "frutillas"]
        });

        dish1 = dishBody1.body;

        const dishBody2 = await dishService.create({
            name: "Tiramisu",
            category: "postre",
            price: 29.99,
            description: "El tradicional postre italiano, cremoso y rico",
            ingredients: ["cafe", "queso mascarpone", "vanillas"],
        });

        dish2 = dishBody2.body;
    });

    it('Should pass, create an order an return an id', async () => {
        const userId = user.id;
        const dishes = [{id: dish1.id, quantity: 5}, {id: dish2.id, quantity: 3}];

        const orderCreated = await orderService.create(userId, dishes);
        
        expect(orderCreated.id).not.toBeNull();
        expect(orderCreated.user_id).toBe(user.id);
    });

    it('Should pass, cannot create an order without a user', async () => {
        const invalidUserId = undefined;
        const dishes = [{ id: dish1.id, quantity: 5 }, { id: dish2.id, quantity: 3 }];
    
        try {
            await orderService.create(invalidUserId, dishes);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({ message: 'User not sent!' });
        }
    });

    it('Should pass, cannot create an order without any dish', async () => {
        const userId = user.id;
        const dishes = undefined;
    
        try {
            await orderService.create(userId, dishes);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({ message: 'Dishes not sent!' });
        }
    });

    it('Should pass, cannot create an order with an non-existent user', async () => {
        const userId = 10000;
        const dishes = [{id: dish1.id, quantity: 5}, {id: dish2.id, quantity: 3}];
        
        try {
            await orderService.create(userId, dishes);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({ message: 'User not found!' });
        }
    });

    it('Should pass, cannot create an order with an non-existent dish', async () => {
        const userId = user.id;
        const dishes = [{id: dish1.id, quantity: 5}, {id: -100, quantity: 3}];
        
        try {
            await orderService.create(userId, dishes);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({ message: 'Dish not found!' });
        }
    });

    it('Should pass, cannot create an order with the dish quantity equal or less to zero', async () => {
        const userId = user.id;
        const dishes = [{id: dish1.id, quantity: 5}, {id: dish2.id, quantity: -3}];
        
        try {
            await orderService.create(userId, dishes);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({ message: 'Quantity sent is invalid!' });
        }
    });
    
});

describe('PATCH /orders', () => {
    let dishService;
    let orderService;
    let userService;
    let dishRepositoryInMemory;
    let orderRepositoryInMemory;
    let userRepositoryInMemory;

    let user;
    let dish;
    let order;

    beforeEach(async () => {
        dishRepositoryInMemory = new DishRepositoryInMemory();
        dishService = new DishCreateService(dishRepositoryInMemory);
        
        userRepositoryInMemory = new UserRepositoryInMemory();
        userService = new UserCreateService(userRepositoryInMemory);

        orderRepositoryInMemory = new OrderRepositoryInMemory();
        orderService = new OrderCreateService(orderRepositoryInMemory, userRepositoryInMemory, dishRepositoryInMemory);

        const userBody = await userService.create({
            name: "user test",
            email: "user@test.com",
            password: "abcde1!"
        });

        user = userBody.body;

        const dishBody = await dishService.create({
            name: "Cheesecake de frutos rojos",
            category: "postre",
            price: 24.99,
            description: "El tradicional postre, cremoso y rico",
            ingredients: ["arandonos", "queso crema", "frutillas"]
        });

        dish = [dishBody.body];

        order = await orderService.create(user.id, dish);

    });

    it('Should pass when updating the order', async () => {
        const orderStatus = 'preparing';

        const response = await orderService.updateOrder(order.id, orderStatus);

        expect(response.status).toBe(orderStatus);
        expect(response.user_id).toBe(user.id);
 
    });
    
    it('Should pass when updating the order without an id order', async () => {
        const orderStatus = 'preparing';
        const invalidOrderId = undefined;

        try {
            await orderService.updateOrder(invalidOrderId, orderStatus);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({message: 'Order not sent or invalid!'});
        }
    });

    it('Should pass when updating the order with an invalid id order', async () => {
        const orderStatus = 'preparing';
        const invalidIdOrder = -10;

        try {
            await orderService.updateOrder(invalidIdOrder, orderStatus);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({message: 'Order not sent or invalid!'});
        }
    });

    it('Should pass when updating the order with a non-existent id order', async () => {
        const orderStatus = 'preparing';
        const nonExistentOrderId = 100001;

        try {
            await orderService.updateOrder(nonExistentOrderId, orderStatus);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({message: 'Order does not exist in the database!'});
        }
    });
    
    it('Should pass when updating the order without a status order', async () => {
        const orderStatus = undefined;

        try {
            await orderService.updateOrder(order.id, orderStatus);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({message: 'Order status not sent!'});
        }
    });
    
    it('Should pass when updating the order with an invalid order status', async () => {
        const orderStatus = 'done';

        try {
            await orderService.updateOrder(order.id, orderStatus);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({message: 'Order status sent is invalid!'});
        }
    });

});