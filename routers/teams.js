const express = require('express');
const router = express.Router();
const passport = require('passport');
// Esta línea de código importa el módulo llamado auth y lo ejecuta pasándole el objeto passport como argumento
require('../auth')(passport);
const axios = require('axios');

// Controllers
const teamsController = require('../controllers/teams');
const { getUser } = require('../controllers/users');

router.route('/')
    .get(passport.authenticate('jwt', { session: false }),
        (req, res, next) => {
            // Cuando se llama a passport.authenticate('jwt', {session: false}), Passport intenta validar el token del usuario utilizando la estrategia jwt. 
            // Si la validación es exitosa, Passport agrega información sobre el usuario autenticado al objeto request como una propiedad llamada user. 
            // Si hacemos un console.log(req) podemos ver que tenemos un atributo con nombre 'user', que contiene el token del usuario
            // console.log('breakpoint0', req.user);
            let user = getUser(req.user.userId);
            res.status(200).json({
                trainer: user.userName,
                team: teamsController.getTeamOfUser(req.user.userId)
            })
        })
    .put(passport.authenticate('jwt', { session: false }),
        (req, res, next) => {
            teamsController.setTeam(req.user.userId, req.body.team);
            res.status(200).send();
        });

router.route('/pokemons')
    .post(passport.authenticate('jwt', { session: false }),
        (req, res) => {
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
                    res.status(400).json({message: error})
                })
                .finally(function () {
                    // always executed
                });
        });

router.route('/pokemons/:pokeid')
    .delete(() => {
        res.status(200).send('Hello World!');
    });

exports.router = router;

