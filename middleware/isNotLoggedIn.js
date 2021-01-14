module.exports = {
  isNotLoggedIn: (req, res, next) => {
    if (!req.session.user_id) {
      next();
    } else {
      res.render("user/home-user");
    }
  },
};
