//Node-modules
var express       = require('express');
var flash         = require('connect-flash');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app           = express();

//Database & Passport Files
var crud = require('../Database/data.js');
var pass = require('../Passport/pass.js');

//Question & answer routes
app.get('/home', function (req, res) {
    
    res.render('main.ejs')
});

app.get('/question', function (req, res) {
    
    res.render('qans.ejs')
});

app.get('/result', function (req, res) {
    
    res.render('result.ejs')
});

app.get('/answer', function (req, res) {
    
    res.render('answer.ejs')
});

//Passport Rotes

app.get("/", function (req, res) {
   
    res.render('sign.ejs', {
      
        error   : req.flash('err') 
    });
});

app.get("/login", function (req, res) {
   
    res.render('login.ejs', {

        message : req.flash("suc"), 
        error   : req.flash('err') 
    });
});

app.get("/profile", function (req, res) {
   
    res.render('profile.ejs')
});

app.get('/logout', function (req, res) {
    
    req.logout();
    res.redirect('/');
    
});

//Sign-up Post routes.
app.post('/sign', passport.authenticate('signup', {

        successRedirect: 'login',
        failureRedirect: '/',
        failureFlash: true

}));

//Log in post routes.
app.post('/login', passport.authenticate('login', {
         
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash   : true 
   })
);

module.exports = app;