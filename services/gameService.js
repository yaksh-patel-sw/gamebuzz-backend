// services/gameService.js

const Game = require('../models/game');  // Assuming you have a Game model to interact with your database

const gameService = {
  async getAllGames() {
    return await Game.find();  // Assuming you're using a database model like mongoose
  },
  async getByGameId(id) {
    return await Game.findById(id);  // Assuming you're using mongoose
  },
  async create(title, description, imageUrl, releaseDate, screenshots) {
    const newGame = new Game({
      title,
      description,
      imageUrl,
      releaseDate,
      screenshots
    });
    return await newGame.save();  // Saving the new game to the database
  },
  async update(id, title, description, imageUrl, releaseDate, screenshots) {
    return await Game.findByIdAndUpdate(id, { title, description, imageUrl, releaseDate, screenshots }, { new: true });
  },
  async delete(id) {
    return await Game.findByIdAndDelete(id);
  }
};

module.exports = gameService;
