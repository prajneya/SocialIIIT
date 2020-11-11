import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Parser from 'html-react-parser';

import { AuthContext } from '../../context/auth'

function SearchResult(props){

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
    props.history.push({
      pathname: "/search",
      state: { query: query },
    });
  }

  const query = props.location.state.query;

  const { data: postData } = useQuery(FETCH_POSTS_QUERY, {
        variables: {
            searchString: query
        }
  });
  var post_list = postData ? postData.searchByTextPost : "";

	return (
            <>
          		<div className="container">
          			<div className="authenticate-nav">
                    <div className="a-nav-right"> 
                        <button className="rounded my-1 bg-primary" onClick={createPost}>CREATE POST</button>
                        <button className="rounded my-1 ml-2" onClick={dashboard}>DASHBOARD</button>
                        <button className="rounded my-1 ml-2" onClick={logUserOut}>LOGOUT</button>
                    </div>
                </div>

                <div className="explore-posts p-3">
                  <div className="explore-header my-2">Explore Topics</div>
                  <input type="text" id="search_query" placeholder={query} />
                  <button className="rounded m-2 bg-success float-right" onClick={searchCallback}>SEARCH</button>
                  <div className="explore-subheader my-4">Trending:</div>
                  <div className="tag px-3 py-2 mr-1 my-1">#community</div>
                  <div className="tag px-3 py-2 mr-1 my-1">#community</div>
                  <div className="tag px-3 py-2 mr-1 my-1">#community</div>
                </div>

                <hr/>

                <div className="explore-posts p-3">
                  <div className="explore-header my-2">Search Results</div>
                  <div className="posts-list">
                    {post_list && post_list.map(post => ( 
                      <div className="single-post p-3" onClick={() => showIssue(post['_id'])}>
                        <hr/>
                        <div className="post">
                          <div className="post-body">
                            <div className="post-header">{post['title']}</div>
                            <div className="post-content mt-4">{post ? Parser(post['body']) : ""}</div>
                          </div>
                        </div>
                        <div className="question-info mt-4">
                          <div className="tags d-inline-block">
                            {post.tags && Object.keys(post.tags).map(tag => ( 
                            <div className="tag px-3 py-2 mr-1 my-1">#{tag}</div>
                            ))}
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
    query($searchString: String!){
        searchByTextPost(query: $searchString){
            _id title body email answers{ id } upvotes{ id } createdAt tags
        }
    }
`

export default SearchResult;
