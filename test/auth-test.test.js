const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app').app;

// Un JWT (JSON Web Token) 

// Los JWT se utilizan comúnmente para autenticar usuarios en aplicaciones web y para transmitir información entre servicios 
// de manera segura.

// Un JWT consta de tres partes: un encabezado, un payload y una firma.
// El encabezado contiene información sobre cómo se ha generado el token y qué algoritmo se ha utilizado para firmarlo. 
// El payload contiene los datos que se transmiten, como la información del usuario y los privilegios. 
// La firma se utiliza para verificar que el token no haya sido modificado durante la transmisión.

describe('Suite de pruebas auth', () => {
    it('should return 401 when no jwt token available', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        chai.request(app)
            .get('/teams')
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 401);
                done();
            });
    });

    it('should return 400 when no data is provided', (done) => {
        // HTTP 400 significa “Bad Request” (Solicitud incorrecta)
        chai.request(app)
            .post('/auth/login')
            .end((err, res) => {
                // Expect valid login
                chai.assert.equal(res.statusCode, 400);
                done(); 
            });
    });

    it('should return 200 and token for succesful login', (done) => {
        // set('content-type', 'application/json'): Para establecer el header 'content-type' a 'application/json'
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'sergio', password: '1234'})
            .end((err, res) => {
                // Expect valid login
                chai.assert.equal(res.statusCode, 200);
                done();
            });
    });

    it('should return 200 when jwt token is valid', (done) => {
        // set('Authorization'): Para enviar el jwt en el header de autentificación
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'mastermind', password: '4321'})
            .end((err, res) => {
                // Expect valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .get('/teams')
                    .set('Authorization', `JWT ${res.body.token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                        done();
                    });
            });
    });
});