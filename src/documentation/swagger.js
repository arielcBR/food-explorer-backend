const SwaggerUI = require('swagger-ui-express');
const SwaggerJSDoc = require('swagger-jsdoc');
const swaggerDocument = require('./swagger.json'); // caminho para o arquivo com a especificação Swagger

const PORT = process.env.PORT || 3000;

//Metadata info about API
const options = {
    definition: {
        openapi: '3.0.0',
        // servers: [
        //     {
        //         url: `http://localhost:${PORT}/api-docs`
        //     }
        // ],
        info: { 
            title: 'Food explorer API',
            version: '1.0.0',
            description: 'This is a simple book API application made with Express and documented with Swagger to help out during the process of development',
            contact: {
                name: 'Ariel',
                url: 'https://github.com/arielcBR/food-explorer-backend',
                email: 'ariel.campos94@yahoo.com'
            }
        }
    },
    apis: ['../routes/*.js'] 
};

// Atualiza dinamicamente a URL do servidor no documento Swagger
if (swaggerDocument.servers && Array.isArray(swaggerDocument.servers)) {
    swaggerDocument.servers.forEach(server => {
        server.url = `http://localhost:${PORT}/api-docs`
    });
}

// Docs in JSON format
const swaggerSpec = SwaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app) => {
    app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));

    app.get('/api-docs.json', (req, res) =>{
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`Version 1 docs are available at http://localhost:${PORT}/api-docs`);
};

module.exports = { swaggerDocs };