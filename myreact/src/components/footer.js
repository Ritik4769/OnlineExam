import React from "react";
import logo from "../Images/InfoBeans Foundation Logo - PNG (1).png";

export default function footer() {
  return (
    <footer className=" w-100  ">
    <div className="row w-100 m-0 p-0">

        <div className="col-12 col-sm-4 col-md-2 p-0 ">
            <div className="d-flex justify-content-center" id="ftrlogoBox">
                <img className="w-75 " src={logo}
                    alt="InfoBeans Foundation"/>
            </div>
            <div className="ms-4 mt-4">
                <div className="w-100 ps-4 ">
                    <h5 className="h5 text-white">Social Media</h5>
                </div>
                <div className="d-flex justify-content-around">
                    <a href="/" className="link-light socialLink"> <i className="fa-brands fa-facebook"></i> </a>
                    <a href="/" className="link-light socialLink"> <i className="fa-brands fa-x-twitter"></i> </a>
                    <a href="/" className="link-light socialLink"> <i className="fa-brands fa-instagram"></i> </a>
                    <a href="/" className="link-light socialLink"> <i className="fa-brands fa-linkedin"></i> </a>
                </div>
            </div>
        </div>

        <div className="col-12 col-md-10 " id="backfrounfImg">
          <div className="row" >
            
              <div className="text-start  w-100 p-5  ">
                  <h2 className=" text-white col-12 col-lg-6 offset-lg-2 h2">Vision of a developed nation
                      Computer literacy reaching every home.</h2>
                    </div>
                
                </div>
            </div>
       
        <div className="col-12" >
            <p className="text-center text-white">Copy Right &copy; InfoBeans Foundation 2023</p>
        </div>
    </div>
</footer>

);
}