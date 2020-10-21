import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthContext } from '../../context/auth'

import "./Recommend.css"

function Recommend(props)
{
    const { user, logout } = useContext(AuthContext)

    function logUserOut()
    {
        logout();
        props.history.push('/')
    }

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
                    <div className="col-lg-12">
                        <div className="friend">
                            <div className="friend-content">
                                Raja
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="friend">
                            <div className="friend-content">
                                Ram
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="friend">
                            <div className="friend-content">
                                Mohan
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="friend">
                            <div className="friend-content">
                                Roy
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Recommend;