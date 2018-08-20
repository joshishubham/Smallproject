//Modules
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//Mongoose schema
var Data = mongoose.Schema({

	Name: String,
	Email: String, 
	Password: String,
	Confirm: String,
	Gender: String,
	Otp: String
});

Data.methods.generateHash  = function(Password) {
	 return bcrypt.hashSync(Password, bcrypt.genSaltSync(8), null);
}

Data.methods.validPassword = function(Password){
     return bcrypt.compareSync(Password, this.Password);
}

var datas = module.exports = mongoose.model("datas", Data);