import React, { Component } from 'react';

class Register extends Component {

 	render() {
   		return (
      		<div className="signup-container">
			<div className="signin">Sign Up</div>
			<form action="/register" method="post">

			<div className="email">
				<label for="email">Email Address (only iiit.ac.in ids allowed)</label>
				<br/>
				<input type="text" id="email" placeholder="Enter your email" />
			</div>

			<div className="rollno">
				<label for="rollno">Roll Number</label>
				<br/>
				<input type="text" id="rollnumber" placeholder="Enter your roll number" />
			</div>

			<div className="password">
				<label for="password">Password</label>
				<input type="password" placeholder="Enter your password" />
			</div>

			<div className="password">
				<label for="password">Confirm Password</label>
				<input type="password" id="password" placeholder="Enter your password" />
			</div>

			<button className="btn">Sign Up</button>

			</form>

			<div className="no-account">
			    <span>Already have an account?</span>
			    <a href="/"><button className="signup">Sign In</button></a>
			</div>

		</div>

    	)
  	}
}

export default Register;
