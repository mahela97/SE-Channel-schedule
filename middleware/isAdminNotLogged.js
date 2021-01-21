module.exports = {
  isAdminNotLogged: (req, res, next) => {
    if (!req.session.user_id) {
      next();
    } else {
      res.redirect("admin/home");
    }
  },
};
