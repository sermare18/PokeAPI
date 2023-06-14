const axios = require('axios');
// Controllers
const teamsController = require('./teams.controller');
const { getUser } = require('../auth/users.controller');
const { to } = require('../tools/to');

// Cuando se utiliza una promesa, el código no se detiene a la espera de que se resuelva la promesa. En su lugar, 
// se puede utilizar el método .then() para especificar qué debe hacerse una vez que se resuelva la promesa. 
// De esta manera, el código puede continuar ejecutándose mientras se espera la resolución de la promesa.

// Sin embargo, cuando se utiliza await con una promesa, la ejecución de la función se detiene hasta que se resuelve la promesa. 
// Esto puede ser útil en ciertas situaciones en las que necesitas esperar a que se complete una operación asíncrona 
// antes de continuar con el resto del código. Aunque el uso de await detiene la ejecución de la función en la que se utiliza, 
// no detiene la ejecución del resto del programa.

const getTeamFromUser = async (req, res) => {
    let user = await getUser(req.user.userId);
    // Ponemos la plabra reservada 'await' ya que la función 'getTeamOfUser' está definida con promesas
    let [teamErr, team] = await to(teamsController.getTeamOfUser(req.user.userId));
    if (teamErr) {
        return res.status(400).json({message: teamErr});
    }
    res.status(200).json({
        trainer: user.userName,
        team: team
    });
}

const setTeamToUser = async (req, res) => {
    let [err, resp] = await to(teamsController.setTeam(req.user.userId, req.body.team));
    if (err) {
        return res.status(400).json({message: err});
    }
    res.status(200).send();
}

const addPokemonToTeam = async (req, res) => {
    let pokemonName = req.body.name;
    console.log('calling pokeapi');
    // Deestructuring de error y respuesta con implementación propia de función 'to' para promesas
    let [pokeApiError, pokeApiResponse] =
        await to(axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`))
    if (pokeApiError) {
        return res.status(400).json({ message: pokeApiError });
    }
    let pokemon = {
        name: pokemonName,
        pokedexNumber: pokeApiResponse.data.id
    }
    // Esta línea puede fallar, por el reject() de la función 'addPokemon', por eso hay que poner el bloque try catch
    let [errorAdd, response] = await to(teamsController.addPokemon(req.user.userId, pokemon));
    if (errorAdd) {
        return res.status(400).json({ message: errorAdd });
    }
    return res.status(201).json(pokemon);
}

const deletePokemonFromTeam = async (req, res) => {
    // Para leer parámetros del endponit tenemos que utilizar req.params.pokeid
    let [err, resp] = await to(teamsController.deletePokemon(req.user.userId, req.params.pokeid));
    if (err) {
        return res.status(400).json({message: err})
    }
    res.status(200).json({ deletedPokemon: resp });
}

exports.getTeamFromUser = getTeamFromUser;
exports.setTeamToUser = setTeamToUser;
exports.addPokemonToTeam = addPokemonToTeam;
exports.deletePokemonFromTeam = deletePokemonFromTeam;