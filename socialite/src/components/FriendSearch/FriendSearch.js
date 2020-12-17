import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./FriendSearch.css"
import Sidebar from "../Sidebar"

function FriendSearch(props){

  function recommendFriend(){
        props.history.push('/recommend')
  }

  function searchCallback(){
    var query = document.getElementById("search_query").value;
    if(query===""){
      return;
    }
    props.history.push({
      pathname: "/marauder/search",
      state: { query: query },
    });
  }

	return (
            <>
              <Sidebar/>
              <main class="s-layout__content">

            		<div className="container-fluid">

                  <div className="explore-posts pr-3">
                    <form class="searchbox">
                      <input type="text" id="search_query" placeholder="Search People in IIIT-H" autocomplete="off"/>
                      <button className="rounded m-2 search-button float-right" onClick={searchCallback}><i><FontAwesomeIcon icon={faSearch} /></i></button>
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
                        <div className="user-search-image">
                          <img src="./img/find_friend.png" alt="friends" />
                          <div className="look-friend-text">Search for friends in the above search bar</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 right-sidebar desktop-only">
                      <div className="text-center">
                        <button className="my-1 create-post w-100 py-3" onClick={recommendFriend}>TAKE A VIBE CHECK > </button>
                      </div>
                      <div className="my-3 p-2 top-users-post">
                        <div className="card-header">
                          TOP USERS
                        </div>
                        <div className="top-users m-4">
                          <ul>
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

export default FriendSearch;
