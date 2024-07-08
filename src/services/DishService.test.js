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

    it('Should create a dish and return an id dish', async () => {
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

    it('Should pass when creating a dish without any ingredient', async () => {
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

    it('Should pass when updating a dish with a new picture', async () => {
        const updateRequest = {
            name: "Cheesecake de frutos rojos",
            category: "postre",
            price: 19.99,
            description: "El tradicional postre, cremoso y rico",
            ingredients: ["arandonos", "queso crema", "frutillas"],
            picture: 'cheesecake-frutos-rojos.png'
        };

        await dishService.update(dishId, updateRequest);
        
        const updatedDish = await dishService.getById(dishId);

        expect(updatedDish.picture).toBe(updateRequest.picture);
    });

    it('Should pass when updating a dish without a new picture and a new body', async () => {
        const updateRequest = {
            name: "Cheesecake de frutos rojos",
            category: "postre",
            price: 14.99,
            description: "El tradicional postre, cremoso y rico",
            ingredients: ["arandonos", "queso crema", "frutillas"]
        };

        await dishService.update(dishId, updateRequest);
        
        const updatedDish = await dishService.getById(dishId);

        expect(updatedDish.price).toBe(updateRequest.price);
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

    it('Should pass when trying to delete an invalid dish', async () => {
        const invalidDishId = 1001;

        try {
            await dishService.delete(invalidDishId);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({message: 'Dish not found!'});
        }
    });
});