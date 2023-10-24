import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Images/InfoBeans Foundation Logo - PNG (1).png';
import logo2 from '../Images/InfoBeans Foundation Logo - PNG (1) copy.png';

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg bg-white p-0">
            <div className="container-fluid   p-0 infoBeansred">
                <div className="d-flex" id='logocontainer' >
                    <div className="bg-white m-0" id='logobox'>
                        <a className="navbar-brand  " href="/"><img width="110px"
                            src={logo} alt="" /></a>
                    </div>
                    <div className="  m-0" id='logosidebox'>
                        <a className="navbar-br and  " href="/"><img width="110px" src={logo2} alt="" /></a>
                    </div>
                </div>
                <button className="navbar-toggler me-3" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fa-solid fa-bars text-white"></i>
                </button>
                <div className="collapse navbar-collapse p-0   " id="navbarSupportedContent">
                    <div className="row  w-100   m-0 p-2 ">
                        <div className="col-12  col-lg-10  ">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-around ">
                                <li className="nav-item text-center">
                                    <a className="nav-link text-white active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item text-center">
                                    <a className="nav-link text-white" href="/">Courses</a>
                                </li>
                                <li className="nav-item text-center">
                                    <a className="nav-link text-white" href="/">Gallary</a>
                                </li>
                                <li className="nav-item text-center">
                                    <Link className="nav-link" to="/admin">
                                        <a className="text-white" href="/" style={{textDecoration: "none"}}>Admin</a>
                                    </Link>
                                </li>
                                <li className="nav-item text-center">
                                    <a className="nav-link text-white" href="/">Career</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12 col-lg-2 p-0 mt-1">
                            <Link className="nav-link" to="/registration">
                                <button className="btn btn-outline-danger w-100" type="submit" id="registerbtn">Register Now</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
