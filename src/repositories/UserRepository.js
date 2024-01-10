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
}

module.exports = UserRepository;