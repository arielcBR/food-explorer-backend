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

    async getById(req, res){
        const { dishId } =  req.params;
        try {
            const dishRepository = new DishRepository();
            const dishCreateService = new DishCreateService(dishRepository);
    
            const dish = await dishCreateService.getById(dishId);
            
            if(!dish) {
                return res.status(404).json({ message: 'Dish not found' });
            }
              
            res.json({ dish });
        } 
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async index(req, res){
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
            const { bodyDish } = req.body;

            const dishRepository = new DishRepository();
            const dishCreateService = new DishCreateService(dishRepository);

            let status;
            
            if (dishPicture && bodyDish) {
                const patch = JSON.parse(bodyDish);
                status = await dishCreateService.update(dishId, dishPicture, patch);
            }

            else if (!dishPicture && bodyDish) {
                const patch = JSON.parse(bodyDish);
                status = await dishCreateService.update(dishId, null, patch);
            }

            else if (dishPicture && !bodyDish) {
                status = await dishCreateService.update(dishId, dishPicture, {});
            }

            else 
                status = false;

            if(!status){
                return res.status(400).json({message: 'The update could not be done!'});
            }

            res.json({message: 'Dish updated!'});

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

            if (status)
                return res.json({ message: 'Dish successfully deleted!' });
                
            res.json({ message: 'Dish could not be deleted!' });
    
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }

    }

    async search(req, res){
        const {dish} = req.query;

        if(dish == undefined)
            return res.json({});

        else{
            try {
                const dishRepository = new DishRepository();
                const dishCreateService = new DishCreateService(dishRepository);

                const dishes = await dishCreateService.searchDishes(dish);

                if(!dishes)
                    return res.json({message: 'Nothing found'})
    
                return res.json({dishes : dishes});
            } 
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }
}

module.exports = new AdminController();