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
		else if(!email.endsWith("iiit.ac.in"))
			errors.email = 'Only IIIT emails allowed.'
	}

	usernameRegex= /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
	if(username.length > 14)
		errors.username = 'Username must be 14 characters or less'
	else if(username.match(usernameRegex))
		errors.username = 'Username must not contain any special characters'
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
