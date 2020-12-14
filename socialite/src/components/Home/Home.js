import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { register } from '../../serviceWorker'
import {useSpring, animated} from 'react-spring'

import "./Home.css"

import { AuthContext } from '../../context/auth';
import { useForm } from '../../util/hooks';

function Home(props) {

	const context = useContext(AuthContext)

	const [errors, setErrors] = useState({});

	const fadeInFast = useSpring({opacity: 1, from: {opacity: 0}, config: { duration: 3000 }})
	const fadeInMedium = useSpring({opacity: 1, from: {opacity: 0}, delay: 300, config: { duration: 2000 }})
	const fadeInSlow = useSpring({opacity: 1, from: {opacity: 0}, delay: 500, config: { duration: 2000 }})

	const { onChange, onSubmit, values } = useForm(loginUserCallback, {
		credential: '',
		password: ''
	})

	var overlayElement = document.getElementById("overlay");
	var signinDisplay = document.getElementById("signin-animation");

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(_, { data: { login: userData } }){
			console.log(userData)
			context.login(userData)
			props.history.push('/dashboard')
		},
		onError(err){
			if(err.graphQLErrors.length > 0)
				setErrors(err.graphQLErrors[0].extensions.exception.errors);
				overlayElement.style.zIndex = 0;
				overlayElement.style.opacity = 0;
				signinDisplay.style.display = "none";
		},
		variables: values
	})

	function loginUserCallback(){
		overlayElement.style.zIndex = 2;
		overlayElement.style.opacity = 1;
		signinDisplay.style.display = "block";
		setTimeout(function(){ loginUser();; }, 3000);
	}

	return (
		<>	
			<div id="overlay"></div>
			<div id="signin-animation"><div className="loader">Loading...</div><br/>SIGNING YOU IN ...</div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-6">
						<div className="landing-title">
							<animated.div style={fadeInFast}>
							<div className="subheader">
							WELCOME TO
							</div>
							</animated.div>
							<animated.div style={fadeInMedium}>
							<div className="app-name">
							socialiiit
							</div>
							</animated.div>
							<animated.div style={fadeInSlow}>
							<div className="subtitle">
							IIIT HYDERABAD's OWN SOCIAL NETWORK
							</div>
							</animated.div>
						</div>
					</div>
					<div className="col-lg-6">
						<animated.div style={fadeInMedium}>
						<div className="signin-container">
							{/* <div class="container">
								<div class="a-nav-right">
									<button type="submit" className="rounded" onClick={register}>Allow notifications</button>
								</div>
							</div> */}
							<div className="signin">Sign in</div>
							<form onSubmit={onSubmit} autocomplete="off">
							<div className="email">
							  <label for="email">Email Address/Username</label>
							  <br/>
							  <input type="text" name="credential" placeholder="Enter your email or username" onChange={onChange} value={values.credential} />
							</div>
							<div className="password">
							  <label for="password">Password</label>
							  <input type="password" name="password" placeholder="Enter your password" onChange={onChange} value={values.password} />
							</div>
							<button type="submit" className="btn-submit">Sign In</button>
							</form>
							<div className="no-account">
								<span>Don't have an account yet?</span>
								<a href="/register"><button className="signup">Sign Up</button></a>
							</div>

							{Object.keys(errors).length > 0 && (<div className="error-message">
								<ul>
									{Object.values(errors).map(value => (
										<li key={value}>{value}</li>
									))}
								</ul>
							</div>)}

						</div> 
						</animated.div>
					</div>
				</div>
				
			</div>
		</>

	)
}

const LOGIN_USER = gql`
  mutation login($credential: String!, $password: String!) {
    login(credential: $credential, password: $password) {
      id
      email
      createdAt
      token
      username
    }
  }
`;

export default Home;
