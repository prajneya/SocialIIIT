import React, { Component } from 'react';

import "./Home.css"

class Home extends Component {

 	render() {
   		return (
      		<div className="signup-container">
			  <div className="signin">Sign in</div>
			  <form action="#">
			    <div className="email">
			      <label for="email">Email Address</label>
			      <br/>
			      <input type="text" placeholder="Enter your email" />
			    </div>
			    <div className="password">
			      <label for="password">Password</label>
			      <a href="/" className="forgot">Forgot your password?</a>
			      <input type="password" placeholder="Enter your password" />
			    </div>
			    <button className="btn">Sign In</button>
			  </form>
			  <div className="no-account">
			    <span>Don't have an account yet?</span>
			    <button className="signup">Sign Up</button>
			  </div>
			</div>

    	)
  	}
}

export default Home;