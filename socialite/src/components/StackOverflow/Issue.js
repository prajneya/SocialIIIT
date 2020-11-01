import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import gql from 'graphql-tag';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Parser from 'html-react-parser';

import { AuthContext } from '../../context/auth'

import "./Issue.css"

function Issue(props){

	const { user, logout } = useContext(AuthContext)

  const postId = props.match.params.postId;
  const email = user.email;

  console.log(user)

	function logUserOut(){
		logout();
		props.history.push('/')
	}

  const [body, setBody] = useState('');
  const [answerId, setAnswerId] = useState('');

  const [addAnswer, { answer }] = useMutation(ADD_ANSWER, {
    update(_, { data: { login: userData } }){
      window.location.reload(false);
    },
    variables: {
      postId,
      body
    }
  })

  const [upvoteQuestion, { upvoteQ }] = useMutation(UPVOTE_QUESTION, {
    update(_, { data: { login: userData } }){
      window.location.reload(false);
    },
    variables: {
      postId,
      email
    }
  })

  const [upvoteAnswer, { upvoteA }] = useMutation(UPVOTE_ANSWER, {
    update(_, { data: { login: userData } }){
      window.location.reload(false);
    },
    variables: {
      postId,
      answerId,
      email
    }
  })

  function addAnswerCallback(){
    console.log(body);
    addAnswer();
  }

  async function upvoteAnswerCallback(r_answerId){
    await setAnswerId(r_answerId);
    upvoteAnswer();
  }

  const { data: postData } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
  });
  var post_data = postData ? postData.getPost : "";

  const { data: upvoteQuestionData } = useQuery(UPVOTE_QUESTION_CHECK_QUERY, {
        variables: {
            postId,
            email
        }
  });
  var isQuestionUpvoted = upvoteQuestionData ? upvoteQuestionData.didIUpvoteQuestion : true;

  const { data: downvoteQuestionData } = useQuery(DOWNVOTE_QUESTION_CHECK_QUERY, {
        variables: {
            postId,
            email
        }
  });
  var isQuestionDownvoted = downvoteQuestionData ? downvoteQuestionData.didIDownvoteQuestion : true;

	return (
          <>
        		<div className="container">
        			<div className="authenticate-nav">
                <div className="a-nav-right">
                      <button className="rounded" onClick={logUserOut}>LOGOUT</button>
                </div>
              </div>

              {/* QUESTION CONTAINER STARTS */}

              <div className="issue-container">
                <div className="issue-content">
                  <div className="row">
                    <div className="col-lg-2 d-none d-lg-block">
                      {/* LARGE DEVICE UPVOTE STARTS */}
                      <div className="upvote-container">
                        <div className="upvote-content">
                          <div className="upvote-count">
                          {post_data['upvotes'] ? post_data['upvotes'].length: "0"}
                          </div>
                          <div className="upvote-text">
                          Upvotes
                          </div>
                          <div className="user-polls">
                            <div className="user-poll my-2 py-1 px-3 bg-success" onClick={upvoteQuestion}>{isQuestionUpvoted ? "UPVOTED" : "UPVOTE"}</div>
                            <div className="user-poll my-2 py-1 px-3 bg-danger">Downvote</div>
                          </div>
                        </div>
                      </div>
                    {/* LARGE DEVICE UPVOTE ENDS */}
                    </div>
                    <div className="col-lg-10 col-md-12">
                      {/* SMALL DEVICE UPVOTE-1 STARTS */}
                      <div className="d-block d-lg-none">
                        <div className="small-upvote-container float-right">
                          <div className="small-upvote-content">
                            <div className="small-upvote-count d-inline-block mr-2 px-2 py-1">
                            {post_data['upvotes'] ? post_data['upvotes'].length: "0"} Upvotes
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* SMALL DEVICE UPVOTE-1 ENDS */}
                      <div className="issue-body">
                        <div className="issue-author mt-1">
                          {post_data['email']}
                        </div>
                        <div className="issue-question mt-3">
                          {post_data['title']}
                        </div>
                        <div className="issue-description mt-4">
                          {post_data['body']}
                        </div>
                        {/* SMALL DEVICE UPVOTE-2 STARTS */}
                        <div className="d-block d-lg-none">
                          <div className="small-user-polls d-inline-block">
                            <div className="user-poll mt-2 mb-2 mr-1 py-1 px-3 bg-success d-inline-block" onClick={upvoteQuestion}>Upvote</div>
                            <div className="user-poll mb-3 mr-1 py-1 px-3 bg-danger d-inline-block">Downvote</div>
                          </div>
                        </div>
                        {/* SMALL DEVICE UPVOTE-2 ENDS */}
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
                      <div className="small-upvote-count d-inline-block mr-2 px-2 py-1">{post_data['answers'] ? post_data['answers'].length: "0"} answers</div>
                      <div className="user-poll bg-danger text-white px-2 py-1 my-2 d-inline-block">Report</div>
                    </div>
                  </div>
                </div>
                
              </div>

              {/* QUESTION CONTAINER ENDS */}

              {/* CREATE ANSWER CONTAINER STARTS */}

              <div className="issue-container my-3">
                <div className="issue-content">
                  <h4 className="mb-4">Your Answer</h4>
                  <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        setBody(editor.getData())
                    } }
                />
                  <div className="answer-question text-right my-4">
                    <button className="btn btn-primary" onClick={addAnswerCallback}>Add Answer</button>
                  </div>
                </div>
              </div>

              {/* CREATE ANSWER CONTAINER ENDS */}

              {/* ANSWER CONTAINER STARTS */}

              <div className="issue-container my-3">
                {post_data['answers'] && post_data['answers'].map(answer => (
                <div className="issue-content">
                  <div className="issue-body">
                    <div className="issue-author mt-1">
                      {answer['email']}
                    </div>
                    <div className="issue-description mt-4">
                      {Parser(answer['body'])}
                    </div>
                  </div>
                  <div className="answer-info mt-2">
                    <div className="small-upvote-count d-inline-block mr-2 px-2 py-1">{answer['upvotes'] ? answer['upvotes'].length: "0"} upvotes</div>
                    <div className="answer-polls d-inline-block">  
                      <div className="user-poll mt-2 mb-2 mr-1 py-1 px-3 bg-success d-inline-block" onClick={() => upvoteAnswerCallback(answer['id'])}>Upvote</div>
                      <div className="user-poll mb-3 mr-1 py-1 px-3 bg-danger d-inline-block">Downvote</div>
                    </div>
                    <div className="info-details">
                      <div className="user-poll bg-danger text-white px-2 py-1 d-inline-block">Report</div>
                    </div>
                  </div>
                </div>
                ))}
              </div>

            {/* ANSWER CONTAINER ENDS */}

        		</div>


          </>
      )
  	
}

const FETCH_POST_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId){
            id title body email answers{ id email body upvotes{ email } } createdAt upvotes{ email }
        }
    }
`;

const UPVOTE_QUESTION_CHECK_QUERY = gql`
    query($postId: ID!, $email: String!){
        didIUpvoteQuestion(postId: $postId, email: $email)
    }
`;

const DOWNVOTE_QUESTION_CHECK_QUERY = gql`
    query($postId: ID!, $email: String!){
        didIDownvoteQuestion(postId: $postId, email: $email)
    }
`;

const ADD_ANSWER = gql`
  mutation addAnswer($postId: ID!, $body: String!) {
    addAnswer(postId: $postId, body: $body) {
      id
    }
  }
`;

const UPVOTE_QUESTION = gql`
  mutation upvoteQuestion($postId: ID!, $email: String!) {
    upvoteQuestion(postId: $postId, email: $email) {
      id
    }
  }
`;

const UPVOTE_ANSWER = gql`
  mutation upvoteAnswer($postId: ID!, $answerId: ID!, $email: String!) {
    upvoteAnswer(postId: $postId, answerId: $answerId, email: $email) {
      id
    }
  }
`;

export default Issue;