# Food Explorer API

🛠 Technologies
The following technologies were used in the creation of this project:

- [Node.js](https://nodejs.org/en/)
- [.ENV](https://www.npmjs.com/package/dotenv)
- [Express](https://www.npmjs.com/package/express)
- [Express-async-errors](https://www.npmjs.com/package/express-async-errors)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [SQLite](https://www.sqlite.org/index.html)
- [Knex](https://knexjs.org/)
- [BCryptjs](https://www.npmjs.com/package/bcryptjs)
- [JSON Web Token](https://www.npmjs.com/package/json-web-token)
- [Multer](https://www.npmjs.com/package/multer)
- [CORS](https://www.npmjs.com/package/cors)
- [Regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [PM2](https://www.npmjs.com/package/pm2)
- [Swagger](https://swagger.io/solutions/api-documentation/)
- [Jest](https://jestjs.io/)


### 🚀 How to Use
Clone the project to your desired location on your computer.

### Clone the Repository

To clone this repository, run the following command in your terminal:


```bash
$ git clone https://github.com/arielcBR/food-explorer-backend.git 
```

Next step:
```bash
$ cd food-explorer-backend
```
🚧 Running the application

### In the application, you must create a file named .env. You can copy the example.env and then rename it to .env. After that, you must fill in the fields according the instructions below:
```bash
  PORT=
  SQLITE_FILENAME=
  AUTH_SECRET=
```

### Install the required dependencies:
```bash
$ npm install
```

### Run the migrations using the command:
```bash
$ npm run migrations
```

### Run the seeds using the command:
```bash
$ npm run seeds
```

### Now start the backend server:
```bash
$ npm run dev
```

### The documentation for existing endpoints and their respective methods will be available at http://localhost:PORT/api-docs.
```bash
http://localhost:PORT/api-docs
```

### Unit tests can be executed using the command.:
```bash
$ npm test
```

### This API was hosted directly on Render.

#### Note: As it is hosted on a free service, the application 'hibernates' after 15 minutes of inactivity. 
#### If you are trying to access the site and the BackEnd does not respond, just wait, as it will be 'initializing' the services.

