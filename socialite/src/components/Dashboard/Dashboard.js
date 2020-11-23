import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useSpring, animated} from 'react-spring'

import { AuthContext } from '../../context/auth'

import "./Dashboard.css"

import Sidebar from "../Sidebar"

function Dashboard(props){

	const { user, logout } = useContext(AuthContext)

	const id = user.id;
	const sub = JSON.stringify(localStorage.getItem('subscription'));

  const fadeInFast = useSpring({opacity: 1, from: {opacity: 0}, config: { duration: 1000 }})
  const fadeInMedium = useSpring({opacity: 1, from: {opacity: 0}, delay: 300, config: { duration: 1000 }})
  const fadeInSlow = useSpring({opacity: 1, from: {opacity: 0}, delay: 500, config: { duration: 1000 }})

  const slideInFast = useSpring({opacity: 1, from: {opacity: 0}, marginLeft: 0, from: {marginLeft: 450}, config: { duration: 250 }})
  const slideInMedium = useSpring({opacity: 1, from: {opacity: 0}, marginLeft: 0, from: {marginLeft: 450}, delay: 300, config: { duration: 250 }})
  const slideInSlow = useSpring({opacity: 1, from: {opacity: 0}, marginLeft: 0, from: {marginLeft: 450}, delay: 500, config: { duration: 250 }})
	
	const [subsave, { opsub }] = useMutation(ADD_SUB, {
		update(_, { data: { login: userData } }){
			window.location.reload(false);
		},
		variables: {
			id,
			sub
		}
	})

  const { data: trending_posts } = useQuery(FETCH_TOP_POSTS);

  var trending_posts_list = trending_posts ? trending_posts.getTopPosts : "";

  const { data: trending_people } = useQuery(FETCH_TOP_RATED);

  var trending_people_list = trending_people ? trending_people.getTopRated : "";


	function logUserOut(){
		logout();
		props.history.push('/')
	}

	function notification(){
		props.history.push('/notifications')
	}

	function myprofile(){
		props.history.push('/profile')
	}
	  
	function recommendFriend(){
        props.history.push('/recommend')
    }

      function stackOverflow(){
        props.history.push('/stack-overflow')
    }

	return (
          <>
            <Sidebar/>
            <main class="s-layout__content">
          		<div className="container-fluid">
                <div className="row">
                  <div className="col-xl-9">
              			<div className="wall">
                			<div className="feature-display mx-2">
                				<div className="subsection-header"> WHAT DO YOU WANT TO DO TODAY? </div>
                            <animated.div style={fadeInFast}>
                            <div className="feature" onClick={recommendFriend}>
                              <div className="row">
                                <div className="col-md-4">
                                  <div className="feature-icon mt-4 ml-4">
                                    <img src='/img/find_friend.png' alt=""></img>
                                  </div>
                                </div>
                                <div className="col-md-8">
                                  <div className="feature-body ml-3 mt-5 text-left">
                                    <div className="feature-content">
                                      FIND NEW FRIENDS
                                    </div>
                                    <div className="feature-content-title">
                                      Explore IIIT-H
                                    </div>
                                    <div className="feature-content-description mt-4">
                                     Find other people tired of not having friends. 
                                      <br/>
                                      <button className="my-5 rounded btn"> EXPLORE NOW </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            </animated.div>
                            <animated.div style={fadeInFast}>
                            <div className="feature" onClick={stackOverflow}>
                              <div className="row">
                                <div className="col-md-4">
                                  <div className="feature-icon mt-4 ml-4">
                                    <img src='/img/study.png' alt=""></img>
                                  </div>
                                </div>
                                <div className="col-md-8">
                                  <div className="feature-body ml-3 mt-5 text-left">
                                    <div className="feature-content">
                                     QUERIFY 
                                    </div>
                                    <div className="feature-content-title">
                                      Ask a Question
                                    </div>
                                    <div className="feature-content-description mt-4">
					Have your doubts cleared by {<del>snakes</del>} bonds.
                                      <br/>
                                      <button className="my-5 rounded btn"> EXPLORE NOW </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            </animated.div>
                            <animated.div style={fadeInFast}>
                            <div className="feature" onClick={stackOverflow}>
                              <div className="row">
                                <div className="col-md-4">
                                  <div className="feature-icon mt-4 ml-4">
                                    <img src='/img/locate_friend.png' alt=""></img>
                                  </div>
                                </div>
                                <div className="col-md-8">
                                  <div className="feature-body ml-3 mt-5 text-left">
                                    <div className="feature-content">
                                LOCATE YOUR FRIENDS
                                    </div>
                                    <div className="feature-content-title">
                                Marauder's Map
                                    </div>
                                    <div className="feature-content-description mt-4">
					Stalk your friends here.
                                      <br/>
                                      <button className="my-5 rounded btn"> EXPLORE NOW </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            </animated.div>
                			</div>
                    </div>
                  </div>
                  <div className="col-xl-3 right-sidebar">
                    <div className="popular-posts my-5">
                      <div className="popular-header">
                        POPULAR POSTS
                        <a href="/stack-overflow"><span class="see-more float-right">MORE</span></a>
                      </div>
                      <animated.div style={slideInFast}>
                      <div className="popular-post mt-4">
                        <strong>{trending_posts_list ? trending_posts_list[0].title : ""}</strong><br/>
                        {trending_posts_list ? trending_posts_list[0].email : ""}
                      </div>
                      </animated.div>
                      <animated.div style={slideInMedium}>
                      <div className="popular-post mt-4">
                        <strong>{trending_posts_list ? trending_posts_list[1].title : ""}</strong><br/>
                        {trending_posts_list ? trending_posts_list[1].email : ""}
                      </div>
                      </animated.div>
                      <animated.div style={slideInSlow}>
                      <div className="popular-post mt-4">
                        <strong>{trending_posts_list ? trending_posts_list[2].title : ""}</strong><br/>
                        {trending_posts_list ? trending_posts_list[2].email : ""}
                      </div>
                      </animated.div>
                    </div>
                    <div className="popular-posts my-5">
                      <div className="popular-header">
                        PEOPLE YOU MAY LIKE
                        <a href="/recommend"><span class="see-more float-right">MORE</span></a>
                      </div>
                      <animated.div style={slideInFast}>
                      <div className="top-recommend mt-4">
                        <strong>{trending_people_list ? trending_people_list[0].username : ""}</strong><br/>
                        {trending_people_list ? trending_people_list[0].email : ""} <br/>
                        Rated: {trending_people_list ? trending_people_list[0].rating : ""}
                      </div>
                      </animated.div>
                      <animated.div style={slideInMedium}>
                      <div className="top-recommend mt-4">
                        <strong>{trending_people_list ? trending_people_list[1].username : ""}</strong><br/>
                        {trending_people_list ? trending_people_list[1].email : ""} <br/>
                        Rated: {trending_people_list ? trending_people_list[1].rating : ""}
                      </div>
                      </animated.div>
                      <animated.div style={slideInSlow}>
                      <div className="top-recommend mt-4">
                        <strong>{trending_people_list ? trending_people_list[2].username : ""}</strong><br/>
                        {trending_people_list ? trending_people_list[2].email : ""} <br/>
                        Rated: {trending_people_list ? trending_people_list[2].rating : ""}
                      </div>
                      </animated.div>
                    </div>
                  </div>
                </div>
          		</div>
            </main>
          </>
      )
  	
}

const ADD_SUB = gql`
  mutation subsave($id: String!, $sub: String!) {
    subsave(id: $id, sub: $sub) {
      id
    }
  }
`;

const FETCH_TOP_POSTS = gql`
    query{
        getTopPosts{
          id title email
        }
    }
`

const FETCH_TOP_RATED = gql`
    query{
        getTopRated{
          username rating email
        }
    }
`

export default Dashboard;
