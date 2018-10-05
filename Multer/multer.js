var express= require('express');
var multer= require('multer');
var app= express();

//Database File
var datas= require('../Database/data.js');

var storage= multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+"-"+file.originalname);
    }
})

var upload= multer({
    storage: storage,
    fileFilter:fileFilter,
    limits: {
        fileSize: Infinity
    }
});

function fileFilter(req, file, cb) {
    if(file.mimetype==="image/jpg" || file.mimetype==="image/png"){
        cb(null, true, console.log("Upload sucessfully"));
    }
    else{
        cb(null, false, console.log("Wrong file"));
    }
}

app.post('/img', upload.single('Image'), function (req, res, id) {
    datas.findOne({id: id}, function (err, user) {
        // console.log(user)
        if (err) {
            throw err;
        }
        if (req.file===undefined) {
            console.log("Please Select file")
        } 
        else {
          user.Image= req.file.path
            user.save(function(err, show){
                if (err) {
                    throw err
                } else {
                    res.redirect('/profile');
                        console.log(show);
                }
            });
        }
    });
});

module.exports = app;