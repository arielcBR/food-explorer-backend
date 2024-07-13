const DishRepository = require('../repositories/DishRepository');
const DishCreateService = require('../services/DishService');
const AppError = require('../utils/AppError');
const diskStorage = require('../providers/DiskStorage')

class DishController{

    async create(req, res, next){
        try {
            const dishRepository = new DishRepository();
            const dishCreateService = new DishCreateService(dishRepository);

            const bodyDish  = JSON.parse(req.body.bodyDish);  
            
            if(!bodyDish)
                throw new AppError('Bad request, try it again!');
            
            if(req.files[0]){
                const dishPictureFilename = req.files[0].filename;  
                const filename = await diskStorage.saveFile(dishPictureFilename);
                bodyDish.picture = filename;
            }
            else{
                bodyDish.picture = 'standard_image.png';
            }

            const dishCreated = await dishCreateService.create({...bodyDish});
            res.status(200).json({dishCreated});
          } 
        catch (error) {
            console.error(error);
            next(error);
        }
    }

    async getById(req, res, next){
        const { dishId } =  req.params;
        try {
            const dishRepository = new DishRepository();
            const dishCreateService = new DishCreateService(dishRepository);
    
            const dish = await dishCreateService.getById(dishId);
            
            if(dish){
                const ingredients = await dishCreateService.getIngredientsByDishId(dish.id);
                dish.ingredients = [...ingredients];
            }
            
            if(!dish) {
                throw new AppError('Dish not found', 404);
            }
              
            res.json({ dish });
        } 
        catch (error) {
            console.error(error);
            next(error);
        }
    }

    async index(req, res, next){
        try{
            const dishRepository = new DishRepository();
            const dishCreateService = new DishCreateService(dishRepository);
    
            const dishes = await dishCreateService.getAll();
    
            res.json({dishes});
        }
        catch (error) {
            console.error(error);
            next(error);
        }
    }

    async update(req, res, next){
        const dishRepository = new DishRepository();
        const dishCreateService = new DishCreateService(dishRepository);

        const { dishId } = req.params;
        const updatedDish  = JSON.parse(req.body.updatedDish);

        if(req.files[0]){
            // Delete currently picture
            const dish = await dishCreateService.getById(dishId)
            if(dish.picture !== "standard_image.png")
                await diskStorage.deleteFile(dish.picture)
            
            // Save new picture 
            const dishPictureFilename = req.files[0].filename;  
            const filename = await diskStorage.saveFile(dishPictureFilename)
            updatedDish.picture = filename;
        }

        const response = await dishCreateService.update(dishId, updatedDish);

        if(response)
            res.json({message: 'Dish updated successfully!'});
        else
            throw new AppError('The update failed!', 500);
 
    }

    async delete(req, res, next){
        try{
            const  { dishId } = req.params;
    
            const dishRepository = new DishRepository();
            const dishCreateService = new DishCreateService(dishRepository);

            await dishCreateService.delete(dishId);
            return res.json({ message: 'Dish successfully deleted!' });
    
        }
        catch (error) {
            console.error(error);
            next(error);
        }

    }

    async search(req, res){
        const {dish} = req.query;

        if(!dish)
            throw new AppError('Bad request, dish not valid!');

        else{
            const dishRepository = new DishRepository();
            const dishCreateService = new DishCreateService(dishRepository);

            const dishes = await dishCreateService.searchDishes(dish);

            if(!dishes.length)
                return res.json({message: 'Nothing found!'})

            return res.json(dishes);
        } 
    }
}

module.exports = new DishController();