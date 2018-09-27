var express= require('express');
var multer= require('multer');
var app= express();

//Database File
var datas= require('../Database/data.js');

var storage= multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
            console.log("hello=====")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+'-'+file.originalname);
            console.log("hello===== 1")
    }
});

var upload= multer({
    storage:storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: Infinity
    }
});

function fileFilter(req, file, cb) {
    if (file.mimetype=== "image/jpg" || file.mimetype=== "image/png") {
            cb(null, true, console.log("File upload successfully"));
    }
    else{
        cb(null, false, console.log("file is wrong"));
    }
}

app.post('/image', upload.single('Image'), function (req, res, next) {
    if(req.file=== undefined){
        console.log("Plz select file");
    }
    else{
      var data= new datas({
          Image: req.file.path
        });
        data.save(function (err, show) {
            if (err) {
                throw err;
            } else {
                 res.redirect('/profile');
                  // res.json(show)
            }
        });
    }
})

module.exports = app;