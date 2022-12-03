import { Sequelize } from "sequelize";
import dbConfig from "../config/database.mjs";
export const connection = new Sequelize(dbConfig);