import React, { useState,useEffect } from 'react'
import './profileArea.css';
import { userContext } from '../../App';
import { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap'
import axios from 'axios';


const ProfileArea = ({ user }) => {

    const { state,dispatch } = useContext(userContext);

    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(state.user);
    const [profile, setProfile] = useState(null);
    const [imgBase64profile, setImgBase64profile] = useState();
    const [cover, setCover] = useState(null);
    const [imgBase64cover, setImgBase64cover] = useState();


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleProfile = (e) => {
        setProfile(e.target.files[0]);
        const fil = e.target.files[0];
        getBase64Imgprofile(fil);
    }

    const getBase64Imgprofile = (fil) => {
        const reader = new FileReader();
        reader.readAsDataURL(fil);
        reader.onloadend = () => {
            setImgBase64profile(reader.result)
        }
    }

    const handleCover = (e) => {
        setCover(e.target.files[0]);
        const fil = e.target.files[0];
        getBase64Imgcover(fil);
    }

    const getBase64Imgcover = (fil) => {
        const reader = new FileReader();
        reader.readAsDataURL(fil);
        reader.onloadend = () => {
            setImgBase64cover(reader.result)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        const upd = {
            userId:state.user._id,
            name: edit.name,
            from: edit.from,
            phone: edit.phone,
            profilePicture: imgBase64profile,
            coverPicture: imgBase64cover
        }
        try{
            await axios.put(`/users/${state.user._id}`,upd);
            const me = await axios.get(`/users?userId=${state.user._id}`);
            dispatch({type:"USER_UPDATE",payload:me.data});
            window.location.reload();

        }catch(err){
            console.log(err);
        }
        setShow(false);
        
    }

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <>
            <div className="profileRightTop">
                <div className="profile-cover">
                    <img
                        className="profile-cover-img"
                        src={(user.coverPhoto === undefined || user.profilePicture === "") ? (PF + 'person/noCover.png') : (PF + user.coverPhoto)}
                        alt=""
                    />
                    <img
                        className="profile-user-img"
                        src={(user.profilePicture === undefined || user.profilePicture === "") ? (PF + 'person/noAvatar.png') : (PF + user.profilePicture)}
                        alt=""
                    />
                </div>
                <div className="profile-info">
                    <h4 className="profile-info-name">{user.name}</h4>
                    <span className="profile-info-desc">{(user.desc === undefined) ? `User has not added any description` : user.desc}</span>
                </div>

                <div className="butn">
                    {state.user.name === user.name ? (<Button variant="outline-primary"
                        onClick={handleShow}>
                        Edit Profile
                    </Button>)
                        : (<div></div>)}
                </div>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit your Profile</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={handleUpdate}>
                            <label htmlFor='file'>
                                Edit Profile Picture :
                                <input type='file' id='file' accept='.png,.jpeg,jpg' onChange={handleProfile} />
                            </label>
                            <label htmlFor='file'>
                                Edit Cover Picture :
                                <input type='file' id='file' accept='.png,.jpeg,jpg' onChange={handleCover} />
                            </label>
                            <label htmlFor='name'>
                                Name:
                                <input type="text" name='name' value={edit.name} onChange={e => setEdit({ ...edit, name: e.target.value })} />
                            </label>
                            <label htmlFor='name'>
                                From:
                                <input type="text" name='from' value={edit.from}
                                    onChange={e => setEdit({ ...edit, from: e.target.value })} />
                            </label>
                            <label htmlFor='name'>
                                Phone:
                                <input type="number" name='phone' value={edit.phone}
                                    onChange={e => setEdit({ ...edit, phone: e.target.value })} />
                            </label>
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </form>
                    </Modal.Body>
                </Modal>

            </div>
        </>
    )
}

export default ProfileArea
