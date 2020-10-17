import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function Register() {

	const [values, setValues] = useState({
		email: '',
		password: '',
		confirmPassword: ''
	})

	const onChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value});
	}

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(proxy, result){
			console.log(result);
		},
		variables: values
	})

	const onSubmit = (event) => {
		event.preventDefault();
		console.log(values)
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

			<button type="submit" className="btn">Sign Up</button>

			</form>

			<div className="no-account">
			    <span>Already have an account?</span>
			    <a href="/"><button className="signup">Sign In</button></a>
			</div>

		</div>

    	);
   	}
  	

const REGISTER_USER = gql`
  mutation register(
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
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
