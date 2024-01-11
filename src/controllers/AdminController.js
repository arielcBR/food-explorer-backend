const DishRepository = require('../repositories/DishRepository');
const DishCreateService = require('../services/DishCreate');

class AdminController{

    async create(req, res){
        try {
            const dish  = JSON.parse(req.body.bodyDish);
            const dishPicture = req.files;
            let picturePath;

            !dishPicture.length ? picturePath = 'Standard image' : picturePath = dishPicture[0].path;

            const dishRepository = new DishRepository();
            const dishCreateService = new DishCreateService(dishRepository);

            const dishCreated = await dishCreateService.create({...dish, picturePath});

            res.json({dishCreated});
          } 
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
        
    }

    async get(req, res){
        try {
            const { dishId } =  req.params;

            const dishRepository = new DishRepository();
            const dishCreateService = new DishCreateService(dishRepository);
    
            const dish = await dishCreateService.get(dishId);
            
            if(!dish){
              res.status(404).json({message: 'Dish not found'});
            }
    
            res.json({dish});
        } 
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getAll(req, res){
        try{
            const dishRepository = new DishRepository();
            const dishCreateService = new DishCreateService(dishRepository);
    
            const dishes = await dishCreateService.getAll();
    
            res.json({dishes});
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async update(req, res){
        try{
            const { dishId } =  req.params;
            const [ dishPicture ] = req.files;
            const dish  = JSON.parse(req.body.bodyDish);

            let picturePath = dishPicture.path;

            console.log('dish id: ', dishId);
            console.log(dishPicture.path);


            res.json({})
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async delete(req, res){
        try{
            const  { dishId } = req.params;
    
            const dishRepository = new DishRepository();
            const dishCreateService = new DishCreateService(dishRepository);

            const status = await dishCreateService.delete(dishId);

            status 
                ? res.json({message: 'Dish successfully deleted!'})
                : res.json({message: 'Dish could not be deleted!'});
    
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }

    }
}

module.exports = new AdminController();