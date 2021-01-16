const pool = require("../config/database");

module.exports = {
  //ADD USER TO THE DATABASE
  createRegisteredUser: (data, callBack) => {
    pool.query(
      `
        INSERT INTO user (first_name,last_name,type,email, password) VALUES (?,?,?,?,?);
        `,
      [data.first_name, data.last_name, "user", data.email, data.password],
      (err, result) => {
        if (err) {
          console.log(err);
          return callBack(err);
        } else {
          console.log(result);
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
