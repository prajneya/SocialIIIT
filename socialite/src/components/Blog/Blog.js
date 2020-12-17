import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Parser from 'html-react-parser';

import "./Blog.css"

function Blog(props){

  const blogId = props.match.params.blogId;

  const { data: blogData } = useQuery(FETCH_BLOG_QUERY, {
        variables: {
            blogId
        }
  });
  var blog_data = blogData ? blogData.getBlog : "";

	return (
          <>
          		<div className="container">

                {/* BLOG CONTAINER STARTS */}

                <div className="issue-container">
                  <div className="issue-content">
                      <div className="">
                        <div className="issue-body mb-4">
                          <div className="issue-author mt-5">
                              Authored by {blog_data['email']}
                          </div>
                          <div className="blog-title">
                            {blog_data['title']}
                          </div>
                          <div className="issue-description mt-5">
                            {blog_data ? Parser(blog_data['body']) : ""}
                          </div>
                        </div>
                      </div>
                    <div className="question-info mt-5">
                      <div className="info-details float-left">
                      </div>
                      <div className="info-details float-right desktop-only">
                      </div>
                    </div>
                  </div>
                  
                </div>
                <div className="answer-count mt-5 mx-5">
                </div>

                          <div className="tags d-inline-block">
                            {blog_data.tags && Object.keys(blog_data.tags).map(tag => ( 
                            <div className="tag px-3 py-2 mr-1 my-1">#{tag}</div>
                            ))}
                          </div>
                <hr/>

                <div className="issue-author mt-1">
                    Created at {blog_data['createdAt']}
                </div>

          		</div>

          </>
      )
  	
}

const FETCH_BLOG_QUERY = gql`
    query($blogId: ID!){
        getBlog(blogId: $blogId){
            id title body email createdAt tags
        }
    }
`;

export default Blog;
