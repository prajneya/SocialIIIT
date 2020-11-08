import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../../context/auth'

import "./StackOverflow.css"

function StackOverflow(props){

	const { user, logout } = useContext(AuthContext)

	function logUserOut(){
    console.log("logginh ou")
		logout();
		props.history.push('/')
	}

  function showIssue(postId){
    props.history.push('/issue/'+postId);
  }

  function createPost(){
    props.history.push('createpost');
  }

  const { data } = useQuery(FETCH_POSTS_QUERY);

  var post_list = data ? data.getPosts : "";

	return (
            <>
          		<div className="container">
          			<div className="authenticate-nav">
                    <div className="a-nav-right">
                        <button className="rounded my-1 bg-primary" onClick={createPost}>CREATE POST</button>
                        <button className="rounded my-1 ml-2" onClick={logUserOut}>LOGOUT</button>
                    </div>
                </div>

                <div className="explore-posts p-3">
                  <div className="explore-header my-2">Explore Topics</div>
                  <input type="text" placeholder="Search Questions" />
                  <button className="rounded m-2 bg-success float-right">SEARCH</button>
                  <div className="explore-subheader my-4">Trending:</div>
                  <div className="tag px-3 py-2 mr-1 my-1">#community</div>
                  <div className="tag px-3 py-2 mr-1 my-1">#community</div>
                  <div className="tag px-3 py-2 mr-1 my-1">#community</div>
                </div>

                <hr/>

                <div className="explore-posts p-3">
                  <div className="explore-header my-2">Latest Posts</div>
                  <div className="posts-list">
                    {post_list && post_list.map(post => ( 
                      <div className="single-post p-3" onClick={() => showIssue(post['id'])}>
                        <hr/>
                        <div className="post">
                          <div className="post-body">
                            <div className="post-header">{post['title']}</div>
                            <div className="post-content">{post['body']}</div>
                          </div>
                        </div>
                        <div className="question-info mt-4">
                          <div className="tags d-inline-block">
                            <div className="tag px-3 py-2 mr-1 my-1">#community</div>
                            <div className="tag px-3 py-2 mr-1 my-1">#socialiiit</div>
                            <div className="tag px-3 py-2 mr-1 my-1">#students</div>
                          </div>
                          <div className="info-details">
                            <div className="small-upvote-count d-inline-block mr-2 px-2 py-1">{post['answers'].length} answers</div>
                            <div className="user-poll bg-danger text-white px-2 py-1 my-2 d-inline-block">Report</div>
                          </div>
                        </div>
                        <hr/>
                      </div>
                    ))} 
                  </div>
                </div>
          		</div>
            </>
      )
}

const FETCH_POSTS_QUERY = gql`
    query{
        getPosts{
            id title body email answers{ id } upvotes{ id } createdAt
        }
    }
`
export default StackOverflow;
