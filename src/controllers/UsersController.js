const DishRepository = require('../repositories/DishRepository'); 
const UserRepository = require('../repositories/UserRepository');   
const UserCreateService = require('../services/UserService');
const FavoriteCreateService = require('../services/FavoriteService');

class UsersController{
    async create(req, res){
        const { name, email, password, isAdmin } = req.body;
        const userRepository = new UserRepository();
        const userCreateService = new UserCreateService(userRepository);

        await userCreateService.create({name, email, password, isAdmin});
        
        return res.status(201).json({message: 'User created successfully'});
    }

    async toggleFavorite(req, res){
        const { userId, dishId } = req.body;

        const dishRepository = new DishRepository();
        const userRepository = new UserRepository();
        const favoriteService = new FavoriteCreateService(userRepository, dishRepository);

        try {
            await favoriteService.setFavoriteStatus(userId, dishId);
            res.json({});
        } catch (error) {
            console.error(error);
            return res.status(400).json({message: 'It was not possible to favorite the dish!'});
        }
    }

    async favoriteDishesByUser(req, res){
        const { userId } = req.params;

        const userRepository = new UserRepository();
        const favoriteCreateService = new FavoriteCreateService(userRepository);

        try {
            const dishes = await favoriteCreateService.indexByUser(userId);

            if(!dishes.length)
                return res.json([]);

            return res.json(dishes);
        } catch (error) {
            console.error(error);
            return res.status(400).json({message: 'It is not possible to show it now'});
        }
    }

}

module.exports = new UsersController();