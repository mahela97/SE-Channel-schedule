const pool = require("../config/database");

module.exports = {
  createStaffMember: (data, callBack) => {
    pool.query(
      `
        INSERT INTO staff (user_id,email, password,channel_id) VALUES (?,?, ?);
        `,
      [data.user_id, data.email, data.password, data.channel_id],
      (err, result) => {
        if (err) {
          return callBack(err);
        } else {
          return callBack(null, result);
        }
      }
    );
  },
};
