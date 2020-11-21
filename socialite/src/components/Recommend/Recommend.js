import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery, useMutation} from '@apollo/react-hooks';
import { useState } from 'react';
import gql from 'graphql-tag';
import TinderCard from 'react-tinder-card';
import Swal from 'sweetalert2';
import {useSpring, animated} from 'react-spring'

import { AuthContext } from '../../context/auth';

import "./Recommend.css";
import Dashboard from '../Dashboard/Dashboard';
import Sidebar from "../Sidebar";

function Recommend(props){

    const { user, logout } = useContext(AuthContext);

    const fadeInFast = useSpring({opacity: 1, from: {opacity: 0}, delay: 300, config: { duration: 1000 }})

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

    const [frenrequest, { frequest }] = useMutation(FREN_REQUEST, {
        variables: {
            user_id,
            fren_id
        }
    })

    const [meetrequest, { mrequest }] = useMutation(MEET_REQUEST, {
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

     const [imgUrl, setImgUrl] = useState('')

    async function loadDefaultPicDesktop(id){
      document.getElementById("desktop_dp_"+id).src = "/img/dp.jpeg";
      await setImgUrl("abc")
    }

    async function loadDefaultPicMobile(id){
      document.getElementById("mobile_dp_"+id).src = "/img/dp.jpeg";
      await setImgUrl("abc")
    }

    if(loading){
        return (<><div id="overlay" style={{display: "block"}}></div>
            <div id="vibe-animation" style={{display: "block"}}><div className="loader">Loading...</div><br/>SENDING OUT A VIBE ...</div></>)
    }

    async function send_frenrequest(fren_id){
        await setfren_id(fren_id);
        frenrequest();
    }

    async function send_meetrequest(fren_id){
        await setfren_id(fren_id);
        meetrequest();
    }

    var recommendations = data ? data.recommend : "";

    const onSwipe = (direction, recommend_id, recommend_name) => {
        console.log(direction, recommend_id)
        if(direction=='right'){
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
        else if(direction=='left'){
            Swal.fire({
              title: 'Send Meet Request?',
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
            <main class="s-layout__content">
                <div className="container-fluid mt-5">
                    <div className="feature-display mt-5 mobile-only">
                        {recommendations && recommendations.slice(0).reverse().map(recommendation => (
                            <>
                                <TinderCard onSwipe={(dir) => onSwipe(dir, recommendation['id'], recommendation['email'])} onCardLeftScreen={() => onCardLeftScreen(recommendation['email'])}>
                                    <div className="friend">
                                      <div class="image-container">
                                        <img src={"https://res.cloudinary.com/dmhai1riu/image/upload/profile_pics/"+recommendation.id+".png"} id={"mobile_dp_"+recommendation.id} onError={() => loadDefaultPicMobile(recommendation.id)} alt="display"/>
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
                        {recommendations && recommendations.map(recommendation => (
                            <>
                                
                                <div className="recommend-card">
                                    <div className="desktop-top-container">
                                      <div className="desktop-top-content">
                                              <div className="similarity"><span className="similarity-number">&nbsp;{Math.round((recommendation['match'] + Number.EPSILON) * 100)/100} </span>%</div>
                                      <br />
                                    </div>
                                    <div className="request-buttons"><button className="rounded ml-2 my-2 float-right" onClick={() => send_frenrequest(recommendation['id'])}>SEND FRIEND REQUEST</button><button className="rounded ml-2 my-2 float-right" onClick={() => send_meetrequest(recommendation['id'])}>SEND MEET REQUEST</button></div>
                                    </div>
                                    <div class="image-container">
                                      <img src={"https://res.cloudinary.com/dmhai1riu/image/upload/profile_pics/"+recommendation.id+".png"} id={"desktop_dp_"+recommendation.id} onError={() => loadDefaultPicDesktop(recommendation.id)} alt="display"/>
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
    mutation meetrequest($user_id: String!, $fren_id: String!) {
        meetrequest(user_id: $user_id, fren_id: $fren_id)
    }
`;

const FETCH_RECOMMENDATIONS_QUERY = gql`
    query($user_id: String!){
        recommend(id: $user_id){
            id username match email
        }
    }
`
export default Recommend;