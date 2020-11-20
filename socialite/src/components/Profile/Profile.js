import React, { useState, useContext } from 'react';
import ImageUploader from "react-images-upload";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import "../Home/Home.css";
import "./Profile.css";
import Sidebar from "../Sidebar"

import { AuthContext } from '../../context/auth';

const houses = [{label: 'Aakash', value:1},{label: 'Agni', value:2},{label: 'Prithvi', value:3},{label: 'Vayu', value:4}]
const hostels = [{label: 'Bakul Nivas', value:1},{label: 'Parijaat Nivas', value:2},{label: 'New Boys Hostel', value:3},{label: 'Old Boys Hostel/Palash Nivas', value:4}]
const clubs = [{label: 'Arts Club', value: 1},{label: 'Lit Club', value:2},{label: 'Ping', value:3},{label: 'E-Cell', value:4},{label: 'DebSoc', value:5},{label: 'Toastmasters', value:6},{label: 'Frivolous Humorous Club', value:7}]
const sports = [{label: 'Table Tennis', value: 1},{label: 'Cricket',value:2},{label: 'Football',value:3},{label: 'Badminton',value:4},{label: 'Chess',value:5},{label: 'Carrom',value:6},{label: 'Billiards',value:7},{label: 'Tennis',value:8},{label: 'Gym',value:9},{label: 'Volleyball',value:10},{label: 'Basketball',value:11},{label: 'Hockey',value:12},{label: 'Yoga',value:13},{label: 'Martial-Arts',value:14}]

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

