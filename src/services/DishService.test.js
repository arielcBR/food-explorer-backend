const DishCreateService = require('./DishService');
const DishRepositoryInMemory = require('../repositories/DishRepositoryInMemory');

describe('POST /dishes', () => {
    let dishRepositoryInMemory;
    let dishService;

    beforeEach(() => {
        dishRepositoryInMemory = new DishRepositoryInMemory();
        dishService = new DishCreateService(dishRepositoryInMemory);
    });

    it('Should create a dish and return status code 201', async () => {
        const request = {
            name: "Cheesecake de frutos rojos",
            category: "postre",
            price: 39.99,
            description: "El tradicional postre, cremoso y rico",
            ingredients: ["arandonos", "queso crema", "frutillas"],

        };

        const response = await dishService.create({...request});

        expect(response.statusCode).toBe(201);
    });

    it('Should create a dish and return a dish id', async () => {
        const request = {
            name: "Cheesecake de frutos rojos",
            category: "postre",
            price: 39.99,
            description: "El tradicional postre, cremoso y rico",
            ingredients: ["arandonos", "queso crema", "frutillas"]
        };

        const response = await dishService.create({...request});

        expect(response.body.id).not.toBe('' || undefined);
    });

    it('Should pass when creating a dish without name', async () => {
        const request = {
            name: "",
            category: "postre",
            price: 39.99,
            description: "El tradicional postre, cremoso y rico",
            ingredients: ["arandonos", "queso crema", "frutillas"]
        };

        try {
            await dishService.create({...request});
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({message: 'The name is not valid!'});
        }
    });

    it('Should pass when creating a dish without category', async () => {
        const request = {
            name: "Cheesecake",
            category: "",
            price: 39.99,
            description: "El tradicional postre, cremoso y rico",
            ingredients: ["arandonos", "queso crema", "frutillas"]
        };

        try {
            await dishService.create({...request});
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({ message: 'The category is not valid!'});
        }
    });

    it('Should pass when creating a dish with a negative price', async () => {
        const request = {
            name: "Cheesecake",
            category: "Postre",
            price: -5,
            description: "El tradicional postre, cremoso y rico",
            ingredients: ["arandonos", "queso crema", "frutillas"]
        };

        try {
            await dishService.create({...request});
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({ message: 'The price is not valid!'});
        }
    });

    it('Should pass when creating a dish without a price', async () => {
        const request = {
            name: "Cheesecake",
            category: "Postre",
            description: "El tradicional postre, cremoso y rico",
            ingredients: ["arandonos", "queso crema", "frutillas"]
        };

        try {
            await dishService.create({...request});
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({message: 'The price is not valid!'});
        }

    });

    it('Should pass when creating a dish without description', async () => {
        const request = {
            name: "Cheesecake",
            category: "postre",
            price: 39.99,
            ingredients: ["arandonos", "queso crema", "frutillas"]
        };

        try {
            await dishService.create({...request});
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({message: 'The description is not valid!'});
        }

    });

    it('Should pass when creating a dish without the ingredient list', async () => {
        const request = {
            name: "Cheesecake",
            category: "postre",
            description: "El tradicional postre, cremoso y rico",
            price: 39.99,
            ingredients: []
        };

        try {
            await dishService.create({...request});
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({ message: 'The ingredient list cannot be empty!' });
        }
    });

});

describe('PATCH /dishes', () => {
    let dishRepositoryInMemory;
    let dishService;

    let dish;
    let dishId;

    beforeEach(async () => {
        dishRepositoryInMemory = new DishRepositoryInMemory();
        dishService = new DishCreateService(dishRepositoryInMemory);

        const request = {
            name: "Cheesecake",
            category: "postre",
            price: 39.99,
            description: "El tradicional postre, cremoso y rico",
            ingredients: ["arandonos", "queso crema", "frutillas"]
        };
        const picturePath = 'cheesecake.png';
    
        dish = await dishService.create({...request, picturePath});
        dishId = dish.body.id;

    });

    it('Should pass when updating a dish with a new picture and a new body', async () => {
        const newDishPicture = 'cheesecake-frutos-rojos.png';

        const updateRequest = {
            name: "Cheesecake de frutos rojos",
            category: "postre",
            price: 19.99,
            description: "El tradicional postre, cremoso y rico",
            ingredients: ["arandonos", "queso crema", "frutillas"]
        };

        await dishService.update(dishId, newDishPicture, updateRequest);
        
        const updatedDish = await dishService.getById(dishId);

        expect(updatedDish.name).toBe(updateRequest.name);
        expect(updatedDish.picture).toBe(newDishPicture);
        
    });

    it('Should pass when updating a dish without a new picture and a new body', async () => {
        const updateRequest = {
            name: "Cheesecake de frutos rojos",
            category: "postre",
            price: 14.99,
            description: "El tradicional postre, cremoso y rico",
            ingredients: ["arandonos", "queso crema", "frutillas"]
        };

        await dishService.update(dishId, null, updateRequest);
        
        const updatedDish = await dishService.getById(dishId);

        expect(updatedDish.price).toBe(updateRequest.price);
    });

    it('Should pass when updating a dish with a new picture and no body', async () => {
        const updateRequest = 'new_photo.jpg';

        await dishService.update(dishId, updateRequest, null);
        
        const updatedDish = await dishService.getById(dishId);

        expect(updatedDish.picture).toBe(updateRequest);
    });

    it('Should pass when updating a dish without a new picture and body', async () => {
        await expect(async() => await dishService.update(dishId, null, null))
        .rejects.toMatchObject({message: 'No updates provided. Please provide a new picture and/or updated dish details.'});
        
    });
});

describe('DELETE /dishes', () => {
    let dishRepositoryInMemory;
    let dishService;

    let dish;
    let dishId;

    beforeEach(async () => {
        dishRepositoryInMemory = new DishRepositoryInMemory();
        dishService = new DishCreateService(dishRepositoryInMemory);

        const request = {
            name: "Cheesecake",
            category: "postre",
            price: 39.99,
            description: "El tradicional postre, cremoso y rico",
            ingredients: ["arandonos", "queso crema", "frutillas"]
        };
    
        dish = await dishService.create({...request});
        dishId = dish.body.id;

    });

    it('Should pass when deleting an existing dish', async () => {
        const status = await dishService.delete(dishId);

        expect(status).toBe(true);
    });

    it('Should pass, cannot delete the when a dish invalid is sent', async () => {
        const invalidDishId = 1001;

        try {
            await dishService.delete(invalidDishId);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({message: 'Dish not found!'});
        }
    });
});