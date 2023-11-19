    import React, { useState } from 'react';
import axios from 'axios';
import Cookie from "js-cookie";

import { useNavigate } from 'react-router-dom';
// import NavBar from './components/NavBar';
export default function ModalComponent() {
    const history = useNavigate();
    const [userOtp, setOTP] = useState({
        userotp:''
    });
     
      const handleOTPChange = (e) => {
        const name =e.target.name;
        const value=e.target.value;
        setOTP({...userOtp,[name]:value});
      };
      const handleVerifyOTP = async (e) => {
        if (e) {
            e.preventDefault();
        }
        
        const { userotp } = userOtp;
        console.log("Your Otp is ",userOtp);

        try {
            axios.post('http://localhost:3002/candidate/verifyOtp', userOtp).then((response) => {
                console.log("result",response);
                if(response.status===201){
                    console.log('cookie  : ',response);
                    const responseData = response.data;
                    var userID = responseData.userID;
                    console.log("id..... : ",userID);
                    Cookie.set("userID", userID, {
                        expires: 1,
                        secure: true,
                        sameSite: "strict",
                        path: "/"
                    })

                    history('/registration');
                }
            }).catch((error) => {
                window.alert("Failed to load");
            })
        } catch (error) {
            console.log('Error:', error);
            window.alert('Failed to register');
        }
      };
      
    // <NavBar />
    return (
        
      <div className="w-50 mx-auto" style={{padding:"20px",margin:"10px"}}>
        <h2 className='text-danger text-center'>Verify OTP</h2>
            <form onSubmit={handleVerifyOTP} method='post'>
                <div className="row">                    
                    <div className="mt-4 col-lg-12 d-flex justify-content-center">
                        <input type="text" className=" p-3" name="userotp" id="otp" onChange={handleOTPChange} value={userOtp.userotp} placeholder="Enter OTP" />
                    </div>
                </div>
                  <div className="row">
                    <div className="mt-4 col-lg-6 d-flex justify-content-center">
                        <input type="reset" className="btn btn-danger w-50 mt-3" value="Resend"
                            style={{ height: "2.5vw" }} />
                    </div>
                    <div className="mt-4 col-lg-6 d-flex justify-content-center">
                        <input type="submit" className="btn btn-outline-danger w-50 mt-3" value="Verify" style={{ height: "2.5vw" }} />
                    </div>
                </div>
            </form>
      </div>
    );
  }
