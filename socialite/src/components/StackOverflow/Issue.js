import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import gql from 'graphql-tag';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Parser from 'html-react-parser';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";


import { AuthContext } from '../../context/auth'

import "./Issue.css"
import Sidebar from "../Sidebar"

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

  const [removeUpvoteQuestion, { rUpvoteQ }] = useMutation(REMOVE_UPVOTE_QUESTION, {
    update(_, { data: { login: userData } }){
      window.location.reload(false);
    },
    variables: {
      postId,
      email
    }
  })

  const [downvoteQuestion, { downvoteQ }] = useMutation(DOWNVOTE_QUESTION, {
    update(_, { data: { login: userData } }){
      window.location.reload(false);
    },
    variables: {
      postId,
      email
    }
  })

  const [removeDownvoteQuestion, { rDownvoteQ }] = useMutation(REMOVE_DOWNVOTE_QUESTION, {
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

  const [removeUpvoteAnswer, { rUpvoteA }] = useMutation(REMOVE_UPVOTE_ANSWER, {
    update(_, { data: { login: userData } }){
      window.location.reload(false);
    },
    variables: {
      postId,
      answerId,
      email
    }
  })

  const [downvoteAnswer, { downvoteA }] = useMutation(DOWNVOTE_ANSWER, {
    update(_, { data: { login: userData } }){
      window.location.reload(false);
    },
    variables: {
      postId,
      answerId,
      email
    }
  })

  const [removeDownvoteAnswer, { rDownvoteA }] = useMutation(REMOVE_DOWNVOTE_ANSWER, {
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
    addAnswer();
  }

  async function upvoteAnswerCallback(r_answerId){
    await setAnswerId(r_answerId);
    upvoteAnswer();
  }

  async function removeUpvoteAnswerCallback(r_answerId){
    await setAnswerId(r_answerId);
    removeUpvoteAnswer();
  }

  async function removeDownvoteAnswerCallback(r_answerId){
    await setAnswerId(r_answerId);
    removeDownvoteAnswer();
  }

  async function downvoteAnswerCallback(r_answerId){
    await setAnswerId(r_answerId);
    downvoteAnswer();
  }

  const { data: postData } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
  });
  var post_data = postData ? postData.getPost : "";
  console.log(post_data)

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

  const { data: upvoteAnswerData } = useQuery(UPVOTE_ANSWER_CHECK_QUERY, {
        variables: {
            postId,
            answerId,
            email
        }
  });
  var areAnswersUpvoted = upvoteAnswerData ? upvoteAnswerData.didIUpvoteAnswer : [];

  const { data: downvoteAnswerData } = useQuery(DOWNVOTE_ANSWER_CHECK_QUERY, {
        variables: {
            postId,
            answerId,
            email
        }
  });
  var areAnswersDownvoted = downvoteAnswerData ? downvoteAnswerData.didIDownvoteAnswer : [];

	return (
          <>
            <Sidebar/>
            <main class="s-layout__content">
          		<div className="container-fluid">

                {/* QUESTION CONTAINER STARTS */}

                <div className="issue-container">
                  <div className="issue-content">
                      <div className="">
                        <div className="issue-body mb-4">
                          <div className="issue-author mt-5">
                            {moment(post_data['createdAt']).add(7, 'days').diff(moment()) > 0 ?
                              <div className="bounty-timer-container my-3">
                                <div className="bounty-timer-active p-2">
                                Bounty ends {moment(post_data['createdAt']).add(7, 'days').fromNow()}
                                </div>
                              </div> : 
                              <div className="bounty-timer-container my-3">
                                <div className="bounty-timer-inactive p-2">
                                Bounty ended {moment(post_data['createdAt']).add(7, 'days').fromNow()}
                                </div>
                              </div> 
                            }
                          </div>
                          <div className="issue-question mt-3">
                            {post_data['title']}
                          </div>
                          <div className="issue-author mt-1">
                            {post_data['email']}
                          </div>
                          <div className="issue-description mt-4">
                            {post_data ? Parser(post_data['body']) : ""}
                          </div>
                          <div className="tags d-inline-block">
                            {post_data.tags && Object.keys(post_data.tags).map(tag => ( 
                            <div className="tag px-3 py-2 mr-1 my-1">#{tag}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    <div className="question-info mt-5">
                      <div className="info-details float-left">
                        <i className={isQuestionUpvoted ? "upvoted-i" : "upvote-i"} onClick={isQuestionUpvoted ? removeUpvoteQuestion : upvoteQuestion}><FontAwesomeIcon icon={faArrowUp} /></i> <span className="mx-2">{post_data['upvotes'] ? post_data['upvotes'].length: "0"} </span> 
                      </div>
                      <div className="info-details float-right desktop-only">
                        {isQuestionDownvoted ? <><i onClick={removeDownvoteQuestion}><FontAwesomeIcon icon={faExclamationCircle} /></i><span className="mx-2">You have downvoted this Question. Click to Remove. </span></> : <><i onClick={downvoteQuestion}><FontAwesomeIcon icon={faExclamationCircle} /></i><span className="mx-2"> Downvote this Question</span></> }
                      </div>
                    </div>
                  </div>
                  
                </div>
                <div className="answer-count mt-5 mx-5">
                  {post_data['answers'] ? post_data['answers'].length: "0"} Answers
                </div>
                <hr/>
                {/* QUESTION CONTAINER ENDS */}

                {/* CREATE ANSWER CONTAINER STARTS 

                <div className="issue-container my-3">
                  <div className="issue-content">
                    <h4 className="mb-4">Your Answer</h4>
                    <CKEditor
                      editor={ ClassicEditor }
                      data=""
                      onChange={ ( event, editor ) => {
                          setBody(editor.getData())
                      } }
                  />
                    <div className="answer-question text-right my-4">
                      <button className="btn btn-primary" onClick={addAnswerCallback}>Add Answer</button>
                    </div>
                  </div>
                </div>

                 CREATE ANSWER CONTAINER ENDS */}
                {/* ANSWER CONTAINER STARTS */}

                <div className="issue-container my-3">
                  {post_data['answers'] && post_data['answers'].map(answer => (
                  <div className="answer-content">
                    <div className="issue-body">
                      <div className="issue-author mt-1">
                        {answer['email']}
                      </div>
                      <div className="issue-description mt-4">
                        {Parser(answer['body'])}
                      </div>
                    </div>
                    <div className="answer-info mt-5">
                      <div className="answer-polls float-left">  
                        <i className={areAnswersUpvoted[answer['id']] ? "upvoted-i" : "upvote-i"} onClick={areAnswersUpvoted[answer['id']] ? () => removeUpvoteAnswerCallback(answer['id']) : () => upvoteAnswerCallback(answer['id'])}><FontAwesomeIcon icon={faArrowUp} /></i> <span className="mx-2">{answer['upvotes'] ? answer['upvotes'].length: "0"} </span>
                      </div>
                      <div className="info-details float-right desktop-only">
                        { areAnswersDownvoted[answer['id']] ? <><i onClick={() => removeDownvoteAnswerCallback(answer['id'])}><FontAwesomeIcon icon={faExclamationCircle} /></i><span className="mx-2">You have downvoted this Answer. Click to Remove. </span></> : <><i onClick={() => downvoteAnswerCallback(answer['id'])}><FontAwesomeIcon icon={faExclamationCircle} /></i><span className="mx-2"> Downvote this Answer</span></> }
                        </div>
                    </div>
                  </div>
                  ))}
                </div>

              {/* ANSWER CONTAINER ENDS */}

          		</div>
            </main>

          </>
      )
  	
}

const FETCH_POST_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId){
            id title body email answers{ id email body upvotes{ email } } createdAt upvotes{ email } tags
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

const UPVOTE_ANSWER_CHECK_QUERY = gql`
    query($postId: ID!, $email: String!){
        didIUpvoteAnswer(postId: $postId, email: $email)
    }
`;

const DOWNVOTE_ANSWER_CHECK_QUERY = gql`
    query($postId: ID!, $email: String!){
        didIDownvoteAnswer(postId: $postId, email: $email)
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

const REMOVE_UPVOTE_QUESTION = gql`
  mutation removeUpvoteQuestion($postId: ID!, $email: String!) {
    removeUpvoteQuestion(postId: $postId, email: $email) {
      id
    }
  }
`;

const DOWNVOTE_QUESTION = gql`
  mutation downvoteQuestion($postId: ID!, $email: String!) {
    downvoteQuestion(postId: $postId, email: $email) {
      id
    }
  }
`;

const REMOVE_DOWNVOTE_QUESTION = gql`
  mutation removeDownvoteQuestion($postId: ID!, $email: String!) {
    removeDownvoteQuestion(postId: $postId, email: $email) {
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

const REMOVE_UPVOTE_ANSWER = gql`
  mutation removeUpvoteAnswer($postId: ID!, $answerId: ID!, $email: String!) {
    removeUpvoteAnswer(postId: $postId, answerId: $answerId, email: $email) {
      id
    }
  }
`;

const REMOVE_DOWNVOTE_ANSWER = gql`
  mutation removeDownvoteAnswer($postId: ID!, $answerId: ID!, $email: String!) {
    removeDownvoteAnswer(postId: $postId, answerId: $answerId, email: $email) {
      id
    }
  }
`;

const DOWNVOTE_ANSWER = gql`
  mutation downvoteAnswer($postId: ID!, $answerId: ID!, $email: String!) {
    downvoteAnswer(postId: $postId, answerId: $answerId, email: $email) {
      id
    }
  }
`;

export default Issue;
