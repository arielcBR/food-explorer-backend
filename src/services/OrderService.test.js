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

    it('Should pass, create an order an return the id', async () => {
        const userId = user.id;
        const dishes = [{id: dish1.id, quantity: 5}, {id: dish2.id, quantity: 3}];

        const orderCreated = await orderService.create(userId, dishes);
        
        expect(orderCreated.id).not.toBeNull();
        expect(orderCreated.user_id).toBe(user.id);
    });

    it('Should pass, cannot create an order without a user', async () => {
        const dishes = [{ id: dish1.id, quantity: 5 }, { id: dish2.id, quantity: 3 }];
    
        try {
            await orderService.create(undefined, dishes);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({ message: 'User not sent!' });
        }
    });

    it('Should pass, cannot create an order without a dish', async () => {
        const userId = user.id;
    
        try {
            await orderService.create(userId, undefined);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({ message: 'Dishes not sent!' });
        }
    });

    it('Should pass, cannot create an order with a invalid user', async () => {
        const userId = 10000;
        const dishes = [{id: dish1.id, quantity: 5}, {id: dish2.id, quantity: 3}];
        
        try {
            await orderService.create(userId, dishes);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({ message: 'User not found!' });
        }
    });

    it('Should pass, cannot create an order with a invalid user', async () => {
        const userId = user.id;
        const dishes = [{id: dish1.id, quantity: 5}, {id: -100, quantity: 3}];
        
        try {
            await orderService.create(userId, dishes);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({ message: 'Dish not found!' });
        }
    });
    
});

describe('PATCH /orders', () => {

    // 
    it('should ', async () => {
        
    });
});