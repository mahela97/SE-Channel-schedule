const pool = require("../config/database");

module.exports = {
  createStaffMember: (data, callBack) => {
    pool.query(
      `
        INSERT INTO staff (staff_id,email, password,channel_id) VALUES (?,?, ?,?);
        `,
      [data.staff_id, data.email, data.password, data.channel_id],
      (err, result) => {
        if (err) {
          return callBack(err);
        } else {
          return callBack(null, result);
        }
      }
    );
  },

  //FIND MEMBER BY EMAIL
  findUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      pool.query(
        ` SELECT email,password FROM staff WHERE email=?;`,
        [email],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result[0]);
          }
        }
      );
    });
  },
};
