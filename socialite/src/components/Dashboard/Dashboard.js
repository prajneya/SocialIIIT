import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../../context/auth'

import "./Dashboard.css"

function Dashboard(props){

	const { user, logout } = useContext(AuthContext)

	const id = user.id;
	const sub = JSON.stringify(localStorage.getItem('subscription'));
	
	const [subsave, { opsub }] = useMutation(ADD_SUB, {
		update(_, { data: { login: userData } }){
			window.location.reload(false);
		},
		variables: {
			id,
			sub
		}
	})

	function logUserOut(){
		logout();
		props.history.push('/')
	}

	function notification(){
		props.history.push('/notifications')
	}

	function myprofile(){
		props.history.push('/profile')
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
					  	<button className="rounded" onClick={notification}>NOTIFICATIONS</button>
      					&nbsp;&nbsp;
					  	<button className="rounded" onClick={myprofile}>MY PROFILE</button>
      					&nbsp;&nbsp;
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

const ADD_SUB = gql`
  mutation subsave($id: String!, $sub: String!) {
    subsave(id: $id, sub: $sub) {
      id
    }
  }
`;

export default Dashboard;
