import express from "express";
import playerController from "./controllers/playerController.mjs";
import gameController from "./controllers/gameController.mjs";
import shotController from "./controllers/shotController.mjs";
import { Player } from "./models/Player.mjs";
export const routes = express.Router();


//PLAYERS
routes.get('/players', playerController.showPlayers);
routes.get('/register_player', playerController.playerRegistrationForm);
routes.get('/delete_player/:id', playerController.deletePlayer);
routes.post('/add_player', playerController.addPlayer);
routes.get('/edit_player/:id', playerController.playerAlterationForm);
routes.post('/update_player/:id', playerController.updatePlayer);
//GAMES
routes.get('/', gameController.showGames);
routes.get('/register_game', gameController.gameRegistrationForm);
routes.post('/add_game', gameController.addGame);
routes.get('/delete_game/:id', gameController.deleteGame);
routes.get('/edit_game/:id', gameController.gameAlterationForm);
routes.post('/update_game/:id', gameController.updateGame);
//SHOTS
routes.get('/shots', shotController.showShots);
routes.get('/register_shot', shotController.shotRegistrationForm);
routes.post('/add_shot', shotController.addShot);
routes.get('/delete_shot/:gameid/:playerid', shotController.deleteShot);