const knex = require("../database/knex");

class UserRepository{
    async create({name, email, password, isAdmin}){
        try {
            const userId = await knex('users').insert({name, email, password, isAdmin});
            return userId;
        } catch (error) {
            console.log(error)            
        }
    }

    async findByEmail(email){
        try {
            const user = await knex('users').where({email}).first();
            return !user  ? false : user;
        } catch (error) {
            console.log(error)
        }
    }

    async findById(id){
        try {
            const user = await knex('users').where({id}).first();
            return !user  ? false : user;
        } catch (error) {
            console.log(error)            
        }
    }

    async getFavorite(user_id, dish_id){
        try {
            const [isDishFavorite] = await knex('user_favorite_dishes').where({ user_id, dish_id });
        
            if(isDishFavorite)
                return isDishFavorite;
            
            return false;
        } catch (error) {
            console.log(error);
        }
    }

    async addFavorite(user_id, dish_id){
        try {
            await knex('user_favorite_dishes').insert({user_id, dish_id});
            return;
        } catch (error) {
            console.log(error);     
        }
    }

    async deleteFavorite(user_id, dish_id){
        try {
            await knex('user_favorite_dishes').delete().where({user_id, dish_id});
            return true;
        } catch (error) {
            console.log(error);
        }
    }

    async indexFavoriteDishesByUser(user_id){
        try {
            const userFavoriteDishes = await knex('user_favorite_dishes')
            .where({ user_id })
            .select('dish_id');

            if (userFavoriteDishes.length === 0)
                return [];

            return userFavoriteDishes;
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = UserRepository;