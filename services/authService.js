const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Team = require('../models/team');
const User = require('../models/user');
const { OAuth2Client } = require('google-auth-library');
const nodemailer = require('nodemailer');
require('dotenv').config();

const authService = {
  async register(username, password, email, firstName, lastName, mobileNumber, gameSelection, dateOfBirth, termsAccepted) {
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create(username, hashedPassword, null, email, firstName, lastName, mobileNumber, gameSelection, dateOfBirth, termsAccepted);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    await User.updateVerificationCode(newUser.id, verificationCode);
    await this.sendVerificationEmail(newUser.email, verificationCode);
    return newUser;
  },
  async sendVerificationEmail(email, verificationCode) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email',
      text: `Your verification code is: ${verificationCode}`,
    };
    await transporter.sendMail(mailOptions);
  },
  async verifyEmail(userId, verificationCode) {
    const user = await User.verifyEmail(userId, verificationCode);
    if (!user) {
      throw new Error('Invalid verification code');
    }
    return user;
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
      user = await User.create(username, '', googleId, email, null, null, null, null, null, false);
    }

    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    return token;
  },

  async createTeam(gameId, gameMode, adminName, adminNumber, adminEmail, teamName, teamMemberCount) {
    const newTeam = await Team.create(gameId, gameMode, adminName, adminNumber, adminEmail, teamName, teamMemberCount);
    return newTeam;
  },
  async addTeamMember(teamId, memberName, memberId, role) {
    const newMember = await Team.addMember(teamId, memberName, memberId, role);
    return newMember;
  },
  async sendTeamIdEmail(adminEmail, teamId) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: 'Your Team ID',
      text: `Your team ID is: ${teamId}`,
    };
    await transporter.sendMail(mailOptions);
  },
};

module.exports = authService;