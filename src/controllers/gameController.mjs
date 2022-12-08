import { Game } from '../models/Game.mjs';
import { Player } from '../models/Player.mjs';
import { Shot } from '../models/Shot.mjs';
import { QueryTypes } from 'sequelize';
import { addPointsToPlayer } from './utils.mjs';
import { formatDate } from './utils.mjs';

export default {
    async addGame(req, res) {
        let { team_01_name, team_02_name, team_01_goals, team_02_goals, game_date } = req.body;
        game_date = formatDate(game_date);

        if (team_01_name != null
            && team_01_name != ""
            && team_01_goals != null
            && team_01_goals != ""
            && team_02_name != null
            && team_01_name != ""
            && team_02_goals != null
            && team_02_goals != ""
            && game_date != ""
            && game_date != null
        ) {
            await Game.create({ team_01_name, team_02_name, team_01_goals, team_02_goals, game_date }).then(() => {
                res.redirect('/');
            }).catch(err => {
                res.send(`Algo deu errado. ${err}`);
            });
        } else {
            res.send('Preencha todos os campos');
        }
    },

    async gameRegistrationForm(req, res) {
        res.render('gameRegistrationForm');
    },

    async showGames(req, res) {
        try {
            let games = await Game.findAll();
            console.log(games);
            res.render('games', { games });
        } catch (err) {
            res.send(`Algo deu errado. ${err}`);
        }
    },

    async deleteGame(req, res) {
        let gameId = req.params.id;
        Game.destroy({ where: { 'id': gameId } }).then(() => {
            res.redirect('/');
        }).catch(err => {
            res.send(`Algo deu errado. ${err}`);
        });
    },

    async gameAlterationForm(req, res) {
        try {
            let gameId = req.params.id;
            let game = await Game.findByPk(gameId);
            res.render('gameAlterationForm', { game });
        } catch (err) {
            res.send(`Algo deu errado. ${err}`);
        }
    },

    async updateGame(req, res) {
        let { team_01_name, team_02_name, team_01_goals, team_02_goals, game_date } = req.body;
        let gameId = req.params.id;
        game_date = formatDate(game_date);

        if (team_01_name != null
            && team_01_name != ""
            && team_01_goals != null
            && team_01_goals != ""
            && team_02_name != null
            && team_01_name != ""
            && team_02_goals != null
            && team_02_goals != ""
            && game_date != ""
            && game_date != null
        ) {
            Game.update({ team_01_name, team_02_name, team_01_goals, team_02_goals, game_date }, { where: { 'id': gameId } }).then(() => {
                res.redirect('/');
            }).catch(err => {
                res.send(`Algo deu errado. ${err}`);
            });
        } else {
            res.send('Preencha todos os campos');
        }

        addPointsToPlayer();
    },



}