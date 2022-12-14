import { Game } from '../models/Game.mjs';
import { Player } from '../models/Player.mjs';
import { Shot } from '../models/Shot.mjs';
import { QueryTypes } from 'sequelize';
import { addPointsToPlayer } from './utils.mjs';
import { formatDate } from './utils.mjs';


export default {
    async addPlayer(req, res) {
        let { name } = req.body;
        if (name != "" && name != null) {
            await Player.create({ name: name }).then(() => {
                res.redirect('/players');
            }).catch((err) => {
                res.send(`Algo deu errado. ${err}`);
            });
        } else {
            res.send('Preencha todos os campos');
        }
    },

    async showPlayers(req, res) {
        try {
            let player = await Player.findAll({ order: [['points', 'DESC']] });
            res.render('players', { player });
        } catch (err) {
            res.send(`Algo deu errado. ${err}`);
        }
    },

    async deletePlayer(req, res) {
        Player.destroy({ where: { 'id': req.params.id } }).then(() => {
            res.redirect('/players');
        }).catch(err => {
            res.send(`Algo deu errado. ${err}`);
        });
    },

    async playerRegistrationForm(req, res) {
        res.render('playerRegistrationForm');
    },

    async playerAlterationForm(req, res) {
        try {
            let playerId = req.params.id;
            let player = await Player.findByPk(playerId)
            res.render('playerAlterationForm', { player });
        } catch (err) {
            res.send(`Algo deu errado. ${err}`);
        }
    },

    async updatePlayer(req, res) {
        let { name } = req.body;
        let playerId = req.params.id;
        if (name != "" && name != null) {
            Player.update({ name }, { where: { 'id': playerId } }).then(() => {
                res.redirect('/players');
            }).catch((err) => {
                res.send(`Algo deu errado. ${err}`);
            });
        } else {
            res.send('Preencha todos os campos');
        }
    }
}