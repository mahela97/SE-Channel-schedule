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

  findChannelbyId: (user_id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        ` SELECT * FROM channel WHERE channel_id=(select channeld_id from staff where user_id=?);`,
        user_id,
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(result[0].channel_name);
            resolve({ channel_id: result[0].channel_id, channel_name:result[0].channel_name });
          }
        }
      );
    });
  },
};
