// //Node-modules
var passport 	    = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//Database File
var crud = require('../Database/data.js');

// //Signup authentication
passport.use('signup', new LocalStrategy({

       usernameField : "Email",
       passwordField : "Password",
       passReqToCallback: true
}, 
   function (req, Email, Password, done) {
      
      //process.nextTick(function() {

      crud.findOne({Email:Email},function (err, user) {
        
         if (err) {

            return done(err);
         }

         if (user) {

            return done(null, false, req.flash("err", "Email is already used"));
         }

          else{

               var data = new crud();
                 
                 data.Password = data.generateHash(Password);
                 data.Email    = Email;
                 data.Username = req.body.Username;
                 data.Name     = req.body.Name;
                 data.Confirm  = req.body.Confirm;

                   data.save(function (err) {
                      
                      if (err) 

                        throw err;
                           
                           console.log(data);
                      return done(null, data, req.flash("suc", "You have successfully sign up and can you now login"));
              })
            }
        });
     })
   )
//));
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

           if (!user.validPassword(Password)) {

                //return done(null, false, console.log("Invalid Password"));
                return done(null, false, req.flash("err", "Invalid Password"))
           }

             return done(null, user);
      })
   }
));