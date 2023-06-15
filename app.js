const express = require('express');
const middlewares = require('./middlewares');
require('./database');
// Routes
const authRoutes = require('./auth/auth.router').router;
const teamsRoutes = require('./teams/teams.router').router;

// Definimos variable que gestionará las peticiones http
const app = express();
const port = 3000;

// Establecemos desde aquí todos los middlewares de todas las rutas, para no repetir código en los archivos .router.js
middlewares.setupMiddlewares(app);

app.get('/', (req, res) => {
    // req es la request, la petición
    // res es la response, la respuesta
    // console.log(req);
    res.status(200).send('Hello World!');

});

app.use('/auth', authRoutes);
app.use('/teams', teamsRoutes);

// Empezamos a escuchar conexiones a nuestra API
app.listen(port, (req, res) => {
    console.log('Server started at port 3000');
});

// Exportamos la varibale app, para que pueda ser utilizada por cualquier otro módulo externo (p.e, las plataformas de testing)
exports.app = app;
