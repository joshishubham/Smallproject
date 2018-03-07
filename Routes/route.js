//Node-modules
var express       = require('express');
var flash         = require('connect-flash');
var passport      = require('passport');
var bcrypt        = require('bcryptjs');
var app           = express();

//Database & Passport Files
var crud = require('../Database/data.js');
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

app.get('/profile', isLoggedIn, function(req, res) {
    
    res.render('profile.ejs', {
        
        user : req.user
    
    });
});

app.get('/forget', function (req, res) {
     
    res.render('forget.ejs')

});

app.get('/try', function (req, res) {
      
    res.sendFile(__dirname + "/try.json");

});

app.get('/logout', isLoggedIn,function (req, res) {
    
    req.logout();
    res.redirect('/login');
    
});

//Sign-up Post routes.
app.post('/sign', passport.authenticate('/sign', {

    successRedirect: 'login',
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

function isLoggedIn(req, res, next) {
 
    if (req.isAuthenticated()){

      return next();
      
    }
 
    else{

      res.redirect('/login');      
    }
}

//Edit Data in Database, editing in profile routes...
app.put('/sign/:id', function (req, res) {
     
      var Password = req.body.Password;

      req.body.Password = bcrypt.hashSync(Password, bcrypt.genSaltSync(8), null);

     crud.update({_id: req.params.id}, req.body, function (err, show) {
             
             if (err) {

                 throw err;

              }

             else{

                  res.json(show)
              }
     });
});

app.delete('/sign/:id', function (req, res) {
     
     crud.remove({_id: req.params.id}, function (err, show) {
            
             if (err) {

                 throw err;

              }

             else{

                  res.json(show)
              }
     })
})
module.exports = app;