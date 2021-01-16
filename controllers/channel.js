const { error } = require("console");
const url = require("url");
const db = require("../config/database");
const {
  getchannel,
  gettimeslot,
  getday,
  scheduleChannel,
  getTimeTable,
  getprogramTable,
  addfeedback,
} = require("../models/userModel");
exports.get_channel = async (req, res) => {
  console.log(req.url);
  if (req.url != "/timetable") {
    const channels = await getchannel();
    const timetable = await getTimeTable(req.params.id);
    console.log(timetable);
    res.locals.channel = { channel: channels, timetable: timetable };
    res.locals.ch = req.params.id;
  } else {
    const channels = await getchannel();
    const timetable = "";
    res.locals.channel = { channel: channels, timetable: timetable };
  }
  res.render("user/timetable");
};

exports.getschedulel = async (req, res) => {
  const timeSlot = await gettimeslot();
  const day = await getday();
  console.log(day);
  const timetable = await getTimeTable("channel 2");
  res.locals.channel = { timeslot: timeSlot, day: day, timetable: timetable };

  res.render("staff/schedule");
};
exports.schedulel = async (req, res) => {
  console.log(req.body);
  scheduleChannel(req.body);
  res.redirect("schedule");
};
exports.get_program = async (req, res) => {
  console.log(req.session.user_id);
  if (req.url != "/addfeedback") {
    const channels = await getchannel();
    const programTable = await getprogramTable(req.params.id);
    console.log(programTable);
    res.locals.channel = { channel: channels, programTable: programTable };
    res.locals.ch = req.params.id;
  } else {
    const channels = await getchannel();
    const programTable = "";
    res.locals.channel = { channel: channels, programTable: programTable };
  }
  res.render("user/addfeedback");
};

exports.addfeedback = async (req, res) => {
  console.log(req.body);
  addfeedback(req.body, "22");
  res.redirect(req.url);
};
