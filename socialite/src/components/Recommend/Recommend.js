import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../../context/auth'

import "./Recommend.css"

function Recommend(props){

    const { user, logout } = useContext(AuthContext);

    function logUserOut()
    {
        logout();
        props.history.push('/')
    }

    const userId = user.id;

    const { data } = useQuery(FETCH_RECOMMENDATIONS_QUERY, {
        variables: {
            userId
        }
    });

    var recommendations = data ? data.recommend : "";

    return (
            <>
            <div className="container">
                <div className="authenticate-nav">
                    <div className="a-nav-right">
                        <button className="rounded" onClick={logUserOut}>LOGOUT</button>
                    </div>
                </div>

                <div className="feature-display">
                    <div className="subsection-header"> Let us recommend you some friends! </div>
                    <div className="row">
                        {recommendations && recommendations.map(recommendation => (
                            <div className="col-lg-12">
                            <div className="friend">
                                <div className="friend-content">
                                    <strong>Email: {recommendation['email']}</strong>
                                    <br />
                                    Friend Match Probalitiy: {recommendation['match']} %
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

const FETCH_RECOMMENDATIONS_QUERY = gql`
    query($userId: String!){
        recommend(id: $userId){
            id match email
        }
    }
`

export default Recommend;