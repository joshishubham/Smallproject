//Modules
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//Mongoose schema
var Data = mongoose.Schema({

	Name: {type : String, required: true}, 
	Email: {type : String, required: true, index: {unique: true}}, 
	Password: {type : String, required: true},
	Confirm: {type : String, required: true},
	Gender: {type : String, required: true}
});

Data.methods.generateHash  = function(Password) {
	 return bcrypt.hashSync(Password, bcrypt.genSaltSync(8), null);
}

Data.methods.validPassword = function(Password){
     return bcrypt.compareSync(Password, this.Password);
}

var datas = module.exports = mongoose.model("datas", Data);