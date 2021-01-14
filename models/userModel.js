const pool = require("../config/database");

module.exports = {
  //ADD USER TO THE DATABASE
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

  //FIND USER BY EMAIL
  findUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      pool.query(
        ` SELECT email,password FROM USER WHERE email=?;`,
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
