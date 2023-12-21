import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import Cookie from "js-cookie";
import './Login_for_exam/Login.css'
import {Loader,toggleLoader} from './Loader.js';
const modalCss = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '8px',
        width: '500px'
    }
}
export default function Login() {
    const [registrationStatus, setRegistrationStatus] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const history = useNavigate();
    const [login, logUser] = useState({
        EnrollID: '',
        Password: ''
    });
    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        logUser({ ...login, [name]: value });
    };
    
    const candidateLogin = async (e) => {
        if (e) {
            e.preventDefault();
        }
        console.log("in createExam");
        const { EnrollID, Password } = login;

        try {
            console.log("Hello");
            toggleLoader();
            axios.post('http://localhost:3002/candidate/login', login).then((response) => {
                toggleLoader();
                console.log("User at front end", response.data.user);
                var user = JSON.stringify(response.data.user);
                console.log("result", user);
                if (response.status === 201) {
                    console.log('login complete.........');
                    setRegistrationStatus('success');

                    Cookie.set("EnrollID", EnrollID, {
                        expires: 1,
                        secure: true,
                        sameSite: "strict",
                        path: "/"
                    })

                    setIsModalOpen(true);
                    history("/Instructionpage", { state: user });
                } else if (response.status === 202) {
                    console.log('Something went wrong');
                    setRegistrationStatus('Enrollid not match');
                    setIsModalOpen(true);
                } else if (response.status === 203) {
                    console.log('Something went wrong');
                    setRegistrationStatus('password not match');
                    setIsModalOpen(true);
                } else if (response.status === 204) {
                    console.log('204 Something went wrong');
                    setRegistrationStatus('You Already Given the Exam');
                    setIsModalOpen(true);
                }
            }).catch((error) => {
                console.log('', error);
            })
        } catch (error) {
            console.log('Error:', error);
            window.alert('Failed to register');
        }
    };

    return (
        <> 
       < Loader />
        <div className="p-5  container justify-align-center  "   >
            <div className='row w-200 m-0' >
                <div className='col-12 col-md-6 offset-md-3  d-flex justify-content-center  ' >
                    <form className=' w-100 sheduleform  ' method='post' onSubmit={candidateLogin}>
                        <h1 className='text-center'  >Login Form</h1>
                        <div className=" mt-4 form-floating mb-3">
                            <input type="text" className="form-control" name="EnrollID" id="EnrollID" onChange={handleInputs} value={login.EnrollID} placeholder="Enter Enroll Number" />
                            <label htmlFor="floatingInput" style={{zIndex:"0"}}><i className="bi bi-envelope"></i>&nbsp;Enter Enroll ID</label>
                        </div>
                        <div className=" mt-4 form-floating mb-3">
                            <input type="password" className="form-control" name="Password" id="Password" onChange={handleInputs} value={login.Password} placeholder="Enter Enroll Password" />
                            <label htmlFor="floatingInput" style={{zIndex:"0"}}><i className="bi bi-key"></i>&nbsp;Enter Enroll Password</label>
                        </div>
                        <input type="submit" className=" mt-4 btn btn-outline-danger w-100" value="login" />
                    </form>
                </div>
            </div>
            {/* Your registration form and other elements */}
            <div>
                <Modal isOpen={isModalOpen} contentLabel="Registration Modal" style={modalCss}>
                    <div classname="modal" tabindex="-1" style={{ width: '100%', margin: 'auto', padding: '10px', boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.3)', borderRadius: '10px', background: 'white' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Login Status</h5>
                                    {/* <button type="button" className="btn-close" aria-label="Close"></button> */}
                                </div>
                                <div className="modal-body">
                                    {registrationStatus === 'success' ? (
                                        <p>Login successful....</p>
                                    ) : registrationStatus === 'error' ? (
                                        <p>Something went wrong......</p>
                                    ) : registrationStatus === 'Enrollid not match' ? (
                                        <p>EnrollID not match</p>
                                    ) : registrationStatus === 'password not match' ? (
                                        <p>password not match</p>
                                    ) : registrationStatus === 'You Already Given the Exam' ? (
                                        <p>You Already Given the Exam</p>) : null}
                                </div>
                                <div className="modal-footer">
                                    <button onClick={() => setIsModalOpen(false)} className='btn btn-danger text-light'>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
        </>
    );
}