const express = require('express');
// Definimos variable que gestionará las peticiones http
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    // req es la request, la petición
    // res es la response, la respuesta
    console.log(req);
    res.status(200).send('Hello World!');

});

app.post('/team/pokemons', () => {
    res.status(200).send('Hello World!');
});

app.get('/team', () => {
    res.status(200).send('Hello World!');
});

app.delete('/team/pokemons/:pokeid', () => {
    res.status(200).send('Hello World!');
});

app.put('/team', () => {
    res.status(200).send('Hello World!');
});

// Empezamos a escuchar conexiones a nuestra API
app.listen(port, () => {
    console.log('Server started at port 3000');
});
