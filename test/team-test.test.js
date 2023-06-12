const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');

chai.use(chaiHttp);

const app = require('../app').app;

describe('Suite de pruebas teams', () => {
    it('should return the team of the given user', (done) => {
        let team = [{name: 'Charizard'}, {name: 'Blastoise'}, {name: 'Pikachu'}];
        // .send({user: 'mastermind', password: '4321') enviamos en el body de la request, un objeto que contiene el nombre de usuario y la contraseña
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'mastermind', password: '4321'})
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
        let pokemonName = 'Bulbasaur';
        // .send({user: 'mastermind', password: '4321') enviamos en el body de la request, un objeto que contiene el nombre de usuario y la contraseña
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'sergio', password: '1234'})
            .end((err, res) => {
                let token = res.body.token;
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .post('/teams/pokemons')
                    .send({name: pokemonName})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .get('/teams')
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                // tiene equipo con Charizard y Blastoise
                                // { trainer: 'mastermind', team: [Pokemon]}
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.trainer, 'sergio');
                                chai.assert.equal(res.body.team.length, 1);
                                chai.assert.equal(res.body.team[0].name, pokemonName);
                                chai.assert.equal(res.body.team[0].pokedexNumber, 1);
                                done();
                            });
                    });
            });
    });
});