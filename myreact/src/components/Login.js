import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Login() {
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
        try {
            axios.post('http://localhost:3002/candidate/login', login).then((response) => {

                console.log("result", response);
                if (response.status === 201) {
                    
                    
                    // history("/otpcomponent");
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
            <div className="row  p-5 w-80" style={{boxShadow:"2px 2px 2px 2px black"}}>
            <center><h1><b>Login Form</b> </h1></center>
                <div className="mt-4 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center" >
                    <input type="text"className=" p-3" name="EnrollID" id="EnrollID" onChange={handleInputs} value={login.EnrollID}  placeholder="Enter Enroll Number" />
                </div>
                <div className="mt-4 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center">
                <input type="text"className=" p-3" name="Password" id="Password" onChange={handleInputs} value={login.Password}  placeholder="Enter Enroll Passwoed" />

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
        </div>
        </>
    );
}