import React, { Component } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import "../Home/Home.css";
import "./Profile.css";



class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            sports: [{name: 'Table Tennis', id: 1},{name: 'Cricket',id:2},
            {name: 'Football',id:3},{name: 'Badminton',id:4},
            {name: 'Chess',id:5},{name: 'Carrom',id:6},{name: 'Billiards',id:7},
            {name: 'Tennis',id:8},{name: 'Gym',id:9},{name: 'Volleyball',id:10},
            {name: 'Basketball',id:11},{name: 'Hockey',id:12},{name: 'Yoga',id:13},
            {name: 'Martial-Arts',id:14}],

            clubs: [{name: 'Arts Club', id: 1},{name: 'Lit Club', id:2},
            {name: 'Ping', id:3},{name: 'E-Cell', id:4},
            {name: 'DebSoc', id:5},{name: 'Toastmasters', id:6},
            {name: 'Frivolous Humorous Club', id:7}],

            houses: [{name: 'Aakash', id:1},{name: 'Agni', id:2}
            ,{name: 'Prithvi', id:3},{name: 'Vayu', id:4}],

            hostels: [{name: 'Bakul Nivas', id:1},{name: 'Parijaat Nivas', id:2}
            ,{name: 'New Boys Hostel', id:3},{name: 'Old Boys Hostel/Palash Nivas', id:4}]
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
        const { sports, clubs, hostels, houses } = this.state;
        return (
            <div className="profile-container">
                <div className="signin">User Profile</div>
                <form action="#">
                    <div className="house">
                        <label for="house">House</label>
                        <br/>
                        <Multiselect options={houses}
                        displayValue="name" singleSelect
                        style={this.style}
                        showCheckbox={true} placeholder="Select the House you belong to!" />
                    </div>
                    <div className="hostel">
                        <label for="hostel">Hostel</label>
                        <br/>
                        <Multiselect options={hostels}
                        displayValue="name" singleSelect
                        style={this.style}
                        showCheckbox={true} placeholder="Select your residence Hostel!"/>
                    </div>
                    <div className="room">
                        <label for="room">Room Number</label>
                        <br/>
                        <input type="number" name="room" placeholder="Enter you Hostel Room Number" />
                    </div>
                    <div className="sports">
                    <label for="sports">Sports</label>
                        <br/>
                        <Multiselect options={sports}
                        style={this.style}
                        displayValue="name"
                        showCheckbox={true} placeholder="Select the Sports you play!"/>
                    </div>
                    <div className="clubs">
                        <label for="clubs">Clubs</label>
                        <br/>
                        <Multiselect options={clubs}
                        displayValue="name" 
                        style={this.style}
                        showCheckbox={true} placeholder="Select the clubs you are a member of!"/>
                    </div>
                    
                    <button className="btn-submit">Update Details</button>
                </form>
            </div>
        )
    }
}

export default Profile;