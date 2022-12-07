import { Game } from '../models/Game.mjs';
import { Player } from '../models/Player.mjs';
import { Shot } from '../models/Shot.mjs';
import { QueryTypes } from 'sequelize';
import { addPointsToPlayer } from './utils.mjs';
import { formatDate } from './utils.mjs';


export default {
    async showShots(req, res) {
        let sql = 'select game.team_01_name, game.team_02_name, game.team_01_goals, game.team_02_goals, game.game_date,'
        sql += ' player.name, shot.team_01_shot, shot.team_02_shot, shot.green, shot.game_id, shot.player_id from tb_shots as shot, tb_players as player, tb_games as game'
        sql += ' where shot.game_id = game.id and shot.player_id = player.id'
        let shots = await Shot.sequelize.query(sql, { query: QueryTypes.SELECT });
        try {
            res.render('shots', { shot: shots[0] });
        } catch (err) {
            res.send(`Algo deu errado. ${err}`);
        }
    },

    async shotRegistrationForm(req, res) {
        await Player.findAll().then(player => {

            Game.findAll().then(game => {
                res.render('shotRegistrationForm', { player, game });
            }).catch(err => {
                res.send(`Algo deu errado. ${err}`);
            });
        }).catch(err => {
            res.send(`Algo deu errado. ${err}`);
        });
    },

    async addShot(req, res) {
        let { player, game, team_01_shot, team_02_shot } = req.body;
        await Shot.create({ team_01_shot, team_02_shot, player_id: player, game_id: game }).catch(err => {
            res.send(`Algo deu errado. ${err}`);
        });

        addPointsToPlayer();
        res.redirect('/shots');
    },

    async deleteShot(req, res) {
        let gameId = req.params.gameid;
        let playerId = req.params.playerid;
        await Shot.findAll({ where: {game_id: gameId, player_id: playerId } }).then((shot) => {
            if (shot[0].green == 'yes') {
                Player.findByPk(playerId).then(player => {
                    let playerPoints = player.points;
                    playerPoints -= 2;
                    Player.update({ points: playerPoints }, { where: { id: playerId } });
                });
            }
            
            Shot.destroy({ where: {game_id: gameId, player_id: playerId } });
            res.redirect('/shots');


        }).catch(err => {
            res.send(`Algo deu errado. ${err}`);
        });
    }

}