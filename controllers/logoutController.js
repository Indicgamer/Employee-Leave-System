const logoutController = (req, res) => {
    req.session.isLoggedIn = false;
    req.session.firstName = null;
    res.redirect("/");
};

module.exports = logoutController;