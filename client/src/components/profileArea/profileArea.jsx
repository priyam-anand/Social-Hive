import React, { useState } from 'react'
import './profileArea.css';
import { userContext } from '../../App';
import { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap'
import axios from 'axios';
import { Image } from 'cloudinary-react';


const ProfileArea = ({ user }) => {

    const { state, dispatch } = useContext(userContext);

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
            userId: state.user._id,
            name: edit.name,
            from: edit.from,
            phone: edit.phone,
            profilePicture: imgBase64profile,
            coverPicture: imgBase64cover
        }
        try {
            await axios.put(`/users/${state.user._id}`, upd);
            const me = await axios.get(`/users?userId=${state.user._id}`);
            dispatch({ type: "USER_UPDATE", payload: me.data });
            window.location.reload();

        } catch (err) {
            console.log(err);
        }
        setShow(false);

    }

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <>
            <div className="profileRightTop">
                <div className="profile-cover">
                    {(user.coverPicture === undefined || user.coverPicture === "")
                        ? (<img
                            className="profile-cover-img"
                            src={PF + 'person/noCover.png'}
                            alt="" />)
                        : (<Image cloudName="dd8mlpgig" publicId={user.coverPicture}
                            style={{
                                'width': '100%',
                                'height': '250px',
                                'object-fit': 'cover'
                            }} />)
                    }
                    {(user.profilePicture === undefined || user.profilePicture === "")
                        ? (<img
                            className="profile-cover-img"
                            src={PF + 'person/noAvatar.png'}
                            alt="" />)
                        : (<Image cloudName="dd8mlpgig" publicId={user.profilePicture} style={{
                            'width': '150px',
                            'height': '150px',
                            'border-radius': '50%',
                            'object-fit': 'cover',
                            'position': 'absolute',
                            'left': '0',
                            'right': '0',
                            'margin': 'auto',
                            'top': '150px',
                            'border': '3px solid white',
                        }} />)
                    }
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
                        <form onSubmit={handleUpdate} className="input-form">
                            <div className="input-holder">
                                <label htmlFor='name' className="lbl">
                                    Name:
                                </label>
                                <input type="text" name='name' className="inp-type" value={edit.name} onChange={e => setEdit({ ...edit, name: e.target.value })} readOnly />

                            </div>
                            <div className="input-holder">
                                <label htmlFor='name' className="lbl">
                                    From:
                                </label>
                                <input type="text" name='from' className="inp-type" value={edit.from}
                                    onChange={e => setEdit({ ...edit, from: e.target.value })} />

                            </div>
                            <div className="input-holder">
                                <label htmlFor='name' className="lbl">
                                    Phone:
                                </label>
                                <input type="text" className="inp-type" name='phone' value={edit.phone}
                                    onChange={e => setEdit({ ...edit, phone: e.target.value })}
                                    required
                                    maxLength="10" 
                                />

                            </div>
                            <div className="input-holder">
                                <label htmlFor='file' className="lbl btn btn-outline-primary mx-5">
                                    Change Profile Picture
                                </label>
                                <input type='file' className="file-type" id='file' accept='.png,.jpeg,jpg' onChange={handleProfile} />

                            </div>
                            <div className="input-holder">
                                <label htmlFor='file' className="lbl btn btn-outline-primary mx-5">
                                    Change Cover Picture
                                </label>
                                <input type='file' className="file-type" id='file' accept='.png,.jpeg,jpg' onChange={handleCover} />
                            </div>
                            <button className="btn btn-primary my-3" type="submit">Submit</button>
                        </form>
                    </Modal.Body>
                </Modal>

            </div>
        </>
    )
}

export default ProfileArea
