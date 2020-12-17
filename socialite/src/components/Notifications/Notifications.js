import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery, useMutation} from '@apollo/react-hooks';
import { useState } from 'react';
import gql from 'graphql-tag';
import '../Recommend/Recommend.css';

import { AuthContext } from '../../context/auth'

import "./notifications.css"
import Sidebar from "../Sidebar";

function Notifications(props){

    const { user } = useContext(AuthContext);

    const user_id = user.id;
    const [fren_id, setfren_id] = useState('');

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

    const { data } = useQuery(FETCH_NOTIFICATIONS_QUERY, {
        variables: {
            user_id
        }
    });

    async function do_frenaccept(fren_id){
        await setfren_id(fren_id);
        frenaccept();
    }

    async function do_frenreject(fren_id){
        await setfren_id(fren_id);
        frenreject();
    }

    async function do_meetaccept(fren_id){
        await setfren_id(fren_id);
        meetaccept();
    }

    async function do_meetreject(fren_id){
        await setfren_id(fren_id);
        meetreject();
    }

    var notifications = data ? data.getNotif : "";

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
                                    <div className="notifications">
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
                                                <button className="rounded ml-1 my-2 interact" onClick={() => do_frenaccept(notification['userId'])}>ACCEPT FRIEND REQUEST</button>
                                                <button className="rounded ml-1 my-2 interact" onClick={() => do_frenreject(notification['userId'])}>REJECT FRIEND REQUEST</button>
                                            </div>
                                            : ""}
                                            {notification['type'] === "mreq" ?
                                            <div>
                                                <button className="rounded ml-1 my-2 interact" onClick={() => do_meetaccept(notification['userId'])}>ACCEPT MEET REQUEST</button>
                                                <button className="rounded ml-1 my-2 interact" onClick={() => do_meetreject(notification['userId'])}>REJECT MEET REQUEST</button>
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
