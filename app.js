const express = require('express');
// Definimos variable que gestionará las peticiones http
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    // req es la request, la petición
    // res es la response, la respuesta
    // console.log(req);
    res.status(200).send('Hello World!');

});

app.post('/team/pokemons', (req, res) => {
    res.status(200).send('Hello World!');
});

app.get('/team', (req, res) => {
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
