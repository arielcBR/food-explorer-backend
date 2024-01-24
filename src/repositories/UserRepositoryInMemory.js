
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

    async getFavorite(user_id, dish_id){
        const isDishFavorite = this.user_favorite_dishes.find(item => item.user_id === user_id && item.dish_id === dish_id);

        if (!isDishFavorite)
            return false;
        return isDishFavorite;
    }

    async setFavorite(user_id, dish_id) {
        const newFavoriteDish = { 
            id: Math.floor(Math.random() * 1000) + 1,
            user_id, 
            dish_id, 
            created_at: new Date(), 
            updated_at: new Date() 
        };
    
        this.user_favorite_dishes.push(newFavoriteDish);
    
        return newFavoriteDish;
    }
}

module.exports = UserRepositoryInMemory;