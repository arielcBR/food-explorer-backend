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

    it('Should pass when updating the favorited status as true (the dish does not exist yet)', async () => {
        const favorite = true;

        const response = await favoriteService.setFavoriteStatus(user.id, dish.id, favorite);
        expect(response).toBe('The dish has been favorited!');
    });

    it('Should pass when updating the favorited status as false (the dish does not exist yet)', async () => {
        const favorite = false;

        const response = await favoriteService.setFavoriteStatus(user.id, dish.id, favorite);
        expect(response).toBe('Anything has changed!');
    });

    it('Should pass when updating the favorited status as false (the dish was already favorited)', async () => {
        let favorite = true;
        await favoriteService.setFavoriteStatus(user.id, dish.id, favorite);
        favorite = false;

        const response = await favoriteService.setFavoriteStatus(user.id, dish.id, favorite);
        expect(response).toBe('The dish has been unfavorited!');
    });

    it('Should pass when updating the favorited status as true (the dish was already favorited)', async () => {
        let favorite = true;
        await favoriteService.setFavoriteStatus(user.id, dish.id, favorite);

        const response = await favoriteService.setFavoriteStatus(user.id, dish.id, favorite);
        expect(response).toBe('Anything has changed!');
    });

    it('Should pass when updating without an id user', async () => {
        const favorite = true;

        try {
            await favoriteService.setFavoriteStatus(undefined, dish.id, favorite);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({message: 'User not sent!'});
        }
    });

    it('Should pass when updating with an invalid id user', async () => {
        const favorite = true;

        try {
            await favoriteService.setFavoriteStatus(100002, dish.id, favorite);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({message: 'User not found!'});
        }
    });

    it('Should pass when updating with an invalid id dish', async () => {
        const favorite = true;

        try {
            await favoriteService.setFavoriteStatus(user.id, 100002, favorite);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({message: 'Dish not found!'});
        }
    });

});