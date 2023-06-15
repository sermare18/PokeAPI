// Importamos librería para crear identificadores únicos
const uuid = require('uuid');
const crypto = require('../tools/crypto.js');
const teams = require('../teams/teams.controller.js');
const mongoose = require('mongoose');
const { to } = require('../tools/to');

// Definimos el modelo de usuario para MongoDB
const UserModel = mongoose.model('UserModel', {
    userName: String,
    password: String,
    userId: String
});

// let userDatabase = {}; // Antigua DB Local
// userId -> password

const cleanUpUsers = () => {
    return new Promise(async (resolve, reject) => {
        // userDatabase = {};
        // resolve();

        // Con MongoDB
        // Queremos eliminar todo, por lo tanto, enviamos una query vacía: {}
        await UserModel.deleteMany({}).exec();
        resolve();
    });
}

// En la función registerUser, no es necesario pasar un tercer parámetro como callback porque la función no necesita devolver 
// ningún resultado al llamador. La función registerUser simplemente guarda el usuario en la base de datos y no necesita informar 
// al llamador si la operación fue exitosa o no.
/*
const registerUser = (userName, password) => {
    // Guardar en la base de datos nuestro usuario
    crypto.hashPassword(password, (err, result) => {
        userDatabase[uuid.v4()] = {
            userName: userName,
            password: result
        }
    });   
};
*/

// Forma síncrona (Para que los test no den errores)
const registerUser = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        let hashedPwd = crypto.hashPasswordSyn(password);
        let userId = uuid.v4();
        // Guardar en la base de datos local (NO PERSISTENTE) nuestro usuario
        // userDatabase[userId] = {
        //     userName: userName,
        //     password: hashedPwd
        // }
        // Guardar en la base de datos remota (PERSISTENTE) MongoDB
        let newUser = new UserModel({
            userName: userName,
            password: hashedPwd,
            userId: userId
        });
        // MongoDB trabaja con promesas para las operaciones de lectura y escritura en la DB
        await newUser.save();
        await teams.bootstrapTeam(userId);
        resolve();
    });
}

const getUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        // resolve(userDatabase[userId]);
        // Query con MongoDB, las query son objetos json
        let [err, result] = await to(UserModel.findOne({userId: userId}).exec());
        if (err) {
            return reject(err);
        }
        resolve(result);
    });
}

const getUserIdFromUserName = (userName) => {
    return new Promise(async (resolve, reject) => {
        // for (let user in userDatabase) {
        //     if (userDatabase[user].userName == userName) {
        //         let userData = userDatabase[user];
        //         userData.userId = user;
        //         return resolve(userData);
        //     }
        // }
        // // Si no existe el usuario en la db
        // reject('No user found');
        
        // Con MongoDB
        let [err, result] = await to(UserModel.findOne({userName: userName}).exec());
        if (err) {
            return reject(err);
        }
        resolve(result);
    });
}

const checkUserCredentials = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        console.log('checking user credentials');
        // Comprobar que las credenciales son correctas
        let user = await getUserIdFromUserName(userName);
        if (user) {
            console.log(user);
            // user.password ya esta hasheada
            crypto.comparePassword(password, user.password, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        } else {
            // El argumento 'Missing user' se pasa como el primer parámetro de la función callback, que en este caso es el parámetro err. 
            reject('Missing user');
        }
    });
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

exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
exports.getUserIdFromUserName = getUserIdFromUserName;
exports.getUser = getUser;
exports.cleanUpUsers = cleanUpUsers;