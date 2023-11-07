import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../Images/InfoBeans Foundation Logo - PNG (1).png';
import avatar from '../Images/man-with-beard-avatar-character-isolated-icon-free-vector.jpg';
import Modal from 'react-modal';
export default function AdminModule() {
    const [users, setUser] = useState([]);
    const [userDocument, setUser1] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3002/admin/viewRegistrationCandidate")
            .then((users) => {
                setUser(users.data)
            })
            .catch(err => console.log('error ', err));
    })

    const handleButtonValue = (e, userId) => {
        console.log("Email : ", userId);
        axios.post(`http://localhost:3002/admin/allowUser/${userId}`).then((response) => {
            console.log("result", response);
        }).catch((error) => {
            console.log('', error);
        })
    }

    var isUserDocumentsModal = false
    const setUserDocuments = (userId, modalStatus) => {
        console.log("Emailll : ", userId);
        isUserDocumentsModal = true;
        axios.post(`http://localhost:3002/admin/viewRegistrationCandidateDocument/${userId}`).then((response) => {
            // console.log("resultxdfcgvbhjn", response);
            setUser1(response.data);

        }).catch((error) => {
            console.log('', error);
        })

    }

    return (
        <section>
            <div className="w-100">
                <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                        <h5 id="offcanvasRightLabel">InfoBeans Foundation</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <div className="w-100 m-2  d-flex justify-content-center flex-column">
                            <div className=" w-100  p-4 m-0 d-flex justify-content-center ">
                                <img className="img fa-circle w-50  "
                                    src={avatar} alt="" />
                            </div>
                            <center className="small text-break">Ayush Rajput</center>
                            <center className="small text-break">ayush.rajput@infobeansfoundation.com</center>
                        </div>

                        <div className="nav flex-column justify-content-around nav-pills" id="v-pills-tab" role="tablist"
                            aria-orientation="vertical">
                            <button className="nav-link bg-transparent text-danger active" id="v-pills-home-tab" data-bs-toggle="pill"
                                data-bs-target="#v-pills-home" role="tab" aria-controls="v-pills-home"
                                aria-selected="true">Home</button>
                            <button className="nav-link bg-transparent text-danger" id="v-pills-profile-tab" data-bs-toggle="pill"
                                data-bs-target="#v-pills-registrations" role="tab" aria-controls="v-pills-registrations"
                                aria-selected="false">View Registration</button>
                            <button className="nav-link bg-transparent text-danger" id="v-pills-totalplacements-tab" data-bs-toggle="pill"
                                data-bs-target="#v-pills-totalplacements" role="tab" aria-controls="v-pills-totalplacements"
                                aria-selected="false">Total Placements</button>
                            <button className="nav-link bg-transparent text-danger" id="v-pills-addquestions-tab" data-bs-toggle="pill"
                                data-bs-target="#v-pills-addquestions" role="tab" aria-controls="v-pills-addquestions"
                                aria-selected="false">Add Questions</button>
                            <button className="nav-link bg-transparent text-danger" id="v-pills-viewresult-tab" data-bs-toggle="pill"
                                data-bs-target="#v-pills-viewresult" role="tab" aria-controls="v-pills-viewresult"
                                aria-selected="false">View Result</button>
                            <button className="nav-link bg-transparent text-danger" id="v-pills-sendmessage-tab" data-bs-toggle="pill"
                                data-bs-target="#v-pills-sendmessage" role="tab" aria-controls="v-pills-sendmessage"
                                aria-selected="false">Send Message</button>
                            <button className="nav-link bg-transparent text-danger" id="v-pills-scheduleexam-tab" data-bs-toggle="pill"
                                data-bs-target="#v-pills-scheduleexam" role="tab" aria-controls="v-pills-scheduleexam"
                                aria-selected="false">Schedule Exam</button>
                            <button className="nav-link bg-transparent text-danger" id="v-pills-studentrecord-tab" data-bs-toggle="pill"
                                data-bs-target="#v-pills-studentrecord" role="tab" aria-controls="v-pills-studentrecord"
                                aria-selected="false">Student Record</button>
                        </div>
                    </div>
                </div>

                <nav className="navbar navbar-expand-lg navbar-light bg-light" id="dashBoardNav">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#"><img width="100px" src={logo}
                            alt="" /></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                        </div>
                    </div>
                </nav>

                <div className="row w-100 m-0 p-0" style={{ height: "min-content" }}>
                    <div className="col-lg-2 p-0" id="nav-pills-disapear">
                        <div style={{ height: "100vh", position: "sticky", top: "0" }} className=" inbeansred nav flex-column justify-content-center nav-pills bg-danger"
                            id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <div style={{ height: "30vh" }} className="">
                                <div className=" w-100 p-4 m-0 d-flex justify-content-center ">
                                    <img className="img fa-circle w-25" src={avatar} alt="" />
                                </div>
                                <center className="text-light small text-break  ">Ayush Rajput</center>
                                <center className="text-light small text-break  ">ayush.rajput@infobeansfoundation.com</center>
                            </div>

                            <div style={{ height: "70vh" }} id='scrollDivs'>
                                <button className="section-tab nav-link active" id="v-pills-home-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true"><i
                                        className="bi bi-house"></i>&nbsp;Home</button>
                                <button className="section-tab nav-link  " id="v-pills-profile-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-registrations" role="tab" aria-controls="v-pills-registrations"
                                    aria-selected="false"><i className="bi bi-file-earmark-person-fill"></i>&nbsp;Registrations</button>
                                <button className="section-tab nav-link  " id="v-pills-totalplacements-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-totalplacements" role="tab" aria-controls="v-pills-totalplacements"
                                    aria-selected="false"><i className="bi bi-mortarboard"></i>&nbsp;Placements</button>
                                <button className="section-tab nav-link  " id="v-pills-addquestions-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-addquestions" role="tab" aria-controls="v-pills-addquestions"
                                    aria-selected="false"><i className="bi bi-patch-question-fill"></i>&nbsp;Questions</button>
                                <button className="section-tab nav-link  " id="v-pills-viewresult-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-viewresult" role="tab" aria-controls="v-pills-viewresult"
                                    aria-selected="false"><i className="bi bi-clipboard2-data-fill"></i>&nbsp;Result</button>
                                <button className="section-tab nav-link  " id="v-pills-sendmessage-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-sendmessage" role="tab" aria-controls="v-pills-sendmessage"
                                    aria-selected="false"><i className="bi bi-send-fill"></i>&nbsp;Megssage</button>
                                <button className="section-tab nav-link  " id="v-pills-scheduleexam-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-scheduleexam" role="tab" aria-controls="v-pills-scheduleexam"
                                    aria-selected="false"><i className="bi bi-calendar-event-fill"></i>&nbsp;Exam</button>
                                <button className="section-tab nav-link  " id="v-pills-studentrecord-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-studentrecord" role="tab" aria-controls="v-pills-studentrecord"
                                    aria-selected="false"><i className="bi bi-people-fill"></i>&nbsp;Students</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-10 p-0 ">
                        <div className="tab-content p-0" id="v-pills-tabContent">
                            {/*  < !-- ----------------------------------Home Section----------------------------------->} */}
                            <div className="tab-pane fade show active bg-danger m-0" id="v-pills-home" role="tabpanel"
                                aria-labelledby="v-pills-home-tab">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav">
                                    <div className="container-fluid">
                                        <div className="d-flex align-items-center ">
                                            <a className="navbar-brand" href="#"><img width="100px"
                                                src={logo} alt="" /></a>
                                            <h2 className="h2 ms-2"><i className="bi bi-house"></i>&nbsp;Home</h2>
                                        </div>
                                        <div className="d-flex align-items-center  me-2 ">
                                            <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                            <button type="button" className="btn btn-outline-danger position-relative btn-sm">
                                                <i className="bi bi-bell-fill"></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    5
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                            {/* <!-- ----------------------------------Home Section Ends-----------------------------------> */}


                            {/* <!-- ---------------------Regestrations Section--------------------------------- --> */}
                            <div className="tab-pane fade pt-2" id="v-pills-registrations" role="tabpanel"
                                aria-labelledby="v-pills-registrations-tab">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav">
                                    <div className="container-fluid">
                                        <div className="d-flex align-items-center ">
                                            <a className="navbar-brand" href="#"><img width="100px"
                                                src={logo} alt="" /></a>
                                            <h2 className="h2 ms-2"> <i className="fa-regular fa-address-card"></i> Total Registrations</h2>
                                        </div>
                                        <div className="d-flex align-items-center  me-2 ">
                                            <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                            <button type="button" className="btn btn-outline-danger position-relative btn-sm">
                                                <i className="bi bi-bell-fill"></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    5
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </nav>
                                {/* <!-- --------------------------Filter Section--------------------------- --> */}
                                <div className="row w-100 m-0 ">
                                    <div className="col-12  col-md-3 p-2">
                                        <select className="form-control-sm w-100">
                                            <option value="null">Select Gender</option>
                                            <option value="null">Male</option>
                                            <option value="null">Female</option>
                                            <option value="null">All</option>
                                        </select>
                                    </div>
                                    <div className="col-12  col-md-3 p-2">
                                        <select className="form-control-sm w-100">
                                            <option value="null">Select by Sections</option>
                                            <option value="null">View All</option>
                                            <option value="null">Section 1</option>
                                            <option value="null">Section 2</option>
                                            <option value="null">Section 3</option>
                                            <option value="null">Section 1 & 2</option>
                                            <option value="null">Section 2 & 3</option>
                                            <option value="null">Section 3 & 1</option>
                                        </select>
                                    </div>
                                    <div className="col-12  col-md-6 p-2 order-first order-md-last">
                                        <div className="row rowId">
                                            <div className="col-4  d-flex justify-content-end">
                                                <button className="btn btn-outline-success btn-sm w-100 " type="button">To Excel &nbsp; <i
                                                    className="fa-solid fa-table"></i></button>
                                            </div>
                                            <div className="col-8 d-flex justify-content-end ">
                                                <div className="btn-group" role="group" aria-label="Basic example">
                                                    <input className="form-control-sm" placeholder="Search Here" type="text" name="" value="" />
                                                    <button type="button" className="btn btn-outline-primary btn-sm"><i
                                                        className="bi bi-search"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- --------------------------Filter SectionEnds --------------------------- --> */}
                                <div className="w-100 dashBorad-table-div ps-2 pe-2">
                                    <table className="table table-bordered table-hover table-responsive-md ">
                                        <thead className="sticky-top">
                                            <tr className="bg-danger text-white">
                                                <th>Name</th>
                                                <th>Phone Number</th>
                                                <th>adhaarNo</th>
                                                <th>Email</th>
                                                <th>Date Of Birth</th>
                                                <th>Attempt</th>
                                                <th>Allow 4<sup>th</sup></th>
                                                <th>Documents</th>
                                                {/* <th>Age</th>
                                                <th>Remove</th> */}
                                            </tr>
                                        </thead>
                                        <tbody className="overflow-hidden">
                                            {
                                                users.map(user => {
                                                    return <tr>
                                                        <td>{user.username}</td>
                                                        <td>{user.phoneNo}</td>
                                                        <td>{user.aadharNo}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.dob}</td>
                                                        <td>{user.attempt}</td>
                                                        <td>
                                                            {(user.attempt >= 3) ? (user.examAllow == false) ? (
                                                                <button className="btn btn-outline-danger btn-sm" id={`${user._id}`} type="submit" onClick={(e) => handleButtonValue(e, user._id)}><small>Allow</small></button>
                                                            ) : (<button className="btn btn-outline-primary btn-sm" disabled id={`${user._id}`} type="submit"><small>Eligible</small></button>) : (<button className="btn btn-outline-primary btn-sm" disabled id={`${user._id}`} type="submit"><small>Eligible</small></button>)}
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-outline-danger btn-sm" type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setUserDocuments(user._id, true)}><small>See Document</small></button>
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* ---------------Modal Start */}

                            {/* ---------------Modal End */}

                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg modal-dialog-scrollable">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">See Documents</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            {
                                                // userDocument.map(userDocs => {
                                                <tr>
                                                    <div>
                                                        <h4>Father's Income</h4>
                                                        <h4>{userDocument.income}</h4>
                                                    </div>
                                                    <div className='row mt-5'>
                                                        <div className='col-lg-6'>
                                                            <h4>Adhaar Card Photo</h4>
                                                            <img width={"100%"} height={"300vw"} src={"http://localhost:3002/" + userDocument.aadharFile}></img>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <h4>Income Certificate Image</h4>
                                                            <img width={"100%"} height={"300vw"} src={"http://localhost:3002/" + userDocument.incomeCertificate}></img>
                                                        </div>
                                                    </div>
                                                    <div className='row mt-5'>
                                                        <div className='col-lg-6'>
                                                            <h4>Father Adhaar Card Image</h4>
                                                            <img width={"100%"} height={"300vw"} src={"http://localhost:3002/" + userDocument.fatherAadharcard}></img>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <h4>Marksheet Image</h4>
                                                            <img width={"100%"} height={"300vw"} src={"http://localhost:3002/" + userDocument.marksheet}></img>
                                                        </div>
                                                    </div>
                                                    <div className='row mt-5'>
                                                        <div className='col-lg-6'>
                                                            <h4>Latest year Marksheet Image</h4>
                                                            <img width={"100%"} height={"300vw"} src={"http://localhost:3002/" + userDocument.latestMarksheet}></img>
                                                        </div>
                                                    </div>
                                                </tr>
                                                // }
                                                // )
                                            }
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary">Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-----------------------Regestrations Section Ends--------------------------------- --> */}



                            {/* <!-- ------------------------------------Total Plaements-----------------------------------------------> */}
                            <div className="tab-pane fade" id="v-pills-totalplacements" role="tabpanel"
                                aria-labelledby="v-pills-totalplacements-tab">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav">
                                    <div className="container-fluid">
                                        <div className="d-flex align-items-center ">
                                            <a className="navbar-brand" href="#"><img width="100px"
                                                src={logo} alt="" /></a>
                                            <h2 className="h2 ms-2"> <i className="fa-regular fa-address-card"></i> Total Placements</h2>
                                        </div>
                                        <div className="d-flex align-items-center  me-2 ">
                                            <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                            <button type="button" className="btn btn-outline-danger position-relative btn-sm">
                                                <i className="bi bi-bell-fill"></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    5
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </nav>

                                <div className="row w-100 m-0 p-3 dashBorad-table-div ">

                                    <div className="col-12 col-md-2 mb-1">
                                        <select className="form-control-sm w-100">
                                            <option value="null">Select Gender</option>
                                            <option value="null">Male</option>
                                            <option value="null">Female</option>
                                            <option value="null">All</option>
                                        </select>
                                    </div>

                                    <div className="col-12 col-md-2 mb-1">
                                        <select className="form-control-sm w-100">
                                            <option value="null">Select Batch</option>
                                            <option value="null">Batch 1</option>
                                            <option value="null">Batch 2</option>
                                            <option value="null">Batch 3</option>
                                            <option value="null">All Bathes</option>
                                        </select>
                                    </div>

                                    <div className="col-12 col-md-2 mb-1">
                                        <select className="form-control-sm w-100">
                                            <option value="null">Select Company</option>
                                            <option value="null">Company 1</option>
                                            <option value="null">Company 2</option>
                                            <option value="null">Company 3</option>
                                            <option value="null">Company 4</option>
                                        </select>
                                    </div>

                                    <div className="col-12 col-md-2 mb-1">
                                        <button className="btn btn-outline-success btn-sm w-100 " type="button">To Excel &nbsp; <i
                                            className="fa-solid fa-table"></i></button>

                                    </div>

                                    <div className="col-12 col-md-4 order-first order-md-last d-flex justify-content-between  mb-1 ">
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <input className="form-control-sm" placeholder="Search Here" type="text" name="" value="" />
                                            <button type="button" className="btn btn-outline-primary btn-sm"><i className="bi bi-search"></i></button>
                                        </div>
                                        <button type="button" className="btn  btn-outline-primary btn-sm"><i className="bi bi-plus-lg"></i></button>
                                    </div>
                                </div>
                                {/* <!-- ======================================= --> */}

                                <div className="row w-100 m-0 p-2 dashBorad-table-div ">
                                    <div className="col-6 col-sm-4 col-md-3">
                                        <div className="card w-100  m-1">
                                            <div className="w-100 d-flex justify-content-center">
                                                <img src={avatar}
                                                    className="card-img-top w-50" alt="..." />
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">Vikas Joshi</h5>
                                                <p className="text-muted">Btach 5</p>
                                                <p className="card-text text-muted  text-sm-start"><i className="bi bi-buildings"></i> Company</p>
                                                <a href="#" className="btn btn-outline-primary btn-sm me-1 mb-1"><i className="bi bi-send-fill"></i>&nbsp;Message</a>
                                                <a href="#" className="btn btn-outline-warning btn-sm me-1 mb-1 "><i className="bi bi-envelope"></i>&nbsp;Mail</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6 col-sm-4 col-md-3 ">
                                        <div className="card w-100  m-1">
                                            <div className="w-100 d-flex justify-content-center">
                                                <img src={avatar} className="card-img-top w-50" alt="..." />
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">Vikas Joshi</h5>
                                                <p className="text-muted">Btach 5</p>
                                                <p className="card-text text-muted  text-sm-start"><i className="bi bi-buildings"></i> Company</p>
                                                <a href="#" className="btn btn-outline-primary btn-sm me-1 mb-1"><i className="bi bi-send-fill"></i>&nbsp;Message</a>
                                                <a href="#" className="btn btn-outline-warning btn-sm me-1 mb-1"><i className="bi bi-envelope"></i>&nbsp;Mail</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6 col-sm-4 col-md-3">
                                        <div className="card w-100  m-1">
                                            <div className="w-100 d-flex justify-content-center">
                                                <img src={avatar} className="card-img-top w-50" alt="..." />
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">Vikas Joshi</h5>
                                                <p className="text-muted">Btach 5</p>
                                                <p className="card-text text-muted  text-sm-start"><i className="bi bi-buildings"></i> Company</p>
                                                <a href="#" className="btn btn-outline-primary btn-sm me-1 mb-1"><i className="bi bi-send-fill"></i>&nbsp;Message</a>
                                                <a href="#" className="btn btn-outline-warning btn-sm me-1 mb-1"><i className="bi bi-envelope"></i>&nbsp;Mail</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6 col-sm-4 col-md-3">
                                        <div className="card w-100  m-1">
                                            <div className="w-100 d-flex justify-content-center">
                                                <img src={avatar} className="card-img-top w-50" alt="..." />
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">Vikas Joshi</h5>
                                                <p className="text-muted">Btach 5</p>
                                                <p className="card-text text-muted  text-sm-start"><i className="bi bi-buildings"></i> Company</p>
                                                <a href="#" className="btn btn-outline-primary btn-sm me-1 mb-1"><i className="bi bi-send-fill"></i>&nbsp;Message</a>
                                                <a href="#" className="btn btn-outline-warning btn-sm me-1 mb-1"><i className="bi bi-envelope"></i>&nbsp;Mail</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6 col-sm-4 col-md-3">
                                        <div className="card w-100  m-1">
                                            <div className="w-100 d-flex justify-content-center">
                                                <img src={avatar} className="card-img-top w-50" alt="..." />
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">Vikas Joshi</h5>
                                                <p className="text-muted">Btach 5</p>
                                                <p className="card-text text-muted  text-sm-start"><i className="bi bi-buildings"></i> Company</p>
                                                <a href="#" className="btn btn-outline-primary btn-sm me-1 mb-1"><i className="bi bi-send-fill"></i>&nbsp;Message</a>
                                                <a href="#" className="btn btn-outline-warning btn-sm me-1 mb-1 "><i className="bi bi-envelope"></i>&nbsp;Mail</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6 col-sm-4 col-md-3">
                                        <div className="card w-100  m-1">
                                            <div className="w-100 d-flex justify-content-center">
                                                <img src={avatar} className="card-img-top w-50" alt="..." />
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">Vikas Joshi</h5>
                                                <p className="text-muted">Btach 5</p>
                                                <p className="card-text text-muted  text-sm-start"><i className="bi bi-buildings"></i> Company</p>
                                                <a href="#" className="btn btn-outline-primary btn-sm me-1 mb-1"><i className="bi bi-send-fill"></i>&nbsp;Message</a>
                                                <a href="#" className="btn btn-outline-warning btn-sm me-1 mb-1 "><i className="bi bi-envelope"></i>&nbsp;Mail</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6 col-sm-4 col-md-3">
                                        <div className="card w-100  m-1">
                                            <div className="w-100 d-flex justify-content-center">
                                                <img src={avatar} className="card-img-top w-50" alt="..." />
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">Vikas Joshi</h5>
                                                <p className="text-muted">Btach 5</p>
                                                <p className="card-text text-muted  text-sm-start"><i className="bi bi-buildings"></i> Company</p>
                                                <a href="#" className="btn btn-outline-primary btn-sm me-1 mb-1"><i className="bi bi-send-fill"></i>&nbsp;Message</a>
                                                <a href="#" className="btn btn-outline-warning btn-sm  me-1 mb-1"><i className="bi bi-envelope"></i>&nbsp;Mail</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6 col-sm-4 col-md-3">
                                        <div className="card w-100 m-1">
                                            <div className="w-100 d-flex justify-content-center">
                                                <img src={avatar} className="card-img-top w-50" alt="..." />
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">Vikas Joshi</h5>
                                                <p className="text-muted">Btach 5</p>
                                                <p className="card-text text-muted  text-sm-start"><i className="bi bi-buildings"></i> Company</p>
                                                <a href="#" className="btn btn-outline-primary btn-sm me-1 mb-1"><i className="bi bi-send-fill"></i>&nbsp;Message</a>
                                                <a href="#" className="btn btn-outline-warning btn-sm me-1 mb-1"><i className="bi bi-envelope"></i>&nbsp;Mail</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- ------------------------------------Total Plaements Ends-----------------------------------------------> */}

                            {/* <!-- ---------------------------------_Add Questions-------------------------- --> */}
                            <div className="tab-pane fade" id="v-pills-addquestions" role="tabpanel"
                                aria-labelledby="v-pills-addquestions-tab">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav">
                                    <div className="container-fluid">
                                        <div className="d-flex align-items-center ">
                                            <a className="navbar-brand" href="#"><img width="100px"
                                                src={logo} alt="" /></a>
                                            <h2 className="h2 ms-2"><i className="bi bi-patch-question-fill"></i> &nbsp; Add Questions</h2>
                                        </div>
                                        <div className="d-flex align-items-center  me-2 ">
                                            <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                            <button type="button" className="btn btn-outline-danger position-relative btn-sm">
                                                <i className="bi bi-bell-fill"></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    5
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </nav>

                                <div className="w-100 d-flex align-items-center justify-content-center" id="Upload-questions-m">
                                    <form className="w-100 d-flex align-items-center justify-content-center flex-column ">
                                        <div className="w-75 " id="Upload-questions">
                                            <input type="file" name="" value="" />
                                            <h1 className="h1 text-center text-white"><i className="bi bi-cloud-upload"></i></h1>
                                            <h3 className="h3 text-center text-white"><br /> Drag & drop your excel file. </h3>
                                        </div>
                                        {/* <!-- ==================================================== --> */}
                                        <input type="submit" className="btn btn-sm  btn-outline-success w-75 mt-2 " name="" value="Upload" />
                                    </form>
                                </div>
                            </div>
                            {/* <!-- ---------------------------------_Add Questions Ends-------------------------- --> */}

                            {/* <!-- -----------------------------View Result----------------------------------------- --> */}
                            <div className="tab-pane fade" id="v-pills-viewresult" role="tabpanel"
                                aria-labelledby="v-pills-viewresult-tab">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav">
                                    <div className="container-fluid">
                                        <div className="d-flex align-items-center ">
                                            <a className="navbar-brand" href="#"><img width="100px"
                                                src={logo} alt="" /></a>
                                            <h2 className="h2 ms-2"><i className="bi bi-graph-up-arrow"></i>&nbsp;Result</h2>
                                        </div>

                                        <div className="d-flex align-items-center  me-2 ">
                                            <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                            <button type="button" className="btn btn-outline-danger position-relative btn-sm">
                                                <i className="bi bi-bell-fill"></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    5
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </nav>
                                <div className="row m-0 p-2 w-100">
                                    <div className="col-6 col-sm-6 col-md-3">
                                        <div className="alert alert-info p-2 d-flex" role="alert">
                                            <div className="d-flex align-items-center ">
                                                <h1 className="h1"><i className="bi bi-person"></i></h1>
                                            </div>
                                            <div className="ms-2">
                                                <p className="m-0">Total Students</p>
                                                <h4>500</h4>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6 col-sm-6 col-md-3">
                                        <div className="alert alert-success p-2 d-flex" role="alert">
                                            <div className="d-flex align-items-center ">
                                                <h1 className="h1"><i className="bi bi-clipboard2-data"></i></h1>
                                            </div>
                                            <div className="ms-2">
                                                <p className="m-0">Total Passed</p>
                                                <h4>356</h4>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6 col-sm-6 col-md-3">
                                        <div className="alert alert-warning p-2 d-flex" role="alert">
                                            <div className="d-flex align-items-center ">
                                                <h1 className="h1"><i className="bi bi-person-exclamation"></i></h1>
                                            </div>
                                            <div className="ms-2">
                                                <p className="m-0">Total Absent</p>
                                                <h4>30</h4>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6 col-sm-6 col-md-3">
                                        <div className="alert alert-danger p-2 d-flex" role="alert">
                                            <div className="d-flex align-items-center ">
                                                <h1 className="h1"><i className="bi bi-exclamation-circle"></i></h1>
                                            </div>
                                            <div className="ms-2">
                                                <p className="m-0">Total Failed</p>
                                                <h4>40</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-3 mb-2">
                                        <select className="form-control-sm w-100">
                                            <option value="null">Select by Status</option>
                                            <option value="null">All</option>
                                            <option value="null">Passed</option>
                                            <option value="null">Failed</option>
                                            <option value="null">Absent</option>
                                        </select>
                                    </div>

                                    <div className="col-12 col-sm-6 col-md-3 mb-2">
                                        <select className="form-control-sm w-100">
                                            <option value="null">Select by Degree</option>
                                            <option value="null">B-Tech</option>
                                            <option value="null">Bca</option>
                                            <option value="null">Msc</option>
                                            <option value="null">Mca</option>
                                        </select>

                                    </div>


                                    <div className="col-12 col-sm-6 col-md-3 mb-2">
                                        <button className="btn btn-outline-success btn-sm w-100 " type="button">To Excel &nbsp;
                                            <i className="fa-solid fa-table"></i></button>
                                    </div>



                                    <div className="col-12 col-sm-6 col-md-3">
                                        <div className="btn-group w-75 " role="group" aria-label="Basic example">
                                            <input className="form-control-sm" placeholder="Search Here" type="text" name="" value="" />
                                            <button type="button" className="btn btn-outline-primary btn-sm"><i className="bi bi-search"></i></button>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-100 p-2 dashBorad-table-div ">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Degree</th>
                                                <th>Percent</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>John Doe</td>
                                                <td>johndoe@example.com</td>
                                                <td>B Tech</td>
                                                <td>85%</td>
                                                <td><span className="badge bg-success">Passed</span></td>
                                            </tr>
                                            <tr>
                                                <td>Jane Smith</td>
                                                <td>janesmith@example.com</td>
                                                <td>BCA</td>
                                                <td>72%</td>
                                                <td><span className="badge bg-success">Passed</span></td>
                                            </tr>
                                            <tr>
                                                <td>William Turner</td>
                                                <td>williamturner@example.com</td>
                                                <td>BCA</td>
                                                <td>null</td>
                                                <td><span className="badge bg-warning">Absent</span></td>
                                            </tr>
                                            <tr>
                                                <td>Mike Johnson</td>
                                                <td>mikejohnson@example.com</td>
                                                <td>MCA</td>
                                                <td>60%</td>
                                                <td><span className="badge bg-danger">Failed</span></td>
                                            </tr>
                                            <tr>
                                                <td>Susan Brown</td>
                                                <td>susanbrown@example.com</td>
                                                <td>MSc</td>
                                                <td>93%</td>
                                                <td><span className="badge bg-success">Passed</span></td>
                                            </tr>
                                            <tr>
                                                <td>Robert Lee</td>
                                                <td>robertlee@example.com</td>
                                                <td>BSc</td>
                                                <td>78%</td>
                                                <td><span className="badge bg-success">Passed</span></td>
                                            </tr>
                                            <tr>
                                                <td>Lisa Wilson</td>
                                                <td>lisawilson@example.com</td>
                                                <td>B Tech</td>
                                                <td>45%</td>
                                                <td><span className="badge bg-danger">Failed</span></td>
                                            </tr>
                                            <tr>
                                                <td>Michael Adams</td>
                                                <td>michaeladams@example.com</td>
                                                <td>B Tech</td>
                                                <td>null </td>
                                                <td><span className="badge bg-warning">Absent</span></td>
                                            </tr>
                                            <tr>
                                                <td>Daniel Clark</td>
                                                <td>danielclark@example.com</td>
                                                <td>BCA</td>
                                                <td>88%</td>
                                                <td><span className="badge bg-success">Passed</span></td>
                                            </tr>
                                            <tr>
                                                <td>Emily White</td>
                                                <td>emilywhite@example.com</td>
                                                <td>MCA</td>
                                                <td>65%</td>
                                                <td><span className="badge bg-danger">Failed</span></td>
                                            </tr>
                                            <tr>
                                                <td>James Turner</td>
                                                <td>jamesturner@example.com</td>
                                                <td>MSc</td>
                                                <td>77%</td>
                                                <td><span className="badge bg-success">Passed</span></td>
                                            </tr>
                                            <tr>
                                                <td>Amy Davis</td>
                                                <td>amydavis@example.com</td>
                                                <td>BSc</td>
                                                <td>90%</td>
                                                <td><span className="badge bg-success">Passed</span></td>
                                            </tr>
                                            <tr>
                                                <td>Sarah Wilson</td>
                                                <td>sarahwilson@example.com</td>
                                                <td>MCA</td>
                                                <td>null </td>
                                                <td><span className="badge bg-warning">Absent</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* <!-- -----------------------------View Result Ends----------------------------------------- --> */}

                            {/* <!-- --------------------------------------------Send Message--------------------------------------- --> */}
                            <div className="tab-pane fade" id="v-pills-sendmessage" role="tabpanel"
                                aria-labelledby="v-pills-sendmessage-tab">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav">
                                    <div className="container-fluid">
                                        <div className="d-flex align-items-center ">
                                            <a className="navbar-brand" href="#"><img width="100px"
                                                src={logo} alt="" /></a>
                                            <h2 className="h2 ms-2"><i className="bi bi-send-fill"></i>&nbsp;Send Message</h2>
                                        </div>
                                        <div className="d-flex align-items-center  me-2 ">
                                            <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                            <button type="button" className="btn btn-outline-danger position-relative btn-sm">
                                                <i className="bi bi-bell-fill"></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    5
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </nav>


                                <div className="row w-100  m-0  p-0 ">

                                    <div className="col-12 col-sm-6 col-md-2 mb-2">
                                        <select className="form-control-sm w-100">
                                            <option value="">Select by Gender</option>
                                            <option value="">All</option>
                                            <option value="">Male</option>
                                            <option value="">Female</option>
                                        </select>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-2 mb-2">
                                        <select className="form-control-sm w-100">
                                            <option value="">Select by Batch</option>
                                            <option value="">All</option>
                                            <option value="">Batch 1</option>
                                            <option value="">Batch 2</option>
                                            <option value="">Batch 3</option>
                                            <option value="">Batch 4</option>
                                            <option value="">Batch 5</option>
                                        </select>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-2 mb-2">
                                        <select className="form-control-sm w-100">
                                            <option value="">Select by Company</option>
                                            <option value="">All</option>
                                            <option value="">Company 1</option>
                                            <option value="">Company 2</option>
                                            <option value="">Company 3</option>
                                            <option value="">Company 4</option>
                                            <option value="">Company 5</option>
                                        </select>
                                    </div>
                                    <div className="col-6 col-sm-6 col-md-2 mb-2">
                                        <button className="btn btn-outline-success btn-sm w-100 " type="button">To Excel &nbsp; <i
                                            className="fa-solid fa-table"></i></button>
                                    </div>

                                    <div className="col-6 col-sm-3 col-md-4 mb-2 d-flex justify-content-center">
                                        <div className="btn-group " role="group" aria-label="Basic example">
                                            <input className="form-control-sm" placeholder="Search Here" type="text" name="" value="" />
                                            <button type="button" className="btn btn-outline-primary btn-sm"><i className="bi bi-search"></i></button>
                                        </div>
                                    </div>
                                </div>

                                <div className="dashBorad-table-div p-2">
                                    <table className="table table-hover table-sm">
                                        <thead className="bg-light ">
                                            <tr>
                                                <th>SNo</th>
                                                <th>Name</th>
                                                <th>Age</th>
                                                <th>Email</th>
                                                <th>Phone Number</th>
                                                <th>Degree</th>
                                                <th>Batch Number</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>John Doe</td>
                                                <td>22</td>
                                                <td>johndoe@example.com</td>
                                                <td>(123) 456-7890</td>
                                                <td>Computer Science</td>
                                                <td>Batch 2021</td>
                                                <td>
                                                    <button className="btn btn-outline-primary btn-sm">
                                                        <i className="bi bi-send-fill"></i>&nbsp;Message
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Jane Smith</td>
                                                <td>20</td>
                                                <td>janesmith@example.com</td>
                                                <td>(987) 654-3210</td>
                                                <td>Engineering</td>
                                                <td>Batch 2022</td>
                                                <td>
                                                    <button className="btn btn-outline-primary btn-sm">
                                                        <i className="bi bi-send-fill"></i>&nbsp;Message
                                                    </button>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>3</td>
                                                <td>Alice Johnson</td>
                                                <td>21</td>
                                                <td>alicejohnson@example.com</td>
                                                <td>(555) 555-5555</td>
                                                <td>Mathematics</td>
                                                <td>Batch 2023</td>
                                                <td>
                                                    <button className="btn btn-outline-primary btn-sm">
                                                        <i className="bi bi-send-fill"></i>&nbsp;Message
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>Bob Wilson</td>
                                                <td>23</td>
                                                <td>bobwilson@example.com</td>
                                                <td>(777) 777-7777</td>
                                                <td>Physics</td>
                                                <td>Batch 2020</td>
                                                <td>
                                                    <button className="btn btn-outline-primary btn-sm">
                                                        <i className="bi bi-send-fill"></i>&nbsp;Message
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>Eva Brown</td>
                                                <td>19</td>
                                                <td>evabrown@example.com</td>
                                                <td>(111) 222-3333</td>
                                                <td>Chemistry</td>
                                                <td>Batch 2024</td>
                                                <td>
                                                    <button className="btn btn-outline-primary btn-sm">
                                                        <i className="bi bi-send-fill"></i>&nbsp;Message
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>Max Smith</td>
                                                <td>24</td>
                                                <td>maxsmith@example.com</td>
                                                <td>(444) 444-4444</td>
                                                <td>Biology</td>
                                                <td>Batch 2019</td>
                                                <td>
                                                    <button className="btn btn-outline-primary btn-sm">
                                                        <i className="bi bi-send-fill"></i>&nbsp;Message
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>Lisa Davis</td>
                                                <td>22</td>
                                                <td>lisadavis@example.com</td>
                                                <td>(777) 888-9999</td>
                                                <td>History</td>
                                                <td>Batch 2022</td>
                                                <td>
                                                    <button className="btn btn-outline-primary btn-sm">
                                                        <i className="bi bi-send-fill"></i>&nbsp;Message
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>8</td>
                                                <td>Michael Adams</td>
                                                <td>21</td>
                                                <td>michaeladams@example.com</td>
                                                <td>(222) 333-4444</td>
                                                <td>Psychology</td>
                                                <td>Batch 2023</td>
                                                <td>
                                                    <button className="btn btn-outline-primary btn-sm">
                                                        <i className="bi bi-send-fill"></i>&nbsp;Message
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>9</td>
                                                <td>Sophia White</td>
                                                <td>20</td>
                                                <td>sophiawhite@example.com</td>
                                                <td>(333) 444-5555</td>
                                                <td>Sociology</td>
                                                <td>Batch 2022</td>
                                                <td>
                                                    <button className="btn btn-outline-primary btn-sm">
                                                        <i className="bi bi-send-fill"></i>&nbsp;Message
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>10</td>
                                                <td>William Green</td>
                                                <td>22</td>
                                                <td>williamgreen@example.com</td>
                                                <td>(888) 999-0000</td>
                                                <td>Economics</td>
                                                <td>Batch 2021</td>
                                                <td>
                                                    <button className="btn btn-outline-primary btn-sm">
                                                        <i className="bi bi-send-fill"></i>&nbsp;Message
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>11</td>
                                                <td>Olivia Black</td>
                                                <td>25</td>
                                                <td>oliviablack@example.com</td>
                                                <td>(555) 555-5555</td>
                                                <td>Art History</td>
                                                <td>Batch 2018</td>
                                                <td>
                                                    <button className="btn btn-outline-primary btn-sm">
                                                        <i className="bi bi-send-fill"></i>&nbsp;Message
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>12</td>
                                                <td>Henry Turner</td>
                                                <td>24</td>
                                                <td>henryturner@example.com</td>
                                                <td>(777) 777-7777</td>
                                                <td>Political Science</td>
                                                <td>Batch 2019</td>
                                                <td>
                                                    <button className="btn btn-outline-primary btn-sm">
                                                        <i className="bi bi-send-fill"></i>&nbsp;Message
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>13</td>
                                                <td>Emma White</td>
                                                <td>21</td>
                                                <td>emmawhite@example.com</td>
                                                <td>(111) 222-3333</td>
                                                <td>Chemistry</td>
                                                <td>Batch 2023</td>
                                                <td>
                                                    <button className="btn btn-outline-primary btn-sm">
                                                        <i className="bi bi-send-fill"></i>&nbsp;Message
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>14</td>
                                                <td>Andrew Taylor</td>
                                                <td>23</td>
                                                <td>andrewtaylor@example.com</td>
                                                <td>(444) 444-4444</td>
                                                <td>History</td>
                                                <td>Batch 2020</td>
                                                <td>
                                                    <button className="btn btn-outline-primary btn-sm">
                                                        <i className="bi bi-send-fill"></i>&nbsp;Message
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>15</td>
                                                <td>Liam Wilson</td>
                                                <td>22</td>
                                                <td>liamwilson@example.com</td>
                                                <td>(555) 555-5555</td>
                                                <td>Physics</td>
                                                <td>Batch 2021</td>
                                                <td>
                                                    <button className="btn btn-outline-primary btn-sm">
                                                        <i className="bi bi-send-fill"></i>&nbsp;Message
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* <!-- --------------------------------------------Send Message Ends--------------------------------------- --> */}

                            {/* <!-- --------------------------------Schedule Exam ------------------------------------ --> */}
                            <div className="tab-pane fade" id="v-pills-scheduleexam" role="tabpanel"
                                aria-labelledby="v-pills-scheduleexam-tab">
                                <div className="row  w-100 m-0">
                                    <div className="col-12 col-md-6">
                                        <div className="mt-5 mb-3 w-100"
                                            style={{ borderRadius: "40px", overflow: "hidden", border: "1px solid black", width: "55%", boxShadow: "1px 1px 4px" }}>
                                            <div className="text-center"
                                                style={{ height: "5vw", borderRadius: "50px 50px 0px 50px", backgroundColor: "red" }}>
                                                <div style={{ fontSize: "2rem", color: "white" }}>Exam Schedule Form
                                                </div>
                                            </div>
                                            <div className="d-block p-4" style={{ textAlign: "center" }}>
                                                <form action="">
                                                    <input className="m-3 text-center form-control" type="text" name="examtitle" id="examtitle"
                                                        placeholder="Enter Exam Title" /><br />
                                                    <input className="m-3 text-center form-control" type="date" name="examdate" id="examdate"
                                                        placeholder="Enter examdate" /><br />
                                                    <input className="m-3 text-center form-control" type="time" name="Examtime" id="examtime"
                                                        placeholder="Enter time" /><br />
                                                    <input className="m-3 text-center form-control" type="number" name="examduration"
                                                        id="examduration" placeholder="Enter Exam Duration" /><br />
                                                    <input className="m-3 text-center form-control" type="text" name="examcenter" id="examcenter"
                                                        placeholder="Enter Exam center" /><br />
                                                    <input className="m-4 mt-5 text-center form-control" type="submit" value="EXAM SCHEDULED" />
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6 ">
                                        <div className="mt-5 mb-3 w-100"
                                            style={{ borderRadius: "40px", overflow: "hidden", border: " 1px solid black", width: "55%", boxShadow: " 1px 1px 4px" }}>
                                            <div className="text-center"
                                                style={{ height: "5vw", borderRadius: "50px 50px 0px 50px", backgroundColor: "red" }}>
                                                <div style={{ fontSize: "2rem", color: "white" }}>Shift Schedule Form
                                                </div>
                                            </div>
                                            <div className="d-block p-4" style={{ textAlign: "center" }}>
                                                <form action="">
                                                    <input className="m-3 text-center form-control" type="number" name="shiftid" id="shiftid"
                                                        placeholder="Enter Shift id" /><br />
                                                    <input className="m-3 text-center form-control" type="number" name="shiftnumber" id="shiftnumber"
                                                        placeholder="Enter Shift number" /><br />
                                                    <input className="m-3 text-center form-control" type="number" name="shiftcandidate"
                                                        id="shiftcandidate" placeholder="Enter Shift Candidate" /><br />
                                                    <input className="m-3 text-center form-control" type="number" name="shiftstarttime"
                                                        id="shiftstarttime" placeholder="Enter Shift Start Time" /><br />
                                                    <input className="m-3 text-center form-control" type="number" name="shiftendtime"
                                                        id="shiftendtime" placeholder="Enter Shift End Time" /><br />
                                                    <input className="m-4 mt-5 text-center form-control" type="submit" value="Login" />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- --------------------------------Schedule Exam Ends------------------------------------ --> */}

                            {/* <!--------------------------------------Students Records----------------------------------> */}
                            <div className="tab-pane fade mb-2 ms-2 pt-2" id="v-pills-studentrecord" role="tabpanel"
                                aria-labelledby="v-pills-studentrecord-tab p-2">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav">
                                    <div className="container-fluid">
                                        <div className="d-flex align-items-center ">
                                            <a className="navbar-brand" href="#"><img width="100px"
                                                src={logo} alt="" /></a>
                                            <h2 className="h2 ms-2"> <i className="fa-solid fa-graduation-cap"></i> &nbsp; Student Records</h2>
                                        </div>
                                        <div className="d-flex align-items-center  me-2 ">
                                            <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                            <button type="button" className="btn btn-outline-danger position-relative btn-sm">
                                                <i className="bi bi-bell-fill"></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    5
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </nav>
                                <div className="row w-100 m-0 ">
                                    <div className="col-12  col-md-3 p-2">
                                        <select className="form-control-sm w-100">
                                            <option value="null">Select Gender</option>
                                            <option value="null">Male</option>
                                            <option value="null">Female</option>
                                            <option value="null">All</option>
                                        </select>
                                    </div>
                                    <div className="col-12  col-md-3 p-2">
                                        <select className="form-control-sm w-100">
                                            <option value="null">Select Batch</option>
                                            <option value="null">Batch 1</option>
                                            <option value="null">Batch 2</option>
                                            <option value="null">Batch 3</option>
                                        </select>
                                    </div>
                                    <div className="col-12  col-md-6 p-2">
                                        <div className="row">
                                            <div className="col-4   d-flex justify-content-end ">
                                                <button className="btn btn-outline-success btn-sm w-100 " type="button">To Excel &nbsp; <i
                                                    className="fa-solid fa-table"></i></button>
                                            </div>
                                            <div className="col-8 d-flex justify-content-end">
                                                <div className="btn-group " role="group" aria-label="Basic example">
                                                    <input className="form-control-sm" placeholder="Search Here" type="text" name="" value="" />
                                                    <button type="button" className="btn btn-outline-primary btn-sm"><i
                                                        className="bi bi-search"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-100 dashBorad-table-div ps-2 pe-2">
                                    <table className="table  table-hover table-sm table-responsive-md">
                                        <thead className="sticky-top">
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone Number</th>
                                                <th>City</th>
                                                <th>Degree</th>
                                                <th>Age</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>John Doe</td>
                                                <td>johndoe@example.com</td>
                                                <td>(123) 456-7890</td>
                                                <td>New York</td>
                                                <td>Bachelor's</td>
                                                <td>20</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>John Cena</td>
                                                <td>johncena@example.com</td>
                                                <td>(123) 456-7890</td>
                                                <td>New York</td>
                                                <td>Bachelor's</td>
                                                <td>22</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Bob Johnson</td>
                                                <td>bobj@example.com</td>
                                                <td>(789) 123-4567</td>
                                                <td>Chicago</td>
                                                <td>Bachelor's</td>
                                                <td>22</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>Alice Wilson</td>
                                                <td>alicew@example.com</td>
                                                <td>(234) 567-8901</td>
                                                <td>Houston</td>
                                                <td>Ph.D.</td>
                                                <td>28</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>David Brown</td>
                                                <td>davidb@example.com</td>
                                                <td>(567) 890-1234</td>
                                                <td>Miami</td>
                                                <td>Bachelor's</td>
                                                <td>21</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>Susan Lee</td>
                                                <td>susanl@example.com</td>
                                                <td>(890) 123-4567</td>
                                                <td>San Francisco</td>
                                                <td>Master's</td>
                                                <td>27</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>Michael Taylor</td>
                                                <td>michaelt@example.com</td>
                                                <td>(123) 456-7890</td>
                                                <td>Seattle</td>
                                                <td>Bachelor's</td>
                                                <td>23</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>8</td>
                                                <td>Linda Clark</td>
                                                <td>lindac@example.com</td>
                                                <td>(456) 789-1234</td>
                                                <td>Boston</td>
                                                <td>Master's</td>
                                                <td>26</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>9</td>
                                                <td>William Adams</td>
                                                <td>williama@example.com</td>
                                                <td>(789) 123-4567</td>
                                                <td>Dallas</td>
                                                <td>Bachelor's</td>
                                                <td>24</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>10</td>
                                                <td>Karen Hall</td>
                                                <td>karenh@example.com</td>
                                                <td>(234) 567-8901</td>
                                                <td>Philadelphia</td>
                                                <td>Ph.D.</td>
                                                <td>29</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>11</td>
                                                <td>Mary Adams</td>
                                                <td>marya@example.com</td>
                                                <td>(567) 890-2345</td>
                                                <td>San Diego</td>
                                                <td>Bachelor's</td>
                                                <td>22</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>12</td>
                                                <td>James Brown</td>
                                                <td>jamesb@example.com</td>
                                                <td>(890) 123-5678</td>
                                                <td>Denver</td>
                                                <td>Master's</td>
                                                <td>27</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>13</td>
                                                <td>Laura Carter</td>
                                                <td>laurac@example.com</td>
                                                <td>(123) 456-6789</td>
                                                <td>Phoenix</td>
                                                <td>Bachelor's</td>
                                                <td>24</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>14</td>
                                                <td>Richard Davis</td>
                                                <td>richardd@example.com</td>
                                                <td>(456) 789-2345</td>
                                                <td>Atlanta</td>
                                                <td>Ph.D.</td>
                                                <td>31</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>15</td>
                                                <td>Sarah Evans</td>
                                                <td>sarahe@example.com</td>
                                                <td>(789) 123-5678</td>
                                                <td>Miami</td>
                                                <td>Master's</td>
                                                <td>28</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>16</td>
                                                <td>Thomas Foster</td>
                                                <td>thomasf@example.com</td>
                                                <td>(234) 567-7890</td>
                                                <td>Chicago</td>
                                                <td>Bachelor's</td>
                                                <td>25</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>17</td>
                                                <td>Emily Green</td>
                                                <td>emilyg@example.com</td>
                                                <td>(567) 890-3456</td>
                                                <td>Los Angeles</td>
                                                <td>Ph.D.</td>
                                                <td>30</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>18</td>
                                                <td>Robert Harris</td>
                                                <td>roberth@example.com</td>
                                                <td>(890) 123-6789</td>
                                                <td>New York</td>
                                                <td>Master's</td>
                                                <td>29</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>19</td>
                                                <td>Jennifer Jackson</td>
                                                <td>jenniferj@example.com</td>
                                                <td>(123) 456-7890</td>
                                                <td>San Francisco</td>
                                                <td>Bachelor's</td>
                                                <td>26</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>20</td>
                                                <td>Daniel King</td>
                                                <td>danielk@example.com</td>
                                                <td>(456) 789-3456</td>
                                                <td>Houston</td>
                                                <td>Ph.D.</td>
                                                <td>32</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* <!--------------------------------------Students Records Ends----------------------------------> */}
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}