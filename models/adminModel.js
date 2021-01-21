const pool = require("../config/database");

module.exports = {
  findAdmin: (email) => {
    return new Promise((resolve, reject) => {
      pool.query(
        ` SELECT email,type,password FROM ADMIN WHERE email=?;`,
        [email],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(result);
            resolve(result[0]);
          }
        }
      );
    });
  },

  createAdmin: (data, callBack) => {
    pool.query(
      `
        INSERT INTO admin (email, password,type) VALUES (?,?, ?);
        `,
      [data.email, data.password, "admin"],
      (err, result) => {
        if (err) {
          return callBack(err);
        } else {
          return callBack(null, result);
        }
      }
    );
  },

  getChannel: (data) => {
    console.log(data);
    return new Promise((resolve, reject) => {
      pool.query(
        `select * from channel where channel_name=?`,
        [data],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  addChannel: (data) => {
    console.log(data);
    return new Promise((resolve, reject) => {
      pool.query(
        `insert into channel (channel_id,channel_name) values (?,?)`,
        [data.channelname + 123, data.channelname],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result[0]);
          }
        }
      );
    });
  },
};
