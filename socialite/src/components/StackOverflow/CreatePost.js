import React, { Component } from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import "../Home/Home.css";
import "../Profile/Profile.css";
import "./CreatePost.css"

const options = [{label: 'Data Structures', value: 1, area: 'Coding/Programming'},{label: 'C-programming',value:2, area: 'Coding/Programming'},
            {label: 'Probability and Statistics',value:3, area: 'Mathematics'},{label: 'Database Security',value:4, area: 'DBMS'},
            {label: 'Science',value:5, area: 'Science'},{label: 'Discrete Structures',value:6, area: 'Mathematics'},{label: 'Speech Processing',value:7, area: 'Computational Linguistics'},
            {label: 'Computer Vision',value:8, area: 'Others'},{label: 'Internships',value:9, area: 'Job/Internships'},{label: 'Resume',value:10, area: 'Job/Internships'},
            {label: 'Computational Linguistics',value:11, area: 'Computational Linguistics'},{label: 'Algorithm Analysis & Design',value:12, area: 'Coding/Programming'},
            {label: 'NLP',value:13, area: 'Computational Linguistics'}]

const animatedComponents = makeAnimated();

function CreatePost(props){

    function handleChange(selectedOptions){
        console.log(selectedOptions);
    }

    return (
        <div className="profile-container">
            <div className="signin">Create Post</div>
            <form action="#">
                <div className="title">
                    <label for="title">Post title</label>
                    <br/>
                    <input type="text" name="title" placeholder="Enter your post title, it will be visible to other users" />
                </div>
                <div className="ques">
                    <label for="ques">Question</label>
                    <br/>
                    <input type="text" name="ques" placeholder="Enter your detailed question!" />
                </div>
                <div className="tags">
                    <label for="tags">Tags</label>
                    <br/>
                    <div className="tag-drop">
                        <Select
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
                <button className="btn-submit">Submit Post</button>
            </form>
        </div>
    )
}


export default CreatePost; 