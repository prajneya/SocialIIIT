import React, { useContext, useState } from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useSpring, animated} from 'react-spring'

import { AuthContext } from '../../context/auth';
import { useForm } from '../../util/hooks';
import './checkMail.css'
import '../Home/Home.css'

const animatedComponents = makeAnimated();

function Verify(props) {

	console.log("hi")
	const token = props.match.params.token;
	console.log(token)
	const [errors, setErrors] = useState({});

	const fadeInFast = useSpring({opacity: 1, from: {opacity: 0}, config: { duration: 3000 }})
	const fadeInMedium = useSpring({opacity: 1, from: {opacity: 0}, delay: 300, config: { duration: 2000 }})
	const fadeInSlow = useSpring({opacity: 1, from: {opacity: 0}, delay: 500, config: { duration: 2000 }})

	var overlayElement = document.getElementById("overlay");

	const [verify, { ret }] = useMutation(VERIFY_LINK, {
		update(_, {}){
			props.history.push('/dashboard')
		},
		onError(err){
			if(err.graphQLErrors.length > 0)
			{
				overlayElement.style.zIndex = 0;
				overlayElement.style.opacity = 0;
			}
		},
		variables: {
			token
		}
	})

	overlayElement.style.zIndex = 2;
	overlayElement.style.opacity = 1;
	verify()

	return (
		<>
			<div id="overlay"></div>
			<div id="signin-animation"><div className="loader">Loading...</div><br/>VERIFYING LINK...</div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-6">
						<animated.div style={fadeInMedium}>
						<div className="resend-container">
							<div className="Head">Failed to verify. Link may have expired. 
							<br /> Kindly have the link resent and try again.</div>
						</div>
						</animated.div>
					</div>
				</div>
			</div>
		</>
	);
}
  	

const VERIFY_LINK = gql`
  mutation verify(
    $token: String!
  ) {
    verify(token: $token){
	    tok
    }
  }
`;

export default Verify;
