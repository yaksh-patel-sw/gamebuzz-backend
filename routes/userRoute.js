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

// Create Team
router.post('/create-team', async (req, res) => {
  const { gameId, gameMode, adminName, adminNumber, adminEmail, teamName, teamMemberCount } = req.body;
  try {
    const newTeam = await authService.createTeam(gameId, gameMode, adminName, adminNumber, adminEmail, teamName, teamMemberCount);
    res.status(201).json(newTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add Team Member
router.post('/add-team-member', async (req, res) => {
  const { teamId, memberName, memberId, role } = req.body;
  try {
    const newMember = await authService.addTeamMember(teamId, memberName, memberId, role);
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Send Team ID Email
router.post('/send-team-id-email', async (req, res) => {
  const { adminEmail, teamId } = req.body;
  try {
    await authService.sendTeamIdEmail(adminEmail, teamId);
    res.json({ message: 'Team ID sent to email' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;