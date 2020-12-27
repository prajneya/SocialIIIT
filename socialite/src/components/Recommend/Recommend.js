import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery, useMutation} from '@apollo/react-hooks';
import { useState } from 'react';
import gql from 'graphql-tag';
import TinderCard from 'react-tinder-card';
import Swal from 'sweetalert2';
import moment from "moment-timezone"
import {useSpring, animated} from 'react-spring'
import { faHandPointLeft, faHandPointRight, faHandPointUp, faHandPointDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AuthContext } from '../../context/auth';

import "./Recommend.css";
import Sidebar from "../Sidebar";

function Recommend(props){

    const { user } = useContext(AuthContext);

    const fadeInFast = useSpring({opacity: 1, from: {opacity: 0}, delay: 300, config: { duration: 1000 }})

    const user_id = user.id;
    const [fren_id, setfren_id] = useState('');
    const [values, setValues] = useState({});

    const [frenrequest] = useMutation(FREN_REQUEST, {
        update(_, { data: fRequestData }){
            window.location.reload(false)
        },
        onError(err){
          if(err.graphQLErrors.length > 0)
            Swal.fire({title: "Our pigeon got lost somewhere.",
                  html: Object.values(err.graphQLErrors[0].extensions.exception.errors)[0],
                  footer: "The above error popped up while sending the friend request.",
                  imageUrl: '/img/pigeon.png',
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
            user_id,
            fren_id
        }
    })

    const [meetrequest] = useMutation(MEET_REQUEST, {
        update(_, { data: mRequestData }){
            window.location.reload(false)
        },
        onError(err){
          if(err.graphQLErrors.length > 0)
            Swal.fire({title: "The Mafia hijacked our convoy.",
                  html: Object.values(err.graphQLErrors[0].extensions.exception.errors)[0],
                  footer: "The above error popped up while sending the meet request.",
                  imageUrl: '/img/study.png',
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
		    'sender': values.sender,
		    'sendee': values.sendee,
		    'type': values.type,
		    'date': values.date,
		    'time': values.time,
		    'duration': values.duration,
		    'link': values.link,
		    'msg': values.msg,
		    'place': values.place,
		    'notif': values.notif,
	    }
    })

	const [meetedit] = useMutation(MEET_EDIT, {
		update(_, { data: { login: userData } }){
			window.location.reload(false);
		},
		variables: {
			'sender': values.sender,
			'sendee': values.sendee,
			'type': values.type,
			'date': values.date,
			'time': values.time,
			'duration': values.duration,
			'link': values.link,
			'msg': values.msg,
			'place': values.place,
			'notif': values.notif,
		}
	})

	const [meetaccept] = useMutation(MEET_ACCEPT, {
		update(_, { data: { login: userData } }){
			window.location.reload(false);
		},
		variables: {
			user_id,
			fren_id
		}
	})

	const [meetreject] = useMutation(MEET_REJECT, {
		update(_, { data: { login: userData } }){
			window.location.reload(false);
		},
		variables: {
			user_id,
			fren_id
		}
	})

    const { data, loading } = useQuery(FETCH_RECOMMENDATIONS_QUERY, {
        variables: {
            user_id
        }
    });

    if(loading){
        return (<><div id="overlay" style={{display: "block"}}></div>
            <div id="vibe-animation" style={{display: "block"}}><div className="loader">Loading...</div><br/>SENDING OUT A VIBE ...</div></>)
    }

    async function send_frenrequest(fren_id){
	document.getElementById("freq").disabled = true
        await setfren_id(fren_id);
        frenrequest();
    }

    async function send_meetrequest(fren_id){
	document.getElementById("mreq").disabled = true
        await setfren_id(fren_id);
	    await Swal.fire({
		    title: 'Meet Details',
		    html: `
			    <div className="type">
				<label for="type">Type*</label>
				<br/>
			    </div>
			    <input type="radio" id="type" name="option" value="online">Online<br>
			    <input type="radio" id="type" name="option" value="offline">Offline<br>
			    <div className="textfield">
				<label for="date">Date*</label>
				<br/>
				<input type="date" id="date" name="date" placeholder="dd-mm-yyyy" min="" onChange={onChange} />
			    </div>
			    <div className="textfield">
				<label for="time">Time*</label>
				<br/>
				<input type="time" id="time" name="time" placeholder="Enter meet time" onChange={onChange} />
			    </div>
			    <div className="textfield">
				<label for="duration">Duration(in minutes)</label>
				<br/>
				<input type="number" id="duration" name="duration" placeholder="Enter meet duration" onChange={onChange} />
			    </div>
			    <div className="textfield">
				<label for="msg">Message</label>
				<br/>
				<input type="text" id="msg" name="msg" placeholder="Enter message" onChange={onChange} />
			    </div>
			    <div className="textfield">
				<label for="link">Link</label>
				<br/>
				<input type="text" id="link" name="link" placeholder="Enter meet link" onChange={onChange} />
			    </div>
			    <div className="textfield">
				<label for="place">Place</label>
				<br/>
				<input type="text" id="place" name="place" placeholder="Enter meet location" onChange={onChange} />
			    </div>
			    <div className="notif">
				<label for="notif">Reminder*</label>
				<br/>
				<input type="radio" id="notif" name="option" value=true>Yes<br>
				<input type="radio" id="notif" name="option" value=false>No<br>
			    </div>
			    <button id="submit" className="btn-submit" type="button" onClick={createPostCallback}>Submit Post</button>
		    `,
		    confirmButtonText: 'Schedule Meet',
		    showCancelButton: true,
		    focusConfirm: false,
		    preConfirm: () => {
			    const type = Swal.getPopup().querySelector('#type').value
			    const date = Swal.getPopup().querySelector('#date').value
			    const time = Swal.getPopup().querySelector('#time').value
			    const duration = Swal.getPopup().querySelector('#duration').value
			    const link = Swal.getPopup().querySelector('#link').value
			    const msg = Swal.getPopup().querySelector('#msg').value
			    const place = Swal.getPopup().querySelector('#place').value
			    const notif = Swal.getPopup().querySelector('#notif').value
			    if(!type)
			    {
				    Swal.showValidationMessage(
					    `Type is a required field`
				    )
			    }
			    else if(!date)
			    {
				    Swal.showValidationMessage(
					    `Date is a required field`
				    )
			    }
			    else if(!time)
			    {
				    Swal.showValidationMessage(
					    `Time is a required field`
				    )
			    }
			    else if(!notif)
			    {
				    Swal.showValidationMessage(
					    `Reminder is a required field`
				    )
			    }

			    var today = new Date()
			    var fdate, ftime, fts, now
			    fdate = moment(date).format("DD-MM-YYYY")
			    ftime = moment(moment(time, "HH:mm:ss")).format("HH:mm:ss")
			    fts = moment(`${fdate} ${ftime}`, 'DD-MM-YYYY HH:mm:ss').format();
			    fts = moment(fts)
			    now = moment().format('YYYY-MM-DD HH:mm:ss')
			    now = moment(now)

			    if(now > fts)
			    {
				    Swal.showValidationMessage(
					    `Invalid timestamp`
				    )
			    }

			    return { type: type, date: date, time: time, duration: duration, link: link, msg: msg, place: place, notif: notif }
		    }
	    }).then((result) => {
		    if(!result)
			    return
		    if(result.value.notif == "true")
			    result.value.notif = true
		    else
			    result.value.notif = false 

		    result.value.duration = Number(result.value.duration)
		    values.sender = user_id
		    values.sendee = fren_id
		    values.type = result.value.type
		    values.date = result.value.date
		    values.time = result.value.time
		    values.duration = result.value.duration
		    values.link = result.value.link
		    values.msg = result.value.msg
		    values.place = result.value.place
		    values.notif = result.value.notif
	    })
	    meetrequest()
    }

	async function do_meetedit(fren_id){
		document.getElementById("medit").disabled = true
		await setfren_id(fren_id);
		await Swal.fire({
			title: 'Meet Details',
			html: `
			    <div className="type">
				<label for="type">Type*</label>
				<br/>
			    </div>
			    <input type="radio" id="type" name="option" value="online">Online<br>
			    <input type="radio" id="type" name="option" value="offline">Offline<br>
			    <div className="textfield">
				<label for="date">Date*</label>
				<br/>
				<input type="date" id="date" name="date" placeholder="dd-mm-yyyy" min="" onChange={onChange} />
			    </div>
			    <div className="textfield">
				<label for="time">Time*</label>
				<br/>
				<input type="time" id="time" name="time" placeholder="Enter meet time" onChange={onChange} />
			    </div>
			    <div className="textfield">
				<label for="duration">Duration(in minutes)</label>
				<br/>
				<input type="number" id="duration" name="duration" placeholder="Enter meet duration" onChange={onChange} />
			    </div>
			    <div className="textfield">
				<label for="msg">Message</label>
				<br/>
				<input type="text" id="msg" name="msg" placeholder="Enter message" onChange={onChange} />
			    </div>
			    <div className="textfield">
				<label for="link">Link</label>
				<br/>
				<input type="text" id="link" name="link" placeholder="Enter meet link" onChange={onChange} />
			    </div>
			    <div className="textfield">
				<label for="place">Place</label>
				<br/>
				<input type="text" id="place" name="place" placeholder="Enter meet location" onChange={onChange} />
			    </div>
			    <div className="notif">
				<label for="notif">Reminder*</label>
				<br/>
				<input type="radio" id="notif" name="option" value=true>Yes<br>
				<input type="radio" id="notif" name="option" value=false>No<br>
			    </div>
			    <button id="submit" className="btn-submit" type="button" onClick={createPostCallback}>Submit Post</button>
		    `,
			confirmButtonText: 'Schedule Meet',
			showCancelButton: true,
			focusConfirm: false,
			preConfirm: () => {
				const type = Swal.getPopup().querySelector('#type').value
				const date = Swal.getPopup().querySelector('#date').value
				const time = Swal.getPopup().querySelector('#time').value
				const duration = Swal.getPopup().querySelector('#duration').value
				const link = Swal.getPopup().querySelector('#link').value
				const msg = Swal.getPopup().querySelector('#msg').value
				const place = Swal.getPopup().querySelector('#place').value
				const notif = Swal.getPopup().querySelector('#notif').value
				if(!type)
				{
					Swal.showValidationMessage(
						`Type is a required field`
					)
				}
				else if(!date)
				{
					Swal.showValidationMessage(
						`Date is a required field`
					)
				}
				else if(!time)
				{
					Swal.showValidationMessage(
						`Time is a required field`
					)
				}
				else if(!notif)
				{
					Swal.showValidationMessage(
						`Reminder is a required field`
					)
				}

				var today = new Date()
				var fdate, ftime, fts, now
				fdate = moment(date).format("DD-MM-YYYY")
				ftime = moment(moment(time, "HH:mm:ss")).format("HH:mm:ss")
				fts = moment(`${fdate} ${ftime}`, 'DD-MM-YYYY HH:mm:ss').format();
				fts = moment(fts)
				now = moment().format('YYYY-MM-DD HH:mm:ss')
				now = moment(now)

				if(now > fts)
				{
					Swal.showValidationMessage(
						`Invalid timestamp`
					)
				}

				return { type: type, date: date, time: time, duration: duration, link: link, msg: msg, place: place, notif: notif }
			}
		}).then((result) => {
			if(!result)
				return;
			if(result.value.notif == "true")
				result.value.notif = true
			else
				result.value.notif = false 

			result.value.duration = Number(result.value.duration)
			values.sender = user_id
			values.sendee = fren_id
			values.type = result.value.type
			values.date = result.value.date
			values.time = result.value.time
			values.duration = result.value.duration
			values.link = result.value.link
			values.msg = result.value.msg
			values.place = result.value.place
			values.notif = result.value.notif
		})
		meetedit();
	}

	async function do_meetaccept(fren_id){
		document.getElementById("macc").disabled = true
		await setfren_id(fren_id);
		meetaccept();
	}

	async function do_meetreject(fren_id){
		document.getElementById("mrej").disabled = true
		await setfren_id(fren_id);
		meetreject();
	}

    var recommendations = data ? data.recommend : "";

    const onSwipe = (direction, recommend_id, recommend_name) => {
        console.log(direction, recommend_id)
        if(direction==='right'){
            Swal.fire({
              title: 'Send Friend Request?',
              text: 'You are sending a Friend Request to ' + recommend_name,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, go ahead!',
              cancelButtonText: 'No, go back'
            }).then((result) => {
              if (result.value) {
                send_frenrequest(recommend_id);
                Swal.fire(
                  'Sent!',
                  'Friend Request Sent',
                  'success'
                )
              // For more information about handling dismissals please visit
              // https://sweetalert2.github.io/#handling-dismissals
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                  'Cancelled',
                  'Did not send the request. :)',
                  'error'
                )
              }
            })
        }
        else if(direction==='left'){
            Swal.fire({
              title: 'Meet Up?',
              text: 'You are sending a Meet Request to ' + recommend_name,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, go ahead!',
              cancelButtonText: 'No, go back'
            }).then((result) => {
              if (result.value) {
                send_meetrequest(recommend_id);
                Swal.fire(
                  'Sent!',
                  'Meet Request Sent',
                  'success'
                )
              // For more information about handling dismissals please visit
              // https://sweetalert2.github.io/#handling-dismissals
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                  'Cancelled',
                  'Did not send the request. :)',
                  'error'
                )
              }
            })
        }
        else if(direction==='down'){
            Swal.fire({
              title: 'Redirect to User Page?',
              text: 'You will be redirected to the profile of ' + recommend_name,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, go ahead!',
              cancelButtonText: 'No, go back'
            }).then((result) => {
              if (result.value) {
                props.history.push('/profile/'+recommend_name);
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                  'Cancelled',
                  'No worries, we will always obey your commands. :)',
                  'error'
                )
              }
            })
        }
    }

    function removeCoachOverlay(){
      document.getElementById("coachOverlay").style.display = "none";
    }
     
    const onCardLeftScreen = (myIdentifier) => {
      console.log(myIdentifier + ' left the screen')
    }

    const redirectUserCallback = (username) => {
      props.history.push('/profile/'+username)
    }

    return (
            <>
            <Sidebar/>

            <div className="coach-mark-overlay" onClick={removeCoachOverlay} id="coachOverlay">
              <div className="left-arrow"><i><FontAwesomeIcon icon={faHandPointLeft} /></i> <div className="coach-text">Swipe Left to Meet Up</div> </div>
              <div className="right-arrow"><i><FontAwesomeIcon icon={faHandPointRight} /></i> <div className="coach-text">Swipe Right to send Friend Request</div> </div>
              <div className="up-arrow"><i><FontAwesomeIcon icon={faHandPointUp} /></i> <div className="coach-text">Swipe Up to see other people</div> </div>
              <div className="down-arrow"><i><FontAwesomeIcon icon={faHandPointDown} /></i> <div className="coach-text">Swipe Down to check out user profile</div> </div>
            </div>
            <main className="s-layout__content">
                <div className="container-fluid mt-5">
                    <div className="feature-display mt-5 mobile-only">
                        <div className="no-recommendations">No recommendations for you at the moment. Please come back later. :(</div>
                        {recommendations && recommendations.slice(0).reverse().map(recommendation => (
                            <>
                                <TinderCard onSwipe={(dir) => onSwipe(dir, recommendation['id'], recommendation['username'])} onCardLeftScreen={() => onCardLeftScreen(recommendation['username'])}>
                                    <div className="friend">
                                      <div className="image-container">
                                        {recommendation.imgUrl === "" ? <img src='/img/dp.jpeg' alt="display"/> : <img src={recommendation.imgUrl} alt="display"/> }
                                      </div>
                                      <div className="desktop-top-content">
                                            <div className="similarity"><span className="similarity-number">&nbsp;{Math.round((recommendation['match'] + Number.EPSILON) * 100)/100} </span>%</div>
                                        <br />
                                      </div>
                                        <div className="friend-content">
                                            {/*<button className="rounded ml-2 my-2" onClick={() => send_frenrequest(recommendation['id'])}>SEND A FRIEND REQUEST</button>*/}
                                            <div className="card-bottom">
                                                <div className="card-bottom-content">
                                                    <div className="card-email">{recommendation['email']}</div>
                                                    <div className="card-username">{recommendation['username']}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TinderCard>

                            </>
                        ))}
                    </div>
                    <animated.div style={fadeInFast}>
                    <div className="feature-display-desktop mt-5 desktop-only text-center">
	    <div className="noReco">
	    {recommendations.length === 0 ? "No recommendations for you at the moment. Please come back later. :(": ""}
	    </div>

                        {recommendations && recommendations.map(recommendation => (
                            <>
                                
                                <div className="recommend-card">
                                    <div className="desktop-top-container">
                                      <div className="desktop-top-content">
                                              <div className="similarity"><span className="similarity-number">&nbsp;{Math.round((recommendation['match'] + Number.EPSILON) * 100)/100} </span>%</div>
                                      <br />
                                    </div>
                                    <div className="request-buttons">
				<button id="freq" className="rounded ml-2 my-2 float-right" onClick={() => send_frenrequest(recommendation['id'])}>SEND FRIEND REQUEST</button>
				{recommendation.meet === 0 ? <button id="mreq" className="rounded ml-2 my-2 float-right" onClick={() => send_meetrequest(recommendation['id'])}>MEET UP</button> : ""}
				{recommendation.meet === 2 ? <div>Pending Meet Request!</div> : ""}
{recommendation.meet === 3 ? 
		<div>
		<button id="medit" className="rounded ml-2 my-2 float-right" onClick={() => do_meetedit(recommendation['id'])}>EDIT MEET DETAILS</button> 
		<button id="macc" className="rounded ml-2 my-2 float-right" onClick={() => do_meetaccept(recommendation['id'])}>ACCEPT MEET UP</button> 
		<button id="mrej" className="rounded ml-2 my-2 float-right" onClick={() => do_meetreject(recommendation['id'])}>IGNORE MEET UP</button> 
		</div>
		: ""}
				</div>
                                    </div>
                                    <div className="image-container">
                                      {recommendation.imgUrl === "" ? <img src='/img/dp.jpeg' alt="display"/> : <img src={recommendation.imgUrl} alt="display"/> }
                                    </div>
                                    <div className="card-bottom-desktop" onClick={() => redirectUserCallback(recommendation['username'])}>
                                        <div className="card-bottom-content">
                                            <div className="card-email">{recommendation['email']}</div>
                                            <div className="card-username">{recommendation['username']}</div>
                                        </div>
                                    </div>
                                </div>
                                
                            </>
                        ))}
                    </div>
                    </animated.div>
                </div>
            </main>
            </>
    )
}

const FREN_REQUEST = gql`
    mutation frenrequest($user_id: String!, $fren_id: String!) {
        frenrequest(user_id: $user_id, fren_id: $fren_id)
    }
`;

const MEET_REQUEST = gql`
    mutation meetrequest(
	    $sender: String!
	    $sendee: String!
	    $type: String!
	    $date: String!
	    $time: String!
	    $duration: Int
	    $link: String
	    $msg: String
	    $place: String
	    $notif: Boolean!
    ) {
	    meetrequest(
		    data: {
			    sender: $sender
			    sendee: $sendee
			    type: $type
			    date: $date
			    time: $time
			    duration: $duration
			    link: $link
			    msg: $msg
			    place: $place
			    notif: $notif
		    }
	    )
    }
`;

const FETCH_MEET = gql`
    query($user: String!, $other: String!){
        meetDisp(user: $user, other: $other){
		id people type date time duration link msg place notif
        }
    }
`

const MEET_EDIT = gql`
    mutation meetEdit(
	    $sender: String!
	    $sendee: String!
	    $type: String!
	    $date: String!
	    $time: String!
	    $duration: Int
	    $link: String
	    $msg: String
	    $place: String
	    $notif: Boolean!
    ) {
	    meetEdit(
		    data: {
			    sender: $sender
			    sendee: $sendee
			    type: $type
			    date: $date
			    time: $time
			    duration: $duration
			    link: $link
			    msg: $msg
			    place: $place
			    notif: $notif
		    }
	    )
    }
`;

const MEET_ACCEPT = gql`
    mutation meetaccept($user_id: String!, $fren_id: String!) {
        meetaccept(user_id: $user_id, fren_id: $fren_id)
    }
`;

const MEET_REJECT = gql`
    mutation meetreject($user_id: String!, $fren_id: String!) {
        meetreject(user_id: $user_id, fren_id: $fren_id)
    }
`;

const FETCH_RECOMMENDATIONS_QUERY = gql`
    query($user_id: String!){
        recommend(id: $user_id){
            id username match email meet imgUrl
        }
    }
`
export default Recommend;
