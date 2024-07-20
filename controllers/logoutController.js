const logoutController = (req, res) => {
    req.session.isLoggedIn = false;
    req.session.name = null;
    res.redirect("/");
};

module.exports = logoutController;