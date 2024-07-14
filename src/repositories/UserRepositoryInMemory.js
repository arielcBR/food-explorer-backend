
class UserRepositoryInMemory{
    users = [];
    user_favorite_dishes = [];

    async create({name, email, password, isAdmin}){
        let response;
        
        const user = {
            id: Math.floor(Math.random() * 1000) + 1,
            name,
            email,
            password,
            isAdmin
        }

        this.users.push(user);

        response = {
            statusCode: 201,
            body: {
                ...user
            }
        }

        return response;
    }

    async findByEmail(email){
        return this.users.find(user => user.email === email);
    }

    async findById(id) {
        return this.users.find(user => user.id == id) || false;
    }

    async resetFavorite(user_id, dish_id) {
        this.user_favorite_dishes = this.user_favorite_dishes
            .filter(item => !(item.user_id == user_id && item.dish_id == dish_id));
    
        return this.user_favorite_dishes;
    }

    async addFavorite(user_id, dish_id) {
        const newFavoriteDish = {
            id: Math.floor(Math.random() * 1000) + 1,
            userId: user_id,
            dishId: dish_id
        };

        this.user_favorite_dishes.push(newFavoriteDish);

        return newFavoriteDish.id;
    }

    async deleteFavorite(user_id, dish_id) {
        const initialLength = this.user_favorite_dishes.length;
    
        this.user_favorite_dishes = this.user_favorite_dishes.filter(item => !(item.userId === user_id && item.dishId === dish_id));
    
        if (this.user_favorite_dishes.length < initialLength) {
            return true; 
        } else {
            return false;
        }
    }
    

    async getFavorite(user_id, dish_id) {
        const favoriteDish = this.user_favorite_dishes.find(item => item.userId === user_id && item.dishId === dish_id);
        return favoriteDish || false;
    }
    
    
}

module.exports = UserRepositoryInMemory;