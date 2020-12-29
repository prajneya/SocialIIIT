import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { useState } from 'react';
import gql from 'graphql-tag';
import Swal from 'sweetalert2';
import moment from "moment-timezone"
import '../Recommend/Recommend.css';

import { AuthContext } from '../../context/auth'

import "./notifications.css"
import Sidebar from "../Sidebar";

function Notifications(props){

    const { user } = useContext(AuthContext);

    const user_id = user.id;
    const [fren_id, setfren_id] = useState('');
	const [values, setValues] = useState({});

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

    const [frenaccept] = useMutation(FREN_ACCEPT, {
        update(_, { data: { login: userData } }){
          window.location.reload(false);
        },
        variables: {
            user_id,
            fren_id
        }
    })

    const [frenreject] = useMutation(FREN_REJECT, {
        update(_, { data: { login: userData } }){
          window.location.reload(false);
        },
        variables: {
            user_id,
            fren_id
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

	const [loadMeet, { called, data: meetDets }] = useLazyQuery(FETCH_MEET, { 
		variables: { 
			user_id,
			fren_id
		} 
	});

    const { data: notifs, loading } = useQuery(FETCH_NOTIFICATIONS_QUERY, {
        variables: {
            user_id
        }
    });

	async function do_meetedit(e, fren_id){
		e.stopPropagation()
		await setfren_id(fren_id);
		await Swal.fire({
			title: 'Meet Details',
			html: `
			    <label class="d-inline-block text-warning" for="type">Type:<span class="text-danger">*</span></label>
				<input type="radio" id="online" name="option" value="online">
    			<label for="online">Online</label>
    			<input type="radio" id="offline" name="option" value="offline">
    			<label for="offline">Offline</label><br><br>
			    <div class="textfield">
				<label class="d-inline-block text-warning" for="date">Date:<span class="text-danger">*</span></label>
				<input class="d-inline-block" type="date" id="date" name="date" placeholder="dd-mm-yyyy" min="" onChange={onChange} />
			    </div><br>
			    <div class="textfield">
				<label class="text-warning" for="time">Time:<span class="text-danger">*</span></label>
				<input type="time" id="time" name="time" placeholder="Enter meet time" onChange={onChange} />
			    </div><br>
			    <div class="textfield">
				<label class="text-warning" for="duration">Duration(in minutes):</label>
				<input type="number" id="duration" name="duration" placeholder="Enter meet duration" onChange={onChange} />
			    </div><br>
			    <div class="textfield">
				<label class="text-warning" for="msg">Message:</label>
				<textarea type="text" id="msg" name="msg" placeholder="Craft a beautiful message. Maybe drop your Instagram ID first? No one likes a creep." onChange={onChange}></textarea>
			    </div><br>
			    <div class="textfield">
				<label class="text-warning" for="link">Link:</label>
				<input type="text" id="link" name="link" placeholder="Enter meet link" onChange={onChange} />
			    </div><br>
			    <div class="textfield">
				<label class="text-warning" for="place">Place:</label>
				<input type="text" id="place" name="place" placeholder="Enter meet location" onChange={onChange} />
			    </div><br>
			    <div class="notif">
				<label class="text-warning" for="notif">Reminder:<span class="text-danger">*</span></label>
				<input type="radio" id="reminder_yes" name="options" value=true><label for="reminder_yes">Yes</label>
				<input type="radio" id="reminder_no" name="options" value=false><label for="reminder_no">No</label>
			    </div>
		    `,
			confirmButtonText: 'Schedule Meet',
			showCancelButton: true,
			focusConfirm: false,
			preConfirm: () => {
				var types = document.getElementsByName('option')
				var i, save
				for(i = 0; i < types.length; ++i)
				{
					if(types[i].checked)
						save = types[i].value
				}

				const type = save
				const date = Swal.getPopup().querySelector('#date').value
				const time = Swal.getPopup().querySelector('#time').value
				const duration = Swal.getPopup().querySelector('#duration').value
				const link = Swal.getPopup().querySelector('#link').value
				const msg = Swal.getPopup().querySelector('#msg').value
				const place = Swal.getPopup().querySelector('#place').value
				var notifs = document.getElementsByName('options')
				for(i = 0; i < notifs.length; ++i)
				{
					if(notifs[i].checked)
						save = notifs[i].value
				}
				const notif = save

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
			if(!result.isConfirmed)
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
			meetedit();
		})
	}

    async function do_frenaccept(e, fren_id){
	    e.stopPropagation()
	document.getElementById("facc").disabled = true
        await setfren_id(fren_id);
        frenaccept();
    }

    async function do_frenreject(e, fren_id){
	    e.stopPropagation()
	document.getElementById("frej").disabled = true
        await setfren_id(fren_id);
        frenreject();
    }

    async function do_meetaccept(e, fren_id){
	    e.stopPropagation()
	document.getElementById("macc").disabled = true
        await setfren_id(fren_id);
        meetaccept();
    }

    async function do_meetreject(e, fren_id){
	    e.stopPropagation()
	document.getElementById("mrej").disabled = true
        await setfren_id(fren_id);
        meetreject();
    }

    var notifications = notifs ? notifs.getNotif : "";

    const redirectUserCallback = (username) => {
      props.history.push('/profile/'+username)
    }

	console.log(meetDets)
    return (
            <>
            <Sidebar/>
            <main class="s-layout__content">
                <div className="container-fluid">

                    <div className="mt-5">
                    <div className="wall subsection-header"> RESPOND TO YOUR REQUESTS HERE 
	    <br />
	    {notifications.length === 0 ? "Sorry no notifications for you :(": ""}
	    </div>
                        <div className="notifications-container">
                        <div className="row">
                            {notifications && notifications.map(notification => (
                                <div className="col-lg-12">
                                    <div className="notifications" onClick={() => redirectUserCallback(notification['username'])}>
                                        <div className="notification-content">
                                            <div className="text-left d-inline-block">
                                            <strong>Username: {notification['username']}</strong>
                                            <br />
                                            <strong>Email: {notification['email']}</strong>
                                            <br />
                                            Friend Match Probability: {Math.round((notification['match'] + Number.EPSILON) * 100)/100}%
                                            <br />
                                            </div>
                                            <div className="w-100 text-right d-inline-block">
                                            {notification['type'] === "freq" ? 
                                            <div>
                                                <button id="facc" className="rounded ml-1 my-2 interact" onClick={(event) => do_frenaccept(event, notification['userId'])}>ACCEPT FRIEND REQUEST</button>
                                                <button id="frej" className="rounded ml-1 my-2 interact" onClick={(event) => do_frenreject(event, notification['userId'])}>IGNORE FRIEND REQUEST</button>
                                            </div>
                                            : ""}
                                            {notification['type'] === "mreq" ?
                                            <div>
                                                <button id="medit" className="rounded ml-1 my-2 interact" onClick={(event) => do_meetedit(event, notification['userId'])}>EDIT MEET DETAILS</button>
                                                <button id="macc" className="rounded ml-1 my-2 interact" onClick={(event) => do_meetaccept(event, notification['userId'])}>ACCEPT MEET UP</button>
                                                <button id="mrej" className="rounded ml-1 my-2 interact" onClick={(event) => do_meetreject(event, notification['userId'])}>IGNORE MEET UP</button>
                                            </div>
                                            : ""}
                                            {notification['type'] === "facc" ?
                                            <div>
                                                {notification['username']} accepted your friend request!     
                                            </div>
                                            : ""}
                                            {notification['type'] === "macc" ?
                                            <div>
                                                Meet request accepted! Schedule your meet now!
                                            </div>
                                            : ""}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

const FREN_ACCEPT = gql`
    mutation frenaccept($user_id: String!, $fren_id: String!) {
        frenaccept(user_id: $user_id, fren_id: $fren_id)
    }
`;

const FREN_REJECT = gql`
    mutation frenreject($user_id: String!, $fren_id: String!) {
        frenreject(user_id: $user_id, fren_id: $fren_id)
    }
`;

const FETCH_MEET = gql`
    query($user_id: String!, $fren_id: String!){
        meetDisp(user: $user_id, other: $fren_id){
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

const FETCH_NOTIFICATIONS_QUERY = gql`
    query($user_id: String!){
        getNotif(id: $user_id){
            userId email match type username
        }
    }
`
export default Notifications;
