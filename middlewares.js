const authMiddleware = require('./tools/auth-middleware');
const bodyParser = require('body-parser');

const setupMiddlewares = (app) => {
    // Usamos 'bodyParser.json()' que es un plugin de express, que nos permite leer los datos de las peticiones a nuestro servidor de forma correcta transformando el texto plano original a formato json, p.e. para hacer esto: req.body.user
    app.use(bodyParser.json());
    authMiddleware.init();
    app.use(authMiddleware.protectWithJwt);
}

exports.setupMiddlewares = setupMiddlewares;