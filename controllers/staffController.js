module.exports = {
  //RENDER STAFF HOMEPAGE

  staffHomepage: (req, res) => {
    console.log(req.session.user_id);
    res.render("staff/home-staff");
  },

  //ACCOUNT UPDATE PAGE
  accountUpdatePage: (req, res) => {
    return res.render(`staff/accountupdates`, { 
      status: req.query.status,
      error: req.query.error,
    });
  },

  //CHANGE PASSWORD
  accountUpdate: async (req, res) => {
    const body = req.body;
    const { error } = validatePassword(body);
    if (error) {
      return res.redirect(`accountupdates?error=Passwords do not match`);
    }

    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.newpass, salt);
    body.email = req.session.email;
    try {
      saveNewPassword(body, (err, result) => {
        if (err) {
          return res.redirect(`accountupdates?error=Error`);
        } else {
          return res.redirect("accountupdates?status=Success");
        }
      });
    } catch (err) {
      return res.redirect(
        `accountupdates?error=Cannot connect to the database`
      );
    }
  },
};
