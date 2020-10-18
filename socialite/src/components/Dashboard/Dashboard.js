import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./Dashboard.css"

class Dashboard extends Component {

 	render() {
   		return (
      		<>
      			<div className="container">
      				<div className="authenticate-nav">
	      				<div className="a-nav-right">
	      					<button className="rounded">Logout</button>
	      				</div>
	      			</div>

      				<div className="wall">
      					<input type="text" placeholder="What's on your mind?" />
      				</div>
      				<div className="feature-display">
      					<div className="subsection-header"> WHAT DO YOU WANT TO DO TODAY? </div>
      					<div className="row">
      						<div className="col-lg-4">
      							<div className="feature">
      								<div className="feature-icon">
      									<img src='/img/cab_sharing.png' alt=""></img>
      								</div>
      								<div className="feature-content">
      									SHARE A CAB
      								</div>
      							</div>
      						</div>
      						<div className="col-lg-4">
      							<div className="feature">
      								<div className="feature-icon">
      								<img src='/img/find_friend.png' alt=""></img>
      								</div>
      								<div className="feature-content">
      									FIND NEW FRIENDS
      								</div>
      							</div>
      						</div>
      						<div className="col-lg-4">
      							<div className="feature">
      								<div className="feature-icon">
      									<img src='/img/locate_friend.png' alt=""></img>
      								</div>
      								<div className="feature-content">
      									LOCATE YOUR FRIENDS
      								</div>
      							</div>
      						</div>
      					</div>
      				</div>
      			</div>
      		</>
    	)
  	}
}

export default Dashboard;