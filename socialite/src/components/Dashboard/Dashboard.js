import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthContext } from '../../context/auth'

import "./Dashboard.css"

function Dashboard(props){

	const { user, logout } = useContext(AuthContext)

	function logUserOut(){
		logout();
		props.history.push('/')
	}
	  
	function recommendFriend(){
            props.history.push('/recommend')
      }

      function stackOverflow(){
            props.history.push('/stack-overflow')
      }

	return (
            <>
      		<div className="container">
      			<div className="authenticate-nav">
      				<div className="a-nav-right">
                                    <a href="/profile">MY PROFILE</a>
      					<button className="rounded" onClick={logUserOut}>LOGOUT</button>
      				</div>
      			</div>

      			<div className="wall">
      				<input type="text" placeholder="What's on your mind?" />
      			</div>
      			<div className="feature-display">
      				<div className="subsection-header"> WHAT DO YOU WANT TO DO TODAY? </div>
      				<div className="row">
      					<div className="col-lg-4">
      						<div className="feature" onClick={stackOverflow}>
      							<div className="feature-icon">
      								<img src='/img/study.png' alt=""></img>
      							</div>
      							<div className="feature-content">
      								STACK OVERFLOW
      							</div>
      						</div>
      					</div>
      					<div className="col-lg-4">
      						<div className="feature" onClick={recommendFriend}>
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

export default Dashboard;