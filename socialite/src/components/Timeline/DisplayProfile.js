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

async function send_frenrequest(fren_id){
  await setfren_id(fren_id);
  frenrequest();
}

async function send_meetrequest(fren_id){
  await setfren_id(fren_id);
  meetrequest();
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
  console.log("Yaya" + profile_data)

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
                              <img src="../img/dp.jpeg" alt="display"/>
                            </div>
                            <div className="col-xl-8 about-me-text">
                              Hello! <br/><br/>
                              I am Prajneya, a software engineer based in Hyderabad, India. <br/>
                              I enjoy building software that is performant and scalable. <br/> I like to automate processes and write code that is pleasant to read. I am also interested in product management and community building. <br/>
                              I am finishing up on my studies at IIIT Hyderabad, with a Masters by Research in Computational Linguistics and Bachelors in Computer Science. <br/>
                              In the past I have worked with various startups helping build websites and products.<br/> <br/>
                              <div className="social-links">
                                <i><FontAwesomeIcon icon={faFacebook} size="2x"/></i>
                                <i><FontAwesomeIcon icon={faGithub} size="2x"/></i>
                                {profile_data.friend === 0 ? 
                          <button className="rounded ml-2 my-2 float-right" onClick={() => send_frenrequest(timeline_data.id)}>SEND A FRIEND REQUEST</button>
                          : ""}
                          <button className="rounded ml-2 my-2 float-right" onClick={() => send_meetrequest(timeline_data.id)}>SEND A MEET REQUEST</button>
                        
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
                            <div className="project-container mt-3 pb-5">
                              <div className="project-header">
                                <div className="float-left mt-5 ml-5"><i><FontAwesomeIcon icon={faFolderOpen} size="2x"/></i></div>
                                <div className="float-right m-5">
                                  <i><FontAwesomeIcon icon={faGithub} size="2x"/></i>
                                  <i><FontAwesomeIcon icon={faExternalLinkAlt} size="2x"/></i>
                                </div>
                              </div>
                              <div className="project-title ml-5">
                                Rotational Product Manager Opportunities
                              </div>
                              <div className="project-body mx-5 mt-3">
                                A github repository to keep track of Rotational Product Manager Roles, their deadlines, resources and related details.
                              </div>
                              <div className="tags d-inline-block mx-5 mt-5">
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                              </div>
                            </div>
                            <div className="project-container mt-3 pb-5">
                              <div className="project-header">
                                <div className="float-left mt-5 ml-5"><i><FontAwesomeIcon icon={faFolderOpen} size="2x"/></i></div>
                                <div className="float-right m-5">
                                  <i><FontAwesomeIcon icon={faGithub} size="2x"/></i>
                                  <i><FontAwesomeIcon icon={faExternalLinkAlt} size="2x"/></i>
                                </div>
                              </div>
                              <div className="project-title ml-5">
                                Rotational Product Manager Opportunities
                              </div>
                              <div className="project-body mx-5 mt-3">
                                A github repository to keep track of Rotational Product Manager Roles, their deadlines, resources and related details.
                              </div>
                              <div className="tags d-inline-block mx-5 mt-5">
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                              </div>
                            </div>
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
    mutation frenrequest($user_id: String!, $fren_id: String!) {
        frenrequest(user_id: $user_id, fren_id: $fren_id)
    }
`;

const MEET_REQUEST = gql`
    mutation meetrequest($user_id: String!, $fren_id: String!) {
        meetrequest(user_id: $user_id, fren_id: $fren_id)
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
          email match friend clubs{val} sports{val} house{val}
        }
    }
`;


export default Timeline;