const DishRepository = require('../repositories/DishRepository');
const DishCreateService = require('../services/DishCreate');

class AdminController{

    async createDish(req, res){
        try {
            const dish  = JSON.parse(req.body.bodyDish);
            const dishPicture = req.files;
            let picturePath;

            !dishPicture.length ? picturePath = 'Standard image' : picturePath = dishPicture[0].path;

            const dishRepository = new DishRepository();
            const dishCreateService = new DishCreateService(dishRepository);

            const dishCreated = await dishCreateService.execute({...dish, picturePath});

            res.json({dishCreated});
          } 
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
        
    }

    async getDish(req, res){
        res.json({})
    }

    async updateDish(req, res){
        res.json({})
    }

    async deleteDish(req, res){
        res.json({})
    }
}

module.exports = new AdminController();