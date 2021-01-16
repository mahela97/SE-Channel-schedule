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
        ` SELECT email,password FROM USER WHERE email=?;`,
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
 gettimeslot: () => {
    return new Promise((resolve, reject) => {
      pool.query(
        ` SELECT timeslot_id,start_time,end_time FROM timeslot;`,
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
           var ch={};
              for(j=0; j<result.length; j++){
                        var trendprod = j;
                        var prodValue = {'channelname':result[j].channel_name};
                        //result_len=result_len-1;
                        ch[result[j].timeslot_id] =[result[j].timeslot_id,result[j].start_time +" - " + result[j].end_time];

            }
         
            resolve(ch);
          }
        }
      );
    });
  },
  getday: () => {
    return new Promise((resolve, reject) => {
      pool.query(
        ` SELECT day_id,day FROM day;`,
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
           var ch={};
              for(j=0; j<result.length; j++){
                      //  var trendprod = j;
                       // var prodValue = {'channelname':result[j].channel_name};
                        //result_len=result_len-1;
                        ch[result[j].day_id] =[result[j].day_id,result[j].day];

            }
         
            resolve(ch);
          }
        }
      );
    });
  },
 getchannel: () => {
    return new Promise((resolve, reject) => {
      pool.query(
        ` SELECT channel_name FROM channel;`,
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
           var ch={};
              for(j=0; j<result.length; j++){
                        var trendprod = j;
                        var prodValue = {'channelname':result[j].channel_name};
                        //result_len=result_len-1;
                        ch[trendprod] =result[j].channel_name ;

            }
         
            resolve(ch);
          }
        }
      );
    });
  },
  scheduleChannel: (details, callBack) => {
  pool.query(
        ` SELECT * FROM programs where  channel_id=? and program_id=?;`,["1",details.programme_id],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if (result.length > 0) {
           
              pool.query("select * from `programtime` where `timeslot_id`=? and `channel_id`=? and `day_id`=?;", [details.time, "1",details.day],
                    (err, result) => { 

                      if (err) {

                      }
                      else { 
                        if (result.length > 0) {
                          pool.query("update `programtime` set `program_id`=?,`day_id`=?,`timeslot_id`=?,`channel_id`=? WHERE   `timeslot_id`=? and `channel_id`=? and `day_id`=?;", [details.programme_id, details.day, details.time, "1", details.time, "1",details.day],
                            (err, result) => {
                                  if (err) {
                    console.log(err);
                  // return callBack(err);
                  } else {
                    console.log(result);
                  // return callBack(null, result);
                  }
                            });
                        }
                        else {
                           pool.query("INSERT INTO `programtime`(`program_id`, `day_id`, `timeslot_id`,`channel_id`) VALUES (?,?,?,?);", [details.programme_id, details.day, details.time,"1"],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  // return callBack(err);
                  } else {
                    console.log(result);
                  // return callBack(null, result);
                  }
                });
                        }
                      }
                    });
            }
            else { 
              pool.query(
              `INSERT INTO programs (program_id,channel_id, program_name) VALUES (?,?, ?);`,
              [details.programme_id, "1", details.programme],
              (err, result) => {
                if (err) {
                // return callBack(err);
                  console.log(err);
       
                } else {
              pool.query("select * from `programtime` where `timeslot_id`=? and `channel_id`=? and `day_id`=?;", [details.time, "1",details.day],
                    (err, result) => { 

                      if (err) {

                      }
                      else { 
                        if (result.length > 0) {
                          pool.query("update `programtime` set `program_id`=?,`day_id`=?,`timeslot_id`=?,`channel_id`=? WHERE    `timeslot_id`=? and `channel_id`=? and `day_id`=?;", [details.programme_id, details.day, details.time, "1", details.time, "1",details.day],
                            (err, result) => {
                        if (err) {
                    console.log(err);
                  // return callBack(err);
                  } else {
                    console.log(result);
                  // return callBack(null, result);
                  }
                            });
                        }
                        else {
                           pool.query("INSERT INTO `programtime`(`program_id`, `day_id`, `timeslot_id`,`channel_id`) VALUES (?,?,?,?);", [details.programme_id, details.day, details.time,"1"],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  // return callBack(err);
                  } else {
                    console.log(result);
                  // return callBack(null, result);
                  }
                });
                        }
                      }
                    });
                 
              //   return callBack(null, result);
        }
      }
    );
              
            }
          
          
         
           
          }
        }
      );
  
  },
