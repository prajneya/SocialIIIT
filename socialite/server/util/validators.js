function usernameVal(username)
{
	err = ""
	usernameRegex= /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/
	if(username.trim() === ''){
		err = 'Username must not be empty';
	}
	else if(username.length > 14)
		err = 'Username must be 14 characters or less'
	else if(username.match(usernameRegex))
		err = 'Username must not contain any special characters except _'
	return err
}
module.exports.usernameVal = usernameVal

module.exports.validateRegisterInput = (
	email,
	username,
	password,
	confirmPassword
) => {
	const errors = {};
	if(email.trim() === ''){
		errors.email = 'Email must not be empty';
	}
	else{
		const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
		if (!email.match(regEx)) {
      		errors.email = 'Email must be a valid email address';
		}
		else if(!(email.endsWith("students.iiit.ac.in") || email.endsWith("research.iiit.ac.in")))
			errors.email = 'Only student IIIT emails allowed.'
		else if(email.endsWith("lists.iiit.ac.in"))
			errors.email = 'Mailing lists not allowed.'
	}

	usernameErr = usernameVal(username)
	if(usernameErr != "")
		errors.username = usernameErr
	var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})");
	if (password === '') {
    	errors.password = 'Password must not be empty';
  	} 
	else if(!password.match(strongRegex))
		errors.password = 'Weak password, must contain atleast 8 characters and 1 capital letter';
  	else if (password !== confirmPassword) {
    	errors.confirmPassword = 'Passwords must match';
  	}

  	return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  }
  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};
