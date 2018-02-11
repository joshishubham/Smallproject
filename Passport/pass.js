// //Node-modules
// var passport 	    = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

// //DataBase Files
// var crud   = require('../Database/data.js');

// //Sign-up Authentications
// passport.use('signup', new LocalStrategy ({

//      usernameField: "Email",
//      passwordField: "Password"

// }, function(Email, Password, done, req) {

//        crud.findOne({email: Email}, function (err, user, req, body) {
              
//             if (err) {

//                 return done(err)
//             }

//             if (user) {

//                 return done(null, false, console.log("Email alerady exit"));
//             }

//             else{

//                 var data = new crud(req.body)

//                 data.save(function (err) {
                     
//                      if (err) throw err;

//                       return done(null, data)
//                 });
//             }
//        });
//     })
// );

// //Passport Log-in Authentication
// passport.use('login',  new LocalStrategy ({
     
//      usernameField: "Email",
//      passwordField: "Password"

// }, function (Email, Password, done, req) {
       
//        crud.findOne({Email : Email}, function (err, user) {
             
//              if (err) {

//                 return done(err);
//              }

//              if (!user) {
       
//                 return done(null, false, console.log("Incorrect Email"));
//                 //return done(null, false, req.flash("msg", "Incorrect Email"));
//              }

//              // if (!user.verifyPassword(Password)) {
       
//              //    return done(null, false, console.log("Incorrect Password"));
//              //    //return done(null, false, req.flash("msg", "Incorrect Email"));
//              // }

//                 return done(null, user)
//        });
// }));