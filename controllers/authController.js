const authService = require('../services/authService');

const authController = {
  async register(req, res) {
    const { username, password } = req.body;
    try {
      const user = await authService.register(username, password);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  async login(req, res) {
    const { username, password } = req.body;
    try {
      const token = await authService.login(username, password);
      res.json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = authController;