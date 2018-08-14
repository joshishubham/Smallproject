var nodemailer= require('nodemailer');
var express= require('express');
var app = express();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '123@gmail.com',  //Enter your gmail email address here 
        pass: '@@@@@@@@@@'  //Enter your gmail password
    }
});

    // setup email data with unicode symbols
app.post('/forget', function (req, res) { 
    let mailOptions = {
        from: '"SmallProject" <foo@example.com>',
        to: req.body.Email,
        subject: 'Recovery code',
        html: '<h3>We have sent an OTP to your Email address. Please enter it below to complete verifications.</h3> <a href = "http://localhost:1223/login">Password change</a>',
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        else{
            res.redirect('/login#');
            console.log(info);
        }
    });
});

 module.exports= app;