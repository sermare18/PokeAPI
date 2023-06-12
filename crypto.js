// Aquí es donde va a estar la lógica de nuestras funciones de criptografía
const bcrypt = require('bcrypt');

const hashPassword = (plainTextPwd, done) => {
    bcrypt.hash(plainTextPwd, 10, done);
};

// Para acceder a los datos de la función callback 'done', cuando se haya generado la hashPassword (función asíncrona)
/*
hashPassword('myPassword', (err, hash) => {
    if (err) {
        // Manejar el error
    } else {
        // Usar el hash resultante
        console.log(`Hash: ${hash}`);
    }
});
*/

const hashPasswordSyn = (plainTextPwd) => {
    return bcrypt.hashSync(plainTextPwd, 10);
}

const comparePassword = (plainPassword, hashPassword, done) => {
    bcrypt.compare(plainPassword, hashPassword, done);
};

// Para acceder a los datos de la función callback 'done', cuando se haya completado la comparación de la plainPassword con la hashPassword (función asíncrona)
/*
comparePassword('myPassword', hash, (err, result) => {
    if (err) {
        // Manejar el error
    } else {
        // Usar el resultado de la comparación
        console.log(`Do the passwords match? ${result}`);
    }
});
*/

exports.hashPassword = hashPassword;
exports.hashPasswordSyn = hashPasswordSyn;
exports.comparePassword = comparePassword;
