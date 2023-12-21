import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Cookie from "js-cookie";
import logo from "../Images/InfoBeans Foundation Logo - PNG (1).png";
import {Loader,toggleLoader} from './Loader.js';
import './AdminLogin/AdminLogin.css'
const modalCss={
    content:{
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '8px',
        width:'100vw'
   }    
}
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
          className="img-fluid" alt="Sample image"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 p-3" >
        <form  method='post' onSubmit={candidateLogin} >
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
           value={login.password}/>
          <label for="floatingPassword"><i class="bi bi-key"></i>&nbsp;Password</label>
          </div>

          </div>
          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="submit" className="btn btn-danger w-100 btn-lg" >Login</button>
          </div>

        </form>
      </div>
    </div>
  </div>
</section>
                {/* <div class="row">
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
                </div> */}



                <Modal style={modalCss}
                    isOpen={isModalOpen}
                    contentLabel="Registration Modal"
                // onRequestClose={closeModal}
                >
                    <div classname="modal" tabindex="-1" style={{width:'50%',margin:'auto',padding:'10px',boxShadow:'2px 2px 2px 2px rgba(0,0,0,0.3)',borderRadius:'10px',backgroundColor:"white"}}>
                     <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Login Status</h5>
                            {/* <button type="button" className="btn-close" aria-label="Close"></button> */}
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


        </>
    );
}