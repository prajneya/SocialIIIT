import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useSpring, animated} from 'react-spring'

import './checkMail.css'

function Resend(props) {

	const nusername = localStorage.getItem('username');
	const nemail = localStorage.getItem('email');

	const id = "";
	const username = nusername;
	const email = nemail;
	const time = "";

	const fadeInMedium = useSpring({opacity: 1, from: {opacity: 0}, delay: 300, config: { duration: 2000 }})

	const [resend] = useMutation(RESEND_LINK, {
		update(_, { data: resendData }){
			window.location.reload(false)
		},
		variables: {
			id,
			username,
			email,
			time
		}
	})

	function resendLink()
	{
		resend()
	}

	return (
		<>
			<div className="container">
				<animated.div style={fadeInMedium}>
				<div className="resend-container">
					<div className="resend-content">
						<div className="Head">Verification link has been sent to your email.
						<br /> Kindly click on the link or paste it your browser to confirm your email.</div>
						<button className="btn-submit" onClick={resendLink}>Resend Link</button>
					</div>
				</div>
				</animated.div>
			</div>
		</>
	);
}
  	

const RESEND_LINK = gql`
  mutation resend(
    $id: String!
    $username: String!
    $email: String!
    $time: String!
  ) {
    resend(
      data: {
	id: $id
      	username: $username
        email: $email
	time: $time
      }
    )
  }
`;

export default Resend;
