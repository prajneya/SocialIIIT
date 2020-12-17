import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./Error.css"

function NotFound(props){

	return (
          <>
            <div className="error-container">
              <h1>404</h1>
              <div id="error_content"><p>> <span>ERROR CODE</span>: "<i>HTTP 404 Lost in Vindhya</i>"</p>
              <p>> <span>ERROR DESCRIPTION</span>: "<i>We cannot find the page you were looking for.</i>"</p>
              <p>> <span>ERROR POSSIBLY CAUSED BY</span>: [<b>Aww, come on, Gupta Ji! We've told you not to nibble on the server wires.</b>...]</p>
              <p>> <span>SOME PAGES ON THIS SERVER THAT YOU DO HAVE PERMISSION TO ACCESS</span>: [<a href="/">Home Page</a>, <a href="/querify">Querify</a>, <a href="/recommendations">Recommendations</a>...]</p><p>> <span>HAVE A NICE DAY SIR  :-)</span></p>
              </div>
              
            </div>
          </>
      )
  	
}

export default NotFound;
