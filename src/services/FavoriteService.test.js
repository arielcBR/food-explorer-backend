const UserCreateService = require('./UserService');
const DishCreateService = require('./DishService');
const FavoriteCreateService = require('./FavoriteService')
const DishRepositoryInMemory = require('../repositories/DishRepositoryInMemory');
const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory');

describe('POST /favorite', () => {
    let dishService;
    let userService;
    let favoriteService;
    let dishRepositoryInMemory;
    let userRepositoryInMemory;

    let user;
    let dish;

    beforeEach(async () => {
        dishRepositoryInMemory = new DishRepositoryInMemory();
        dishService = new DishCreateService(dishRepositoryInMemory);
        
        userRepositoryInMemory = new UserRepositoryInMemory();
        userService = new UserCreateService(userRepositoryInMemory);

        favoriteService = new FavoriteCreateService(userRepositoryInMemory, dishRepositoryInMemory);

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

        dish = dishBody.body;
    });

    it('Should pass when updating without an id user', async () => {
        try {
            await favoriteService.setFavoriteStatus(undefined, dish.id);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({message: 'User not sent!'});
        }
    });

    it('Should pass when updating with an invalid id user', async () => {
        try {
            await favoriteService.setFavoriteStatus(100002, dish.id);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({message: 'User not found!'});
        }
    });

    it('Should pass when updating with an invalid id dish', async () => {
        try {
            await favoriteService.setFavoriteStatus(user.id, 100002);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({message: 'Dish not found!'});
        }
    });

    it('Should pass when setting a dish as favorite', async () => {
        const id = await favoriteService.setFavoriteStatus(user.id, dish.id);
        expect(id).toEqual(expect.any(Number));
    });

    it('Should pass when removing a dish from the favorite list', async () => {
        // Set the dish as favorite
        await favoriteService.setFavoriteStatus(user.id, dish.id);
    
        // Remove the dish from the favorite list
        const result = await favoriteService.setFavoriteStatus(user.id, dish.id);
    
        expect(result).toBe(true);
    })
    

});