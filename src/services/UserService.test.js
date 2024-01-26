const UserService = require('./UserService');
const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory');

describe('POST /users', () => {
    const user = {
        name: "user test",
        email: "user@test.com",
        password: "abcde1!"
    };

    let userRepositoryInMemory;
    let userService;

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        userService = new UserService(userRepositoryInMemory);
    });
    
    it('Should respond with a 201 status code', async () => {

        const response = await userService.create(user);

        expect(response.statusCode).toBe(201);
    });

    it('Should respond with an id user', async () =>{
        const response = await userService.create(user);
        
        expect(response.body.id).not.toBe('');
    });

    it('Should pass without name', async () =>{
        const userWithoutName = {
            name: '',
            email: "user@test.com",
            password: "abcde1!"
        }

        await expect(async () => await userService.create(userWithoutName))
        

    });

    it('Should pass with a name shorter than 2 characters', async () => {
        const user = {
            name: 'U',
            email: 'user@test.com',
            password: 'abcdef1!'
        };

        try {
            await userService.create(user);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({ message: 'The name is not valid, try it again!' });
        }

    });

    it('Should pass without email', async () =>{
        const userWithoutEmail = {
            name: "user test",
            email: '',
            password: "abcde1!"
        }

        try {
            await userService.create(userWithoutEmail);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({ message: 'The email is not valid, try it again!' });
        }

    });

    it('Should pass without a valid email', async () => {
        const user = {
            name: 'User test',
            email: 'user@com',
            password: 'abcde1!'
        };

        try {
            await userService.create(user);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({ message: 'The email is not valid, try it again!' });
        }

    });
  
    it('Should pass without password', async () => {
        const userWithoutPassword = {
            name: 'User test',
            email: 'user@test.com',
            password: ''
        };

        try {
            await userService.create(userWithoutPassword);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({ message: 'The password does not fit the pattern, try another one!' });
        }

    });

    it('Should pass without a special character within the password', async () => {
        const user = {
            name: 'User test',
            email: 'user@test.com',
            password: 'abcdef1'
        };

        try {
            await userService.create(user);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({ message: 'The password does not fit the pattern, try another one!' });
        }

    });

    it('Should not pass without a number character within the password', async () => {
        const user = {
            name: 'User test',
            email: 'user@test.com',
            password: 'abcdef!'
        };

        try {
            await userService.create(user);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({ message: 'The password does not fit the pattern, try another one!' });
        }
    });

    it('Should pass without a letter character within the password', async () => {
        const user = {
            name: 'User test',
            email: 'user@test.com',
            password: '12345!'
        };

        try {
            await userService.create(user);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({ message: 'The password does not fit the pattern, try another one!' });

        }
    });

    it('Should pass when the password has less than 6 characters', async () => {
        const user = {
            name: 'User test',
            email: 'user@test.com',
            password: 'abc1!'
        };

        try {
            await userService.create(user);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({ message: 'The password does not fit the pattern, try another one!' });

        }
    });

    it('Should allow user with duplicated email ', async () => {
        let response;
        
        const user = {
            name: 'User test',
            email: 'user@test.com',
            password: 'abcde1!'
        };

        const user2 = {
            name: 'User test 2',
            email: 'user@test.com',
            password: 'newpassword1!'
        };

        response = await userService.create(user);

        try {
            await userService.create(user2);
            fail('Expected the promise to be rejected.');
        } catch (error) {
            expect(error).toMatchObject({ message: 'The user is already registered!' });
        }
    });
        
});

