var nodemailer= require('nodemailer');
var express= require('express');
var expressValidator= require('express-validator');
var app= express();

//Database File
var datas= require('../Database/data.js');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '844@gmail.com',  //Enter your email address here 
        pass: '@@@@'           //Enter your gmail password
    }
});

// setup otp with unicode code
app.post('/forget', function (req, res, Email) { 
 datas.findOne({Email: req.body.Email}, function (err, user) {
  req.checkBody("Email", "You can't leave this empty.").notEmpty();
    var error= req.validationErrors();
      if (error) {
          console.log(error);
            // return res.redirect('/login')
      } 
      if(!user){
            req.flash('err', 'No account with that email address exists.');
            console.log('No account with that email address exists.');
                res.redirect('/login')
      }
      else {
         var Otp= Math.floor(100000 + Math.random() * 900000);
          user.Otp= Otp;
           user.save(function (err) {
            if (err) {
                throw err;
            }
            else {
               res.redirect('/otp');
                console.log(Otp)
            }
        });

    let mailOptions = {
        from: '"TrialProject 👻" <trial@example.com>',
        to: req.body.Email,
        subject: Otp+' is your Trial account recovery code',
        html: '<div style="margin-left: 2cm; margin-top: 1.5cm;">'+
              '<h3>We received a request to reset your password.</h3>'+
              '<a href="http://localhost:1223/password" style="text-decoration: none; color: steelblue">Click here to change your password.</a>'+
              '<h3>Alternatively, you can enter the following password reset code. </h3>'+
              '<h3 style="padding: 10px; width: 2cm; background-color:grey; text-align: center">'+Otp+
              '</h3>'+'</div>'
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        else{
            console.log(info);
        }
      });
     };
   });
});

//Routes for Otp matching
app.post('/checkOtp', function (req, res, Otp) {
  datas.findOne({Otp: req.body.Otp}, function (err, user) {   
    req.checkBody('Otp', 'Otp is required.').notEmpty();
    req.checkBody('Otp', 'Please enter number value.');
    req.checkBody('Otp', 'Otp is six corrector long.');
 
    var error = req.validationErrors();
        if (error) {
            console.log(error)
            res.redirect('/otp')
        }

        if (!user) {
            req.flash('err', 'You Enter wrong Otp');
                res.redirect('/otp');
        }

        else{
            console.log("success");
            res.redirect('/password');
        }
    });
});

 module.exports= app;