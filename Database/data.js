//Modules
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//Mongoose schema
var Data = mongoose.Schema({

	   //Name     : {type : String}, 
	   //Username : {type : String, index: {unique: true}},  
	   Email    : {type : String, required: true, index: {unique: true}}, 
	   Password : {type : String},
       //Confirm  : {type : String}

});

var crud = module.exports = mongoose.model("crud", Data);
