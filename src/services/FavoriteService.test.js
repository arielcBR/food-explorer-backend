const UserRepository = require('../repositories/UserRepositoryInMemory');
const FavoriteCreateService = require('../services/FavoriteService');

describe('POST /favorites', () => {
    let userRepository;
    let favoriteCreateService;

    beforeEach(() => {
        userRepository = new UserRepository();
        favoriteCreateService = new FavoriteCreateService(userRepository);
    });

    it('Should pass returning an id', async () => {

    });

    // it('Should not pass without a user ', async () => {
    //     const request = {
	//         dishId: 1,
	//         favorite: true
    //     };

    //     // userId, dishId, favorite

    //     expect(async () => await favoriteCreateService.execute(request))
    //     .rejects.toMatchObject({ message: 'It was not possible to favorite the dish!' });

    // });

    // should not pass without a dish
    // should not pass without a favorite state
    // should not pass if the user not exists
    // should not pass if the dish not exists
    // validate if favorite is a boolean
    // validate message after favorite the dish
    // should not pass with a nonexistent user
    // should not pass with a nonexistent dish
    // should not pass with a non boolean favorite 
});