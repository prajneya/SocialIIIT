const jwt = require('jsonwebtoken');
const { VERIFY_KEY } = require('./config');
const mail = require('./email')

module.exports = async function verify(user) 
{
	tok = jwt.sign(
		{
			id: user.id,
			email: user.email,
			username: user.username,
			time: user.createdAt
		},
		VERIFY_KEY,
		{ expiresIn: '1h' }
	);

	link = "http://peersity.in/verify/" + tok;
	msg = `Kindly click on the attached link to verify your account: ${link}`;
	return err = await mail(user.email, "Account Verification", msg);
}

