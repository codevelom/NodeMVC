const conn = require("../config/connection");

module.exports = {
  createUserService: (data, callback) => {
    // check duplicate data
    conn.query(
      `INSERT INTO users (fullname,email,password,phone) VALUES (?,?,?,?)`,
      [data.fullname, data.email, data.password, data.phone],
      (err, result) => {
        if (err) {
          return callback(err);
        }

        return callback(null, result);
      }
    );
  },

  // get all user service
  getAllUserService: (callback) => {
    conn.query(`SELECT * FROM users`, (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(null, result);
    });
  },

  // get user by id service
  getUserbyIdService: (id, callback) => {
    conn.query(`SELECT * FROM users WHERE id=?`, [id], (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(null, result);
    });
  },

  loginService: (email, callback) => {
    conn.query(`SELECT * FROM users WHERE email=?`, [email], (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(null, result);
    });
  },

  storeAccessTokenService: ([userID, jwtoken, time], callback) => {
    conn.query(`INSERT INTO oauth_access_token (user_id,access_token,created_at) VALUES (?,?,?)`, [
      userID,
      jwtoken,
      time
    ], (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(null, result);
    });
  },

  getStoredTokenService: (userID, callback) => {
    conn.query(`SELECT * FROM oauth_access_token WHERE user_id=?`, [userID], (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(null, result);
    });
  },

  deleteExpiredTokenService: (userID, callback) => {
    conn.query(`DELETE FROM oauth_access_token WHERE user_id=?`, [userID], (err, result) => {
      if (err) {
        return callback(err)
      }

      return callback(null, result);
    });
  }
};