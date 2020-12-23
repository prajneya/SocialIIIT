import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Blog.css"

function LandingBlog(props){

  const { data: blogData } = useQuery(FETCH_BLOGS_QUERY);
  var blog_data = blogData ? blogData.getBlogs : "";

  function showBlog(blogId){
    props.history.push('/blog/'+blogId);
  }

  function createBlog(blogId){
    props.history.push('/createblog');
  }

	return (
          <>  
            <nav class="navbar navbar-dark">
              <a class="navbar-brand" href="/">blog.peersity</a>
            </nav>
          		
            <div className="container-fluid px-5 py-5">
                <div className="row">
                  <div className="col-lg-4 desktop-only px-5">
                    <div className="hero-header">What's new?</div>
                    <div className="hero-description text-secondary">where all undiscovered <strong>voices</strong> can share their <strong>writing</strong> on any <strong>topic</strong></div>
                    <button className="btn-submit w-50 my-5" onClick={createBlog}>Create a Blog Post</button>
                  </div>
                  <div className="col-lg-8">
                    <div className="fixed-scroller">
                      {blog_data && blog_data.map(blog => ( 
                          <div className="project-container mt-3 pb-5 hover-pointer" onClick={() => showBlog(blog['id'])}>
                              <div className="project-header">
                                <div className="float-left mt-5 ml-5"><i><FontAwesomeIcon icon={faNewspaper} size="2x"/></i></div>
                              </div>
                              <div className="project-title ml-5">
                                {blog['title']}
                              </div>
                              <div className="tags d-inline-block mx-5 mt-5">
                                  {blog.tags && Object.keys(blog.tags).map(tag => ( 
                                    <div className="tag px-3 py-2 mr-1 my-1">#{tag}</div>
                                  ))}
                              </div>
                          </div> 
                          ))}
                    </div>

                  </div>
                </div>
          	</div>

          </>
      )
  	
}

const FETCH_BLOGS_QUERY = gql`
    query{
        getBlogs{
          id
          title
          tags
        }
    }
`

export default LandingBlog;
