const knex = require("../../knex");

const DishRepository = require('../../../repositories/DishRepository');
const OrderRepository = require('../../../repositories/OrderRepository')
const UserRepository = require('../../../repositories/UserRepository');
const OrderCreateService = require('../../../services/OrderService')


exports.seed = async function(knex) {
  const [user] = await knex('users').where({id: 1});
  const dishes = await knex('dishes');

  const dishRepository = new DishRepository();
  const userRepository = new UserRepository();
  const orderRepository = new OrderRepository();

  const orderService = new OrderCreateService(orderRepository, userRepository, dishRepository);
  
  // creating the first order
  await orderService.create(user.id, [
    {"id": dishes[0].id, "quantity": 5},
    {"id": dishes[2].id, "quantity": 2}
  ]);

  // creating the first order
  await orderService.create(user.id, [
    {"id": dishes[3].id, "quantity": 8},
    {"id": dishes[4].id, "quantity": 6}
  ]);

  // creating the third order
  await orderService.create(user.id, [
    {"id": dishes[1].id, "quantity": 3},
    {"id": dishes[0].id, "quantity": 4}
  ]);

};
