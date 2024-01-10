const AppError = require('../utils/AppError');
const UserRepository = require('../repositories/UserRepository');

async function ensureIsAdmin(req, res, next){
    const { id } = req.user;

    const userRepository = new UserRepository();

    const user = await userRepository.findById(id);
    
    if(!user.isAdmin)
        throw new AppError('The user does not have permission', 401);
    
    
    return next();
}


module.exports = ensureIsAdmin;