import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Parser from 'html-react-parser';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AuthContext } from '../../context/auth'

import "./StackOverflow.css"
import Sidebar from "../Sidebar"

function StackOverflow(props){

	const { user, logout } = useContext(AuthContext)

  function logUserOut()
  {  
		logout();
		props.history.push('/')
  }
  
  function dashboard()
  {
      props.history.push('/dashboard')
  }

  function showIssue(postId){
    props.history.push('/issue/'+postId);
  }

  function createPost(){
    props.history.push('createpost');
  }

  function searchCallback(){
    var query = document.getElementById("search_query").value;
    if(query==""){
      return;
    }
    props.history.push({
      pathname: "/search",
      state: { query: query },
    });
  }

  const { data } = useQuery(FETCH_POSTS_QUERY);

  var post_list = data ? data.getPosts : "";
  console.log(post_list)

	return (
            <>
              <Sidebar/>
              <main class="s-layout__content">
            		<div className="container-fluid">

                  <div className="explore-posts pr-3">
                    <form class="searchbox">
                      <input type="text" id="search_query" placeholder="Search Questions" autocomplete="off"/>
                      <button className="rounded m-2 search-button float-right" onClick={searchCallback}><i><FontAwesomeIcon icon={faSearch} /></i></button>
                    </form>
                    <br/> <br/> <br/> 
                    <div class="trending-tags desktop-only">
                      <div className="explore-subheader my-4">Trending:</div>
                      <div className="tag px-3 py-2 mr-1 my-1">#community</div>
                      <div className="tag px-3 py-2 mr-1 my-1">#community</div>
                      <div className="tag px-3 py-2 mr-1 my-1">#community</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-9">
                      <div className="explore-posts">
                        <div className="posts-list">
                          {post_list && post_list.map(post => ( 
                            <div className="single-post p-3 my-2" onClick={() => showIssue(post['id'])}>
                              <div className="post">
                                <div className="post-body">
                                  <div className="post-header">{post['title']}</div>
                                  <div className="post-content mt-4">{post ? Parser(post['body']) : ""}</div>
                                </div>
                              </div>
                              <hr/>
                              <div className="question-info mt-4">
                                <div className="tags d-inline-block text-left">
                                  {post.tags && Object.keys(post.tags).map(tag => ( 
                                  <div className="tag px-3 py-2 mr-1 my-1">#{tag}</div>
                                  ))}
                                </div>
                                <div className="info-details text-right">
                                  <div className="small-upvote-count d-inline-block mr-2 px-2 py-1">{post['answers'].length} answers</div>
                                  <div className="user-poll bg-danger text-white px-2 py-1 my-2 d-inline-block">Report</div>
                                </div>
                              </div>
                            </div>
                          ))} 
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 right-sidebar desktop-only">
                      <div className="text-center">
                        <button className="my-1 create-post w-100 py-3" onClick={createPost}>CREATE POST + </button>
                      </div>
                      <div className="my-3 p-2 top-users-post">
                        <div className="card-header">
                          TOP USERS
                        </div>
                        <div className="top-users m-4">
                          <ul>
                            <li className="mt-4">Prajneya
                              <div className="no-post float-right">231 posts</div>
                            </li>
                            <li className="mt-4">Prajneya
                              <div className="no-post float-right">231 posts</div>
                            </li>
                            <li className="mt-4">Prajneya
                              <div className="no-post float-right">231 posts</div>
                            </li>
                            <li className="mt-4">Prajneya
                              <div className="no-post float-right">231 posts</div>
                            </li>
                            <li className="mt-4">Prajneya
                              <div className="no-post float-right">231 posts</div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
            		</div>
              </main>
            </>
      )
}

const FETCH_POSTS_QUERY = gql`
    query{
        getPosts{
            id title body email answers{ id } upvotes{ id } createdAt tags
        }
    }
`

export default StackOverflow;
