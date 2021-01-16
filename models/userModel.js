const pool = require("../config/database");

module.exports = {
  //ADD USER TO THE DATABASE
  createRegisteredUser: (data, callBack) => {
    pool.query(
      `
        INSERT INTO user (first_name,last_name,email, password) VALUES (?,?,?,?, ?);
        `,
      [data.first_name, data.last_name, data.email, data.password],
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
        ` SELECT email,type,password FROM USER WHERE email=?;`,
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
