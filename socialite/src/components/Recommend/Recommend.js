import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery, useMutation} from '@apollo/react-hooks';
import { useState } from 'react';
import gql from 'graphql-tag';

import { AuthContext } from '../../context/auth'

import "./Recommend.css"
import Dashboard from '../Dashboard/Dashboard';

function Recommend(props){

    const { user, logout } = useContext(AuthContext);

    function logUserOut()
    {
        logout();
        props.history.push('/')
    }

    function dashboard()
    {
        props.history.push('/dashboard')
    }

    const user_id = user.id;
    const [fren_id, setfren_id] = useState('');
    console.log(user)

    const [frenrequest, { frequest }] = useMutation(FREN_REQUEST, {
        update(_, { data: { login: userData } }){
          window.location.reload(false);
        },
        variables: {
            user_id,
            fren_id
        }
    })

    const [meetrequest, { mrequest }] = useMutation(MEET_REQUEST, {
        update(_, { data: { login: userData } }){
          window.location.reload(false);
        },
        variables: {
            user_id,
            fren_id
        }
    })

    const { data } = useQuery(FETCH_RECOMMENDATIONS_QUERY, {
        variables: {
            user_id
        }
    });

    async function send_frenrequest(fren_id){
        await setfren_id(fren_id);
        frenrequest();
    }

    async function send_meetrequest(fren_id){
        await setfren_id(fren_id);
        meetrequest();
    }

    var recommendations = data ? data.recommend : "";

    return (
            <>
            <div className="container">
                <div className="authenticate-nav">
                    <div className="a-nav-right">
                        <button className="rounded ml-2" onClick={dashboard}>DASHBOARD</button>
                        <button className="rounded ml-2 my-2" onClick={logUserOut}>LOGOUT</button>
                    </div>
                </div>

                <div className="feature-display">
                    <div className="subsection-header"> Let us recommend you some friends! </div>
                    <div className="row">
                        {recommendations && recommendations.map(recommendation => (
                            <div className="col-lg-12">
                            <div className="friend">
                                <div className="friend-content">
                                    <strong>Email: {recommendation['email']}</strong>
                                    <br />
                                    Friend Match Probability: {Math.round((recommendation['match'] + Number.EPSILON) * 100)/100}%
                                    <br />
                                    <button className="rounded ml-2 my-2" onClick={() => send_frenrequest(recommendation['id'])}>SEND A FRIEND REQUEST</button>
                                    <button className="rounded ml-2 my-2" onClick={() => send_meetrequest(recommendation['id'])}>SEND A MEET REQUEST</button>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            </>
    )
}

const FREN_REQUEST = gql`
    mutation frenrequest($user_id: String!, $fren_id: String!) {
        frenrequest(user_id: $user_id, fren_id: $fren_id)
    }
`;

const MEET_REQUEST = gql`
    mutation meetrequest($user_id: String!, $fren_id: String!) {
        meetrequest(user_id: $user_id, fren_id: $fren_id)
    }
`;

const FETCH_RECOMMENDATIONS_QUERY = gql`
    query($user_id: String!){
        recommend(id: $user_id){
            id match email
        }
    }
`
export default Recommend;