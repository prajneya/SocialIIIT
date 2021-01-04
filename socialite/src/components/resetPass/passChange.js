import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useSpring, animated} from 'react-spring'

import { useForm } from '../../util/hooks';
import Swal from 'sweetalert2';

function ResetPass(props) {

	const tok = props.match.params.token;

	const fadeInFast = useSpring({opacity: 1, from: {opacity: 0}, config: { duration: 3000 }})
	const fadeInMedium = useSpring({opacity: 1, from: {opacity: 0}, delay: 300, config: { duration: 2000 }})
	const fadeInSlow = useSpring({opacity: 1, from: {opacity: 0}, delay: 500, config: { duration: 2000 }})

	const { onChange, onSubmit, values } = useForm(resetPass, {
		password: '',
		confirmPassword: ''
	})

	const [PassChange] = useMutation(PASS_CHANGE, {
		update(_, { data: resendData }){
			props.history.push('/')
		},
		onError(err){
			if(err.graphQLErrors.length > 0)
				Swal.fire({title: "We did not anticipate this.",
							html: Object.values(err.graphQLErrors[0].extensions.exception.errors)[0],
							footer: "The above error popped up while trying to change your password.",
							imageUrl: '/img/sorry.png',
							customClass: {
								title: 'text-danger error-message',
								content: 'error-message text-white',
								confirmButton: 'game-button bg-danger',
								image: 'error-image-swal',
							},
							background: `rgba(0,0,0,0.9)`
						});
		},
		variables: {
			token: tok, 
			password: values['password'],
			confirmPassword: values['confirmPassword']
		}
	})

	function resetPass()
	{
		PassChange()
	}

	return (
		<>
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
							peersity
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
						<div className="signup-container">
							<div className="signin">Forgot Password</div>
							<form onSubmit={onSubmit} autocomplete="off">

							<div className="password">
								<label for="password">New Password</label>
								<input type="password" id="password" name="password" placeholder="Enter your password" onChange={onChange} value={values.password} />
							</div>

							<div className="password">
								<label for="confirmPassword">Confirm Password</label>
								<input type="password" id="confirmPassword" name="confirmPassword" placeholder="Enter your password" onChange={onChange} value={values.confirmPassword} />
							</div>
							<button type="submit" className="btn-submit">Change Password</button>

							</form>

						</div>
						</animated.div>
					</div>
				</div>
				
			</div>
		</>

	);
}
  	

const PASS_CHANGE = gql`
  mutation passChange($token: String!, $password: String!, $confirmPassword: String!) {
    passChange(token: $token, password: $password, confirmPassword: $confirmPassword)
  }
`;

export default ResetPass;
