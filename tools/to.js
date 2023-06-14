// La función to toma una promesa como argumento y devuelve una nueva promesa que se resuelve con un arreglo de dos elementos. 
// El primer elemento del arreglo es null y el segundo elemento es el valor con el que se resolvió la promesa original si se 
// resolvió correctamente. Si la promesa original fue rechazada, entonces el primer elemento del arreglo es el valor con el que 
// fue rechazada la promesa y el segundo elemento es null.

// Esta función puede ser útil para manejar errores al trabajar con promesas, ya que permite escribir código de manera más clara 
// y legible al evitar la necesidad de utilizar bloques try...catch. En lugar de utilizar un bloque try...catch, puedes llamar a 
// la función to con una promesa y luego verificar si el primer elemento del arreglo devuelto es null o no para determinar si 
// ocurrió un error.

const to = (promise) => {
    return promise.then((data) => {
        return [null, data]
    }).catch((err) => {
        return [err, null]
    })
}

exports.to = to;