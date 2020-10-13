import React, { Component } from 'react';

import "./Home.css"

class Home extends Component {

 	render() {
   		return (
      		<div className="signup-container">
			  <div className="signup">Sign Up</div>
			  <form action="#">
			    <div className="email">
			      <label for="email">Email Address</label>
			      <br/>
			      <input type="text" placeholder="Enter your email" />
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
			    <span>Already have an account yet?</span>
			    <button className="signin">Sign In</button>
			  </div>
			</div>

    	)
  	}
}

export default Home;