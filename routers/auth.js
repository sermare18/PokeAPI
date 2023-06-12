const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
// Controllers
const usersController = require('../controllers/users');
usersController.registerUser('sergio', '1234');
usersController.registerUser('mastermind', '4321');

router.route('/')
    .get((req, res) => {
        res.send('GET Auth router');
    })
    .post((req, res) => {
        res.send('POST Auth router')
    });

router.route('/login')
    .post((req, res) => {
        if (!req.body) {
            return res.status(400).json({ message: 'Missing data' });
        }
        else if (!req.body.user || !req.body.password) {
            return res.status(400).json({ message: 'Missing data' });
        }
        // Comprobamos credenciales
        usersController.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
            // Si no son válidas, error
            if (err || !result) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            // Si son válidas, generamos un JWT y lo devolvemos
            const secretKey = 'secretPassword';
            let user = usersController.getUserIdFromUserName(req.body.user);
            const token = jwt.sign({ userId: user.userId }, secretKey)
            res.status(200).json(
                {
                    // Token que contiene la clave secreta: secretPassword, un header con: ALGORITHM & TOKEN TYPE y un PAYLOAD:DATA con: el nombre del usuario
                    token: token
                }
            );
        });
    });

exports.router = router;