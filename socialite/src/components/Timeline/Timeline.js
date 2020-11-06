import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../../context/auth'

import "./Timeline.css"

function Timeline(props){

	const { user, logout } = useContext(AuthContext)

	function logUserOut(){
		logout();
		props.history.push('/')
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
            </div>
            </>
      )
  	
}

export default Timeline;