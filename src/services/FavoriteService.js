const AppError = require('../utils/AppError');

class FavoriteService{
    constructor(userRepository, dishRepository){
        this.userRepository = userRepository;
        this.dishRepository = dishRepository;
    }

    async setFavoriteStatus(userId, dishId){
        if(!userId)
            throw new AppError('User not sent!');
        
        if(!dishId)
            throw new AppError('Dish not sent!');

        const isUserValid = await this.userRepository.findById(userId);
        
        if(!isUserValid)
            throw new AppError('User not found!');
        
        const isDishValid = await this.dishRepository.getDishById(dishId);
        
        if(!isDishValid)
            throw new AppError('Dish not found!');
    
        const isFavoriteDish = await this.userRepository.getFavorite(userId, dishId);

        if (!isFavoriteDish) {
            const id = await this.userRepository.addFavorite(userId, dishId);
            return id;
        } 
        else {
            const status = await this.userRepository.deleteFavorite(userId, dishId);
            console.log('status: ', status)
            return status ?? false;
        }
    }

    async indexByUser(userId){
        const dishes = this.userRepository.indexFavoriteDishesByUser(userId);
        return dishes;
    }
}

module.exports = FavoriteService;