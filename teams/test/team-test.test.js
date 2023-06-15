const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
const usersController = require('../../auth/users.controller');
const teamsController = require('../teams.controller');

chai.use(chaiHttp);

const app = require('../../app').app;

beforeEach(async () => {
    await usersController.registerUser('sergio', '1234');
    await usersController.registerUser('mastermind', '4321');
});

// Se ejecuta después de cada it dentro de una suite de pruebas
afterEach(async () => {
    // PRIMERA OPCIÓN
    // Hay que utilizar .then() ya que hemos definido la función 'cleanUpTeam' con promesas
    // Con .then() indicamos a la función cuando ha acabado de ejecutarse la función 'cleanUpTeam' para que ejecute la siguiente línea de código
    // teamsController.cleanUpTeam().then(() => {
    //     console.log("Limpieza de equipos completada");
    //     done();
    // });
    // SEGUNDA OPCIÓN
    // Poner la palabara reservada 'await' delante de la promesa
    // Esta opción nos obliga a definir esta función anónima con la palabra reservada 'async' y quitar el parámetro done
    await teamsController.cleanUpTeam();
    await usersController.cleanUpUsers();
});

describe('Suite de pruebas teams', () => {
    it('should return the team of the given user', (done) => {
        let team = [{ name: 'Charizard' }, { name: 'Blastoise' }, { name: 'Pikachu' }];
        // .send({user: 'mastermind', password: '4321') enviamos en el body de la request, un objeto que contiene el nombre de usuario y la contraseña
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({ user: 'mastermind', password: '4321' })
            .end((err, res) => {
                let token = res.body.token;
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .put('/teams')
                    .send({
                        team: team
                    })
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .get('/teams')
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                // tiene equipo con Charizard y Blastoise
                                // { trainer: 'mastermind', team: [Pokemon]}
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.trainer, 'mastermind');
                                chai.assert.equal(res.body.team.length, team.length);
                                chai.assert.equal(res.body.team[0].name, team[0].name);
                                chai.assert.equal(res.body.team[1].name, team[1].name);
                                done();
                            });
                    });
            });
    });

    it('should return the pokedex number using PokeAPI', (done) => {
        // .send({user: 'mastermind', password: '4321') enviamos en el body de la request, un objeto que contiene el nombre de usuario y la contraseña
        let pokemonName = 'Bulbasaur';
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({ user: 'mastermind', password: '4321' })
            .end((err, res) => {
                let token = res.body.token;
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .post('/teams/pokemons')
                    .send({ name: pokemonName })
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .get('/teams')
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                // tiene equipo con Charizard y Blastoise
                                // { trainer: 'mastermind', team: [Pokemon]}
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.trainer, 'mastermind');
                                chai.assert.equal(res.body.team.length, 1);
                                chai.assert.equal(res.body.team[0].name, pokemonName);
                                chai.assert.equal(res.body.team[0].pokedexNumber, 1);
                                done();
                            });
                    });
            });
    });

    it('should delete a given Pokémon for an authenticated user', (done) => {
        let pokemonId = '0';
        let teamOriginal = [{ name: 'Charizard' }, { name: 'Blastoise' }, { name: 'Pikachu' }];
        let teamCopy = [...teamOriginal];
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({ user: 'mastermind', password: '4321' })
            .end((err, res) => {
                let token = res.body.token;
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .put('/teams')
                    .send({ team: teamOriginal })
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .delete(`/teams/pokemons/${pokemonId}`)
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                // tiene equipo con Charizard y Blastoise
                                // { trainer: 'mastermind', team: [Pokemon]}
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.deletedPokemon.name, teamCopy[pokemonId].name);
                                chai.request(app)
                                    .get('/teams')
                                    .set('Authorization', `JWT ${token}`)
                                    .end((err, res) => {
                                        chai.assert.equal(res.body.trainer, 'mastermind');
                                        teamOriginal.splice(pokemonId, 1);
                                        chai.assert.deepEqual(res.body.team, teamOriginal);
                                        done();
                                    })
                            });
                    });
            });
    });

    it('should not be able to add pokemon if you already have 6', (done) => {
        let pokemonName = 'Gyarados';
        let team = [
            { name: 'Charizard' },
            { name: 'Blastoise' },
            { name: 'Pikachu' },
            { name: 'Lucario' },
            { name: 'Azumarill' },
            { name: 'Gengar' },
        ];
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({ user: 'mastermind', password: '4321' })
            .end((err, res) => {
                let token = res.body.token;
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .put('/teams')
                    .send({ team: team })
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .post('/teams/pokemons')
                            .send({ name: pokemonName })
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                chai.assert.equal(res.statusCode, 400);
                                done();
                            })
                    });
            });
    });
});

after((done) => {
    usersController.cleanUpUsers();
    done();
});