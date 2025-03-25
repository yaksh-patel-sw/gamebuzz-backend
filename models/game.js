// services/gameService.js
const pool = require('../config/db');  // Import the database connection pool

const gameService = {
  async getAllGames() {
    try {
      const result = await pool.query('SELECT * FROM games');
      return result.rows;  // Returning all games
    } catch (error) {
      throw new Error('Error fetching games from database');
    }
  },

  async getByGameId(id) {
    try {
      const result = await pool.query('SELECT * FROM games WHERE id = $1', [id]);
      return result.rows[0];  // Return a single game by ID
    } catch (error) {
      throw new Error('Error fetching game from database');
    }
  },

  async create(title, description, imageUrl, releaseDate, screenshots) {
    try {
      const result = await pool.query(
        'INSERT INTO games (title, description, image_url, release_date, screenshots) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, description, imageUrl, releaseDate, JSON.stringify(screenshots)]  // Using JSON.stringify for screenshots array
      );
      return result.rows[0];  // Returning the newly created game
    } catch (error) {
      throw new Error('Error creating new game');
    }
  },

  async update(id, title, description, imageUrl, releaseDate, screenshots) {
    try {
      const result = await pool.query(
        'UPDATE games SET title = $1, description = $2, image_url = $3, release_date = $4, screenshots = $5 WHERE id = $6 RETURNING *',
        [title, description, imageUrl, releaseDate, JSON.stringify(screenshots), id]
      );
      return result.rows[0];  // Returning the updated game
    } catch (error) {
      throw new Error('Error updating game');
    }
  },

  async delete(id) {
    try {
      const result = await pool.query('DELETE FROM games WHERE id = $1 RETURNING *', [id]);
      return result.rows[0];  // Return the deleted game
    } catch (error) {
      throw new Error('Error deleting game');
    }
  }
};

module.exports = gameService;
