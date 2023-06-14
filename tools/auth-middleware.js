const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// Función a exportar
const init = () => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
        secretOrKey: 'secretPassword' // TODO debería de estar en una variable de entorno (Contraseña que solo el servidor debe de conocer)
    }
    passport.use(new JwtStrategy(opts, (decoded, done) => {
        console.log('decoded jwt', decoded);
        // null: No hay errores, false: No existe usuario
        return done(null, decoded);
    }))
}

const protectWithJwt = (req, res, next) => {
    if (req.path == '/' || req.path == '/auth/login') {
        return next();
    }
    // Se está ejecutando el middleware devuelto y pasándole los objetos req, res y next como argumentos.
    // Cuando se llama a passport.authenticate('jwt', {session: false}), Passport intenta validar el token del usuario utilizando la estrategia jwt. 
    // Si la validación es exitosa, Passport agrega información sobre el usuario autenticado al objeto request como una propiedad llamada user. 
    // Si hacemos un console.log(req) podemos ver que tenemos un atributo con nombre 'user', que contiene el token del usuario
    return passport.authenticate('jwt', {session: false})(req, res, next);
}

exports.init = init;
exports.protectWithJwt = protectWithJwt;
