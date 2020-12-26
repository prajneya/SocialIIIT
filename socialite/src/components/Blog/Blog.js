import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Parser from 'html-react-parser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from 'sweetalert2';
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import { AuthContext } from '../../context/auth'

import "./Blog.css"

function Blog(props){

  const { user } = useContext(AuthContext)
  const email = user.email;

  const blogId = props.match.params.blogId;

  const { data: blogData } = useQuery(FETCH_BLOG_QUERY, {
        variables: {
            blogId
        }
  });
  var blog_data = blogData ? blogData.getBlog : "";

  const [deleteBlog] = useMutation(DELETE_BLOG, {
    update(){
      props.history.push('/timeline')
    },
    onError(err){
      if(err.graphQLErrors.length > 0)
        Swal.fire({title: "Where did it go?",
              html: Object.values(err.graphQLErrors[0])[0],
              footer: "The above error popped up while deleting the blog.",
              imageUrl: '/img/study.png',
              customClass: {
                title: 'text-danger error-message',
                content: 'error-message text-white',
                confirmButton: 'game-button bg-danger',
                image: 'error-image-swal',
              },
              background: `rgba(0,0,0,0.9)`
            });
    },
    variables: {
      blogId
    }
  })

  function showDropDown(){
    if(document.getElementById("dropdown_menu_blog").style.display === "block"){
      document.getElementById("dropdown_menu_blog").style.display = "none";
    }
    else{
      document.getElementById("dropdown_menu_blog").style.display = "block";
    }
  }

  function deleteBlogCallback(){
    Swal.fire({
              title: 'Delete Blog?',
              text: 'You are about to delete this blog. This cannot be undone',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, go ahead!',
              cancelButtonText: 'No, go back'
            }).then((result) => {
              if (result.value) {
                deleteBlog();
                Swal.fire(
                  'Sad to see this go.',
                  'Deleting Post...',
                  'error'
                )
              // For more information about handling dismissals please visit
              // https://sweetalert2.github.io/#handling-dismissals
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                  'Phew! That was close.',
                  'Did not delete the blog. :)',
                  'success'
                )
              }
            })
  }

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
                          <div className="issue-question">
                            {blog_data['title']}
                            {blog_data['email'] === email ?
                            <div className="float-right">
                              <i className="mx-2 hover-pointer float-right" onClick={showDropDown}><FontAwesomeIcon icon={faEllipsisV} size="xs"/></i>
                              <div id="dropdown_menu_blog">
                                <div className="dropdown-menu-item" onClick={deleteBlogCallback}>Delete Blog</div>
                              </div>
                            </div> : "" }
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

const DELETE_BLOG = gql`
  mutation deleteBlog($blogId: ID!) {
    deleteBlog(blogId: $blogId)
  }
`;

export default Blog;
