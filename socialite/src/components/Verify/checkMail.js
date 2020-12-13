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

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

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
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-6">
						<animated.div style={fadeInMedium}>
						<div className="resend-container">
							<div className="Head">Verification link has been sent to your email</div>
							<div className="msg">Kindly click on the link or paste it in a browser to confirm your email</div>
							<button className="button" onClick={resendLink}>Resend Link</button>
						</div>
						</animated.div>
					</div>
				</div>
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
