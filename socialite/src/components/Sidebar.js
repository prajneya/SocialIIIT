import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { faHome, faAddressCard, faComments, faUserGraduate, faStreetView, faBars, faCogs, faSignOutAlt, faMap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './Sidebar.css'

import { AuthContext } from '../context/auth'

function Sidebar(props) {

	const { user, logout } = useContext(AuthContext)
	var user_id = user.id

	function logUserOut(){
		logout();
	}

	const { data } = useQuery(FETCH_NOTIFICATIONS_QUERY, {
		variables: {
			user_id
		}
	});
	var notifications = data ? data.getNotif : "";
	console.log(notifications.length, "bye")

	return (
		<>	
			<div className="s-layout__sidebar">
			  <a className="s-sidebar__trigger" href="#0">
			     <i><FontAwesomeIcon icon={faBars} /></i>
			  </a>

			  <nav className="s-sidebar__nav">
			     <ul>
			        <li>
			           <a className="s-sidebar__nav-link" href="/">
			              <i><FontAwesomeIcon icon={faHome} /></i><em>Home</em>
			           </a>
			        </li>
			        <li>
			           <a className="s-sidebar__nav-link" href="/timeline">
			             <i><FontAwesomeIcon icon={faAddressCard} /></i><em>My Timeline</em>
			           </a>
			        </li>
			        <li>
			           <a className="s-sidebar__nav-link" href="/notifications">
			              <i><FontAwesomeIcon icon={faComments} /></i><em>Notifications</em>
			           </a>
			        </li>
			        <li>
			           <a className="s-sidebar__nav-link" href="/querify">
			              <i><FontAwesomeIcon icon={faUserGraduate} /></i><em>Querify</em>
			           </a>
			        </li>
			        <li>
			           <a className="s-sidebar__nav-link" href="/recommend">
			              <i><FontAwesomeIcon icon={faStreetView} /></i><em>Recommendations</em>
			           </a>
			        </li>
			        <li>
			           <a className="s-sidebar__nav-link" href="/marauder">
			              <i><FontAwesomeIcon icon={faMap} /></i><em>Marauders</em>
			           </a>
			        </li>
			        <li>
			           <a className="s-sidebar__nav-link" href="/profile">
			              <i><FontAwesomeIcon icon={faCogs} /></i><em>Profile Settings</em>
			           </a>
			        </li>
			        <li>
			           <a className="sidebar-button s-sidebar__nav-link" href="/" onClick={logUserOut}>
			              <i><FontAwesomeIcon icon={faSignOutAlt} /></i><em>Logout</em>
			           </a>
			        </li>
			     </ul>
			  </nav>
			</div>
		</>

	)
}

const FETCH_NOTIFICATIONS_QUERY = gql`
    query($user_id: String!){
        getNotif(id: $user_id){
            userId email match type username
        }
    }
`

export default Sidebar;
