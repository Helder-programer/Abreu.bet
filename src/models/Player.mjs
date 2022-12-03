import { DataTypes, Model} from "sequelize";
import { connection } from "../database/index.mjs";

export class Player extends Model { }

Player.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }

}, {
    sequelize: connection,
    modelName: 'tb_players',
});