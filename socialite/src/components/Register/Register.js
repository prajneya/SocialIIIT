import React, { Component } from 'react';

import "./Register.css"

class Register extends Component {

 	render() {
   		return (
      		<div className="signup-container">
			<div className="signup">Sign Up</div>
			<form action="#">

			<div className="email">
				<label for="email">Email Address (only iiit.ac.in ids allowed)</label>
				<br/>
				<input type="text" placeholder="Enter your email" />
			</div>

			<div className="rollno">
				<label for="rollno">Roll Number</label>
				<br/>
				<input type="text" placeholder="Enter your roll number" />
			</div>

			<div className="password">
				<label for="password">Password</label>
				<input type="password" placeholder="Enter your password" />
			</div>

			<div className="password">
				<label for="password">Confirm Password</label>
				<input type="password" placeholder="Enter your password" />
			</div>

			<button className="btn">Sign Up</button>
			</form>

			<div className="already-account">
			    <span>Already have an account?</span>
			    <button className="signin">Sign In</button>
			</div>

		</div>

    	)
  	}
}

export default Register;