import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./FriendSearch.css"
import Sidebar from "../Sidebar"

function UserSearchResult(props){

  function recommendFriend(){
        props.history.push('/recommend')
  }

  function searchCallback(){
    var query = document.getElementById("search_query").value;

    if(query.trim()===""){
      return;
    }
    props.history.push({
      pathname: "/marauder/search",
      state: { query: query },
    });
  }

  const query = props.location.state ? props.location.state.query : "";
  const { data: userSearchData } = useQuery(FETCH_USERSEARCH_QUERY, {
        variables: {
            searchString: query
        }
  });
  var user_list = userSearchData ? userSearchData.searchForUsers : "";

  function showUser(username){
    props.history.push('/profile/'+username);
  }

  document.addEventListener('keypress', function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                searchCallback();
                return false;
            }
            
        });

	return (
            <>
              <Sidebar/>
              <main class="s-layout__content">

            		<div className="container-fluid">

                  <div className="explore-posts pr-3 my-5">
                    <form class="searchbox">
                      <input type="text" id="search_query" placeholder="Search People in IIIT-H" autocomplete="off"/>
                      <button type="button" className="rounded m-2 search-button float-right my-4" onClick={searchCallback}><i><FontAwesomeIcon icon={faSearch} /></i></button>
                    </form>
                    <br/> <br/> <br/> 
                    {/*<div class="trending-tags desktop-only">
                      <div className="explore-subheader my-4">Trending:</div>
                    </div>*/}
                    <br/>
                  </div>
                  <div className="row">
                    <div className="col-xl-9">
                      <div className="explore-posts">
                      {user_list && user_list.map(user => ( 
                        <div className="text-left d-inline-block user-enlist hover-pointer w-100 py-5 px-3 m-1" onClick={() => showUser(user['username'])}>
                          <div className="user-enlist-content">
                            <p className="card-header">{user['username']}</p>
                            <p className="card-header text-secondary">{user['email']}</p>
                          </div>
                        </div>
                      ))}
                      </div>
                      {user_list.length === 0 ? <div className="card-header text-center mt-5">Uh, oh. We dont have any users related to your search. You can always invite them, though.</div> : ""}
                    </div>
                    <div className="col-xl-3 right-sidebar desktop-only">
                      <div className="text-center">
                        <button className="my-1 create-post w-100 py-3" onClick={recommendFriend}>TAKE A VIBE CHECK > </button>
                      </div>

                      {/*<div className="my-3 p-2 top-users-post">
                        <div className="card-header">
                          TOP USERS
                        </div>
                        <div className="top-users m-4">
                          <ul>
                          </ul>
                        </div>
                      </div>
                      </div>*/}
                    </div>
                  </div>
            		</div>
              </main>
            </>
      )
}

const FETCH_USERSEARCH_QUERY = gql`
    query($searchString: String!){
        searchForUsers(query: $searchString){
            _id email username
        }
    }
`

export default UserSearchResult;
