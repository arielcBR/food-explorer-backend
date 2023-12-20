const knex = require("../database/knex");

class UserRepository{
    async create({name, email, password}){
        const userId = await knex('users').insert({name, email, password});
        return userId;
    }

    async findByEmail(email){
        const user = await knex('users').where({email}).first();
        return !user  ? false : user;
    }
}

module.exports = UserRepository;