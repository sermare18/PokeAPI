const chai = require('chai');
// chai-http es un plugin que da funcionalidades a chai para poder levantar servidores y para poder realizar llamadas http sobre estos servidores
const chaiHttp = require('chai-http');

// Informar a chai de que queremos utilizar este plugin
chai.use(chaiHttp);

// Acceso a nuestro backend
const app = require('../../app').app;

// Suite de tests para funcionalidades relacionadas
describe('Suite de prueba e2e para el curso', () => {
    // Aquí adentro es donde se escriben todos los tests
    it('should return hello world', (done) => {
        // Cuando se realiza una prueba asíncrona en Mocha, es necesario llamar a la función done para indicar que la prueba ha finalizado y que Mocha puede continuar con la siguiente prueba
        chai.request(app)
            .get('/')
            .end((err, res) => {
                // console.log('A');
                chai.assert.equal(res.text, 'Hello World!');
                done();
            })
        // console.log('B');
    });
});
