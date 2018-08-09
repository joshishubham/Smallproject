var nodemailer= require('nodemailer');
var express= require('express');
var app = express();

app.post('/forget', function (req, res) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'uef5rbvubriubz7k@ethereal.email', 
            pass: 'cN9ny1J7nMYCtPzd4s'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <foo@example.com>',
        to: req.body.Email,
        subject: 'We have sent an OTP to your Email address. Please enter it below to complete verifications',
        text: 'Hello world?',
        html: '<a href = "http://localhost:1223/login">Password change</a>'
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        else{
            res.redirect('/login')
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});

module.exports= app;