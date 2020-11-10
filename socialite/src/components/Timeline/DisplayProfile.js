import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Parser from 'html-react-parser';

import { AuthContext } from '../../context/auth'

import "./Timeline.css"

function Timeline(props){

	const { user, logout } = useContext(AuthContext)

	function logUserOut(){
		logout();
		props.history.push('/')
	}

  const username = props.match.params.username;

  const squares = []
  for (var i = 1; i < 365; i++) {
    const level = Math.floor(Math.random() * 3);  
    squares.push(level);
  }

  const { data: timelineData } = useQuery(FETCH_TIMELINE, {
        variables: {
            username: username
        }
  });
  var timeline_data = timelineData ? timelineData.getTimelineInfo : "";

  if(!timeline_data){
    return (<>USER NOT FOUND</>)
  }

	return (
            <>
            <div className="container">
              <div className="authenticate-nav">
                <div className="a-nav-right">
                  <button className="rounded" onClick={logUserOut}>LOGOUT</button>
                </div>
              </div>

              <div className="display my-2">
                <div className="mx-2 username">{username}</div><div className="rating mt-1 mx-2 p-2">RATING: <strong>{timeline_data ? timeline_data.rating : ""}</strong></div>
                <div className="times-answered mt-1 mx-2 p-2">CONTRIBUTION: <strong>{timeline_data ? timeline_data.contributions : ""}</strong></div>
                <div className="email mx-2">{timeline_data ? timeline_data.email : ""}</div>
              </div>

               <div className="graph">
                <ul className="months">
                  <li>Jan</li>
                  <li>Feb</li>
                  <li>Mar</li>
                  <li>Apr</li>
                  <li>May</li>
                  <li>Jun</li>
                  <li>Jul</li>
                  <li>Aug</li>
                  <li>Sep</li>
                  <li>Oct</li>
                  <li>Nov</li>
                  <li>Dec</li>
                </ul>
                <ul className="days">
                  <li>Sun</li>
                  <li>Mon</li>
                  <li>Tue</li>
                  <li>Wed</li>
                  <li>Thu</li>
                  <li>Fri</li>
                  <li>Sat</li>
                </ul>
                <ul className="squares" id="squares">
                {squares.map(value => (
                  <li data-level={value}></li>
                ))}
                </ul>
              </div> 

              <div className="issue-container my-2">
                <div className="issue-content">
                  <div className="showcase-header">
                    USER SHOWCASE
                  </div>
                  <br/>
                  <hr/>
                  <div className="showcase-top-skills">
                    <div className="row">
                      <div className="col-lg-3 mt-2">
                        <div className="top-skill">
                          <div className="top-skill-icon">
                            <img src='/img/badge1.png' alt=""></img>
                          </div>
                          <div className="top-skill-name">
                            CHALLENGER
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 mt-2">
                        <div className="top-skill">
                          <div className="top-skill-icon">
                            <img src='/img/badge2.png' alt=""></img>
                          </div>
                          <div className="top-skill-name">
                            CHALLENGER
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 mt-2">
                        <div className="top-skill">
                          <div className="top-skill-icon">
                            <img src='/img/badge3.png' alt=""></img>
                          </div>
                          <div className="top-skill-name">
                            CHALLENGER
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 mt-2">
                        <div className="top-skill">
                          <div className="top-skill-icon">
                            <img src='/img/badge4.png' alt=""></img>
                          </div>
                          <div className="top-skill-name">
                            CHALLENGER
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="issue-container my-2">
                <div className="issue-content">
                  <div className="showcase-header">
                    GRATITUDE POINTS
                  </div>
                  <br/>
                  <hr/>
                  <div className="showcase-body mt-4 pt-2">
                    {timeline_data.skills && Object.keys(timeline_data.skills).map(skill => (
                      timeline_data.skills[skill] > 0 ?
                      <div className="mt-4">
                        <h5>{skill} <span className="float-right text-info">{timeline_data.skills[skill]}</span>  </h5>
                        <hr/>
                      </div> : ""
                    ))}
                  </div>
                  <br/>
                </div>
              </div>

            </div>
            </>
      )
  	
}

const FETCH_TIMELINE = gql`
    query($username: String!){
        getTimelineInfo(username: $username)
    }
`;


export default Timeline;