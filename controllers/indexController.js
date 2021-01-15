module.exports = {
  //RENDER LOGIN PAGE

  loginPage: (req, res) => {
    res.render("login", {
      error: req.query.error,
      email: req.query.email,
    });
  },
};
