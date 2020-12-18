import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useSpring, animated} from 'react-spring'

import { AuthContext } from '../../context/auth';
import './checkMail.css'

function Verify(props) {

	const context = useContext(AuthContext)
	const tok = props.match.params.token;

	const fadeInMedium = useSpring({opacity: 1, from: {opacity: 0}, delay: 300, config: { duration: 2000 }})

	var overlayElement = document.getElementById("overlays");
	var signinDisplay = document.getElementById("signin-animations");

	const [verify] = useMutation(VERIFY_LINK, {
		update(_, { data: userData }){
			localStorage.removeItem('username')
			localStorage.removeItem('email')
			props.history.push('/')
		},
		onError(err){
			if(err.graphQLErrors.length > 0)
			{
				overlayElement.style.zIndex = 0;
				overlayElement.style.opacity = 0;
				signinDisplay.style.display = "none";
			}
		},
		variables: {
			tok
		}
	})


	window.onload= async function loaded(){
		await verify()
	}

	return (
		<>
			<div id="overlays"></div>
			<div id="signin-animations"><div className="loader">Loading...</div><br/>VERIFYING LINK...</div>
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
    $tok: String!
  ) {
    verify(tok: $tok){
      id
      email
      createdAt
      token
      username
    }
  }
`;

export default Verify;
