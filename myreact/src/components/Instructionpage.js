import React from "react";
import axios from 'axios';
import Cookie from "js-cookie";
import { useNavigate } from 'react-router-dom';

import logo from "../Images/InfoBeans Foundation Logo - PNG (1).png";
export default function Instructionpage() {
    // const history = useNavigate();
    const navigate = useNavigate();
    const portalPageQuestion = async (e) => {
        if (e) {
            e.preventDefault();
        }
        console.log("in ExamPortal");
        var EnrollId = Cookie.get("EnrollID");
        console.log(EnrollId);

        try {
            axios.post('http://localhost:3002/candidate/ExamPortal', { EnrollId }).then((response) => {
                // console.log("result", response);
                if (response.status === 201) {
                    const responseData = response.data;
                    var QuestionPaperObject = responseData.QuestionPaperObject;
                    // history.push("/ExamPortal", { QuestionPaperObject });
                    navigate("/ExamPortal", { state: { QuestionPaperObject } });
                } else {
                    console.log('Something went wrong');
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
            <section className="w-100 h-100 bg-rgba p-2">
                <div className="container p-2 shadow bg-white rounded-2 my-2">
                    <div className="row">
                        <div className="col-md-1 p-2">
                            <img width="110px" className="mx-auto d-block" src={logo} alt="" />
                        </div>
                        <div className="col-md-11 py-2 px-2 border-left text-center">
                            <h3>Information Technology Excellence Program</h3>
                            <div className="w-25 d-flex align-items-center justify-content-center px-2 mx-auto bg-light text-center" style={{ borderRadius: "30px" }}>
                                <p style={{ textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)", marginTop: "10px" }}>Phase 1 : Online Exam</p>
                            </div>
                        </div>
                    </div>
                    <div className="instructions">
                        <div className="my-1 py-2 border-top">
                            <h4 className="ms-2 mt-2"> Instructions for Online Examinations</h4>
                            <p className="py-2 text-danger">
                                Please read the instruction carefully  before starting the test.
                            </p>
                            <ol type="1">
                                <li>Click <b>start </b> test on bottom of your screen to begin the test.</li>
                                <li>Mobile and smart watch are not allowed in during exam you keep your mobile and watch in your bag.       </li>
                                <li>The clock has been set at server and Count Downtimer at the top Right side of the screen will display left out time to closure from where you can monitor time you have to complete exam</li>
                                <li>Click on one of the answer,simply click the desired option.</li>
                                <li>Candidate can change their response of atempted answer anytime during examination slot time by clicking another answer which candidates want to change answer.</li>
                                <li>Six subject button on top of your screen select the subject and attempt their question</li>
                                <li>All subject have equal question and all question carry equal number.</li>
                                <li>Click on previous to going on previous question</li>
                                <li>Click on next to going on next question.</li>
                                <li>The color coded daigram on right side of screen show the status of questions.
                                    <ul>
                                        <li>
                                            <div className="red" style={{ backgroundColor: "red" }}></div> <div className="px-2"> <p>: Not answered / <b> Not attempted</b> Question</p> </div>
                                        </li>
                                        <li>
                                            <div className="yellow" style={{ backgroundColor: "yellow" }}></div> <div className="px-2"> <p>: Answered / <b>Marked Attempted</b>for review</p> </div>
                                        </li>
                                        <li>
                                            <div className="green" style={{ backgroundColor: "green" }}></div> <div className="px-2"> <p>: Not answered / <b> Not attempted</b> Question</p> </div>
                                        </li>
                                        <li>
                                            <div className="grey" style={{ backgroundColor: "grey" }}></div> <div className="px-2"> <p>: Not visited Question</p> </div>
                                        </li>
                                    </ul>
                                </li>
                                <li>All the answered questions will be counted for final result</li>
                                <li>Their is no negative marking for <b>incorrect/wrong</b> answer</li>
                                <li>Result will be declared between 2-3 days after exam.</li>

                            </ol>
                        </div>

                    </div>
                    <div className="w-100 p-2 border-top d-flex justify-content-between align-items-center">
                        <form action="" onSubmit={portalPageQuestion} className="w-100">
                            <div className="w-100 d-flex justify-content-between align-items-center">
                                <div>
                                    <input type="checkbox" className=" d-inline" name="" id="" /><p className="px-2 d-inline">The Computer provided to me is in proper working condition. <br /><p className="ps-4">I have read and understood the instruction given above</p> </p>
                                </div>
                                <div>
                                    <input type="submit" className="btn btn-danger px-5 py-2 text-white" style={{ borderRadius: "20px" }} value="Start Test" name="" id="" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}