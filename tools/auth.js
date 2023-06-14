const passport = require('passport');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// Función a exportar
module.exports = passport => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: 'secretPassword' // TODO debería de estar en una variable de entorno (Contraseña que solo el servidor debe de conocer)
    }
    passport.use(new JwtStrategy(opts, (decoded, done) => {
        console.log('decoded jwt', decoded);
        // null: No hay errores, false: No existe usuario
        return done(null, decoded);
    }))
}
