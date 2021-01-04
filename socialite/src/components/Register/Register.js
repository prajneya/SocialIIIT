import React, { useState } from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useSpring, animated} from 'react-spring'

import { useForm } from '../../util/hooks';
import Swal from 'sweetalert2';

const options = [{label: 'UG2k20', value: 1, area: 'UG2k20'},{label: 'UG2k19',value:2, area: 'UG2k20'},{label: 'UG2k18',value:3, area: 'UG2k20'},{label: 'UG2k17',value:4, area: 'UG2k20'},{label: 'UG2k16',value:5, area: 'UG2k20'},{label: 'PG2k20',value:6, area: 'UG2k20'},{label: 'PG2k19',value:7, area: 'UG2k20'},{label: 'Alumni',value:8, area: 'UG2k20'}]
const options2 = [{label: 'CSE', value: 1, area: 'UG2k20'},{label: 'CSD',value:2, area: 'UG2k20'},{label: 'ECE',value:3, area: 'UG2k20'},{label: 'ECD',value:4, area: 'UG2k20'},{label: 'CLD',value:5, area: 'UG2k20'},{label: 'CND',value:6, area: 'UG2k20'},{label: 'CHD',value:7, area: 'UG2k20'},{label: 'LCD',value:8, area: 'UG2k20'},{label: 'LED',value:9, area: 'UG2k20'},{label: 'CSIS',value:10, area: 'UG2k20'},{label: 'CASE',value:11, area: 'UG2k20'},{label: 'CE',value:12, area: 'UG2k20'},{label: 'CL',value:13, area: 'UG2k20'}]

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

function Register(props) {

	const [batch, setBatch] = useState({});
	const [stream, setStream] = useState({});

	const fadeInFast = useSpring({opacity: 1, from: {opacity: 0}, config: { duration: 3000 }})
	const fadeInMedium = useSpring({opacity: 1, from: {opacity: 0}, delay: 300, config: { duration: 2000 }})
	const fadeInSlow = useSpring({opacity: 1, from: {opacity: 0}, delay: 500, config: { duration: 2000 }})

	const { onChange, onSubmit, values } = useForm(registerUser, {
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	})

	async function handleChangeBatch(selectedOptions){
		await setBatch(selectedOptions.label)
	}

	async function handleChangeStream(selectedOptions){
		await setStream(selectedOptions.label)
	}

	const [addUser] = useMutation(REGISTER_USER, {
		update(_, { data: { register: userData } }){
			props.history.push('/checkMail')
		},
		onError(err){
			if(err.graphQLErrors.length > 0)
				Swal.fire({title: "We did not anticipate this.",
							html: Object.values(err.graphQLErrors[0].extensions.exception.errors)[0],
							footer: "The above error popped up while adding you as a user.",
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
		variables: {'username': values['username'], 'email': values['email'], 'password': values['password'], 'confirmPassword': values['confirmPassword'], 'batch': batch, 'stream': stream} 
	})

	function registerUser(){
		document.getElementById('register').disabled = true
		addUser();
		localStorage.setItem("username", values.username)
		localStorage.setItem("email", values.email)
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
							<div className="signin">Sign Up</div>
							<form onSubmit={onSubmit} autocomplete="off">

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

                            				<div className="batch">
								<label for="batch">Batch</label>
                                				<br/>
                                				<div className="batch-drop">
                                    					<Select
                                      					styles={customStyles}
                                      					closeMenuOnSelect={false}
                				                      	components={animatedComponents}
                                      					options={options}
                                      					onChange={handleChangeBatch}
                                      					theme={theme => ({
                                              					...theme,
                                              					borderRadius: 0,
                                              					colors: {
                                                					...theme.colors,
                                                					primary25: '#00adb5',
                                                					primary: 'black',
                                              					},
                                            					})}
                                    					/>
                                				</div>
                                			</div>

                            				<div className="stream">
								<label for="stream">Stream</label>
                                				<br/>
                                				<div className="stream-drop">
                                    					<Select
                                      					styles={customStyles}
                                      					closeMenuOnSelect={false}
                				                      	components={animatedComponents}
                                      					options={options2}
                                      					onChange={handleChangeStream}
                                      					theme={theme => ({
                                              					...theme,
                                              					borderRadius: 0,
                                              					colors: {
                                                					...theme.colors,
                                                					primary25: '#00adb5',
                                                					primary: 'black',
                                              					},
                                            					})}
                                    					/>
                                				</div>
                                			</div>

							<div className="password">
								<label for="password">Password</label>
								<input type="password" id="password" name="password" placeholder="Enter your password" onChange={onChange} value={values.password} />
							</div>

							<div className="password">
								<label for="confirmPassword">Confirm Password</label>
								<input type="password" id="confirmPassword" name="confirmPassword" placeholder="Enter your password" onChange={onChange} value={values.confirmPassword} />
							</div>

							<button id="register" type="submit" className="btn-submit">Sign Up</button>

							<div className="my-2">
							By clicking Sign Up, you agree to our <a href="/policies/terms" target="_blank">Terms</a> and <a href ="/policies/cookies" target="_blank">Cookie Policy</a>.
							</div>

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
  	

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $batch: String!
    $stream: String!
  ) {
    register(
      registerInput: {
      	username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
	batch: $batch
	stream: $stream
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
