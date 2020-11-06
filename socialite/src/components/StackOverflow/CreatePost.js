import React, { Component } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import "../Home/Home.css";
import "../Profile/Profile.css";
import "./CreatePost.css"


class CreatePost extends Component {
    constructor(props){
        super(props);
        this.state = {
            tags: [{name: 'Data Structures', id: 1, area: 'Coding/Programming'},{name: 'C-programming',id:2, area: 'Coding/Programming'},
            {name: 'Probability and Statistics',id:3, area: 'Mathematics'},{name: 'Database Security',id:4, area: 'DBMS'},
            {name: 'Science',id:5, area: 'Science'},{name: 'Discrete Structures',id:6, area: 'Mathematics'},{name: 'Speech Processing',id:7, area: 'Computational Linguistics'},
            {name: 'Computer Vision',id:8, area: 'Others'},{name: 'Internships',id:9, area: 'Job/Internships'},{name: 'Resume',id:10, area: 'Job/Internships'},
            {name: 'Computational Linguistics',id:11, area: 'Computational Linguistics'},{name: 'Algorithm Analysis & Design',id:12, area: 'Coding/Programming'},
            {name: 'NLP',id:13, area: 'Computational Linguistics'}],
            
        };
        this.style = {
            chips: {
                background: "#00adb5",
                color: "white",
                "font-size": "1rem",
            },
            searchBox: {
                border: "none",
                "font-size": "1rem",
                "border-bottom": "none",
                "border-radius": "0px"
            },
            multiselectContainer: {
                color: "black"
            }
        };
    }


    render() {
        const { tags } = this.state;
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
                        <Multiselect options={tags}
                        displayValue="name" 
                        style={this.style} groupBy="area"
                        showCheckbox={true} placeholder="Tag your question with the respective fields"/>
                    </div>
                    <div className="spectags">
                        <label for="spectags">Specific User Tags</label>
                        <br/>
                        <input type="text" name="spectags" placeholder="Enter any specific tags you wish to include, separate them with a comma" />
                    </div>
                    <button className="btn-submit">Submit Post</button>
                </form>
            </div>
        )
    }
}

export default CreatePost; 