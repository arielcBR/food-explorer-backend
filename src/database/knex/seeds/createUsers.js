const UserRepository = require('../../../repositories/UserRepository');   
const UserCreateService = require('../../../services/UserCreate');

exports.seed = async function(knex) {
  const userAdmin = { 
    name: 'admin',
    email: 'admin@live.com', 
    password: 'abcde1!', 
    isAdmin: true
  };

  const userDefault = { 
    name: 'ariel',
    email: 'ariel@live.com', 
    password: 'abcde1!',
    isAdmin: false
  };

  const userRepository = new UserRepository();
  const userCreateService = new UserCreateService(userRepository);

  await userCreateService.execute(userAdmin);
  await userCreateService.execute(userDefault);

};
