import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { Button } from 'reactstrap';
import Cookie from "js-cookie";
import logo from "../Images/InfoBeans Foundation Logo - PNG (1).png";
import { Loader, toggleLoader } from './Loader.js';
import Swal from 'sweetalert2';
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
        width: '100vw'
    }
}

export default function Login() {
    const [registrationStatus, setRegistrationStatus] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adminEmailForForgot, setEmailForForgotPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userOtp, setUserOtp] = useState('');
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
            toggleLoader();
            axios.post('http://localhost:3002/admin/adminLogin', login).then((response) => {
                toggleLoader();
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
                    setRegistrationStatus('password not match');
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
    async function handleVerifyAdminEmail(e) {
        e.preventDefault();
        try {
            toggleLoader();
            const result = await axios.post('http://localhost:3002/admin/verifyAdminEmail', { email: adminEmailForForgot })
            if (result.status === 201) {
                toggleLoader();
                Swal.fire({ text: result.data.message,icon:"success" })
                var showModal = new window.bootstrap.Modal(document.getElementById('otpModal'));
                showModal.show();
            }
            else {
                toggleLoader();
                Swal.fire({ text: "Invalid Email",icon:"error" })
            }
        } catch (err) {
            console.log("Error:", err);
        }
        e.target.reset();
    }
    async function handleCheckOtp(e) {
        e.preventDefault();
        try {
            toggleLoader();
            const result = await axios.post('http://localhost:3002/admin/verifyOtp', { userOtp: userOtp })
            if (result.status === 201) {
                toggleLoader();
                Swal.fire({ text: result.data.message,icon:"success" })
                var showModal = new window.bootstrap.Modal(document.getElementById('forgotModalOpen'));
                showModal.show();
            }
            else {
                toggleLoader();
                Swal.fire({ text:result.data.message,icon:"error" })
            }
        } catch (err) {
            console.log("Error:", err);
        }
        e.target.reset();
    }

    async function handleChangePassword(e) {
        e.preventDefault();
        try {
            const obj = {
                newPassword: newPassword,
                confirmPassword: confirmPassword,
                email: adminEmailForForgot
            }
            console.log("obj===", obj);
            const result = await axios.post('http://localhost:3002/admin/forgotPassword', obj)
            if (result.status === 201) {
                Swal.fire({ text: "password updated successfully",icon:'success' })
            }
            else if (result.status === 208) {
                Swal.fire({ text: result.data.message,icon:'error' })
            }
            else {
                Swal.fire({
                    text: result.data.message,
                    icon: 'error'
                })
            }
        } catch (err) {
            console.log("Error:", err);
        }
        e.target.reset();
    }

    return (
        <>
            <Loader />
            {/* <div class="container" style={{margin:"10% 25%"}}> */}
            <div className="container vh-100 bg-white d-flex justify-content-center align-items-center p-5 " id='loginmainBox' >
                <section >
                    <div className="container-fluid h-custom ">
                        <div className=" row d-flex justify-content-center align-items-center h-100" id='loginmainBox'>
                            <div className="col-md-9 col-lg-6 col-xl-5">
                                <img src={logo}
                                    className="img-fluid" alt="Sample image" />
                            </div>
                            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 p-3" >
                                <form method='post' onSubmit={candidateLogin} >
                                    {/* <!-- Email input --> */}
                                    <h1>Admin Login</h1>
                                    <div className="form-outline mb-4">
                                        <div class="form-floating mb-3">
                                            <input type="email" class="form-control" id="email" placeholder="name@example.com"
                                                onChange={handleInputs}
                                                value={login.email} name='email' />
                                            <label for="floatingInput"><i class="bi bi-envelope"></i> &nbsp; Email address</label>
                                        </div>
                                    </div>
                                    {/* <!-- Password input --> */}
                                    <div className="form-outline mb-3">
                                        <div class="form-floating">
                                            <input type="password" class="form-control"
                                                name="password"
                                                id="floatingPassword"
                                                placeholder="Password"
                                                onChange={handleInputs}
                                                value={login.password} />
                                            <label for="floatingPassword"><i class="bi bi-key"></i>&nbsp;Password</label>
                                        </div>
                                    </div>
                                    <div className="text-center text-lg-start mt-4 pt-2">
                                        <button type="submit" className="btn btn-danger w-100 btn-lg" >Login</button>
                                        <div className='mt-2 text-center' data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ cursor: "pointer" }}>Forgote password?</div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <Modal style={modalCss}
                    isOpen={isModalOpen}
                    contentLabel="Registration Modal"
                >
                    <div classname="modal" tabindex="-1" style={{ width: '50%', margin: 'auto', padding: '10px', boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.3)', borderRadius: '10px', backgroundColor: "white" }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Login Status</h5>
                                </div>
                                <div className="modal-body">
                                    {registrationStatus === 'success' ? (
                                        <p className='text-dark text-center'>Login successful....</p>
                                    ) : registrationStatus === 'technical issue ' ? (
                                        <p className='text-dark text-center'>Something went wrong......</p>
                                    ) : registrationStatus === 'Email not match' ? (
                                        <p className='text-dark text-center'>Please enter correct email</p>
                                    ) : registrationStatus === 'password not match' ? (
                                        <p className='text-dark text-center'>password not match</p>) : null}
                                </div>
                                <div className="modal-footer">
                                    <button onClick={() => setIsModalOpen(false)} className='btn btn-danger text-light'>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>

            {/* <!--forgot Modal --> */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 style={{ marginLeft: "24%" }}>Forgote Password</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleVerifyAdminEmail}>
                                <input className="form-control mt-3 p-2 border-black" type="email" placeholder='Enter Your Email' onChange={(e) => { setEmailForForgotPassword(e.target.value) }} />
                                <button className="form-control mt-4 mb-3 btn btn-outline-danger" data-bs-dismiss="modal" type='submit'>Submit</button>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="modal fade" id="forgotModalOpen" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 style={{ marginLeft: "24%" }}>Create New Password</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleChangePassword}>
                                <input className="form-control mt-3 p-2 border-black" type="password" name="newPassword" onChange={(e) => { setNewPassword(e.target.value) }} placeholder='New Password' />
                                <input className="form-control mt-3 p-2 border-black" type="password" name="confirmPassword" onChange={(e) => { setConfirmPassword(e.target.value) }} placeholder='Confirm Password' />
                                <button className="form-control mt-4 mb-3 btn btn-outline-danger" data-bs-dismiss="modal" type="submit">Update</button>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="otpModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 style={{ marginLeft: "24%" }}>Enter Your Otp</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleCheckOtp}>
                                <input className="form-control mt-3 p-2 border-black" type="text" name="otp" onChange={(e) => { setUserOtp(e.target.value) }} placeholder='Enter Your Otp' />
                                <button className="form-control mt-4 mb-3 btn btn-outline-danger" data-bs-dismiss="modal" type="submit">Update</button>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}