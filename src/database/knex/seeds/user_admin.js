const UserRepository = require('../../../repositories/UserRepository');   
const UserCreateService = require('../../../services/UserCreate');

exports.seed = async function(knex) {
  const user = { 
    name: 'admin',
    email: 'admin@live.com', 
    password: 'abcde1!', 
    isAdmin: true
  };

  const userRepository = new UserRepository();
  const userCreateService = new UserCreateService(userRepository);

  await userCreateService.execute(user);

};
