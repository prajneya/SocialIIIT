import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../../context/auth'

import "./Issue.css"

function Issue(props){

	const { user, logout } = useContext(AuthContext)

  const postId = props.match.params.postId;

	function logUserOut(){
		logout();
		props.history.push('/')
	}

  const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
  });

  var post_data = data ? data.getPost : "";

  console.log(post_data)

	return (
          <>
        		<div className="container">
        			<div className="authenticate-nav">
                <div className="a-nav-right">
                      <button className="rounded" onClick={logUserOut}>LOGOUT</button>
                </div>
              </div>

              <div className="issue-container">
                <div className="issue-content">
                  <div className="row">
                    <div className="col-lg-2 d-none d-lg-block">
                      <div className="upvote-container">
                        <div className="upvote-content">
                          <div className="upvote-count">
                          23
                          </div>
                          <div className="upvote-text">
                          Upvotes
                          </div>
                          <div className="user-polls">
                            <div className="user-poll my-2 py-1 px-3 bg-success">Upvote</div>
                            <div className="user-poll my-2 py-1 px-3 bg-danger">Downvote</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-10 col-md-12">
                      <div className="d-block d-lg-none">
                        <div className="small-upvote-container float-right">
                          <div className="small-upvote-content">
                            <div className="small-upvote-count d-inline-block mr-2 px-2 py-1">
                            23 Upvotes
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="issue-body">
                        <div className="issue-author mt-1">
                          Prajneya Kumar
                        </div>
                        <div className="issue-question mt-3">
                          {post_data['title']}
                        </div>
                        <div className="issue-description mt-4">
                          {post_data['body']}
                        </div>
                        <div className="d-block d-lg-none">
                          <div className="small-user-polls d-inline-block">
                            <div className="user-poll mt-2 mb-2 mr-1 py-1 px-3 bg-success d-inline-block">Upvote</div>
                            <div className="user-poll mb-3 mr-1 py-1 px-3 bg-danger d-inline-block">Downvote</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="question-info mt-4">
                    <div className="tags d-inline-block">
                      <div className="tag px-3 py-2 mr-1 my-1">#community</div>
                      <div className="tag px-3 py-2 mr-1 my-1">#socialiiit</div>
                      <div className="tag px-3 py-2 mr-1 my-1">#students</div>
                    </div>
                    <div className="info-details">
                      <div className="small-upvote-count d-inline-block mr-2 px-2 py-1">5 answers</div>
                      <div className="user-poll bg-danger text-white px-2 py-1 my-2 d-inline-block">Report</div>
                    </div>
                  </div>
                </div>
                
              </div>

              <div className="issue-container my-3">
                <div className="issue-content">
                  <div className="issue-body">
                    <div className="issue-author mt-1">
                      Prajneya Kumar
                    </div>
                    <div className="issue-description mt-4">
                      Barkadeer galleon grapple Letter of Marque rigging squiffy gaff fluke swab lookout. Nipperkin topsail pirate crack Jennys tea cup Jolly Roger schooner rum Yellow Jack driver deadlights. Overhaul clap of thunder avast jolly boat lookout hornswaggle long clothes capstan chase landlubber or just lubber.
                    </div>
                  </div>
                  <div className="answer-info mt-2">
                    <div className="small-upvote-count d-inline-block mr-2 px-2 py-1">9 upvotes</div>
                    <div className="answer-polls d-inline-block">  
                      <div className="user-poll mt-2 mb-2 mr-1 py-1 px-3 bg-success d-inline-block">Upvote</div>
                      <div className="user-poll mb-3 mr-1 py-1 px-3 bg-danger d-inline-block">Downvote</div>
                    </div>
                    <div className="info-details">
                      <div className="user-poll bg-danger text-white px-2 py-1 d-inline-block">Report</div>
                    </div>
                  </div>
                </div>
                <div className="issue-content">
                  <div className="issue-body">
                    <div className="issue-author mt-1">
                      Prajneya Kumar
                    </div>
                    <div className="issue-description mt-4">
                      Barkadeer galleon grapple Letter of Marque rigging squiffy gaff fluke swab lookout. Nipperkin topsail pirate crack Jennys tea cup Jolly Roger schooner rum Yellow Jack driver deadlights. Overhaul clap of thunder avast jolly boat lookout hornswaggle long clothes capstan chase landlubber or just lubber.
                    </div>
                  </div>
                  <div className="answer-info mt-2">
                    <div className="small-upvote-count d-inline-block mr-2 px-2 py-1">5 upvotes</div>
                    <div className="user-poll mt-2 mb-2 mr-1 py-1 px-3 bg-success d-inline-block">Upvote</div>
                    <div className="user-poll mb-3 mr-1 py-1 px-3 bg-danger d-inline-block">Downvote</div>
                    <div className="info-details">
                      <div className="user-poll bg-danger text-white px-2 py-1 d-inline-block">Report</div>
                    </div>
                  </div>
                </div>
                <div className="issue-content">
                  <div className="issue-body">
                    <div className="issue-author mt-1">
                      Prajneya Kumar
                    </div>
                    <div className="issue-description mt-4">
                      Barkadeer galleon grapple Letter of Marque rigging squiffy gaff fluke swab lookout. Nipperkin topsail pirate crack Jennys tea cup Jolly Roger schooner rum Yellow Jack driver deadlights. Overhaul clap of thunder avast jolly boat lookout hornswaggle long clothes capstan chase landlubber or just lubber.
                    </div>
                  </div>
                  <div className="answer-info mt-2">
                    <div className="small-upvote-count d-inline-block mr-2 px-2 py-1">2 upvotes</div>
                    <div className="user-poll mt-2 mb-2 mr-1 py-1 px-3 bg-success d-inline-block">Upvote</div>
                    <div className="user-poll mb-3 mr-1 py-1 px-3 bg-danger d-inline-block">Downvote</div>
                    <div className="info-details">
                      <div className="user-poll bg-danger text-white px-2 py-1 d-inline-block">Report</div>
                    </div>
                  </div>
                </div>
                <div className="issue-content">
                  <div className="issue-body">
                    <div className="issue-author mt-1">
                      Prajneya Kumar
                    </div>
                    <div className="issue-description mt-4">
                      Barkadeer galleon grapple Letter of Marque rigging squiffy gaff fluke swab lookout. Nipperkin topsail pirate crack Jennys tea cup Jolly Roger schooner rum Yellow Jack driver deadlights. Overhaul clap of thunder avast jolly boat lookout hornswaggle long clothes capstan chase landlubber or just lubber.
                    </div>
                  </div>
                  <div className="answer-info mt-2">
                    <div className="small-upvote-count d-inline-block mr-2 px-2 py-1">0 upvotes</div>
                    <div className="user-poll mt-2 mb-2 mr-1 py-1 px-3 bg-success d-inline-block">Upvote</div>
                    <div className="user-poll mb-3 mr-1 py-1 px-3 bg-danger d-inline-block">Downvote</div>
                    <div className="info-details">
                      <div className="user-poll bg-danger text-white px-2 py-1 d-inline-block">Report</div>
                    </div>
                  </div>
                </div>
              </div>

        		</div>
          </>
      )
  	
}

const FETCH_POST_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId){
            id title body email createdAt
        }
    }
`


export default Issue;