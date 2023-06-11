// Importamos librería para crear identificadores únicos
const uuid = require('uuid');
const crypto = require('./crypto.js');

const userDatabase = {};
// userId -> password

// En la función registerUser, no es necesario pasar un tercer parámetro como callback porque la función no necesita devolver 
// ningún resultado al llamador. La función registerUser simplemente guarda el usuario en la base de datos y no necesita informar 
// al llamador si la operación fue exitosa o no.
const registerUser = (userName, password) => {
    // Guardar en la base de datos nuestro usuario
    crypto.hashPassword(password, (err, result) => {
        userDatabase[uuid.v4()] = {
            userName: userName,
            password: result
        }
    });   
};

const checkUserCredentials = (userId, password, callback) => {
    // Comprobar que las credenciales son correctas
    let user = userDatabase[userId];
    crypto.comparePassword(password, user.hashPassword, callback);
};

// OTRA FORMA + EXPLICACIÓN CALLBACKS

// Tenemos que añadir otro callback a esta función, aquí también es necesario manejar la asincronía.
// De esta manera, estás manejando la asincronía al proporcionar un callback que se ejecutará una vez que la tarea asíncrona (función crypto.comparePassword) haya 
// finalizado, en lugar de intentar devolver el resultado directamente desde la función checkUserCredentials.
/*
const checkUserCredentials = (userId, password, callback) => {
    // Comprobar que las credenciales son correctas
    let user = userDatabase[userId];
    crypto.comparePassword(password, user.hashPassword, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};
*/
// El callback en la función checkUserCredentials es un parámetro que se pasa cuando llamas a la función. 
// No es necesario que esté definido previamente en otro lugar del código. Cuando llamas a checkUserCredentials, 
// le pasas una función anónima como callback, que se ejecutará cuando la función asíncrona haya completado su tarea.

// Aquí hay un ejemplo de cómo llamar a checkUserCredentials y pasarle un callback:
/*
checkUserCredentials(userId, password, (err, result) => {
    // Este es el callback que se ejecutará cuando la función asíncrona haya completado su tarea
    if (err) {
        console.error(err);
    } else {
        console.log(result); // Aquí puedes manejar el resultado de la comparación de contraseñas
    }
});
*/


// Cuando proporcionas un callback a una función asíncrona, la función asíncrona es responsable de garantizar que el callback 
// se ejecute solo después de que se haya completado la tarea asíncrona.
/*
function asyncFunction(callback) {
    // Realizar una tarea asíncrona (por ejemplo, una operación de entrada/salida)
    // ...

    // Una vez que la tarea asíncrona haya finalizado, ejecutar el callback
    callback();
}
*/
// Aunque checkUserCredentials no está definida como una función asíncrona, maneja correctamente la asincronía al pasar un 
// callback a comparePassword, que a su vez pasa el callback a crypto.comparePassword, que es una función asíncrona.