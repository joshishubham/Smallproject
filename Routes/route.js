//Node-modules
var express= require('express');
var flash= require('connect-flash');
var passport= require('passport');
var bcrypt= require('bcryptjs');
var app= express();

//Database & Passport Files
var datas= require('../Database/data.js');
var pass = require('../Passport/pass.js');

//Question & answer routes
app.get('/home', isLoggedIn, function (req, res) {
    res.render('main.ejs')
});

app.get('/question', isLoggedIn,function (req, res) {
    res.render('qans.ejs')
});

app.get('/result', isLoggedIn,function (req, res) {
    res.render('result.ejs')
});

app.get('/answer', isLoggedIn,function (req, res) {
    res.render('answer.ejs')
});

app.get('/password', function (req, res) {
    res.render('password.ejs');   
});

app.get('/otp', function (req, res) {
    res.render('otp.ejs');   
});

//Passport Rotes
app.get("/", function (req, res) {  
    res.render('sign.ejs', {
        error : req.flash('err'),
        success : req.flash('suc-msg')
    });
});

app.get("/login", function (req, res) {   
    res.render('login.ejs', {
        error : req.flash('err'),
        success : req.flash('suc')
    });
});

app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {        
        user : req.user
    });
});

app.get('/forget', function (req, res) {     
    res.render('otp.ejs')
});

app.get('/logout', isLoggedIn,function (req, res) {
    req.logout();
    res.redirect('/login');
});

//Sign-up Post routes.
app.post('/sign', passport.authenticate('/sign', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: true
}));

//Log in post routes.
app.post('/login', passport.authenticate('login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash   : true 
   })
);

//Logged
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
      return next(); 
    }
    else{
      res.redirect('/login');      
    }
}

//Edit Data in Database, editing in profile routes...
app.post('/sign/:id', function (req, res) {
  var Password = req.body.Password;
  var edit = req.body;
    var salt = bcrypt.genSaltSync(10);
     req.body.Password = bcrypt.hashSync(Password, salt);
      datas.update({_id: req.params.id}, edit, function (err, show) {
         if (err) {
             throw err;
          }
         else{
              res.redirect('/profile')
          }
     });
});

app.post('/delete/:id', function (req, res, done) {
  datas.remove({_id: req.params.id}, function (err, show) {            
       if (err) {
           throw err;
        }
       else{
            res.redirect('/');
            //return done(null, console.log('Successfully deleted'));
            req.flash('suc-msg', 'Successfully deleted')
        }
     })
})

module.exports = app;