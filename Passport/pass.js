// //Node-modules
var passport= require('passport');
var LocalStrategy= require('passport-local').Strategy;

//Database File
var datas= require('../Database/data.js');

// //Signup authentication
passport.use('/sign', new LocalStrategy ({
    usernameField: "Email",
    passwordField: "Password",
    passReqToCallback: true   
},
   function (req, Email, Password, done) { 
     
      datas.findOne({Email:Email},function (err, user) {

         if (err) {
            return done(err);
         }

         if (user) {
            return done(null, false, req.flash("err", "Email is already used !"));
            //return done(null, false, console.log( "Email is already used !"));
         }            
         else {
                
          var data = new datas();

            data.Gender= req.body.Gender;
            data.Confirm= req.body.Confirm;
            data.Password= data.generateHash(Password);
            data.Email= Email;
            data.Name= req.body.Name;

              data.save(function (err) {
                if (err){
                  throw err;
                }     
                  return done(null, data)
              });            
            } 
        });
    })
 );

//Login authentication
passport.use('login', new LocalStrategy ({  
    usernameField: "Email",
    passwordField: "Password",
    passReqToCallback: true 
},
   function(req, Email, Password,done){

      datas.findOne({Email:Email}, function (err, user) {

           if (err) {
             return done(err)
           }
           console.log(user);

           if (!user) {
              return done(null, false, req.flash("err", "No user found !"));
              //return done(null, false, console.log("No user found !"))
           }

           if (!user.validPassword(Password)) {
              return done(null, false, req.flash("err", "The password that you've entered is incorrect !"));
              //return done(null, false, console.log("The password that you've entered is incorrect. !"))
           }
             return done(null, user);
      });
    }
));