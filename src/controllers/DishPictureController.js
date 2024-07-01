const DishRepository = require('../repositories/DishRepository');
const DishCreateService = require('../services/DishService');
const diskStorage = require('../providers/DiskStorage')
const AppError = require('../utils/AppError');

class DishPictureController{

    async update(req, res, next){
        try{
            const { dishId } =  req.params;
            const dishPictureFilename = req.file.filename ?? 'standard_image.png';

            const dishRepository = new DishRepository();
            const dishCreateService = new DishCreateService(dishRepository);

            const dish = await dishCreateService.getById(dishId)

            if(!dish)
                throw new AppError('Dish not found!', 404);

            if(dish.picture){
                await diskStorage.deleteFile(dish.picture)
            }

            const filename = await diskStorage.saveFile(dishPictureFilename)
            dish.picture = filename;

            await dishCreateService.update(dishId, dish);

            res.json({message: 'Dish picture updated!'});

        }
        catch (error) {
            console.error(error);
            next(error);
        }
    }
}

module.exports = new DishPictureController();