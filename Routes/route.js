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

app.get('/logout', isLoggedIn,function (req, res) {
    
    req.logout();
    res.redirect('/login');
    
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

function isLoggedIn(req, res, next) {
 
    if (req.isAuthenticated()){

      return next();
      
    }
 
    else{

      res.redirect('/login');
      
    }
}

//Edit Data in Database, editing in profile routes...
// app.put('/edit/:id', function (req, res) {

//     var edit = 

//        Name = req.body.Name,
//        Username = req.body.Username,
//        Email = req.body.Email,
//        Password = req.body.Password,
//        Confirm = req.body.Confirm

//     req.body.Password = bcrypt.hashSync(Password, bcrypt.genSaltSync(8), null)  
      
//    crud.findByIdAndUpdate({_id: req.params.id},edit, function (err, show) {
            
//             if (err) 
            
//                 throw err;

//             else{
            
//                 res.json(show)
            
//             }

//             console.log(edit)
//      });
// });

module.exports = app;