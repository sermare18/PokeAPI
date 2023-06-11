const express = require('express');
const passport = require('passport');

// Esta línea de código importa el módulo llamado auth y lo ejecuta pasándole el objeto passport como argumento.
require('./auth')(passport);

// Definimos variable que gestionará las peticiones http
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    // req es la request, la petición
    // res es la response, la respuesta
    // console.log(req);
    res.status(200).send('Hello World!');

});

app.post('/login', (req, res) => {
    // Comprobamos credenciales
    // Si no son válidas, error
    // Si son válidas, generamos un JWT y lo devolvemos
    res.status(200).json(
        {
            // Token de prueba que contiene la clave secreta: secretPassword, un header con: ALGORITHM & TOKEN TYPE y un PAYLOAD:DATA con: el nombre del usuario
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.zX5MPQtbjoNAS7rpsx_hI7gqGIlXOQq758dIqyBVxxY'
        }
    );
});

app.post('/team/pokemons', (req, res) => {
    res.status(200).send('Hello World!');
});

// passport.authenticate es un middleware predefinido de passport
// Podemos pasar tantos middlewares como queramos para cada ruta
app.get('/team', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.status(200).send('Hello World!');
});

app.delete('/team/pokemons/:pokeid', (req, res) => {
    res.status(200).send('Hello World!');
});

app.put('/team', (req, res) => {
    res.status(200).send('Hello World!');
});

// Empezamos a escuchar conexiones a nuestra API
app.listen(port, (req, res) => {
    console.log('Server started at port 3000');
});

// Exportamos la varibale app, para que pueda ser utilizada por cualquier otro módulo externo (p.e, las plataformas de testing)
exports.app = app;
