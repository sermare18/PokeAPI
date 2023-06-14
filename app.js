const express = require('express');
const bodyParser = require('body-parser');

// Routes
const authRoutes = require('./auth/auth.router').router;
const teamsRoutes = require('./teams/teams.router').router;

// Definimos variable que gestionará las peticiones http
const app = express();
// Usamos 'bodyParser.json()' que es un plugin de express, que nos permite leer los datos de las peticiones a nuestro servidor de forma correcta transformando el texto plano original a formato json, p.e. para hacer esto: req.body.user
app.use(bodyParser.json())

const port = 3000;

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
