var nodemailer= require('nodemailer');
var express= require('express');
var app = express();
var datas= require('../Database/data.js');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '844@gmail.com',  //Enter your gmail email address here 
        pass: '@@@@@'  //Enter your gmail password
    }
});

// setup email data with unicode symbols
app.post('/forget', function (req, res) { 
    var Otp= Math.floor(100000 + Math.random() * 900000);

        var data= new datas({Otp});
          data.save(function (err) {
              if (err) {
                  throw err;
                    res.redirect('/login')
              } else {
                  res.redirect('/otp');
                     console.log(data)
              }
          })
            
    let mailOptions = {
        from: '"TrialProject 👻" <trial@example.com>',
        to: req.body.Email,
        subject: Otp+' is your Trial account recovery code',
        html: '<div style="margin-left: 2cm; margin-top: 1.5cm;">'+
              '<h3>We received a request to reset your password.</h3>'+
              '<a href="http://localhost:1223/" style="text-decoration: none; color: steelblue">Click here to change your password.</a>'+
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
            res.send("Link send your email account")
            console.log(info);
        }
    });
});

 module.exports= app;