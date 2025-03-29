const express = require('express');
const authService = require('../services/authService');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, password, email, firstName, lastName, mobileNumber, gameSelection, dateOfBirth, termsAccepted } = req.body;
  try {
    const user = await authService.register(username, password, email, firstName, lastName, mobileNumber, gameSelection, dateOfBirth, termsAccepted);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await authService.login(username, password);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Google Login
router.post('/login/google', async (req, res) => {
  const { idToken } = req.body;
  try {
    const token = await authService.googleLogin(idToken);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;