import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../../context/auth'

import "./StackOverflow.css"

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

  const { data } = useQuery(FETCH_POSTS_QUERY);

  var post_list = data? data.getPosts : "";

	return (
          <>
      		<div className="container">
      			  <div className="authenticate-nav">
                  <div className="a-nav-right">
                      <button className="rounded" onClick={dashboard}>DASHBOARD</button>
                      &nbsp;&nbsp;
                      <button className="rounded" onClick={logUserOut}>LOGOUT</button>
                  </div>
            </div>

            <div className="feature-display">
                <div className="subsection-header"> Top Posts </div>
                    <div className="row">
                      {post_list && post_list.map(post => ( 
                        <div className="col-lg-12">
                          <div className="friend" onClick={() => showIssue(post['id'])}>
                            <div className="friend-content">
                                <strong>Created By: </strong>  {post['email']}
                                <br />
                                Body:{post['body']}
                          </div>
                        </div>
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
            id body email createdAt
        }
    }
`

export default StackOverflow;