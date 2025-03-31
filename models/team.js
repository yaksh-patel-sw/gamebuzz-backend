const pool = require('../config/db');

const Team = {
    async create(gameId, gameMode, adminName, adminNumber, adminEmail, teamName, teamMemberCount) {
      const result = await pool.query(
        'INSERT INTO teams (game_id, game_mode, admin_name, admin_number, admin_email, team_name, team_member_count) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [gameId, gameMode, adminName, adminNumber, adminEmail, teamName, teamMemberCount]
      );
      return result.rows[0];
    },
    async addMember(teamId, memberName, memberId, role) {
      const result = await pool.query(
        'INSERT INTO team_members (team_id, member_name, member_id, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [teamId, memberName, memberId, role]
      );
      return result.rows[0];
    },
  };
  
  module.exports = Team;