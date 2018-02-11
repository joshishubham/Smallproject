var express = require('express');
var multer  = require('multer');
var app     = express();

var upload = multer({dest: './public/uploads'});

var app = express();

app.post('/images', upload.single('avator'), function (req, res, next) {

	   
})