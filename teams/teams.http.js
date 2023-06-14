const axios = require('axios');
// Controllers
const teamsController = require('./teams.controller');
const { getUser } = require('../auth/users.controller');

const getTeamFromUser = (req, res) => {
    let user = getUser(req.user.userId);
    res.status(200).json({
        trainer: user.userName,
        team: teamsController.getTeamOfUser(req.user.userId)
    });
}

const setTeamToUser = (req, res) => {
    teamsController.setTeam(req.user.userId, req.body.team);
    res.status(200).send();
}

const addPokemonToTeam = (req, res) => {
    let pokemonName = req.body.name;
    console.log('calling pokeapi');
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
        .then(function (response) {
            // handle success
            let pokemon = {
                name: pokemonName,
                pokedexNumber: response.data.id
            }
            // console.log('Su número de pokedex asignado es: ' + response.data.id);
            teamsController.addPokemon(req.user.userId, pokemon);
            res.status(201).json(pokemon);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            res.status(400).json({ message: error })
        })
        .finally(function () {
            // always executed
        });
}

const deletePokemonFromTeam = (req, res) => {
    // Para leer parámetros del endponit tenemos que utilizar req.params.pokeid
    let deletedPokemon = teamsController.deletePokemon(req.user.userId, req.params.pokeid);
    res.status(200).json({ deletedPokemon: deletedPokemon });
}

exports.getTeamFromUser = getTeamFromUser;
exports.setTeamToUser = setTeamToUser;
exports.addPokemonToTeam = addPokemonToTeam;
exports.deletePokemonFromTeam = deletePokemonFromTeam;