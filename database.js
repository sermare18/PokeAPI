const mongoose = require('mongoose');

let password = '';
let databaseName = 'db';

// Con Node.js podemos acceder a las variables de entorno con process.env
// Ver archivo package.json
if (process.env.NODE_ENV === 'test') {
    // Si estamos ejecutando el servidor en el entorno de test
    // De esta forma cada vez que ejecutemos los test, estaremos ejecutándolo todo en una DB que no es la de producción
    databaseName = 'testdb';
}

// Dentro de ``va la uri de conexión a nuestra base de datos MongoDB
mongoose.connect(`mongodb+srv://sergio:${password}@cluster0.dejksbe.mongodb.net/${databaseName}?retryWrites=true&w=majority`);

// Ejemplo
// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));