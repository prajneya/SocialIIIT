const validate = require("validator");
const empty = require("is-empty");

module.exports = function valReg(data)
{
	let errors = {};

	if(empty(data.email))
		errors.email = "Email is required!";

	else if(!validate.isEmail(data.email))
		errors.email = "Email is invalid!";

	if(empty(data.rollnumber))
                errors.email = "Roll Number is required!";

	if(empty(data.password))
		errors.password = "Password is required!";

	else if(empty(data.password2))
		errors.password2 = "Password confirmation is required!";

	else if(!validate.isLength(data.password, {min: 8, max: 16}))
		errors.password = "Password must be 8-16 characters!";

	else if(!validate.equals(data.password, data.password2))
		errors.password2 = "Passwords must match!";

	return errors;
};

