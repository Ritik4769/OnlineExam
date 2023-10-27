import React from 'react';

import fac1 from '../Images/face-young-man-in-frame-circular-avatar-character-vector-28829132.jpg';
import fac2 from '../Images/beautiful-woman-in-frame-circular-avatar-character-free-vector.jpg';
import fac3 from '../Images/man-with-beard-avatar-character-isolated-icon-free-vector.jpg';

export default function OurTeam() {
    return (
        <div className="container mt-3  drop-shadow bg-white pb-4">
        <div className=" m-4 p-0 pt-4  d-flex align-items-center justify-content-center">
            <h1 className="ms-4 text-center">Our Team</h1>
        </div>
        <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
        
            <ol className="carousel-indicators">
                <li data-bs-target="#myCarousel" data-bs-slide-to="0" className="active"></li>
                <li data-bs-target="#myCarousel" data-bs-slide-to="1"></li>
                <li data-bs-target="#myCarousel" data-bs-slide-to="2"></li>
            </ol>
    
    
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div className="row pb-4">
                        <div className="col-md-4 d-flex justify-content-center">
                            <div className="card w-75 m-1 card-shadow">
                                <img src={fac1} className="card-img-top" alt=""/>
                                <div className="card-body">
                                    <h5 className="card-title">Gaurav Kothari</h5>
                                    <p className="card-text">Trainer</p>
                                    <div className="w-100 d-flex aling-items-center">
                                    <a className='text-decoration-none link-danger' href="/"><i className="fa-brands fa-linkedin"></i>&nbsp;Linkedin Profile</a>  
                                 
                                   </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-center">
                            <div className="card w-75 m-1 card-shadow">
                                <img src={fac2} className="card-img-top" alt=""/>
                                <div className="card-body">
                                    <h5 className="card-title">Mayuri Dewaskar</h5>
                                    <p className="card-text">Trainer</p>
                                    <div className="w-100  d-flex aling-items-center">
                                     <a className='text-decoration-none link-danger' href="/"><i className="fa-brands fa-linkedin"></i> &nbsp; &nbsp; Linkedin Profile</a>  
                                 
                                     </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-center">
                            <div className="card w-75 m-1 card-shadow">
                                <img src={fac3} className="card-img-top" alt=""/>
                                <div className="card-body">
                                    <h5 className="card-title">Aysush Rajput</h5>
                                    <p className="card-text">Management</p>
                                    <div className="w-100 d-flex d-flex aling-items-center">
                                    <a  className='text-decoration-none link-danger' href="/"><i className="fa-brands fa-linkedin"></i> &nbsp; Linkedin Profile</a>  
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div className="carousel-item ">
                    <div className="row pb-4">
                        <div className="col-md-4 d-flex justify-content-center">
                            <div className="card w-75 m-1 card-shadow">
                                <img src={fac1} className="card-img-top" alt=""/>
                                <div className="card-body">
                                    <h5 className="card-title">Gaurav Kothari</h5>
                                    <p className="card-text">Trainer</p>
                                    <div className="w-100 d-flex aling-items-center">
                                    <a className='text-decoration-none link-danger' href="/"><i className="fa-brands fa-linkedin"></i>&nbsp;Linkedin Profile</a>  
                                 
                                   </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-center">
                            <div className="card w-75 m-1 card-shadow">
                                <img src={fac2} className="card-img-top" alt=""/>
                                <div className="card-body">
                                    <h5 className="card-title">Mayuri Dewaskar</h5>
                                    <p className="card-text">Trainer</p>
                                    <div className="w-100  d-flex aling-items-center">
                                     <a className='text-decoration-none link-danger' href="/"><i className="fa-brands fa-linkedin"></i> &nbsp; &nbsp; Linkedin Profile</a>  
                                 
                                     </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-center">
                            <div className="card w-75 m-1 card-shadow">
                                <img src={fac3} className="card-img-top" alt=""/>
                                <div className="card-body">
                                    <h5 className="card-title">Aysush Rajput</h5>
                                    <p className="card-text">Management</p>
                                    <div className="w-100 d-flex d-flex aling-items-center">
                                    <a  className='text-decoration-none link-danger' href="/"><i className="fa-brands fa-linkedin"></i> &nbsp; Linkedin Profile</a>  
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
        
    
    
        </div>
            <a className="carousel-control-prev d-flex aling-items-center justify-content-start" href="#myCarousel" role="button" data-bs-slide="prev">
            <div className=' bg-danger p-1 pre-nxt-btn d-flex aling-items-center justify-content-center  '>
            
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </div>
            </a>
            <a className="carousel-control-next d-flex aling-items-center justify-content-end " href="#myCarousel" role="button" data-bs-slide="next">
            <div className=' bg-danger p-1 pre-nxt-btn d-flex aling-items-center justify-content-center  '>
            
                <span className="carousel-control-next-icon " aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </div>
            </a>
        </div>
    </div>

    );
}
