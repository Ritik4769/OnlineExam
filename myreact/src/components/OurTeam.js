import React from 'react';
import $ from 'jquery';
import { useEffect } from 'react';
import fac1 from '../Images/face-young-man-in-frame-circular-avatar-character-vector-28829132.jpg';
import fac2 from '../Images/beautiful-woman-in-frame-circular-avatar-character-free-vector.jpg';
import fac3 from '../Images/man-with-beard-avatar-character-isolated-icon-free-vector.jpg';

export default function OurTeam() {

    useEffect(() => {
        $('.teamCarousel .team-team-carousel-item ').each(function () {
            var minPerSlide = 4;
            var next = $(this).next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));

            for (var i = 0; i < minPerSlide; i++) { next = next.next(); if (!next.length) { next = $(this).siblings(':first'); } next.children(':first-child').clone().appendTo($(this)); }
        });
    });

    return (
        <>
            <section id='ourTeam' className='w-100'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 p-2'>
                            <h1 className='fw-bold'>Our Services</h1>
                            <p className='ps-1' style={{ color: '#292929', fontSize: '17px' }}>Discover an array of services meticulously crafted and personalized just for you</p>
                        </div>
                    </div>
                </div>
                <div id="myCarousel" className="container-fluid teamCarousel slide container" data-bs-ride="carousel">
                    <div className="team-carousel-inner w-100">
                        <div className="team-carousel-item active">
                            <div className="col-lg-4 col-md-12 col-sm-6 d-flex justify-content-center">
                                <div className='card border-0' style={{ background: '#F9F5F4' }}>
                                    <div className='card-img-top p-4'>
                                        <div className='content'>
                                            <img className="" src={fac1} />
                                            <div className='content2'>
                                                <h3 className='text-light py-2'>Cleaner</h3>
                                                <p className='text-light text-center pb-2'>Bathroom Kitchen Cleaning Sofa Cleaning Window Cleaning Dusting & Polishing </p>
                                                <button className='btn bg-yellow text-light'>View More</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="team-carousel-item ">
                            <div className="col-lg-4 col-md-12 col-sm-6 d-flex justify-content-center">
                                <div className='card border-0' style={{ background: '#F9F5F4' }}>
                                    <div className='card-img-top p-4'>
                                        <div className='content'>
                                            <img className="" src={fac2} />
                                            <div className='content2'>
                                                <h3 className='text-light py-2'>Salon</h3>
                                                <p className='text-light text-center pb-2'>Hair cutting & Shaving for Men’s Facial & Waxing for Women’s Other services</p>
                                                <button className='btn bg-yellow text-light'>View More</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="team-carousel-item ">
                            <div className="col-lg-4 col-md-12 col-sm-6 d-flex justify-content-center">
                                <div className='card border-0' style={{ background: '#F9F5F4' }}>
                                    <div className='card-img-top p-4'>
                                        <div className='content'>
                                            <img className="" src={fac3} />
                                            <div className='content2'>
                                                <h3 className='text-light py-2'>Electrician</h3>
                                                <p className='text-light text-center pb-2'>Wires & Cables Repair Appliances Repair Electrical Installations Panel Upgrades</p>
                                                <button className='btn bg-yellow text-light'>View More</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="team-carousel-item ">
                            <div className="col-lg-4 col-md-12 col-sm-6 d-flex justify-content-center">
                                <div className='card border-0' style={{ background: '#F9F5F4' }}>
                                    <div className='card-img-top p-4'>
                                        <div className='content'>
                                            <img className="" src={fac1} />
                                            <div className='content2'>
                                                <h3 className='text-light py-2'>Shifting Agency</h3>
                                                <p className='text-light text-center pb-2'>Shift your luggage into the city outside the city and also outside the state</p>
                                                <button className='btn bg-yellow text-light'>View More</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="team-carousel-item ">
                            <div className="col-lg-4 col-md-12 col-sm-6 d-flex justify-content-center">
                                <div className='card border-0' style={{ background: '#F9F5F4' }}>
                                    <div className='card-img-top p-4'>
                                        <div className='content'>
                                            <img className="" src={fac2} />
                                            <div className='content2'>
                                                <h3 className='text-light py-2'>Cook</h3>
                                                <p className='text-light text-center pb-2'>Make your own Thali select different region food item like south indian,chinese,gujarati.</p>
                                                <button className='btn bg-yellow text-light'>View More</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='controls'>
                    <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon text-dark" aria-hidden="true">
                            <i className='fa fa-arrow-left'></i>
                        </span>
                        {/* <span className="visually-hidden">Previous</span> */}
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon text-dark" aria-hidden="true">
                            <i className='fa fa-arrow-right '></i>
                        </span>
                        {/* <span className="visually-hidden">Next</span> */}
                    </button>
                </div>
            </section>

            {/* <div className="container mt-3  drop-shadow bg-white pb-4">
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
                    <div className="team-carousel-item active">
                        <div className="row pb-4">
                            <div className="col-md-4 d-flex justify-content-center">
                                <div className="card w-75 m-1 card-shadow">
                                    <img src={fac1} className="card-img-top" alt="Image1" />

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
                                    <img src={fac2} className="card-img-top" alt="Image2" />
                                    <hr/>
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
                                    <img src={fac3} className="card-img-top" alt="Image3" />
                                  <hr/>
                                    <div className="card-body">
                                        <h5 className="card-title">Aayush Rajput</h5>
                                        <p className="card-text">Management</p>
                                        <div className="w-100 d-flex d-flex aling-items-center">
                                            <a className='text-decoration-none link-danger' href="/"><i className="fa-brands fa-linkedin"></i> &nbsp; Linkedin Profile</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="team-carousel-item ">
                        <div className="row pb-4">
                            <div className="col-md-4 d-flex justify-content-center">
                                <div className="card w-75 m-1 card-shadow">
                                    <img src={fac1} className="card-img-top" alt="Image4" />
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
                                    <img src={fac2} className="card-img-top" alt="Image5" />
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
                                    <img src={fac3} className="card-img-top" alt="Image6" />
                                    <div className="card-body">
                                        <h5 className="card-title">Aysush Rajput</h5>
                                        <p className="card-text">Management</p>
                                        <div className="w-100 d-flex d-flex aling-items-center">
                                            <a className='text-decoration-none link-danger' href="/"><i className="fa-brands fa-linkedin"></i> &nbsp; Linkedin Profile</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#myCarousel" role="button" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </a>
                <a className="carousel-control-next " href="#myCarousel" role="button" data-bs-slide="next">
                    <span className="carousel-control-next-icon " aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </a>
            </div>
        </div> */}
        </>
    );
}
