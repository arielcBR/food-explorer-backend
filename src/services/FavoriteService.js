const AppError = require('../utils/AppError');

class FavoriteService{
    constructor(userRepository, dishRepository){
        this.userRepository = userRepository;
        this.dishRepository = dishRepository;
    }

    async setFavoriteStatus(userId, dishId, favoriteStatus){
        if(!userId)
            throw new AppError('User not sent!');
        
        if(!dishId)
            throw new AppError('Dish not sent!');
    
        if(favoriteStatus === undefined)
            throw new AppError('Favorite status not sent!');

        const isUserValid = await this.userRepository.findById(userId);
        
        if(!isUserValid)
            throw new AppError('User not found!');
        
        const isDishValid = await this.dishRepository.getDishById(dishId);
        
        if(!isDishValid)
            throw new AppError('Dish not found!');
        
        const favoriteDish = await this.userRepository.getFavorite(userId, dishId);

        if (!favoriteDish) {
            if (!favoriteStatus) 
                return 'Anything has changed!';

            await this.userRepository.setFavorite(userId, dishId);
            return 'The dish has been favorited!';
        } 
        else {
            if (favoriteStatus) 
                return 'Anything has changed!';

            await this.userRepository.resetFavorite(userId, dishId);
            return 'The dish has been unfavorited!';
        }
        

    }

    async indexByUser(userId){
        const dishes = this.userRepository.indexFavoriteDishesByUser(userId);
        return dishes;
    }
}

module.exports = FavoriteService;