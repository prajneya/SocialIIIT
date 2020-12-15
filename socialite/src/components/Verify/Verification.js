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

	const context = useContext(AuthContext)
	const [errors, setErrors] = useState({});
	const [tok, setToken] = useState(props.match.params.token);

	const fadeInFast = useSpring({opacity: 1, from: {opacity: 0}, config: { duration: 3000 }})
	const fadeInMedium = useSpring({opacity: 1, from: {opacity: 0}, delay: 300, config: { duration: 2000 }})
	const fadeInSlow = useSpring({opacity: 1, from: {opacity: 0}, delay: 500, config: { duration: 2000 }})

	var overlayElement = document.getElementById("overlay");

	const [verify, { loading }] = useMutation(VERIFY_LINK, {
		update(_, { data: { login: userData } }){
			console.log(userData)
			context.login(userData)
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
			tok
		}
	})


	window.onload= async function loaded(){
		await verify()
	}

	return (
		<>
			<div id="overlay">Loading...</div>
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
