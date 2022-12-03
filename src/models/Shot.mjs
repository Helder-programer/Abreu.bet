import { DataTypes, Model } from "sequelize";
import { connection } from '../database/index.mjs';

export class Shot extends Model { }

Shot.init({
    team_01_shot: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    team_02_shot: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },

    green: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'no',
        validate: {
            isIn: [['yes', 'no']],
        },

    },

    player_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'tb_players', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        primaryKey: true,
    },
    game_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'tb_games', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        primaryKey: true,
    }


}, {
    sequelize: connection,
    modelName: 'tb_shots',
    timestamps: false,
    initialAutoIncrement: false,
});