import React, { Component, useState  } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Swal from 'sweetalert2';
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import Sidebar from "../Sidebar"
import "./CreateBlog.css"

const animatedComponents = makeAnimated();

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

function CreateBlog(props){

    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState({});
    const [tagname, setTagname] = useState('');

    const [ createPost ] = useMutation(CREATE_BLOG, {
        update(_, {}){
            window.location.reload(false)
        },
        onError(err){
          if(err.graphQLErrors.length > 0)
            Swal.fire({title: "Oh, the rants!",
                  html: Object.values(err.graphQLErrors[0])[0],
                  footer: "The above error popped up while adding your blog.",
                  imageUrl: '/img/robot.png',
                  customClass: {
                    title: 'text-danger error-message',
                    content: 'error-message text-white',
                    confirmButton: 'game-button bg-danger',
                    image: 'error-image-swal',
                  },
                  background: `rgba(0,0,0,0.9)`
                });
        },
        variables: {title, body, tags}
    })

    const mdParser = new MarkdownIt(/* Markdown-it options */);
 
    function handleEditorChange({html, text}) {    
      console.log('handleEditorChange', html, text)
      setBody(html);
    }

    async function createPostCallback(){
        await setTitle(document.getElementById("question_title").value);

        console.log(tags)
        
        for (var key in tags) 
        {
            if (tags.hasOwnProperty(key)) 
            {
                var val = key;
                console.log(val);
                await setTagname(val);
            }
        }

        createPost();
    }

    async function handleChange(selectedOptions){
        var temp_tags = {}
        if(selectedOptions){
            for(var i = 0; i < selectedOptions.length; i++)
            {
                temp_tags[selectedOptions[i].label] = true;
                // takenoptions.push(selectedOptions[i].label);
            }
        }
        await setTags(temp_tags)
    }

    const { data } = useQuery(FETCH_TAGS_QUERY);

    var tag_list = data ? data.getTags : "";

    var options = [];

    for (var i = 0; i < tag_list.length; i++)
    {
        options.push({label: tag_list[i]['name'], value: i+1})
    }     

    return (
        <>
            <Sidebar/>
            <main class="s-layout__content">
                <div className="container-fluid">
                    <div className="create-post-container">
                        <div className="create-post-header">Create Blog</div>
                        <form>
                            <div className="title">
                                <label for="title">Blog title</label>
                                <br/>
                            </div>
                            <input type="text" id="question_title" name="title" placeholder="Enter your post title, it will be visible to other users" />
                            <div className="post-details-container my-3 py-3">
                                <div className="title">
                                    <label for="title">Article</label>
                                    <br/>
                                </div>
                                <MdEditor
                                  style={{ height: "600px" }}
                                  renderHTML={(text) => mdParser.render(text)}
                                  onChange={handleEditorChange}
                                  />
                            </div>
                            <div className="tags">
                                <label for="tags">Tags</label>
                                <br/>
                                <div className="tag-drop">
                                    <Select
                                      styles={customStyles}
                                      closeMenuOnSelect={false}
                                      components={animatedComponents}
                                      isMulti
                                      options={options}
                                      onChange={handleChange}
                                      theme={theme => ({
                                              ...theme,
                                              borderRadius: 0,
                                              colors: {
                                                ...theme.colors,
                                                primary25: '#00adb5',
                                                primary: 'black',
                                              },
                                            })}
                                    />
                                </div>
                            </div>
                            <button className="btn-submit" type="button" onClick={createPostCallback}>Submit Post</button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}

const CREATE_BLOG = gql`
  mutation createBlog(
    $title: String!
    $body: String!
    $tags: JSONObject
  ) {
    createBlog(
        title: $title
        body: $body
        tags: $tags
    ){
      id
    }
  }
`;

const FETCH_TAGS_QUERY = gql`
    query {
        getTags {
            id name weekly lifetime
        }
    }
`;


export default CreateBlog; 