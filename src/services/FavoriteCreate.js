class FavoriteCreate{
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute(userId, dishId, favorite){
        const favoriteDish = await this.userRepository.getFavorite(userId, dishId);

        if(!favoriteDish){
            if(!favorite)
                return;
            
            await this.userRepository.setFavorite(userId, dishId);
            return true;
        }

        else{
            if(favorite)
                return;

            await this.userRepository.resetFavorite(userId, dishId);
            return true;
        }

    }

    async indexByUser(userId){
        const dishes = this.userRepository.indexFavoriteDishesByUser(userId);
        return dishes;
    }
}

module.exports = FavoriteCreate;