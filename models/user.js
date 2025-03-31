const pool = require('../config/db');

const User = {
  async findByUsername(username) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  },
  async findByGoogleId(googleId) {
    const result = await pool.query('SELECT * FROM users WHERE google_id = $1', [googleId]);
    return result.rows[0];
  },
  async create(username, password, googleId = null, email = null, firstName = null, lastName = null, mobileNumber = null, gameSelection = null, dateOfBirth = null, termsAccepted = false) {
    const result = await pool.query(
      'INSERT INTO users (username, password, google_id, email, first_name, last_name, mobile_number, game_selection, date_of_birth, terms_accepted, verification_code, is_email_verified) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [username, password, googleId, email, firstName, lastName, mobileNumber, gameSelection, dateOfBirth, termsAccepted, null, false]
    );
    return result.rows[0];
  },
  async updateVerificationCode(userId, verificationCode) {
    const result = await pool.query(
      'UPDATE users SET verification_code = $1 WHERE id = $2 RETURNING *',
      [verificationCode, userId]
    );
    return result.rows[0];
  },
  async verifyEmail(userId, verificationCode) {
    const result = await pool.query(
      'UPDATE users SET is_email_verified = TRUE, verification_code = NULL WHERE id = $1 AND verification_code = $2 RETURNING *',
      [userId, verificationCode]
    );
    return result.rows[0];
  },
};

module.exports = User;