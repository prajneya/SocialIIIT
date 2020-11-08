import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Parser from 'html-react-parser';

import { AuthContext } from '../../context/auth'

import "./Timeline.css"

function Timeline(props){

	const { user, logout } = useContext(AuthContext)

	function logUserOut(){
		logout();
		props.history.push('/')
	}


  const squares = []
  for (var i = 1; i < 365; i++) {
    const level = Math.floor(Math.random() * 3);  
    squares.push(level);
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

              <div className="display">
                <div className="username">{user.username}</div>
                <div className="email">{user.email}</div>
                <div className="rating mt-5">RATING: {user.rating}</div>
                <div className="times-answered">Number of Answers: {user.times_answered}</div>
              </div>

               <div className="graph">
                <ul className="months">
                  <li>Jan</li>
                  <li>Feb</li>
                  <li>Mar</li>
                  <li>Apr</li>
                  <li>May</li>
                  <li>Jun</li>
                  <li>Jul</li>
                  <li>Aug</li>
                  <li>Sep</li>
                  <li>Oct</li>
                  <li>Nov</li>
                  <li>Dec</li>
                </ul>
                <ul className="days">
                  <li>Sun</li>
                  <li>Mon</li>
                  <li>Tue</li>
                  <li>Wed</li>
                  <li>Thu</li>
                  <li>Fri</li>
                  <li>Sat</li>
                </ul>
                <ul className="squares" id="squares">
                {squares.map(value => (
                  <li data-level={value}></li>
                ))}
                </ul>
              </div> 
            </div>
            </>
      )
  	
}

export default Timeline;