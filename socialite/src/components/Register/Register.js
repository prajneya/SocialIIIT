import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../../context/auth';
import { useForm } from '../../util/hooks';

function Register(props) {

	const context = useContext(AuthContext)

	const [errors, setErrors] = useState({});

	const initialState = {
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	}

	const { onChange, onSubmit, values } = useForm(registerUser, {
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	})

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, { data: { register: userData } }){
			context.login(userData);
			props.history.push('/dashboard')
		},
		onError(err){
			if(err.graphQLErrors.length > 0)
				setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values
	})

	function registerUser(){
		addUser();
	}

	return (
		<div className="signup-container">
			<div className="signin">Sign Up</div>
			<form onSubmit={onSubmit}>

			<div className="email">
				<label for="email">Email Address (only iiit.ac.in ids allowed)</label>
				<br/>
				<input type="text" id="email" name="email" placeholder="Enter your email" onChange={onChange} value={values.email} />
			</div>

			<div className="username">
				<label for="username">Username (try to be witty)</label>
				<br/>
				<input type="text" id="username" name="username" placeholder="Enter your username" onChange={onChange} value={values.username} />
			</div>

			<div className="rollno">
				<label for="rollno">Roll Number</label>
				<br/>
				<input type="text" id="rollnumber" name="rollnumber" placeholder="Enter your roll number" />
			</div>

			<div className="password">
				<label for="password">Password</label>
				<input type="password" id="password" name="password" placeholder="Enter your password" onChange={onChange} value={values.password} />
			</div>

			<div className="password">
				<label for="confirmPassword">Confirm Password</label>
				<input type="password" id="confirmPassword" name="confirmPassword" placeholder="Enter your password" onChange={onChange} value={values.confirmPassword} />
			</div>

			<button type="submit" className="btn-submit">Sign Up</button>

			</form>

			<div className="no-account">
			    <span>Already have an account?</span>
			    <a href="/"><button className="signup">Sign In</button></a>
			</div>

			{Object.keys(errors).length > 0 && (<div className="error-message">
				<ul>
					{Object.values(errors).map(value => (
						<li key={value}>{value}</li>
					))}
				</ul>
			</div>)}

		</div>

	);
}
  	

const REGISTER_USER = gql`
  mutation register(
  	$username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
      	username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      createdAt
      token
    }
  }
`;

export default Register;
