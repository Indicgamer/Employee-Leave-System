const adminAuthController = async (req, res) => {
    const {name,password} = req.body;
    if(name == "admin" && password == "admin123"){
        req.session.isAdminLoggedIn = true;
        return res.status(200).send({
            success: true,
            message: "Logged in"
        });
    }else{
        return res.status(400).send({
            success: false,
            message: "Invalid credentials"
        });
    }
}

const adminLogoutController = async (req, res) => {
    req.session.isAdminLoggedIn = false;
    res.redirect("/");
}

module.exports = {adminAuthController,adminLogoutController};