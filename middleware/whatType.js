const whatType = (req, res, next) => {
  if (req.session.type === "user") {
    res.redirect(`user/home`);
  } else if (req.session.type === "user") {
    res.redirect(`staff/home`);
  } else {
    res.redirect(`/`);
  }
};

module.exports.whatType = whatType;
