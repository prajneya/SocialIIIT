import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import gql from 'graphql-tag';
import Parser from 'html-react-parser';
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AuthContext } from '../../context/auth'

import "./Timeline.css"
import Sidebar from "../Sidebar";

function Timeline(props){

  const { user, logout } = useContext(AuthContext)

  function logUserOut(){
    logout();
    props.history.push('/')
  }

  const curid = user.id;
  const [fren_id, setfren_id] = useState('');
  
  const [frenrequest, { frequest }] = useMutation(FREN_REQUEST, {
    update(_, { data: { login: userData } }){
      window.location.reload(false);
    },
    variables: {
        curid,
        fren_id
    }
})

const [meetrequest, { mrequest }] = useMutation(MEET_REQUEST, {
    update(_, { data: { login: userData } }){
      window.location.reload(false);
    },
    variables: {
        curid,
        fren_id
    }
})

const [frenaccept, { faccept }] = useMutation(FREN_ACCEPT, {
  update(_, { data: { login: userData } }){
    window.location.reload(false);
  },
  variables: {
      curid,
      fren_id
  }
})

const [frenreject, { freject }] = useMutation(FREN_REJECT, {
  update(_, { data: { login: userData } }){
    window.location.reload(false);
  },
  variables: {
      curid,
      fren_id
  }
})

const [meetaccept, { maccept }] = useMutation(MEET_ACCEPT, {
  update(_, { data: { login: userData } }){
    window.location.reload(false);
  },
  variables: {
      curid,
      fren_id
  }
})

const [meetreject, { mreject }] = useMutation(MEET_REJECT, {
  update(_, { data: { login: userData } }){
    window.location.reload(false);
  },
  variables: {
      curid,
      fren_id
  }
})

async function send_frenrequest(fren_id){
  await setfren_id(fren_id);
  frenrequest();
}

async function send_meetrequest(fren_id){
  await setfren_id(fren_id);
  meetrequest();
}

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

const username = props.match.params.username;

  const { data: timelineData } = useQuery(FETCH_TIMELINE, {
        variables: {
            username: username
        }
  });

  var timeline_data = timelineData ? timelineData.getTimelineInfo : "";
  var id = timelineData ? timeline_data.id : "";

  const { data: profileData } = useQuery(FETCH_PROFILE, {
    variables: {
        curid: curid,
        id: id
    }
  });

  var profile_data = profileData ? profileData.profile : "";

  const { data: userTimelineData } = useQuery(FETCH_USER_TIMELINE, {
    variables: {
      id: timeline_data.id
    }
  });
  var user_timeline_data = userTimelineData ? userTimelineData.getUserTimelineData : "";

  if(!timeline_data){
    return (<>USER NOT FOUND</>)
  }

  return (
            <>
              <Sidebar/>
              <main class="s-layout__content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xl-9">
                      <div className="display my-5">
                        <div className="mx-2 username">{username}</div><div className="rating mt-1 mx-2 p-2">RATING: {timeline_data ? timeline_data.rating : ""}</div>
                        <div className="times-answered mt-1 mx-2 p-2">CONTRIBUTION: <strong>{timeline_data ? timeline_data.contributions : ""}</strong></div>
                        <div className="email mx-2">{timeline_data ? timeline_data.email : ""}</div>
                        <div className="about-me mx-2 my-5">
                          <div className="row">
                            <div className="col-xl-4">
                              <img src={"https://res.cloudinary.com/dmhai1riu/image/upload/profile_pics/"+timeline_data.id+".png"} alt="display"/>
                            </div>
                            <div className="col-xl-8 about-me-text">
                              {user_timeline_data['bio']}
                              <div className="social-links">
                                {user_timeline_data['fblink'] ? <a href={user_timeline_data['fblink']} target="_blank"><i><FontAwesomeIcon icon={faFacebook} size="2x"/></i></a> : ""}
                                {user_timeline_data['ghlink'] ? <a href={user_timeline_data['ghlink']} target="_blank"><i><FontAwesomeIcon icon={faGithub} size="2x"/></i></a> : ""}
                                {profile_data.friend === 0 ? 
                                <button className="rounded ml-2 my-2 float-right" onClick={() => send_frenrequest(timeline_data.id)}>SEND A FRIEND REQUEST</button>
                                : ""}
                                {profile_data.friend === 1 ? 
                                <div>You're Friends!</div>
                                : ""}
                                {profile_data.friend === 2 ? 
                                <div>Pending Friend Request!</div>
                                : ""}
                                {profile_data.friend === 3 ?
                                <div>
                                <button className="rounded ml-2 my-2 float-right" onClick={() => do_frenaccept(timeline_data.id)}>ACCEPT FRIEND REQUEST</button>
                                <button className="rounded ml-2 my-2 float-right" onClick={() => do_frenreject(timeline_data.id)}>REJECT FRIEND REQUEST</button>
                                </div>
                                : ""}

                                {profile_data.meet === 0 ? 
                                <button className="rounded ml-2 my-2 float-right" onClick={() => send_meetrequest(timeline_data.id)}>SEND A MEET REQUEST</button>
                                : ""}
                                {profile_data.meet === 2 ? 
                                <div>Pending Meet Request!</div>
                                : ""}
                                {profile_data.meet === 3 ? 
                                <div>
                                <button className="rounded ml-2 my-2 float-right" onClick={() => do_meetaccept(timeline_data.id)}>ACCEPT MEET REQUEST</button>
                                <button className="rounded ml-2 my-2 float-right" onClick={() => do_meetreject(timeline_data.id)}>REJECT MEET REQUEST</button>
                                </div>
                                : ""}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                  
                      <div className="container-fluid my-2">
                        <div className="showcase desktop-only">
                          <div className="showcase-header">
                            USER SHOWCASE
                          </div>
                          <br/>
                          <hr/>
                          <div className="showcase-top-skills">
                            <div className="row">
                              <div className="col-lg-3 mt-2">
                                <div className="top-skill">
                                  <div className="top-skill-icon">
                                    <img src='/img/badge1.png' alt=""></img>
                                  </div>
                                  <div className="top-skill-name">
                                    CHALLENGER
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-3 mt-2">
                                <div className="top-skill">
                                  <div className="top-skill-icon">
                                    <img src='/img/badge2.png' alt=""></img>
                                  </div>
                                  <div className="top-skill-name">
                                    CHALLENGER
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-3 mt-2">
                                <div className="top-skill">
                                  <div className="top-skill-icon">
                                    <img src='/img/badge3.png' alt=""></img>
                                  </div>
                                  <div className="top-skill-name">
                                    CHALLENGER
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-3 mt-2">
                                <div className="top-skill">
                                  <div className="top-skill-icon">
                                    <img src='/img/badge4.png' alt=""></img>
                                  </div>
                                  <div className="top-skill-name">
                                    CHALLENGER
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="container-fluid my-5">
                        <div className="showcase">
                          <div className="showcase-header">
                            PROJECTS AND EXPERIENCES
                          </div>
                          <br/>
                          <hr/>
                          <div className="showcase-projects">
                                                    {user_timeline_data['pOneTitle'] && user_timeline_data['pOneTitle'].trim() != "" && user_timeline_data['pOneDesc'].trim() != "" ?
                            <>
                            <div className="project-container mt-3 pb-5">
                              <div className="project-header">
                                <div className="float-left mt-5 ml-5"><i><FontAwesomeIcon icon={faFolderOpen} size="2x"/></i></div>
                                <div className="float-right m-5">
                                  {user_timeline_data['pOneGhLink'] ? <a href={user_timeline_data['pOneGhLink']} target="_blank"><i><FontAwesomeIcon icon={faGithub} size="2x"/></i></a> : "" }
                                  {user_timeline_data['pOneELink'] ? <a href={user_timeline_data['pOneELink']} target="_blank"><i><FontAwesomeIcon icon={faExternalLinkAlt} size="2x"/></i></a> : "" }
                                </div>
                              </div>
                              <div className="project-title ml-5">
                                {user_timeline_data['pOneTitle']}
                              </div>
                              <div className="project-body mx-5 mt-3">
                                {user_timeline_data['pOneDesc']}
                              </div>
                              {/*<div className="tags d-inline-block mx-5 mt-5">
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                              </div> */} 
                            </div> 
                            </>
                            : "" }
                            {user_timeline_data['pTwoTitle'] && user_timeline_data['pTwoTitle'].trim() != "" && user_timeline_data['pTwoDesc'].trim() != "" ?
                            <>
                            <div className="project-container mt-3 pb-5">
                              <div className="project-header">
                                <div className="float-left mt-5 ml-5"><i><FontAwesomeIcon icon={faFolderOpen} size="2x"/></i></div>
                                <div className="float-right m-5">
                                  {user_timeline_data['pTwoGhLink'] ? <a href={user_timeline_data['pTwoGhLink']} target="_blank"><i><FontAwesomeIcon icon={faGithub} size="2x"/></i></a> : "" }
                                  {user_timeline_data['pTwoELink'] ? <a href={user_timeline_data['pTwoELink']} target="_blank"><i><FontAwesomeIcon icon={faExternalLinkAlt} size="2x"/></i></a> : "" }
                                </div>
                              </div>
                              <div className="project-title ml-5">
                                {user_timeline_data['pTwoTitle']}
                              </div>
                              <div className="project-body mx-5 mt-3">
                                {user_timeline_data['pTwoDesc']}
                              </div>
                              {/*<div className="tags d-inline-block mx-5 mt-5">
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                              </div> */} 
                            </div> 
                            </>
                            : "" }
                            {user_timeline_data['pThreeTitle'] && user_timeline_data['pThreeTitle'].trim() != "" && user_timeline_data['pThreeDesc'].trim() != "" ?
                            <>
                            <div className="project-container mt-3 pb-5">
                              <div className="project-header">
                                <div className="float-left mt-5 ml-5"><i><FontAwesomeIcon icon={faFolderOpen} size="2x"/></i></div>
                                <div className="float-right m-5">
                                  {user_timeline_data['pThreeGhLink'] ? <a href={user_timeline_data['pThreeGhLink']} target="_blank"><i><FontAwesomeIcon icon={faGithub} size="2x"/></i></a> : "" }
                                  {user_timeline_data['pThreeELink'] ? <a href={user_timeline_data['pThreeELink']} target="_blank"><i><FontAwesomeIcon icon={faExternalLinkAlt} size="2x"/></i></a> : "" }
                                </div>
                              </div>
                              <div className="project-title ml-5">
                                {user_timeline_data['pThreeTitle']}
                              </div>
                              <div className="project-body mx-5 mt-3">
                                {user_timeline_data['pThreeDesc']}
                              </div>
                              {/*<div className="tags d-inline-block mx-5 mt-5">
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                              </div> */} 
                            </div> 
                            </>
                            : "" }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 right-sidebar">
                      <div className="gratitude-point-list">
                        <div className="my-3 p-2 top-users-post">
                          <div className="card-header">
                            GRATITUDE POINTS
                          </div>
                          <div className="top-users m-4">
                            <ul>
                              {timeline_data.skills && Object.keys(timeline_data.skills).map(skill => (
                      timeline_data.skills[skill] > 0 ?
                              <li className="mt-4">{skill}
                                <div className="no-post float-right">{timeline_data.skills[skill]}</div>
                              </li>: ""
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
              </main>
            </>
      )
    
}

const FREN_REQUEST = gql`
    mutation frenrequest($curid: String!, $fren_id: String!) {
        frenrequest(user_id: $curid, fren_id: $fren_id)
    }
`;

const MEET_REQUEST = gql`
    mutation meetrequest($curid: String!, $fren_id: String!) {
        meetrequest(user_id: $curid, fren_id: $fren_id)
    }
`;

const FREN_ACCEPT = gql`
    mutation frenaccept($curid: String!, $fren_id: String!) {
        frenaccept(user_id: $curid, fren_id: $fren_id)
    }
`;

const FREN_REJECT = gql`
    mutation frenreject($curid: String!, $fren_id: String!) {
        frenreject(user_id: $curid, fren_id: $fren_id)
    }
`;

const MEET_ACCEPT = gql`
    mutation meetaccept($curid: String!, $fren_id: String!) {
        meetaccept(user_id: $curid, fren_id: $fren_id)
    }
`;

const MEET_REJECT = gql`
    mutation meetreject($user_id: String!, $fren_id: String!) {
        meetreject(user_id: $curid, fren_id: $fren_id)
    }
`;

const FETCH_TIMELINE = gql`
    query($username: String!){
        getTimelineInfo(username: $username)
    }
`;

const FETCH_PROFILE = gql`
    query($curid: String!, $id: String!){
        profile(curid: $curid, id: $id){
            friend meet
        }
    }
`;

const FETCH_USER_TIMELINE = gql`
    query($id: ID){
        getUserTimelineData(id: $id)
    }
`;



export default Timeline;