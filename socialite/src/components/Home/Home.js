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
			      <input type="text" name="email" placeholder="Enter your email" />
			    </div>
			    <div className="password">
			      <label for="password">Password</label>
			      <a href="/" className="forgot">Forgot your password?</a>
			      <input type="password" name="password" placeholder="Enter your password" />
			    </div>
			    <button className="btn-submit">Sign In</button>
			  </form>
			  <div className="no-account">
			    <span>Don't have an account yet?</span>
			    <a href="/register"><button className="signup">Sign Up</button></a>
			  </div>
			</div>

    	)
  	}
}

export default Home;