import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import "./Home.css"

import { AuthContext } from '../../context/auth';
import { useForm } from '../../util/hooks';

function Home(props) {

	const context = useContext(AuthContext)

	const [errors, setErrors] = useState({});

	const { onChange, onSubmit, values } = useForm(loginUserCallback, {
		email: '',
		password: ''
	})

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(_, { data: { login: userData } }){
			console.log(userData)
			context.login(userData)
			props.history.push('/dashboard')
		},
		onError(err){
			if(err.graphQLErrors.length > 0)
				setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values
	})

	function loginUserCallback(){
		loginUser();
	}

	return (
		<div className="signup-container">
			<div className="signin">Sign in</div>
			<form onSubmit={onSubmit}>
			<div className="email">
			  <label for="email">Email Address</label>
			  <br/>
			  <input type="text" name="email" placeholder="Enter your email" onChange={onChange} value={values.email} />
			</div>
			<div className="password">
			  <label for="password">Password</label>
			  <a href="/" className="forgot">Forgot your password?</a>
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

	)
}

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      createdAt
      token
      username
    }
  }
`;

export default Home;