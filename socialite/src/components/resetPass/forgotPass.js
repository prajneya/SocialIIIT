import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useSpring, animated} from 'react-spring'

import { useForm } from '../../util/hooks';
import Swal from 'sweetalert2';

function ForgotPass(props) {

	const fadeInFast = useSpring({opacity: 1, from: {opacity: 0}, config: { duration: 3000 }})
	const fadeInMedium = useSpring({opacity: 1, from: {opacity: 0}, delay: 300, config: { duration: 2000 }})
	const fadeInSlow = useSpring({opacity: 1, from: {opacity: 0}, delay: 500, config: { duration: 2000 }})

	const { onChange, onSubmit, values } = useForm(resetPass, {
		email: ''
	})

	const [forgotPass] = useMutation(FORGOT_PASS, {
		update(_, { data: { register: userData } }){
			window.location.reload(false);
		},
		onError(err){
			if(err.graphQLErrors.length > 0)
				Swal.fire({title: "We did not anticipate this.",
							html: Object.values(err.graphQLErrors[0].extensions.exception.errors)[0],
							footer: "The above error popped up while trying to reset your password.",
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
			email: values['email']
		}
	})

	function resetPass(){
		forgotPass();
	}

	function LoginComponentCallback(){
		console.log(false);
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

							<div className="email">
								<label for="email">Email Address</label>
								<br/>
								<input type="text" id="email" name="email" placeholder="Enter your email" onChange={onChange} value={values.email} />
							</div>

							<button type="submit" className="btn-submit">Reset Password</button><br/><br/>
							<p>If your email address exists in our database, a link will be sent to your email address alongwith instructions to reset your password.</p>
							</form>

							<div className="no-account">
							    <span>Already have an account?</span>
							    <a href="/"><button className="signup" onClick={LoginComponentCallback}>Sign In</button></a>
							</div>

						</div>
						</animated.div>
					</div>
				</div>
				
			</div>
		</>

	);
}
  	

const FORGOT_PASS = gql`
  mutation forgotPass($email: String!) {
    forgotPass(email: $email)
  }
`;

export default ForgotPass;
