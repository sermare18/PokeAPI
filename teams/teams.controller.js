let teamsDatabase = {};

const cleanUpTeam = () => {
    return new Promise((resolve, reject) => {
        for (let user in teamsDatabase) {
            teamsDatabase[user] = [];
        }
        // Informamos de que hemos terminado nuestra promesa
        resolve();
    });
}

// Función para inicializar el equipo
const bootstrapTeam = (userId) => {
    return new Promise((resolve, reject) => {
        teamsDatabase[userId] = [];
        resolve();
    });
}

const getTeamOfUser = (userId) => {
    return new Promise((resolve, reject) => {
        // Para devolver objetos con resolve
        resolve(teamsDatabase[userId]);
    });
}

const addPokemon = (userId, pokemon) => {
    return new Promise((resolve, reject) => {
        if (teamsDatabase[userId].length == 6) {
            // Devolvemos error, nuestro equipo pokemon solo puede tener 6 pokémons, la promesa va a fallar
            reject('Already have 6 pokemon');
        } else {
            teamsDatabase[userId].push(pokemon);
            resolve();
        }
    });
}

const deletePokemon = (userId, pokemonId) => {
    return new Promise((resolve, reject) => {
        console.log('DELETE', userId, pokemonId);
        if (teamsDatabase[userId][pokemonId]) {
            const deletedPokemon = teamsDatabase[userId].splice(pokemonId, 1)[0];
            return deletedPokemon;
        }
        resolve();
    });
}

const setTeam = (userId, team) => {
    return new Promise((resolve, reject) => {
        teamsDatabase[userId] = team;
        resolve();
    });
}

exports.bootstrapTeam = bootstrapTeam;
exports.addPokemon = addPokemon;
exports.setTeam = setTeam;
exports.getTeamOfUser = getTeamOfUser;
exports.cleanUpTeam = cleanUpTeam;
exports.deletePokemon = deletePokemon;

