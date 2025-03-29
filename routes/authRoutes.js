const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const authService = {
  async register(username, password, email, firstName, lastName, mobileNumber, gameSelection, dateOfBirth, termsAccepted) {
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create(username, hashedPassword, null, email, firstName, lastName, mobileNumber, gameSelection, dateOfBirth, termsAccepted);
    return newUser;
  },
  async login(username, password) {
    const user = await User.findByUsername(username);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    return token;
  },
  async googleLogin(idToken) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const googleId = payload['sub'];
    const username = payload['name'];
    const email = payload['email'];

    let user = await User.findByGoogleId(googleId);
    if (!user) {
      user = await User.create(username, '', googleId, email);
    }

    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    return token;
  },
};

module.exports = authService;