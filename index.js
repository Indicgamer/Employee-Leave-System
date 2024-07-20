const express = require("express");
const ejs = require("ejs");
const mongoose = require('mongoose');
const session = require('express-session');
const Path = require('path');
require('dotenv').config();




mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
    });


const PORT = 3000;

const app = express();


app.set('views', Path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));




// app.use("/auth",require("./routes/APIauthRouter"));
app.use("/info", require("./routes/InfoRouter"));
app.use("/auth/admin",require("./routes/authAdminRouter"));
app.use("/helper",require("./routes/helperRouter"));


app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/home",(req,res)=>{
    if(req.session.isLoggedIn){
        res.render("empLogin");
    }
    else{
        res.redirect("/");
    }
}); 




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    }
);

module.exports = app;