const adminAuthController = async (req, res) => {
    const {name,password} = req.body;
    if(name == "admin" && password == "admin123"){
        req.session.isLoggedIn = true;
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

module.exports = adminAuthController;