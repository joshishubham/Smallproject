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

        message : req.flash("suc"), 
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

// //Signup authentication
passport.use('signup', new LocalStrategy({

       usernameField : "Email",
       passwordField : "Password",
       passReqToCallback: true
}, 
   function (req, Email, Password, /*Name,*/ done) {
      
    // console.log(req      === arguments[0]); // true
    // console.log(Email    === arguments[1]); // true
    // console.log(Password === arguments[2]); // true
    // console.log(done     === arguments[3]); // true

      crud.findOne({Email:Email},function (err, user) {
        
         if (err) {

            return done(err);
         }

         if (user) {

            return done(null, false, req.flash("err", "Email is already used"));
         }

          else{

               var data = new crud();

                 data.Email    = Email;
                 data.Password = Password;
                 //data.Name     = Name;

                   data.save(function (err) {
                      
                      if (err) 

                        throw err;

                      return done(null, data, req.flash("suc", "You have successfully sign up and can you now login"));
                })
          }
   
     });
   }
));
//Login authentication
passport.use('login', new LocalStrategy ({
       
       usernameField : "Email",
       passwordField : "Password",
       passReqToCallback: true 
},
   function(req, Email, Password,done){

      crud.findOne({Email:Email}, function (err, user) {

           if (err) {

              return done(err)

           }

           if (!user) {

              //return done(null, false, console.log("Invalid Email"));
              return done(null, false, req.flash("err", "Invalid Email"));
           }

           // if (!user.validPassword(Password)) {

           //     return done(null, false, console.log("Invalid Password"));
           //      return done(null, false, req.flash("err", "Invalid Email"))
           // }

             return done(null, user);
      })
   }
))

module.exports = app;