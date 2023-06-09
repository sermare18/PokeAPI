seguras: Una acción en https se considera segura, si se puede realizar sin que modifique el estado del servidor. (Es decir, son seguras únicamente las operaciones de lectura).

idempotentes: Una acción en https se considera idempotente cuando la ejecución repetida de una petición con los mismos parámetros sobre un mismo recurso tendrá el mismo efecto en el estado de nuestro recurso en el sistema si se ejecuta 1 o N veces. Por ejemplo, el método PUT es un método idempotente: llamarlo una o más veces de forma sucesiva tiene el mismo efecto (sin efectos secundarios), mientras que una sucesión de peticiones POST idénticas pueden tener efectos adicionales.

Un ejemplo de por qué PUT es idempotente y POST no es el siguiente: si enviamos una petición PUT para actualizar un recurso en un servidor, la primera vez que se envía la petición, el recurso se actualizará. Si enviamos la misma petición PUT nuevamente, el recurso ya está actualizado, por lo que no habrá cambios adicionales en el servidor. En cambio, si enviamos una petición POST para crear un nuevo recurso en un servidor, la primera vez que se envía la petición, se creará un nuevo recurso. Si enviamos la misma petición POST nuevamente, se creará otro recurso nuevo en el servidor.

Resumiendo, la misma acción varias veces seguidas y el mismo estado resultante del servidor.

cacheables: El cliente se puede guardar el resultado.

Una respuesta cacheable es una respuesta HTTP que se puede almacenar en caché, es decir, se almacena para recuperarla y usarla más tarde, ahorrando una nueva solicitud al servidor. No todas las respuestas HTTP se pueden almacenar en caché. Hay ciertas restricciones para que una respuesta HTTP se almacene en caché, como el método utilizado en la solicitud (por ejemplo, GET o HEAD) y el código de estado de la respuesta

Las urls definen directamente el objeto (recurso).
Una url debe determinar de forma única a un recurso.

ENVIAR DATOS

La primera opción es mediante los query params en la url.

La segunda opción es mediante el body de la petición.
Todos los métodos definidos abajo, puden mandar datos en el body, pero se recomienda que únicamente envien datos aquellos métodos de creación o modificación. (POST, PUT, PATCH).

Hay otra manera de enviar datos (tercera opción) que es a través de las headers, el objeto de headers se utiliza mucho para definir configuraciones del sistema, o para dar información extra a nuestro servidor o a nuestro cliente sobre tipos de datos que acepto.

En headers podemos añadir metadata para añadir información sobre el contexto de nuestras peticiones. Podríamos añadir el header de Content-Type y darle el valor de application/json, de esta manera el servidor sabrá que los datos que le envia el cliente desde el body de la petición están en formato json.

Otra cosa para la cual se utiliza mucho el header es para el tema de la autorización, para enviar credenciales.
Si nosostros queremos proteger nuestra API, para que solo pueda ser utilizada por usuarios registrados, será necesario por parte del cliente enviar las credenciales. Ya hay un header llamado Authorization que sirve para este propósito, de enviar nuestras credenciales cifradas, para poder identificar al usuario que está haciendo la petición.

CÓDIGOS DE RESPUESTA HTTP

El estado de la respuesta de una petición viene definido por números.

1. Respuestas informativas (100-199)
2. Respuestas satisfactorias (200-299)
3. Redirecciones (300-399)
4. Errores de los clientes (400-499)
5. Errores del servidor (500-599)



GET: método seguro, idempotente y cacheable.

HEAD: el método HEAD es similar al método GET, pero solo solicita los encabezados de la respuesta y no el cuerpo de la respuesta. Esto significa que cuando envías una solicitud HEAD a un servidor, el servidor solo te devolverá los encabezados de la respuesta y no el contenido real del recurso solicitado. Esto puede ser útil si solo necesitas información sobre el recurso (como su tamaño o tipo de contenido) y no necesitas descargar todo el contenido del recurso.

POST: Se utiliza para crear nuevos recursos (entidades). En el caso de la PokeAPI, se podría utilizar este método para añadir nuevos pokemons a la base de datos. Genera un cambio en el servidor, no es idempotente y tampoco es seguro, porque cambia el estado del servidor.

Reemplaza una entidad "todo entera".

PUT: Reemplaza los datos que hay en un recurso, previamente creado con el método POST. No crea nuevos recursos en el servidor, sino que "machaca" (actualiza) los datos de un mismo recurso, por lo tanto, es idempotente. Pero no es seguro, porque cambia el estado del servidor.

DELETE: Elimina el recurso indicado en la url del servidor.

CONNECT: Genera una conexión con el servidor con el recurso que identifica.

OPTIONS: El método OPTIONS de HTTP se utiliza para que un cliente pueda descubrir cuáles son las opciones de comunicación permitidas para un recurso específico en un servidor. Por ejemplo, un cliente puede enviar una solicitud OPTIONS a un servidor para averiguar qué métodos HTTP son permitidos para un recurso específico.

TRACE: Método que realiza un envío de un mensaje para ver por donde pasa ese mensaje hacia un recurso concreto.

PATCH: Método utilizado para realizar modificaciones (como PUT), pero PATCH permite realizar modificaciones parciales.

Reemplza una entidad de forma parcial, en el ejemplo de la PokeAPI, en vez de actualizar todo el bloque del pokemon (método PUT), podríamos modificar únicamente su nombre, o stats individualizadas (propiedades de la entidad).