getTimeTable: (channelname) => {
    return new Promise((resolve, reject) => {
      pool.query(
        ` select p.program_name,t.start_time,t.end_time,d.day,c.channel_name, t.timeslot_id from programtime as pt left outer join channel as c using(channel_id) left outer join programs as p using(program_id) left outer join timeslot as t using(timeslot_id) left outer join day as d using(day_id)   where c.channel_name=? order by (d.day_id);
`,channelname,
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            var ch = {};
            var slot = {};
            var slot2 = {};
            var slot3 = {};
            var slot4 = {};
            var slot5 = {};
            var slot6 = {};
            var slot7 = {};
            var slot8 = {};
            var slot9 = {};
            var slot10 = {};
            var slot11 = {};
            var slot12 = {};
            var slot13 = {};
            var slot14 = {};
            var slot15 = {};
            var slot16 = {};
            var slot17 = {};
            var slot18 = {};
            for (j = 0; j < result.length; j++){
                 var pro = result[j].day;
                if (result[j].timeslot_id == "2") {
                  slot[pro]= {"name":result[j].program_name,"time":result[j].start_time+" - "+result[j].end_time, "day":result[j].day};
                }
                else if (result[j].timeslot_id == "3") { 
slot2[pro]= {"name":result[j].program_name,"time":result[j].start_time+" - "+result[j].end_time, "day":result[j].day};
                }
                else if (result[j].timeslot_id == "4") { 
slot3[pro]= {"name":result[j].program_name,"time":result[j].start_time+" - "+result[j].end_time, "day":result[j].day};
                }
                else if (result[j].timeslot_id == "5") { 
slot4[pro]= {"name":result[j].program_name,"time":result[j].start_time+" - "+result[j].end_time, "day":result[j].day};
                }
                else if (result[j].timeslot_id == "6") { 
 slot5[pro]= {"name":result[j].program_name,"time":result[j].start_time+" - "+result[j].end_time, "day":result[j].day};
                }
                else if (result[j].timeslot_id == "7") { 
slot6[pro]= {"name":result[j].program_name,"time":result[j].start_time+" - "+result[j].end_time, "day":result[j].day};
                }
                else if (result[j].timeslot_id == "8") { 
slot7[pro]= {"name":result[j].program_name,"time":result[j].start_time+" - "+result[j].end_time, "day":result[j].day};
                }
                else if (result[j].timeslot_id == "9") { 
                  slot8[pro]= {"name":result[j].program_name,"time":result[j].start_time+" - "+result[j].end_time, "day":result[j].day};
                }
                else if (result[j].timeslot_id == "10") { 
slot9[pro]= {"name":result[j].program_name,"time":result[j].start_time+" - "+result[j].end_time, "day":result[j].day};
                }
                else if (result[j].timeslot_id == "11") { 
slot10[pro]= {"name":result[j].program_name,"time":result[j].start_time+" - "+result[j].end_time, "day":result[j].day};
                }
                else if (result[j].timeslot_id == "12") { 
slot11[pro]= {"name":result[j].program_name,"time":result[j].start_time+" - "+result[j].end_time, "day":result[j].day};
                }
                else if (result[j].timeslot_id == "13") { 
slot12[pro]= {"name":result[j].program_name,"time":result[j].start_time+" - "+result[j].end_time, "day":result[j].day};
                }
                else if (result[j].timeslot_id == "14") { 
slot13[pro]= {"name":result[j].program_name,"time":result[j].start_time+" - "+result[j].end_time, "day":result[j].day};
                }
                else if (result[j].timeslot_id == "15") { 
slot14[pro]= {"name":result[j].program_name,"time":result[j].start_time+" - "+result[j].end_time, "day":result[j].day};
                }
                else if (result[j].timeslot_id == "16") { 
slot15[pro]= {"name":result[j].program_name,"time":result[j].start_time+" - "+result[j].end_time, "day":result[j].day};
                }
                else if (result[j].timeslot_id == "17") { 
slot16[pro]= {"name":result[j].program_name,"time":result[j].start_time+" - "+result[j].end_time, "day":result[j].day};
                }
                else if (result[j].timeslot_id == "18") { 
slot17[pro]= {"name":result[j].program_name,"time":result[j].start_time+" - "+result[j].end_time, "day":result[j].day};
                }
                else if (result[j].timeslot_id == "19") { 
slot18[pro]= {"name":result[j].program_name,"time":result[j].start_time+" - "+result[j].end_time, "day":result[j].day};
                }
                        var prodValue = {'channelname':result[j].channel_name};
                        //result_len=result_len-1;
               

            }
          ch = {slot,slot2,slot3,slot4,slot5,slot6,slot7,slot8,slot9,slot10,slot11,slot12,slot13,slot14,slot15,slot16,slot17,slot18};
            resolve(ch);
          }
        }
      );
    });
  },

  getprogramTable: (channelname,userid) => {
    return new Promise((resolve, reject) => {
    pool.query("select * from programs left outer join channel using(channel_id) left outer join stared_program as fp using(program_id) where channel_name=? and (fp.user_id is null or user_id=?);", [channelname,"22"], (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        var program = {};
        const fre = result;
        for (j = 0; j < fre.length; j++) {
          var pro = "program" + j;
          const prId = fre[j].program_id;
          const prname = fre[j].program_name;
         
          // var prodValue = {'channelname':result[j].channel_name};
          //result_len=result_len-1;
       program[pro] = { "name": prname, "id": prId, "fav":result[j].user_id};

        }
        
           console.log( program);
        resolve(program);
      }
    });
  });
  },
  addfeedback: (data, userid) => {
    if (data.addfeedback != "") { 
 pool.query(
     "INSERT INTO `feedbacks`(`user_id`, `feedback`, `program_id`) VALUES (?,?,?);",[userid,data.addfeedback,data.proid],
      (err, result) => {
        if (err) {
           console.log(err);
         
        } else {
           console.log(result);
         
        }
      }
    );
    }
    console.log(data.fav);
      pool.query(
     "select * from `stared_program` where `user_id`=? and  `program_id`=? ;",[userid,data.proid],
      (err, result) => {
        if (err) {
           console.log(err);
         
        } else {
          if (result.length > 0) {
            
            if (!data.fav) { 
pool.query(
     "delete  from `stared_program` where `user_id`=? and `program_id`=? ;",[userid,data.proid],
      
      (err, result) => {
        if (err) {
           console.log(err);
         
        } else {
             console.log(result);
        }
      }
    );

            }
          }
          else { 
           if (data.fav) {
 pool.query(
     "INSERT INTO `stared_program`(`user_id`, `program_id`) VALUES (?,?);",[userid,data.proid],
      
      (err, result) => {
        if (err) {
           console.log(err);
         
        } else {
           console.log(result);
        }
      }
    );
            }
           
          }
        }
      }
    );



 

   
  
  },
};
