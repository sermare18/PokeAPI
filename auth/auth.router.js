const express = require('express');
const router = express.Router();
const authHttpHandler = require('./auth.http');

// La función loginUser se está pasando como argumento al método post del enrutador de Express
router.route('/login')
    .post(authHttpHandler.loginUser);

exports.router = router;