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
    
        it('Should pass without a user', async () => {
            const dishes = [{ id: dish1.id, quantity: 5 }, { id: dish2.id, quantity: 3 }];
        
            try {
                await orderService.create(undefined, dishes);
                fail('Expected the promise to be rejected.');
            } catch (error) {
                expect(error).toMatchObject({ message: 'User not sent!' });
            }
        });

        // it('Should pass without a dish', async () => {
        //     const userId = user.id;
        
        //     try {
        //         await orderService.create(undefined, dishes);
        //         fail('Expected the promise to be rejected.');
        //     } catch (error) {
        //         expect(error).toMatchObject({ message: 'dishes not sent!' });
        //     }
        // });

        // should pass without a favorite state
        // should pass if the user not exists
        // should pass if the dish not exists
        // validate if favorite is a boolean
        // validate message after favorite the dish
        // should pass with a nonexistent user
        // should pass with a nonexistent dish
        // should pass with a non boolean favorite 
    });