import React from "react";
import logo from "../Images/InfoBeans Foundation Logo - PNG (1).png";

export default function footer() {
  return (
    <footer className=" w-100 " id="backfrounfImg">
    <div className="row w-100 m-0 p-0 ">

        <div className="col-7 col-sm-4 col-md-2 p-0 ">
            <div className="d-flex justify-content-center" id="ftrlogoBox">
                <img className="w-75 " src={logo} alt="InfoBeans Foundation"/>
            </div>
            
        </div>
      

        <div className="col-12 col-md-10"  >
            <div className="row " >
                <div className="text-start  w-100 pt-5 ps-5 pe-5 pb-0  ">
                  <h2 className=" text-white col-12 col-lg-6 offset-lg-2 h2">Vision of a developed nation Computer literacy reaching every home.</h2>
                </div>
            </div>
        </div>
           
        <div className="col-12 col-md-10 offset-md-2 mb-2  p-0">
            <div className="row m-0 w-100 mt-2">

            <div className="col-6 col-sm-4  d-flex  " >
              <div className="ms-4">
              <h5 className="h5  text-white " >Quick Links</h5>
              <h6 className=" m-3" > <a className="link-danger text-white footer-links" href="/">About Us</a></h6>
               <h6 className=" m-3" ><a className="link-danger text-white footer-links" href="/">Contact Us</a></h6> 
               <h6 className=" m-3" ><a className="link-danger text-white footer-links" href="/">Location </a></h6> 
              </div>
           </div>
         
            <div className="col-6 col-sm-4  d-flex   " >
              <div className="ms-4">
                <h5 className="h5  text-white " >Quick Links</h5>
                 <h6 className="m-3" > <a className="link-danger text-white footer-links" href="/">About Us</a></h6>
                 <h6 className="m-3" ><a className="link-danger text-white footer-links" href="/">Contact Us</a></h6> 
                 <h6 className="m-3" ><a className=" footer-links link-danger text-white " href="/">Location </a></h6> 
              </div>
           </div>

           <div className="col-12  col-sm-4    "> 
           <h5 className="h5 ms-4 text-white mt-2" >Socila Media</h5>
              <div className="d-flex" >
               <a className="link-danger text-white" href="/"> <h6 className="ms-4" > <i className="fa-brands fa-facebook"></i></h6></a>
               <a className="link-danger text-white" href="/"> <h6 className="ms-4" > <i className="fa-brands fa-x-twitter"></i></h6></a>
               <a className="link-danger text-white" href="/"> <h6 className="ms-4" > <i className="fa-brands fa-instagram"></i></h6></a>
               <a className="link-danger text-white" href="/"> <h6 className="ms-4" > <i className="fa-brands fa-linkedin"></i></h6></a>
               </div>
            </div>
         
         
         </div>
      </div>
         
    </div>
        <div className="w-100 p-1 " style={{ backgroundColor: 'darkred'}} >
            <p className="text-center text-white m-0  ">Copy Right &copy; InfoBeans Foundation 2023</p>
        </div>
</footer>

);
}