function Profile(props) {

    const [fullName, setFullName] = useState('');
    const [fbLink, setFbLink] = useState('');
    const [ghLink, setGhLink] = useState('');
    const [about, setAbout] = useState('');

    const [projectOneTitle, setProjectOneTitle] = useState('');
    const [projectOneGhLink, setProjectOneGhLink] = useState('');
    const [projectOneELink, setProjectOneELink] = useState('');
    const [projectOneBody, setProjectOneBody] = useState('');

    const [projectTwoTitle, setProjectTwoTitle] = useState('');
    const [projectTwoGhLink, setProjectTwoGhLink] = useState('');
    const [projectTwoELink, setProjectTwoELink] = useState('');
    const [projectTwoBody, setProjectTwoBody] = useState('');

    const [projectThreeTitle, setProjectThreeTitle] = useState('');
    const [projectThreeGhLink, setProjectThreeGhLink] = useState('');
    const [projectThreeELink, setProjectThreeELink] = useState('');
    const [projectThreeBody, setProjectThreeBody] = useState('');

    const [house, setHouse] = useState({});
    const [hostel, setHostel] = useState({});
    const [club, setClub] = useState({});
    const [sport, setSport] = useState({});

    async function handleHouseChange(selectedOptions){
        var temp_house = {}
        if(selectedOptions){
            for(var i = 0; i < selectedOptions.length; i++){
                temp_house[selectedOptions[i].label] = true
            }
        }
        await setHouse(temp_house)
    }

    async function handleHostelChange(selectedOptions){
        var temp_hostel = {}
        if(selectedOptions){
            for(var i = 0; i < selectedOptions.length; i++){
                temp_hostel[selectedOptions[i].label] = true
            }
        }
        await setHostel(temp_hostel)
    }

    async function handleClubChange(selectedOptions){
        var temp_club = {}
        if(selectedOptions){
            for(var i = 0; i < selectedOptions.length; i++){
                temp_club[selectedOptions[i].label] = true
            }
        }
        await setClub(temp_club)
    }

    async function handleSportChange(selectedOptions){
        var temp_sport = {}
        if(selectedOptions){
            for(var i = 0; i < selectedOptions.length; i++){
                temp_sport[selectedOptions[i].label] = true
            }
        }
        await setSport(temp_sport)
    }

    const [photo, setPhoto] = useState("");
    const { user, logout } = useContext(AuthContext)

    async function onDrop(pictureFiles, pictureDataURLs) {
        await setPhoto(pictureFiles[0])
    }

    const [ uploadProfilePic ] = useMutation(UPLOAD_PROFILE_PICTURE, {
        update(_, {}){
            console.log("update", photo)
        },
        variables: { photo }
    })

    function uploadImage(){
        if(photo==""){
            return;
        }
        console.log(photo)
        uploadProfilePic();
    }

    function profileUpdateCallBack(){

    }

    return (
        <>
        <Sidebar/>
        <main class="s-layout__content">
            <div className="container-fluid">
                <div className="create-post-container">
                    <div className="create-post-header">User Profile</div>
                    <form action={uploadImage}>
                        <ImageUploader
                            withIcon={true}
                            buttonText="Change Profile Picture"
                            onChange={onDrop}
                            imgExtension={[".jpg", ".jpeg", ".png"]}
                            maxFileSize={3242880}
                            withPreview={true}
                            singleImage={true}
                            accept="Accept"
                          />
                          <button type="button" onClick={uploadImage}>Submit</button>
                    </form>
                    <form>
                        <div className="row">
                            <div className="col-md-6">
                                <label>FULL NAME</label>
                                <input id="fullname"/>
                                <label>FACEBOOK LINK</label>
                                <input id="fblink"/>
                            </div>
                            <div className="col-md-6">
                                <label>USERNAME</label>
                                <input />
                                <label>GITHUB LINK</label>
                                <input id="ghlink"/>
                            </div>
                        </div>
                        <label>ABOUT YOU</label> <br/>
                        <textarea id="about"/>
                        <div className="row">
                            <div className="col-md-6">
                                <label>HOUSE</label>
                                <Select
                                      styles={customStyles}
                                      closeMenuOnSelect={false}
                                      components={animatedComponents}
                                      options={houses}
                                      onChange={handleHouseChange}
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
                                <label>HOSTEL</label>
                                <Select
                                      styles={customStyles}
                                      closeMenuOnSelect={false}
                                      components={animatedComponents}
                                      options={hostels}
                                      onChange={handleHostelChange}
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
                            <div className="col-md-6">
                                <label>CLUBS</label>
                                <Select
                                      styles={customStyles}
                                      closeMenuOnSelect={false}
                                      components={animatedComponents}
                                      isMulti
                                      options={clubs}
                                      onChange={handleClubChange}
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
                                <label>SPORTS</label>
                                <Select
                                      styles={customStyles}
                                      closeMenuOnSelect={false}
                                      components={animatedComponents}
                                      isMulti
                                      options={sports}
                                      onChange={handleSportChange}
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
                        <hr/>
                        <label style={{color: 'yellow'}}>PROJECT 1</label> <br/>
                        <label>PROJECT TITLE</label>
                        <input/>
                        <label>PROJECT GITHUB LINK</label>
                        <input/>
                        <label>PROJECT LINK (EXTERNAL)</label>
                        <input/>
                        <label>PROJECT DESCRIPTION</label> <br/>
                        <textarea/>
                        <hr/>
                        <label style={{color: 'yellow'}}>PROJECT 2</label> <br/>
                        <label>PROJECT TITLE</label>
                        <input/>
                        <label>PROJECT GITHUB LINK</label>
                        <input/>
                        <label>PROJECT LINK (EXTERNAL)</label>
                        <input/>
                        <label>PROJECT DESCRIPTION</label> <br/>
                        <textarea/>
                        <hr/>
                        <label style={{color: 'yellow'}}>PROJECT 3</label> <br/>
                        <label>PROJECT TITLE</label>
                        <input/>
                        <label>PROJECT GITHUB LINK</label>
                        <input/>
                        <label>PROJECT LINK (EXTERNAL)</label>
                        <input/>
                        <label>PROJECT DESCRIPTION</label> <br/>
                        <textarea/>
                        <button className="btn-submit" type="button" onClick={profileUpdateCallBack}>Save Details</button>
                    </form>
                </div>
            </div>
        </main>
        </>
    )
}

const UPLOAD_PROFILE_PICTURE = gql`
  mutation uploadPhoto(
    $photo: Upload!
  ) {
    uploadPhoto(
        photo: $photo
    )
  }
`;

export default Profile;