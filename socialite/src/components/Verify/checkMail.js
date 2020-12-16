import React, { useContext, useState } from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useSpring, animated} from 'react-spring'

import { AuthContext } from '../../context/auth';
import { useForm } from '../../util/hooks';
import './checkMail.css'

const animatedComponents = makeAnimated();

function Resend(props) {

	const nusername = localStorage.getItem('username');
	const nemail = localStorage.getItem('email');

	const [errors, setErrors] = useState({});
	const [id, setId] = useState("");
	const [username, setUsername] = useState(nusername);
	const [email, setEmail] = useState(nemail);
	const [time, setTime] = useState("");

	const fadeInFast = useSpring({opacity: 1, from: {opacity: 0}, config: { duration: 3000 }})
	const fadeInMedium = useSpring({opacity: 1, from: {opacity: 0}, delay: 300, config: { duration: 2000 }})
	const fadeInSlow = useSpring({opacity: 1, from: {opacity: 0}, delay: 500, config: { duration: 2000 }})

	const [resend, { ret }] = useMutation(RESEND_LINK, {
		update(_, {}){
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
