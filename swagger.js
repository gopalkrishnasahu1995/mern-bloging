const options = {
    openapi: null,          // By default is null
    language: 'en-US',         // By default is 'en-US'
    disableLogs: false,     // By default is false
    disableWarnings: false // By default is false
}
const swaggerAutogen = require('swagger-autogen')(options);

const doc = {
    info: {
        version: '1.0.0',      // by default: '1.0.0'
        title: 'KSoft Blogging API',
        description: 'API for Building KSoft Blog Website created by <b>{developers}</b> Ashok and Gopal using nodejs and expressjs',  // by default: ''
    },
    host: 'localhost:8000',
    basePath: "/",
    schemes: ['http', 'https'],   // by default: ['http']
    consumes: ['application/json'],  // by default: ['application/json']
    produces: ['application/json'],  // by default: ['application/json']
    tags: [        // by default: empty Array
        {
            name: 'Auth',         // Tag name
            description: 'Auth EndPoints',  // Tag description
        },
    ],
    securityDefinitions: {
        Authorization: {
            type: 'apiKey',
            name: 'Authorization',
            description: 'Value: Bearer ',
            in:'header',
            scheme:'bearer'
        }
    },  // by default: empty object (Swagger 2.0)
    definitions: {
        //models with required fields
        RegisterModel:{
            $name:"Ashok Sahu",
            $account:"kanhasahu955902@gmail.com",
            $password:'kanhasahu#1111'
        }
    },          // by default: empty object
    components: {}            // by default: empty object (OpenAPI 3.x)
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server/routers/routes.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc).then(()=>require('./server'))