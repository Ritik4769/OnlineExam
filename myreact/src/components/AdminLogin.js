import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Cookie from "js-cookie";
import logo from "../Images/InfoBeans Foundation Logo - PNG (1).png";


export default function Login() {
    const [registrationStatus, setRegistrationStatus] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const history = useNavigate();

    const [login, logAdmin] = useState({
        email: '',
        password: ''
    });
    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        logAdmin({ ...login, [name]: value });
    };


    const candidateLogin = async (e) => {
        if (e) {
            e.preventDefault();
        }
        const { email, password } = login;
        //my
        try {
            axios.post('http://localhost:3002/admin/adminLogin', login).then((response) => {
            
            if (response.status === 201) {
                    Cookie.set('adEmail', response.data.token, { expires: 7 }); // expires in 7 days
                    console.log('login Sucessfull');
                    setRegistrationStatus('success');
                    setIsModalOpen(true);                  
                    history("/adminDashboard");
                
                } else if (response.status === 202) {
                   setRegistrationStatus('Email not match');
                    setIsModalOpen(true);
                
                } else if (response.status === 203) {
                    setRegistrationStatus('password not match ');
                    setIsModalOpen(true);

                } else if (response.status === 204) {
                    setRegistrationStatus('technical issue ');
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
            <div class="container" style={{margin:"10% 25%"}}>
                <div class="row">
                    <div class="col-md-3 py-5 text-white text-center " style={{ background: 'whitesmoke',borderRadius:"10px 0px 0px 10px" }}>
                        <div class="form-row">
                            <img src={logo} style={{ width: "80%" }} />
                            <div class="card-body">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 py-1" style={{borderRadius:"0px 10px 10px 0px" }}>
                        <hr />
                        <h4 class="text-center text-danger">Admin Login</h4>
                        <hr />
                        <form method='post' onSubmit={candidateLogin}>
                            <div class="form-row">
                                <div className="col-lg-10 ms-4">
                                    <input type="text" className="text-center mb-2 w-100" name="email" id="email" placeholder="Enter your email"
                                        onChange={handleInputs} value={login.email} />
                                </div>
                                <div className="col-lg-10 ms-4 ">
                                    <input type="password" className="text-center mt-2 w-100" name="password" id="password"
                                        onChange={handleInputs} value={login.password} placeholder="Enter your password" />
                                </div>
                                <div class="form-row mt-4">
                                    <button type="submit" class=" btn form-control btn-danger ">Submit</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>



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


        </>
    );
}