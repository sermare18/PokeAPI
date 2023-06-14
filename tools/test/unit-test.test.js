const assert = require('chai').assert;

function addValue(a, b) {
    return a + b;
}

// Suite de tests para funcionalidades relacionadas
describe('Suite de prueba para el curso', () => {
    // Aquí adentro es donde se escriben todos los tests
    it('should return 4', () => {
        // Guardomos en una variable el resultado de la función a comprobar
        let result = addValue(2, 2);
        // Comprobamos que el resultado es igual a 4
        assert.equal(result, 4);
    });
});

// PARA EJECUTAR LOS TESTS (Ejecutamos el binario de mocha)
// ./node_modules/.bin/mocha
// Remplazar ese comando en el fichero package.json en la sección de scripts y de test para ejecutar los tests con el comando:
// npm run test