// controllers/gameController.js
const gameService = require('../services/gameService');

const gameController = {
  async getAllGames(req, res) {
    try {
      const games = await gameService.getAllGames();
      res.json(games);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  async getGameById(req, res) {
    const { id } = req.params;
    try {
      const game = await gameService.getByGameId(id);
      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }
      res.json(game);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  async create(req, res) {
    const { title, description, imageUrl, releaseDate, screenshots } = req.body;
    try {
      const newGame = await gameService.create(title, description, imageUrl, releaseDate, screenshots);
      res.status(201).json(newGame);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { title, description, imageUrl, releaseDate, screenshots } = req.body;
    try {
      const updatedGame = await gameService.update(id, title, description, imageUrl, releaseDate, screenshots);
      if (!updatedGame) {
        return res.status(404).json({ message: 'Game not found' });
      }
      res.json(updatedGame);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const deletedGame = await gameService.delete(id);
      if (!deletedGame) {
        return res.status(404).json({ message: 'Game not found' });
      }
      res.json({ message: 'Game deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = gameController;
