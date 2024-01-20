const knex = require("../database/knex");

class UserRepository{
    async create({name, email, password, isAdmin}){
        const userId = await knex('users').insert({name, email, password, isAdmin});
        return userId;
    }

    async findByEmail(email){
        const user = await knex('users').where({email}).first();
        return !user  ? false : user;
    }

    async findById(id){
        const user = await knex('users').where({id}).first();
        return !user  ? false : user;
    }

    async getFavorite(user_id, dish_id){
        const [isDishFavorite] = 
            await knex('user_favorite_dishes').where({
                user_id,
                dish_id
            });
        
        if(!isDishFavorite)
            return false;
        return isDishFavorite;
    }

    async setFavorite(user_id, dish_id){
        const favoriteDish = await knex('user_favorite_dishes').insert({user_id, dish_id});
        
        if(!favoriteDish)
            return false;
        
        return favoriteDish;
    }

    async resetFavorite(user_id, dish_id){
        await knex('user_favorite_dishes').delete().where({user_id, dish_id});
        return;
    }

    async indexFavoriteDishesByUser(user_id){
        const userFavoriteDishes = await knex('user_favorite_dishes')
        .where({ user_id })
        .select('dish_id');

        if (userFavoriteDishes.length === 0) {
            return [];
        }

        const dishIds = userFavoriteDishes.map(item => item.dish_id);

        const dishes = await knex('dishes')
        .whereIn('id', dishIds);

        return dishes;
    }

}

module.exports = UserRepository;