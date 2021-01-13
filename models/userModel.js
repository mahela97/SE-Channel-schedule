const pool = require("../config/database");

module.exports = {
  createRegisteredUser: (data, callBack) => {
    pool.query(
      `
        INSERT INTO user (user_id,email, password) VALUES (?,?, ?);
        `,
      [data.user_id, data.email, data.password],
      (err, result) => {
        if (err) {
          return callBack(err);
        } else {
          return callBack(null, result);
        }
      }
    );
  },
  findUserByEmail: (data, callBack) => {},
};
