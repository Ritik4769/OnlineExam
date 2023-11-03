import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Cookie from "js-cookie";

export default function Login() {
    const [registrationStatus, setRegistrationStatus] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const history = useNavigate();

    // var [isUserLogin, setUserLogin] = useState(false);
    const [login, logUser] = useState({
        EnrollID: '',
        Password: ''
    });
    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        logUser({ ...login, [name]: value });
        console.log(name)
        console.log(value)
    };

    const candidateLogin = async (e) => {
        if (e) {
            e.preventDefault();
        }
        console.log("in createExam");

        console.log(login);
        const { EnrollID, Password } = login;
        console.log(EnrollID);
        console.log(Password);
        //my
        try {
            axios.post('http://localhost:3002/candidate/login', login).then((response) => {

                console.log("result", response);
                if (response.status === 201) {
                    console.log('login complete.........');
                    setRegistrationStatus('success');

                    Cookie.set("EnrollID", EnrollID, {
                        expires: 1,
                        secure: true,
                        sameSite: "strict",
                        path: "/"
                    })

                    setIsModalOpen(true);                    // history("/otpcomponent");
                    history("/Instructionpage");
                    // history.push(`/Instructionpage/${EnrollID}`);
                    // setUserLogin(true);

                } else if (response.status === 202) {
                    console.log('Something went wrong');

                    setRegistrationStatus('Enrollid not match');
                    setIsModalOpen(true);
                } else if (response.status === 203) {
                    console.log('Something went wrong');

                    setRegistrationStatus('password not match');
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
        <> <div className="p-5 container justify-align-center w-50 "   >
            <form method='post' onSubmit={candidateLogin}>
                <div className="row  p-5 w-80" style={{ boxShadow: "2px 2px 2px 2px black" }}>
                    <center><h1><b>Login Form</b> </h1></center>
                    <div className="mt-4 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center" >
                        <input type="text" className=" p-3" name="EnrollID" id="EnrollID" onChange={handleInputs} value={login.EnrollID} placeholder="Enter Enroll Number" />
                    </div>
                    <div className="mt-4 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center">
                        <input type="password" className=" p-3" name="Password" id="Password" onChange={handleInputs} value={login.Password} placeholder="Enter Enroll Password" />

                    </div>
                    <div className="mt-4 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center">
                        {/* <input type="text" className=" p-3" name="phoneNo" id="phoneNo" 
                        placeholder="Enter Password" /> */}
                        <input type="submit" className=" btn btn-primary w-50" value="login" />
                    </div>
                    <div className="mt-4 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center">
                        don't have account &nbsp;<a className="text-blue" href="/">Register here</a>
                    </div>

                </div>
            </form>


            <div>
                {/* Your registration form and other elements */}

                <Modal
                    isOpen={isModalOpen}
                    contentLabel="Registration Modal"
                // onRequestClose={closeModal}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Login Status</h5>
                            <button type="button" className="btn-close" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {registrationStatus === 'success' ? (
                                <p>Login successful....</p>
                            ) : registrationStatus === 'error' ? (
                                <p>Something went wrong......</p>
                            ) : registrationStatus === 'Enrollid not match' ? (
                                <p>EnrollID not match</p>
                            ) : registrationStatus === 'password not match' ? (
                                <p>password not match</p>) : null}
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => setIsModalOpen(false)}>Close</button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
        </>
    );
}