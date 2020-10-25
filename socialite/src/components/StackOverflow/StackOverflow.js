import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthContext } from '../../context/auth'

import "./StackOverflow.css"

function StackOverflow(props){

	const { user, logout } = useContext(AuthContext)

	function logUserOut(){
		logout();
		props.history.push('/')
	}

	return (
            <>
      		<div className="container">
      			
      		</div>
            </>
      )
  	
}

export default StackOverflow;