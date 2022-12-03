import { DataTypes, Model } from "sequelize";
import { connection } from '../database/index.mjs';


export class Game extends Model { }

Game.init({
    team_01_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    team_02_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    team_01_goals: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaltValue: 0,
    },
    team_02_goals: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaltValue: 0,
    },
    game_date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize: connection,
    modelName: 'tb_games',
}
);
// Shot.belongsTo(Player, {foreignKey: 'id'});
// Shot.belongsTo(Game, {foreignKey: 'id'});
// Game.hasMany(Shot, {foreignKey: 'game_id'});
// Player.hasMany(Shot, {foreignKey: 'player_id'});