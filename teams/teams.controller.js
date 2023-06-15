const mongoose = require('mongoose');
const { to } = require('../tools/to');

// Definimos el modelo de equipos para MongoDB
const TeamsModel = mongoose.model('TeamsModel', {
    userId: String,
    team: []
});

// let teamsDatabase = {}; // Antigua DB Local

const cleanUpTeam = () => {
    return new Promise(async (resolve, reject) => {
        // for (let user in teamsDatabase) {
        //     teamsDatabase[user] = [];
        // }
        // // Informamos de que hemos terminado nuestra promesa
        // resolve();

        // Con MongoDB
        await TeamsModel.deleteMany({}).exec();
        resolve();
    });
}

// Función para inicializar el equipo
const bootstrapTeam = (userId) => {
    return new Promise(async (resolve, reject) => {
        // En la DB Local (NO PERSISTENTE)
        // teamsDatabase[userId] = [];
        // En la DB Remota MongoDB (PERSISTENTE)
        let newTeam = new TeamsModel({
            userId: userId,
            team: []
        });
        await newTeam.save();
        resolve();
    });
}

const getTeamOfUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        // Para devolver objetos con resolve
        // resolve(teamsDatabase[userId]);

        // Con MongoDB
        let [err, dbTeam] = await to(TeamsModel.findOne({userId: userId}).exec());
        if (err) {
            return reject(err);
        }
        // Si si que existe el usuario pero no tiene un equipo
        resolve(dbTeam.team);
    });
}

const addPokemon = (userId, pokemon) => {
    return new Promise(async (resolve, reject) => {
        // if (teamsDatabase[userId].length == 6) {
        //     // Devolvemos error, nuestro equipo pokemon solo puede tener 6 pokémons, la promesa va a fallar
        //     reject('Already have 6 pokemon');
        // } else {
        //     teamsDatabase[userId].push(pokemon);
        //     resolve();
        // }

        // Con MongoDB
        let [err, dbTeam] = await to(TeamsModel.findOne({userId: userId}).exec());
        if (err) {
            return reject(err);
        }
        if (dbTeam.team.length == 6) {
            // Devolvemos error, nuestro equipo pokemon solo puede tener 6 pokémons, la promesa va a fallar
            reject('Already have 6 pokemon');
        } else { // Añadimos el pokemon
            dbTeam.team.push(pokemon);
            await dbTeam.save();
            resolve();
        }
    });
}

const deletePokemon = (userId, pokemonId) => {
    return new Promise(async (resolve, reject) => {
        // console.log('DELETE', userId, pokemonId);
        // if (teamsDatabase[userId][pokemonId]) {
        //     const deletedPokemon = teamsDatabase[userId].splice(pokemonId, 1)[0];
        //     return resolve(deletedPokemon);
        // }
        // reject('Índice de pokémon fuera de rango');

        // Con MongoDB
        let [err, dbTeam] = await to(TeamsModel.findOne({userId: userId}).exec());
        let deletedPokemon = null;
        if (err || !dbTeam) {
            return reject(err);
        }
        if (dbTeam.team[pokemonId]) {
            deletedPokemon = dbTeam.team.splice(pokemonId, 1)[0];
        }
        await dbTeam.save();
        resolve(deletedPokemon);
    });
}

const setTeam = (userId, team) => {
    return new Promise(async (resolve, reject) => {
        // teamsDatabase[userId] = team;
        // resolve();

        // Con MongoDB
        let [err, dbTeam] = await to(TeamsModel.updateOne(
            {userId: userId},
            {$set: {team: team}},
            {upsert: true}
        ).exec());
        if (err || !dbTeam) {
            return reject(err);
        }
        resolve();
    });
}

exports.bootstrapTeam = bootstrapTeam;
exports.addPokemon = addPokemon;
exports.setTeam = setTeam;
exports.getTeamOfUser = getTeamOfUser;
exports.cleanUpTeam = cleanUpTeam;
exports.deletePokemon = deletePokemon;

