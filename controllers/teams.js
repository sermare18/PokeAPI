let teamsDatabase = {};

const cleanUpTeam = () => {
    for (let user in teamsDatabase) {
        teamsDatabase[user] = [];
    }
}

// Función para inicializar el equipo
const bootstrapTeam = (userId) => {
    teamsDatabase[userId] = [];
}

const getTeamOfUser = (userId) => {
    return teamsDatabase[userId];
}

const addPokemon = (userId, pokemon) => {
    teamsDatabase[userId].push(pokemon);
}

const deletePokemon = (userId, pokemonId) => {
    console.log('DELETE', userId, pokemonId);
    if (teamsDatabase[userId][pokemonId]) {
        const deletedPokemon = teamsDatabase[userId].splice(pokemonId, 1)[0];
        return deletedPokemon;
    }
}

const setTeam = (userId, team) => {
    teamsDatabase[userId] = team;
}

exports.bootstrapTeam = bootstrapTeam;
exports.addPokemon = addPokemon;
exports.setTeam = setTeam;
exports.getTeamOfUser = getTeamOfUser;
exports.cleanUpTeam = cleanUpTeam;
exports.deletePokemon = deletePokemon;

