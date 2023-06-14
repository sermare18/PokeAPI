const jwt = require('jsonwebtoken');
// Controllers
const usersController = require('./users.controller');
const {to} = require('../tools/to');

const loginUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Missing data' });
    }
    else if (!req.body.user || !req.body.password) {
        return res.status(400).json({ message: 'Missing data' });
    }
    // Comprobamos credenciales
    let [err, resp] = await to(usersController.checkUserCredentials(req.body.user, req.body.password));
    // Si no son válidas, error
    if (err || !resp) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Si son válidas, generamos un JWT y lo devolvemos
    const secretKey = 'secretPassword';
    let user = await usersController.getUserIdFromUserName(req.body.user);
    const token = jwt.sign({ userId: user.userId }, secretKey);
    // Envía una respuesta HTTP con un estado 200 (éxito) y un cuerpo JSON. El objeto JSON que se pasa como argumento a json() se serializa y se envía en el cuerpo de la respuesta.
    res.status(200).json(
        {
            // Token que contiene la clave secreta: secretPassword, un header con: ALGORITHM & TOKEN TYPE y un PAYLOAD:DATA con: el nombre del usuario
            token: token
        }
    );
}

exports.loginUser = loginUser;

