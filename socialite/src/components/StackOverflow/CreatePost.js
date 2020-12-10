import React, { Component, useState  } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import "../Home/Home.css";
import "../Profile/Profile.css";
import "./CreatePost.css"

import Sidebar from "../Sidebar"

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

function CreatePost(props){

    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState({});
    const [tagname, setTagname] = useState('');

    const [ createPost ] = useMutation(CREATE_POST, {
        update(_, {}){
            props.history.push('/stack-overflow')
        },
        variables: {title, body, tags}
    })

    const [ updateTag ] = useMutation(UPDATE_TAG, {
        update(_, {})
        {
            // props.history.push('/stack-overflow')
        },
        variables: {tagname}
    })

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
                updateTag(tagname);
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
                        <div className="create-post-header">Create Post</div>
                        <form>
                            <div className="title">
                                <label for="title">Post title</label>
                                <br/>
                            </div>
                            <input type="text" id="question_title" name="title" placeholder="Enter your post title, it will be visible to other users" />
                            <div className="post-details-container my-3 py-3">
                                <div className="title">
                                    <label for="title">Post Details</label>
                                    <br/>
                                </div>
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data=""
                                    onChange={ ( event, editor ) => {
                                        setBody(editor.getData())
                                    } }
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

const CREATE_POST = gql`
  mutation createPost(
    $title: String!
    $body: String!
    $tags: JSONObject
  ) {
    createPost(
        title: $title
        body: $body
        tags: $tags
    ){
      id
    }
  }
`;

const UPDATE_TAG = gql`
  mutation updateTag(
    $tagname: String!
  ) {
    updateTag(
        tagname: $tagname
    )
    {
      id name weekly lifetime
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

export default CreatePost; 