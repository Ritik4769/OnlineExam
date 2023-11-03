// import React from 'react';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../Images/InfoBeans Foundation Logo - PNG (1).png';
import avatar from '../Images/man-with-beard-avatar-character-isolated-icon-free-vector.jpg';
var examid;
var EnrollIDs = [];
export default function AdminModule() {
    const history = useNavigate();
    const [exam, setUser] = useState({
        examTitle: '',
        examDate: '',
        examDuration: '',
        examVenue: '',
    });

    const [schedule, setUser1] = useState({
        shiftNumber: '',
        maxCandidates: '',
        shiftTimeFrom: '',
        shiftTimeTo: ''
    });

    const [uploadQuestion, setUser2] = useState({
        questionFile: '',
        questionFile2: ''

    });

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...exam, [name]: value });
        console.log(name)
        console.log(value)
    };

    const handleInputs2 = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser1({ ...schedule, [name]: value });
        console.log(name);
        console.log(value);
    };

    const handleInputs3 = (e,) => {
        const name = e.target.name;
        const file = e.target.files[0];
        setUser2({ ...uploadQuestion, [name]: file });
        console.log(uploadQuestion);
        console.log("file name : ", file);
        console.log("file: ", file);
    };

    const createExam = async (e) => {
        if (e) {
            e.preventDefault();
        }
        console.log("in createExam");

        console.log(exam);
        const { examTitle, examDate, examDuration, examVenue } = exam;
        console.log(examTitle);
        //my
        try {
            axios.post('http://localhost:3002/admin/exams', exam).then((response) => {

                console.log("result", response);
                if (response.status === 201) {
                    const responseData = response.data;
                    const newExam = responseData.newExam;
                    examid = newExam._id;
                    console.log(examid);
                    console.log(newExam);
                    console.log('component caling');
                    EnrollIDs = responseData.EnrollIDs;
                    console.log(EnrollIDs);
                    
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

    const createSchedule = async (e) => {
        if (e) {
            e.preventDefault();
        }
        console.log("in createSchedule");

        console.log(schedule);
        const { shiftNumber, maxCandidates, shiftTimeFrom, shiftTimeTo } = schedule;
        console.log(shiftNumber);
        console.log(examid);
        //my
        try {
            axios.post(`http://localhost:3002/admin/shifts/${examid}`, schedule).then((response) => {

                console.log("result", response);
                if (response.status === 201) {
                    console.log('component caling');
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

    const UploadQuestion = async (e) => {
        if (e) {
            e.preventDefault();
        }
        console.log("in upload question", uploadQuestion);
        const formData = new FormData();
        formData.append('questionFile', uploadQuestion.questionFile);
        console.log(uploadQuestion);
        const { questionFile } = uploadQuestion;
        console.log("path  : ", questionFile);
        console.log("form data :", formData);
        //my
        try {
            axios.post('http://localhost:3002/admin/uploadQuestionFile', formData).then((result) => {
                console.log(result);
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
            <div className="w-100 " >
                <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                        <h5 id="offcanvasRightLabel">Offcanvas right</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <div className="nav flex-column justify-content-around nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <button className="nav-link bg-transparent text-danger" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true" >Home b</button>
                            <button className="nav-link bg-transparent text-danger" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-registrations" role="tab" aria-controls="v-pills-registrations" aria-selected="false">View Registration</button>
                            <button className="nav-link bg-transparent text-danger" id="v-pills-totalplacements-tab" data-bs-toggle="pill" data-bs-target="#v-pills-totalplacements" role="tab" aria-controls="v-pills-totalplacements" aria-selected="false">Total Placements</button>
                            <button className="nav-link bg-transparent text-danger" id="v-pills-addquestions-tab" data-bs-toggle="pill" data-bs-target="#v-pills-addquestions" role="tab" aria-controls="v-pills-addquestions" aria-selected="false">Add Questions</button>
                            <button className="nav-link bg-transparent text-danger" id="v-pills-viewresult-tab" data-bs-toggle="pill" data-bs-target="#v-pills-viewresult" role="tab" aria-controls="v-pills-viewresult" aria-selected="false">View Result</button>
                            <button className="nav-link bg-transparent text-danger" id="v-pills-sendmessage-tab" data-bs-toggle="pill" data-bs-target="#v-pills-sendmessage" role="tab" aria-controls="v-pills-sendmessage" aria-selected="false">Send Megssage</button>
                            <button className="nav-link bg-transparent text-danger" id="v-pills-scheduleexam-tab" data-bs-toggle="pill" data-bs-target="#v-pills-scheduleexam" role="tab" aria-controls="v-pills-scheduleexam" aria-selected="false">Sechedule Exam</button>
                            <button className="nav-link bg-transparent text-danger" id="v-pills-studentrecord-tab" data-bs-toggle="pill" data-bs-target="#v-pills-studentrecord" role="tab" aria-controls="v-pills-studentrecord" aria-selected="false">Student Record</button>
                        </div>
                    </div>
                </div>


                <nav className="navbar navbar-expand-lg navbar-light bg-light" id="dashBoardNav">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#"><img width="100px" src={logo} alt="" /></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                        </div>
                    </div>
                </nav>

                <div className="row w-100  m-0  p-0  " style={{ height: "min-content" }}>
                    <div className="col-2 p-0" id="nav-pills-disapear"   >
                        <div style={{ height: "100vh" }} className=" bg-dark nav flex-column justify-content-around nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <div className="" >
                                <div className=" w-100 p-4 m-0 d-flex justify-content-center " >
                                    <img className="img fa-circle w-50  " src={avatar} alt="" />
                                </div>
                                <center className="text-light small text-break  " >Ayush Rajput</center>
                                <center className="text-light small text-break  " >ayush.rajput@infobeansfoundation.com</center>
                            </div>
                            <button className="section-tab  nav-link  text-light active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home tab</button>
                            <button className="section-tab  nav-link  text-light" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-registrations" role="tab" aria-controls="v-pills-registrations" aria-selected="false">View Registration</button>
                            <button className="section-tab  nav-link  text-light" id="v-pills-totalplacements-tab" data-bs-toggle="pill" data-bs-target="#v-pills-totalplacements" role="tab" aria-controls="v-pills-totalplacements" aria-selected="false">Total Placements</button>
                            <button className="section-tab  nav-link  text-light" id="v-pills-addquestions-tab" data-bs-toggle="pill" data-bs-target="#v-pills-addquestions" role="tab" aria-controls="v-pills-addquestions" aria-selected="false">Add Questions</button>
                            <button className="section-tab  nav-link  text-light" id="v-pills-viewresult-tab" data-bs-toggle="pill" data-bs-target="#v-pills-viewresult" role="tab" aria-controls="v-pills-viewresult" aria-selected="false">View Result</button>
                            <button className="section-tab  nav-link  text-light" id="v-pills-sendmessage-tab" data-bs-toggle="pill" data-bs-target="#v-pills-sendmessage" role="tab" aria-controls="v-pills-sendmessage" aria-selected="false">Send Megssage</button>
                            <button className="section-tab  nav-link  text-light" id="v-pills-scheduleexam-tab" data-bs-toggle="pill" data-bs-target="#v-pills-scheduleexam" role="tab" aria-controls="v-pills-scheduleexam" aria-selected="false">Sechedule Exam</button>
                            <button className="section-tab  nav-link  text-light" id="v-pills-studentrecord-tab" data-bs-toggle="pill" data-bs-target="#v-pills-studentrecord" role="tab" aria-controls="v-pills-studentrecord" aria-selected="false">Student Record</button>
                        </div>
                    </div>
                    <div className="col-12 col-lg-10 p-0 ">
                        <div className="tab-content p-0" id="v-pills-tabContent">
                            <div className="tab-pane fade show active bg-danger m-0" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                Home Big
                            </div>
                            {/* <!-- ---------------------Regestrations Section--------------------------------- --> */}
                            <div className="tab-pane fade pt-2" id="v-pills-registrations" role="tabpanel" aria-labelledby="v-pills-registrations-tab">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light" >
                                    <div className="container-fluid">
                                        <div className="d-flex align-items-center " >
                                            <a className="navbar-brand" href="#"><img width="100px" src={logo} alt="" /></a>
                                            <h2 className="h2 ms-2"> <i className="fa-regular fa-address-card"></i> Total Registrations Big</h2>
                                        </div>
                                    </div>
                                </nav>
                                {/* <!-- --------------------------Filter Section--------------------------- --> */}
                                <div className="row w-100 m-0 ">
                                    <div className="col-12  col-md-3 p-2" >
                                        <select className="form-control" >
                                            <option value="null">Select Gender</option>
                                            <option value="null">Male</option>
                                            <option value="null">Female</option>
                                            <option value="null">All</option>
                                        </select>
                                    </div>
                                    <div className="col-12  col-md-3 p-2" >
                                        <select className="form-control" >
                                            <option value="null">Select by Sections</option>
                                            <option value="null">View All</option>
                                            <option value="null">Section  1</option>
                                            <option value="null">Section 2</option>
                                            <option value="null">Section 3</option>
                                            <option value="null">Section 1 & 2</option>
                                            <option value="null">Section 2 & 3</option>
                                            <option value="null">Section 3 & 1</option>
                                        </select>
                                    </div>
                                    <div className="col-12  col-md-6 p-2" >
                                        <div className="row">
                                            <div className="col-4  d-flex justify-content-end" >
                                                <button className="btn btn-success " type="button">To Excel &nbsp; <i className="fa-solid fa-table"></i></button>
                                            </div>
                                            <div className="col-8" >
                                                <div className="btn-group w-100" role="group" aria-label="Basic example">
                                                    <input className="form-control" placeholder="Search Here" type="text" name="" value="" />
                                                    <button type="button" className="btn btn-primary">Search</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- --------------------------Filter SectionEnds --------------------------- --> */}
                                <div className="w-100 dashBorad-table-div ps-2 pe-2">
                                    <table className="table table-danger table-hover table-responsive-md">
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
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>John Cena</td>
                                                <td>johncena@example.com</td>
                                                <td>(123) 456-7890</td>
                                                <td>New York</td>
                                                <td>Bachelor's</td>
                                                <td>22</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Bob Johnson</td>
                                                <td>bobj@example.com</td>
                                                <td>(789) 123-4567</td>
                                                <td>Chicago</td>
                                                <td>Bachelor's</td>
                                                <td>22</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>Alice Wilson</td>
                                                <td>alicew@example.com</td>
                                                <td>(234) 567-8901</td>
                                                <td>Houston</td>
                                                <td>Ph.D.</td>
                                                <td>28</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>David Brown</td>
                                                <td>davidb@example.com</td>
                                                <td>(567) 890-1234</td>
                                                <td>Miami</td>
                                                <td>Bachelor's</td>
                                                <td>21</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>Susan Lee</td>
                                                <td>susanl@example.com</td>
                                                <td>(890) 123-4567</td>
                                                <td>San Francisco</td>
                                                <td>Master's</td>
                                                <td>27</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>Michael Taylor</td>
                                                <td>michaelt@example.com</td>
                                                <td>(123) 456-7890</td>
                                                <td>Seattle</td>
                                                <td>Bachelor's</td>
                                                <td>23</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>8</td>
                                                <td>Linda Clark</td>
                                                <td>lindac@example.com</td>
                                                <td>(456) 789-1234</td>
                                                <td>Boston</td>
                                                <td>Master's</td>
                                                <td>26</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>9</td>
                                                <td>William Adams</td>
                                                <td>williama@example.com</td>
                                                <td>(789) 123-4567</td>
                                                <td>Dallas</td>
                                                <td>Bachelor's</td>
                                                <td>24</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>10</td>
                                                <td>Karen Hall</td>
                                                <td>karenh@example.com</td>
                                                <td>(234) 567-8901</td>
                                                <td>Philadelphia</td>
                                                <td>Ph.D.</td>
                                                <td>29</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>11</td>
                                                <td>Mary Adams</td>
                                                <td>marya@example.com</td>
                                                <td>(567) 890-2345</td>
                                                <td>San Diego</td>
                                                <td>Bachelor's</td>
                                                <td>22</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>12</td>
                                                <td>James Brown</td>
                                                <td>jamesb@example.com</td>
                                                <td>(890) 123-5678</td>
                                                <td>Denver</td>
                                                <td>Master's</td>
                                                <td>27</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>13</td>
                                                <td>Laura Carter</td>
                                                <td>laurac@example.com</td>
                                                <td>(123) 456-6789</td>
                                                <td>Phoenix</td>
                                                <td>Bachelor's</td>
                                                <td>24</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>14</td>
                                                <td>Richard Davis</td>
                                                <td>richardd@example.com</td>
                                                <td>(456) 789-2345</td>
                                                <td>Atlanta</td>
                                                <td>Ph.D.</td>
                                                <td>31</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>15</td>
                                                <td>Sarah Evans</td>
                                                <td>sarahe@example.com</td>
                                                <td>(789) 123-5678</td>
                                                <td>Miami</td>
                                                <td>Master's</td>
                                                <td>28</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>16</td>
                                                <td>Thomas Foster</td>
                                                <td>thomasf@example.com</td>
                                                <td>(234) 567-7890</td>
                                                <td>Chicago</td>
                                                <td>Bachelor's</td>
                                                <td>25</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>17</td>
                                                <td>Emily Green</td>
                                                <td>emilyg@example.com</td>
                                                <td>(567) 890-3456</td>
                                                <td>Los Angeles</td>
                                                <td>Ph.D.</td>
                                                <td>30</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>18</td>
                                                <td>Robert Harris</td>
                                                <td>roberth@example.com</td>
                                                <td>(890) 123-6789</td>
                                                <td>New York</td>
                                                <td>Master's</td>
                                                <td>29</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>19</td>
                                                <td>Jennifer Jackson</td>
                                                <td>jenniferj@example.com</td>
                                                <td>(123) 456-7890</td>
                                                <td>San Francisco</td>
                                                <td>Bachelor's</td>
                                                <td>26</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>20</td>
                                                <td>Daniel King</td>
                                                <td>danielk@example.com</td>
                                                <td>(456) 789-3456</td>
                                                <td>Houston</td>
                                                <td>Ph.D.</td>
                                                <td>32</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* <!-----------------------Regestrations Section Ends--------------------------------- --> */}
                            {/* <!-- </div> --> */}
                            <div className="tab-pane fade" id="v-pills-totalplacements" role="tabpanel" aria-labelledby="v-pills-totalplacements-tab">Total Placements ssss</div>



                            {/* <!-- ---------------------------------_Add Questions-------------------------- --> */}
                            <div className="tab-pane fade" id="v-pills-addquestions" role="tabpanel" aria-labelledby="v-pills-addquestions-tab">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light" >
                                    <div className="container-fluid">
                                        <div className="d-flex align-items-center " >
                                            <a className="navbar-brand" href="#"><img width="100px" src={logo} alt="" /></a>
                                            <h2 className="h2 ms-2"><i className="bi bi-patch-question-fill"></i> &nbsp; Add Questions</h2>
                                        </div>
                                        <div className="d-flex align-items-center  me-2 " >
                                            <button type="button" className="btn btn-primary position-relative">
                                                <i className="bi bi-bell-fill"></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    5
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </nav>

                                <div className="w-100 d-flex align-items-center justify-content-center" >
                                    <div className="row justify-content-center mt-5" style={{ border: "none", borderRadius: "20px", backgroundColor: "red", width: "70%" }}>
                                        <div className="col-md-12 text-center p-5 my-5">
                                            <h3>Upload files here</h3>
                                            <div className=" justify-content-center">
                                                <form action="" onSubmit={UploadQuestion} enctype="multipart/form-data" >
                                                    <img src="" alt="fileupload" height="120" /><br />
                                                    <input className="" type="file" name="questionFile" id="fileinput" onChange={(e) => handleInputs3(e, 'questionFile')} />
                                                    {/* <input className=" " type="file" name="questionFile2" id="fileinput2" onChange={(e) => handleInputs3(e, 'questionFile2')} /> */}
                                                    <label className="custom-file-label m-4" for="username"
                                                        id="fileNameLabel">
                                                        Upload Question
                                                    </label><br />
                                                    <input type="submit" className="btn btn-outline-danger w-50 mt-3"
                                                        data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                                        aria-expanded="true" aria-controls="collapseThree" value="submit"
                                                        style={{ height: "45px", color: "black" }} />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- ---------------------------------_Add Questions Ends-------------------------- --> */}

                            <div className="tab-pane fade" id="v-pills-viewresult" role="tabpanel" aria-labelledby="v-pills-viewresult-tab">View Result</div>



                            <div className="tab-pane fade" id="v-pills-sendmessage" role="tabpanel" aria-labelledby="v-pills-sendmessage-tab">Send Messages</div>

                            {/* <!-- --------------------------------Schedule Exam ------------------------------------ --> */}
                            <div className="tab-pane fade" id="v-pills-scheduleexam" role="tabpanel" aria-labelledby="v-pills-scheduleexam-tab">
                                <div className="row  w-100 m-0" >
                                    <div className="col-12 col-md-6" >
                                        <div className="mt-5 mb-3 w-100" style={{ borderRadius: "40px", overflow: " hidden", border: "1px solid black", width: "55%", boxShadow: "1px 1px 4px" }}>
                                            <div className="text-center"
                                                style={{ height: "5vw", borderRadius: "50px 50px 0px 50px", backgroundColor: "red" }}>
                                                <div style={{ fontSize: "2rem", color: "white" }}>Exam Schedule Form
                                                </div>
                                            </div>
                                            <div className="d-block p-4" style={{ textAlign: "center" }}>
                                                <form action="" onSubmit={createExam}>
                                                    <input className="m-3 text-center form-control" type="text" name="examTitle" onChange={handleInputs} value={exam.examTitle}
                                                        id="examtitle" placeholder="Enter Exam Title" /><br />
                                                    <input className="m-3 text-center form-control" type="date" name="examDate" id="examdate" onChange={handleInputs} value={exam.examDate}
                                                        placeholder="Enter examdate" /><br />
                                                    {/* <input className="m-3 text-center form-control" type="time" name="examtime" id="examtime" onChange={handleInputs} value={user.examDuration} */}
                                                    {/* placeholder="Enter time" /><br /> */}
                                                    <input className="m-3 text-center form-control" type="number" name="examDuration" onChange={handleInputs} value={exam.examDuration}
                                                        id="examduration" placeholder="Enter Exam Duration" /><br />
                                                    <input className="m-3 text-center form-control" type="text" name="examVenue" onChange={handleInputs} value={exam.examVenue}
                                                        id="examcenter" placeholder="Enter Exam center" /><br />
                                                    <input className="m-4 mt-5 text-center form-control" type="submit"
                                                        value="EXAM SCHEDULED" />
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6 " >
                                        <div className="mt-5 mb-3 w-100"
                                            style={{ borderRadius: "40px", overflow: "hidden", border: "1px solid black", width: "55%", boxShadow: "1px 1px 4px" }}>
                                            <div className="text-center"
                                                style={{ height: "5vw", borderRadius: "50px 50px 0px 50px", backgroundColor: "red" }}>
                                                <div style={{ fontSize: "2rem", color: "white" }}>Shift Schedule Form
                                                </div>
                                            </div>
                                            <div className="d-block p-4" style={{ textAlign: "center" }}>
                                                <form action="" onSubmit={createSchedule}>
                                                    <input className="m-3 text-center form-control" type="number" name="shiftNumber" onChange={handleInputs2} value={schedule.shiftNumber} id="shiftid"
                                                        placeholder="Enter shiftNumber" /><br />
                                                    <input className="m-3 text-center form-control" type="number" name="maxCandidates" onChange={handleInputs2} value={schedule.maxCandidates}
                                                        id="shiftnumber" placeholder="Enter maxCandidates" /><br />
                                                    <input className="m-3 text-center form-control" type="text" name="shiftTimeFrom" onChange={handleInputs2} value={schedule.shiftTimeFrom}
                                                        id="shiftcandidate" placeholder="Enter shiftTimeFrom" /><br />
                                                    <input className="m-3 text-center form-control" type="text" name="shiftTimeTo" onChange={handleInputs2} value={schedule.shiftTimeTo}
                                                        id="shiftstarttime" placeholder="Enter shiftTimeTo" /><br />
                                                    {/* <input className="m-3 text-center form-control" type="number" name="shiftendtime"
                                                        id="shiftendtime" placeholder="Enter Shift End Time" /><br /> */}
                                                    <input className="m-4 mt-5 text-center form-control" type="submit" value="Crate Shift " />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- --------------------------------Schedule Exam Ends------------------------------------ --> */}

                            <div className="tab-pane fade mb-2 ms-2 pt-2" id="v-pills-studentrecord" role="tabpanel" aria-labelledby="v-pills-studentrecord-tab p-2">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light" >
                                    <div className="container-fluid">
                                        <div className="d-flex align-items-center " >
                                            <a className="navbar-brand" href="#"><img width="100px" src={logo} alt="" /></a>
                                            <h2 className="h2 ms-2"> <i className="fa-solid fa-graduation-cap"></i> &nbsp; Student Records</h2>
                                        </div>
                                    </div>
                                </nav>
                                <div className="row w-100 m-0 ">
                                    <div className="col-12  col-md-3 p-2" >
                                        <select className="form-control" >
                                            <option value="null">Select Gender</option>
                                            <option value="null">Male</option>
                                            <option value="null">Female</option>
                                            <option value="null">All</option>
                                        </select>
                                    </div>
                                    <div className="col-12  col-md-3 p-2" >
                                        <select className="form-control" >
                                            <option value="null">Select Batch</option>
                                            <option value="null">Batch 1</option>
                                            <option value="null">Batch 2</option>
                                            <option value="null">Batch 3</option>
                                        </select>
                                    </div>
                                    <div className="col-12  col-md-6 p-2" >
                                        <div className="row">
                                            <div className="col-4  d-flex justify-content-end" >
                                                <button className="btn btn-success " type="button">To Excel &nbsp; <i className="fa-solid fa-table"></i></button>
                                            </div>
                                            <div className="col-8" >
                                                <div className="btn-group w-100" role="group" aria-label="Basic example">
                                                    <input className="form-control" placeholder="Search Here" type="text" name="" value="" />
                                                    <button type="button" className="btn btn-primary">Search</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-100 dashBorad-table-div ps-2 pe-2">
                                    <table className="table table-danger table-hover table-responsive-md">
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
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>John Cena</td>
                                                <td>johncena@example.com</td>
                                                <td>(123) 456-7890</td>
                                                <td>New York</td>
                                                <td>Bachelor's</td>
                                                <td>22</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Bob Johnson</td>
                                                <td>bobj@example.com</td>
                                                <td>(789) 123-4567</td>
                                                <td>Chicago</td>
                                                <td>Bachelor's</td>
                                                <td>22</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>Alice Wilson</td>
                                                <td>alicew@example.com</td>
                                                <td>(234) 567-8901</td>
                                                <td>Houston</td>
                                                <td>Ph.D.</td>
                                                <td>28</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>David Brown</td>
                                                <td>davidb@example.com</td>
                                                <td>(567) 890-1234</td>
                                                <td>Miami</td>
                                                <td>Bachelor's</td>
                                                <td>21</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>Susan Lee</td>
                                                <td>susanl@example.com</td>
                                                <td>(890) 123-4567</td>
                                                <td>San Francisco</td>
                                                <td>Master's</td>
                                                <td>27</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>Michael Taylor</td>
                                                <td>michaelt@example.com</td>
                                                <td>(123) 456-7890</td>
                                                <td>Seattle</td>
                                                <td>Bachelor's</td>
                                                <td>23</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>8</td>
                                                <td>Linda Clark</td>
                                                <td>lindac@example.com</td>
                                                <td>(456) 789-1234</td>
                                                <td>Boston</td>
                                                <td>Master's</td>
                                                <td>26</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>9</td>
                                                <td>William Adams</td>
                                                <td>williama@example.com</td>
                                                <td>(789) 123-4567</td>
                                                <td>Dallas</td>
                                                <td>Bachelor's</td>
                                                <td>24</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>10</td>
                                                <td>Karen Hall</td>
                                                <td>karenh@example.com</td>
                                                <td>(234) 567-8901</td>
                                                <td>Philadelphia</td>
                                                <td>Ph.D.</td>
                                                <td>29</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>11</td>
                                                <td>Mary Adams</td>
                                                <td>marya@example.com</td>
                                                <td>(567) 890-2345</td>
                                                <td>San Diego</td>
                                                <td>Bachelor's</td>
                                                <td>22</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>12</td>
                                                <td>James Brown</td>
                                                <td>jamesb@example.com</td>
                                                <td>(890) 123-5678</td>
                                                <td>Denver</td>
                                                <td>Master's</td>
                                                <td>27</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>13</td>
                                                <td>Laura Carter</td>
                                                <td>laurac@example.com</td>
                                                <td>(123) 456-6789</td>
                                                <td>Phoenix</td>
                                                <td>Bachelor's</td>
                                                <td>24</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>14</td>
                                                <td>Richard Davis</td>
                                                <td>richardd@example.com</td>
                                                <td>(456) 789-2345</td>
                                                <td>Atlanta</td>
                                                <td>Ph.D.</td>
                                                <td>31</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>15</td>
                                                <td>Sarah Evans</td>
                                                <td>sarahe@example.com</td>
                                                <td>(789) 123-5678</td>
                                                <td>Miami</td>
                                                <td>Master's</td>
                                                <td>28</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>16</td>
                                                <td>Thomas Foster</td>
                                                <td>thomasf@example.com</td>
                                                <td>(234) 567-7890</td>
                                                <td>Chicago</td>
                                                <td>Bachelor's</td>
                                                <td>25</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>17</td>
                                                <td>Emily Green</td>
                                                <td>emilyg@example.com</td>
                                                <td>(567) 890-3456</td>
                                                <td>Los Angeles</td>
                                                <td>Ph.D.</td>
                                                <td>30</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>18</td>
                                                <td>Robert Harris</td>
                                                <td>roberth@example.com</td>
                                                <td>(890) 123-6789</td>
                                                <td>New York</td>
                                                <td>Master's</td>
                                                <td>29</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>19</td>
                                                <td>Jennifer Jackson</td>
                                                <td>jenniferj@example.com</td>
                                                <td>(123) 456-7890</td>
                                                <td>San Francisco</td>
                                                <td>Bachelor's</td>
                                                <td>26</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>
                                            <tr>
                                                <td>20</td>
                                                <td>Daniel King</td>
                                                <td>danielk@example.com</td>
                                                <td>(456) 789-3456</td>
                                                <td>Houston</td>
                                                <td>Ph.D.</td>
                                                <td>32</td>
                                                <td><button className="btn btn-outline-danger" type="submit"><small>Remove</small></button></td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}