module.exports = {
  //RENDER STAFF HOMEPAGE

  staffHomepage: (req, res) => {
    console.log(req.session.user_id);
    res.render("staff/home-staff");
  },
};
