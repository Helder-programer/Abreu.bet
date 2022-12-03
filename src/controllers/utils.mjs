import { Player } from "../models/Player.mjs";
import { Shot } from "../models/Shot.mjs";
import { Game } from "../models/Game.mjs";
import { QueryTypes } from "sequelize";

export function formatDate(myDate) {
    let [day, month, year] = myDate.split('/');
    myDate = new Date(+year, +month - 1, +day);
    return myDate;
}

export async function addPointsToPlayer() {
    let sql = 'select game.team_01_name, game.team_02_name, game.team_01_goals, game.team_02_goals, game.game_date,'
    sql += ' player.name, shot.team_01_shot, shot.team_02_shot, shot.green,shot.game_id, shot.player_id from tb_shots as shot, tb_players as player, tb_games as game'
    sql += ' where shot.game_id = game.id and shot.player_id = player.id'

    let shots = await Shot.sequelize.query(sql, { query: QueryTypes.SELECT });

    try {
        let playerPoints = 0;
        shots[0].forEach(element => {
            if (element.team_01_goals == element.team_01_shot && element.team_02_goals == element.team_02_shot && element.green == 'no') {
                Player.findByPk(element.player_id).then(player => {
                    playerPoints = player.points;
                    playerPoints += 2;
                    Player.update({ points: playerPoints }, { where: { 'id': element.player_id } });
                    Shot.update({ green: 'yes' }, { where: { game_id: element.game_id, player_id: element.player_id } });
                });
            } else if ((element.team_01_goals != element.team_01_shot || element.team_02_goals != element.team_02_shot) && element.green == 'yes') {
                Player.findByPk(element.player_id).then(player => {
                    playerPoints = player.points;
                    playerPoints -= 2;
                    Player.update({ points: playerPoints }, { where: { 'id': element.player_id } });
                    Shot.update({ green: 'no' }, { where: { game_id: element.game_id, player_id: element.player_id } });
                });
            }
        });
    } catch (err) {
        res.send(`Algo deu errado. ${err}`);
    }
}