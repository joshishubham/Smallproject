var express = require('express');
var multer  = require('multer');
var app     = express();

var fileSize = Infinity;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + file.originalname)
        console.log("heelllo")
}
  });

var upload = multer({
    storage: storage,
    limits: {fileSize}
}).single('Image');

app.post('/image',function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            throw err;
        } else {
            console.log(req.file);
            res.redirect('/profile');
        }
    })
});

module.exports = app;