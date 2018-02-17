var express = require('express');
var multer  = require('multer');
var app     = express();

var upload = multer({dest: './public/uploads'});