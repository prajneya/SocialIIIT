import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import Swal from 'sweetalert2';
import gql from 'graphql-tag';
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AuthContext } from '../../context/auth'

import "./Timeline.css"
import Sidebar from "../Sidebar";

function Timeline(props){

	const { user } = useContext(AuthContext)

  const { data: userProfilePicData } = useQuery(FETCH_PROFILE_PICTURE, {
        variables: {
            id: user.id
        }
  });
  var userImgUrl = userProfilePicData ? userProfilePicData.getUserImage : "";

  const { data: skillData } = useQuery(FETCH_SKILLS, {
        variables: {
            email: user.email
        }
  });
  var skill_data = skillData ? skillData.getSkills : "";

  const { data: timelineData } = useQuery(FETCH_TIMELINE);
  var timeline_data = timelineData ? timelineData.getTimelineData : "";

  const { data: blogData } = useQuery(FETCH_BLOGS, {
        variables: {
            email: user.email
        }
  });
  var blog_data = blogData ? blogData.getUserBlogs : "";

  const { data: displayBadgeData } = useQuery(FETCH_DISPLAY_BADGE);
  var badge_data = displayBadgeData ? displayBadgeData.getBadge : "";

  const [ removeBadge ] = useMutation(REMOVE_BADGE, {
        update(_){
            Swal.fire({title: "Badge Removed!",
                  footer: "Your badge has been removed!",
                  imageUrl: '/img/egg.png',
                  customClass: {
                    title: 'text-danger error-message',
                    content: 'error-message text-white',
                    confirmButton: 'game-button bg-danger',
                    image: 'error-image-swal',
                  },
                  background: `rgba(0,0,0,0.9)`
                }).then(() => {
                  window.location.reload(false);
                });
        },
        onError(err){
          if(err.graphQLErrors.length > 0)
            Swal.fire({title: "You must be the mysterious one!",
                  html: Object.values(err.graphQLErrors[0])[0],
                  footer: "The above error popped up while removing your badge.",
                  imageUrl: '/img/sorry.png',
                  customClass: {
                    title: 'text-danger error-message',
                    content: 'error-message text-white',
                    confirmButton: 'game-button bg-danger',
                    image: 'error-image-swal',
                  },
                  background: `rgba(0,0,0,0.9)`
                });
        }
    })

  const [ addBadge ] = useMutation(ADD_BADGE, {
        update(_){
            Swal.fire({title: "Badge Added!",
                  footer: "You are marked as DASSTaken!",
                  imageUrl: '/img/egg.png',
                  customClass: {
                    title: 'text-danger error-message',
                    content: 'error-message text-white',
                    confirmButton: 'game-button bg-danger',
                    image: 'error-image-swal',
                  },
                  background: `rgba(0,0,0,0.9)`
                }).then(() => {
                  window.location.reload(false);
                });
        },
        onError(err){
          if(err.graphQLErrors.length > 0)
            Swal.fire({title: "You must be the mysterious one!",
                  html: Object.values(err.graphQLErrors[0])[0],
                  footer: "The above error popped up while updating your badge.",
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
        variables: { "display": "DASSTaken"}
    })

  const [getPotentialBadges, { data: badgeData }] = useLazyQuery(FETCH_POTENTIAL_BADGES, {
        onCompleted(){
          if(!badgeData.getPotentialBadges || badgeData.getPotentialBadges.length === 0){
            Swal.fire({title: "Find those Easter Eggs!",
                  footer: "You do not have any potential badges currently.",
                  imageUrl: '/img/egg.png',
                  customClass: {
                    title: 'text-danger error-message',
                    content: 'error-message text-white',
                    confirmButton: 'game-button bg-danger',
                    image: 'error-image-swal',
                  },
                  background: `rgba(0,0,0,0.9)`
                }).then(() => {
                  window.location.reload(false);
                });
          }
          else{
            Swal.fire({
            title: 'Add Badge',
            html: `
                <div class="textfield">
                <label class="text-warning" for="potential">You have a potential Badge!:</label>
                <input type="text" value="DASSTaken" id="potential" name="potential" readonly/>
                </div><br>
                <label class="text-info" for="potential">Do you want to add this badge?</label>
              `,
            confirmButtonText: 'Add Badge',
            showCancelButton: true,
            focusConfirm: false,
            width: '64rem',
              backdrop: `rgba(0,0,0,0.9)`,
            background: `rgba(0,0,0,0.9)`,
            customClass: {
                      title: 'text-danger',
                      content: 'text-left text-white',
                      confirmButton: 'game-button bg-danger',
                    },
            }).then((result) => {
              if(!result.isConfirmed)
                window.location.reload(false)
              else{
                addBadge();
              }
            })
          }
        }
  });

  function addNewBlog(){
    props.history.push('/createblog')
  }

  function showBlog(blogId){
    props.history.push('/blog/'+blogId);
  }

  function removeBadgesCallback(){
    Swal.fire({
    title: 'Remove Badge?',
    footer: 'Are you sure you want to remove your badge from display?',
    confirmButtonText: 'Yes I am Sure',
    showCancelButton: true,
    focusConfirm: false,
    width: '64rem',
      backdrop: `rgba(0,0,0,0.9)`,
    background: `rgba(0,0,0,0.9)`,
    customClass: {
              title: 'text-danger',
              text: 'text-center',
              content: 'text-left text-white',
              confirmButton: 'game-button bg-danger',
            },
    }).then((result) => {
      if(!result.isConfirmed)
        window.location.reload(false)
      else{
        removeBadge();
      }
    })
  }

  function getBadgesCallback(){
    getPotentialBadges();
  }

	return (
            <>
              <Sidebar/>
              <main class="s-layout__content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xl-9">
                      <div className="display text-center my-5">
                        <div className="mx-2 username">{user.username}</div><br/><br/><div className="rating mt-1 mx-2 p-2">RATING: <strong>{user.rating}</strong></div>
                        <div className="times-answered mt-1 mx-2 p-2">CONTRIBUTION: <strong>{user.times_answered}</strong></div>  
                        {badge_data !== "NoBadge" ? <div className="times-answered bg-danger mt-1 mx-2 p-2"><strong>{badge_data}</strong></div> : "" }  
                        <br/><br/>                    
                        <div className="about-me mx-2 my-4">
                          <div className="row">
                            <div className="col-xl-12">
                              <div className="profile-picture">
                                {userImgUrl === "" ? <img src='/img/dp.jpeg' alt="display"/> : <img src={userImgUrl} alt="display"/> }
                              </div>
                                <hr className="picture-seprator"/>
                            </div>                            
                            <div className="col-xl-12 about-me-text">
                              {timeline_data['bio']}
                              <div className="email mx-2">{user.email}</div>
                              <div className="social-links">
                                {timeline_data['fblink'] ? <a href={timeline_data['fblink']} target="_blank" rel="noreferrer"><i><FontAwesomeIcon icon={faFacebook} size="2x"/></i></a> : ""}
                                {timeline_data['ghlink'] ? <a href={timeline_data['ghlink']} target="_blank" rel="noreferrer"><i><FontAwesomeIcon icon={faGithub} size="2x"/></i></a> : ""}

                              </div>
                              {badge_data !== "NoBadge" ? <div className="text-center mt-3"><button className="btn btn-primary" onClick={removeBadgesCallback}>REMOVE BADGE - </button></div> : <div className="text-center mt-3"><button className="btn btn-primary" onClick={getBadgesCallback}>ADD BADGE + </button></div>}
                            </div>
                          </div>
                        </div>
                      </div>

                  
                      {/* <div className="container-fluid my-2">
                        <div className="showcase desktop-only">
                          <div className="showcase-header">
                            USER SHOWCASE
                            <div className="showcase-add float-right"><button className="btn btn-primary">ADD NEW SHOWCASE BADGE + </button></div>
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
                      </div> */}

                      <div className="container-fluid my-5">
                        <div className="showcase">
                          <div className="showcase-header">
                            PROJECTS AND EXPERIENCES
                          </div>
                          <br/>
                          <hr/>
                          <div className="showcase-projects">
                          {timeline_data['pOneTitle'] && timeline_data['pOneTitle'].trim() !== "" && timeline_data['pOneDesc'].trim() !== "" ?
                            <>
                            <div className="project-container mt-3 pb-5">
                              <div className="project-header">
                                <div className="float-left mt-5 ml-5"><i><FontAwesomeIcon icon={faFolderOpen} size="2x"/></i></div>
                                <div className="float-right m-5">
                                  {timeline_data['pOneGhLink'] ? <a href={timeline_data['pOneGhLink']} target="_blank" rel="noreferrer"><i><FontAwesomeIcon icon={faGithub} size="2x"/></i></a> : "" }
                                  {timeline_data['pOneELink'] ? <a href={timeline_data['pOneELink']} target="_blank" rel="noreferrer"><i><FontAwesomeIcon icon={faExternalLinkAlt} size="2x"/></i></a> : "" }
                                </div>
                              </div>
                              <div className="project-title ml-5">
                                {timeline_data['pOneTitle']}
                              </div>
                              <div className="project-body mx-5 mt-3">
                                {timeline_data['pOneDesc']}
                              </div>
                              {/*<div className="tags d-inline-block mx-5 mt-5">
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                              </div> */} 
                            </div> 
                            </>
                            : "" }
                            {timeline_data['pTwoTitle'] && timeline_data['pTwoTitle'].trim() !== "" && timeline_data['pTwoDesc'].trim() !== "" ?
                            <>
                            <div className="project-container mt-3 pb-5">
                              <div className="project-header">
                                <div className="float-left mt-5 ml-5"><i><FontAwesomeIcon icon={faFolderOpen} size="2x"/></i></div>
                                <div className="float-right m-5">
                                  {timeline_data['pTwoGhLink'] ? <a href={timeline_data['pTwoGhLink']} target="_blank" rel="noreferrer"><i><FontAwesomeIcon icon={faGithub} size="2x"/></i></a> : "" }
                                  {timeline_data['pTwoELink'] ? <a href={timeline_data['pTwoELink']} target="_blank" rel="noreferrer"><i><FontAwesomeIcon icon={faExternalLinkAlt} size="2x"/></i></a> : "" }
                                </div>
                              </div>
                              <div className="project-title ml-5">
                                {timeline_data['pTwoTitle']}
                              </div>
                              <div className="project-body mx-5 mt-3">
                                {timeline_data['pTwoDesc']}
                              </div>
                              {/*<div className="tags d-inline-block mx-5 mt-5">
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                              </div> */} 
                            </div> 
                            </>
                            : "" }
                            {timeline_data['pThreeTitle'] && timeline_data['pThreeTitle'].trim() !== "" && timeline_data['pThreeDesc'].trim() !== "" ?
                            <>
                            <div className="project-container mt-3 pb-5">
                              <div className="project-header">
                                <div className="float-left mt-5 ml-5"><i><FontAwesomeIcon icon={faFolderOpen} size="2x"/></i></div>
                                <div className="float-right m-5">
                                  {timeline_data['pThreeGhLink'] ? <a href={timeline_data['pThreeGhLink']} target="_blank" rel="noreferrer"><i><FontAwesomeIcon icon={faGithub} size="2x"/></i></a> : "" }
                                  {timeline_data['pThreeELink'] ? <a href={timeline_data['pThreeELink']} target="_blank" rel="noreferrer"><i><FontAwesomeIcon icon={faExternalLinkAlt} size="2x"/></i></a> : "" }
                                </div>
                              </div>
                              <div className="project-title ml-5">
                                {timeline_data['pThreeTitle']}
                              </div>
                              <div className="project-body mx-5 mt-3">
                                {timeline_data['pThreeDesc']}
                              </div>
                              {/*<div className="tags d-inline-block mx-5 mt-5">
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                              </div> */} 
                            </div> 
                            </>
                            : "" }
                            {timeline_data['pOneTitle'] && timeline_data['pOneTitle'].trim() === "" && timeline_data['pOneDesc'].trim() === "" && timeline_data['pTwoTitle'] && timeline_data['pTwoTitle'].trim() === "" && timeline_data['pTwoDesc'].trim() === "" && timeline_data['pThreeTitle'] && timeline_data['pThreeTitle'].trim() === "" && timeline_data['pThreeDesc'].trim() === "" ? <div className="text-center">{user.username} has not yet added their projects or experiences.</div> : "" }
                            {!timeline_data['pOneTitle'] && !timeline_data['pTwoTitle'] && !timeline_data['pThreeTitle'] ? <div className="text-center">{user.username} has not yet added their projects or experiences.</div> : "" }

                          </div>
                        </div>
                      </div>

                      <div className="container-fluid my-2">
                        <div className="showcase">
                          <div className="showcase-header">
                            BLOGS
                            <div className="showcase-add float-right desktop-only"><button className="btn btn-primary" onClick={addNewBlog}>ADD NEW BLOG + </button></div>
                          </div>
                          <br/>
                          <hr/>

                          {blog_data.length === 0 ? <div className="text-center">{user.username} has not yet posted any blogs.</div> : ""}

                          {blog_data && blog_data.map(blog => ( 
                          <div className="project-container mt-3 pb-5 hover-pointer" onClick={() => showBlog(blog['id'])}>
                              <div className="project-header">
                                <div className="float-left mt-5 ml-5"><i><FontAwesomeIcon icon={faNewspaper} size="2x"/></i></div>
                              </div>
                              <div className="project-title ml-5">
                                {blog['title']}
                              </div>
                              <div className="tags d-inline-block mx-5 mt-5">
                                  {blog.tags && Object.keys(blog.tags).map(tag => ( 
                                    <div className="tag px-3 py-2 mr-1 my-1">#{tag}</div>
                                  ))}
                              </div>
                          </div> 
                          ))}
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
                              {skill_data && Object.keys(skill_data).map(skill => (
                                  skill_data[skill] > 0 ?
                              <li className="mt-4">{skill}
                                <div className="no-post float-right">{parseInt(skill_data[skill])}</div>
                              </li> : ""
                                ))}
                              {Object.keys(skill_data).length > 0 ? "" : <div className="text-center">{user.username} has not accumulated any gratitude points.</div> }
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

const REMOVE_BADGE = gql`
  mutation{
    removeBadge
  }
`

const ADD_BADGE = gql`
  mutation($display: String!){
    addBadge(display: $display)
  }
`

const FETCH_PROFILE_PICTURE = gql`
    query($id: ID!){
        getUserImage(id: $id)
    }
`;

const FETCH_SKILLS = gql`
    query($email: String!){
        getSkills(email: $email)
    }
`;

const FETCH_TIMELINE = gql`
    query{
        getTimelineData
    }
`;

const FETCH_DISPLAY_BADGE = gql`
    query{
        getBadge
    }
`;

const FETCH_POTENTIAL_BADGES = gql`
    query{
        getPotentialBadges
    }
`;


const FETCH_BLOGS = gql`
    query($email: String){
        getUserBlogs(email: $email){
          id
          title
          tags
        }
    }
`;



export default Timeline;