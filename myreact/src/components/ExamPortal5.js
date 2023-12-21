import React, { useState, useEffect } from "react";
import logo from "../Images/InfoBeans Foundation Logo - PNG (1).png";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Timer from "./Timer";

export default function ExamPortal() {
    const location = useLocation();
    const { QuestionPaperObject } = location.state || {};
    const [currentSubject, setCurrentSubject] = useState("ENG01");
    const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [markedForReview, setMarkedForReview] = useState([]);
    const [markedForReview1, setMarkedForReview1] = useState([]);
    const [markedForReview2, setMarkedForReview2] = useState([]);
    var firstSubject = QuestionPaperObject.paper[currentSubjectIndex];
    console.log("Question Paper Object: ", QuestionPaperObject);
    // console.log("FirstSubject : ", QuestionPaperObject.paper[currentSubjectIndex].questions[currentQuestionIndex]);
    const subjects = ["ENG01", "HIN02", "MAT03", "REAS04", "COM05", "GK06"];

    const handleSubjectChange = (subject, index) => {
        setCurrentSubject(subject);
        setCurrentSubjectIndex(index);
        setCurrentQuestionIndex(0);
        firstSubject = QuestionPaperObject.paper[index];
    };

    const handlePreviousQuestion = (questionIndex) => {
        if (questionIndex != 0)
            setCurrentQuestionIndex(questionIndex - 1)
        else {
            if (currentSubjectIndex != 0) {
                setCurrentSubjectIndex(currentSubjectIndex - 1)
                setCurrentQuestionIndex(QuestionPaperObject.paper[currentSubjectIndex - 1].questions.length - 1)
                const subjectId = QuestionPaperObject.paper[currentSubjectIndex - 1].subjectID;
                setCurrentSubject(subjectId);
            } else {
                console.log("Question Ended")
            }
        }
    }

    const handleNextQuestion = (questionIndex) => {
        setMarkedForReview2([...markedForReview2, QuestionPaperObject.paper[currentSubjectIndex].questions[currentQuestionIndex].QuestionID]);

        if (questionIndex != firstSubject.questions.length - 1)
            setCurrentQuestionIndex(questionIndex + 1);
        else {
            if (currentSubjectIndex != 5) {
                setCurrentSubjectIndex(currentSubjectIndex + 1);
                setCurrentQuestionIndex(0);
                const subjectId = QuestionPaperObject.paper[currentSubjectIndex + 1].subjectID;
                setCurrentSubject(subjectId);
            } else {
                console.log("Question Ended")
            }
        }
    }

    const handleNumberQuestion = (subjectIndex, questionIndex) => {
        setCurrentSubjectIndex(subjectIndex);
        setCurrentQuestionIndex(questionIndex);
        setCurrentSubject(QuestionPaperObject.paper[subjectIndex].subjectID)
    }

    var obj = {
        EnrollID: QuestionPaperObject.EnrollID,
        currentSubjectIndex,
        currentQuestionIndex
    }
    const handleSelectAnswer = (userAnswer) => {
        var actualAnswer = QuestionPaperObject.paper[currentSubjectIndex].questions[currentQuestionIndex].Answer;
        console.log("QuestionPaperObject.EnrollID : ", QuestionPaperObject.EnrollID)
        setMarkedForReview1([...markedForReview1, QuestionPaperObject.paper[currentSubjectIndex].questions[currentQuestionIndex].QuestionID]);

        if (actualAnswer === userAnswer) {
            obj.answerStatus = true;
            console.log("Correct answer");
            try {
                axios.post(`http://localhost:3002/ExamPortal/updateAnswer`, obj).then((response) => {
                    console.log("1result", response);
                    
                }).catch((error) => {
                    console.log(error);
                })
            } catch (error) {
                console.log('Error:', error);
            }
        } else {
            console.log("Wrong answer");
            obj.answerStatus = false;
            try {
                axios.post(`http://localhost:3002/ExamPortal/updateAnswer`, obj).then((response) => {
                    console.log("result", response);
                }).catch((error) => {
                    console.log(error);
                })
            } catch (error) {
                console.log('Error:', error);
            }
        }
        setSelectedAnswers({
            ...selectedAnswers,
            [QuestionPaperObject.paper[currentSubjectIndex].questions[currentQuestionIndex].QuestionID]: userAnswer
        });
        console.log("selectedAnswers: ", selectedAnswers)
    };

    const handleMarkForReview = (QuestionID) => {
        setMarkedForReview([...markedForReview, QuestionID]);
    }
    const EndTest = () => {
        try {
            axios.post(`http://localhost:3002/ExamPortal/EndTest/${QuestionPaperObject.EnrollID}`).then((response) => {
                console.log("result", response);
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
            console.log('Error:', error);
        }
    }

    return (
        <div className="w-100 m-0 row ">
            <div className="col-12 col-sm-9 p-0">
                <div className="m-2 bg-light inner-shadow border-Radius">
                    <nav className="navbar navbar-expand-lg navbar-light " id="dashBoeardNav">
                        <div className="row m-0  w-100">
                            <div className="col-2  d-flex justify-content-center align-items-center " id="logoLink">
                                <a className="navbar-brand" href="#"><img className="ms-2" width="100px"
                                    src={logo} alt="" /></a>
                            </div>
                            <div className=" col-10 text-center">
                                <h3 className="h3">Information Technology Excellence Program</h3>
                                <div className="p-2 outer-shadow btn btn-sm btn-outline-secondary disabled w-50">Phase 1 :Online Exam</div>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="mt-2 inner-shadow m-2 border-Radius">
                    <div className="d-flex align-items-start mb-2 d-flex justify-content-center ">
                        <div className="nav nav-tabs p-3  w-75 d-flex justify-content-around " id="v-pills-tab" role="tablist">
                            {subjects.map((subject, index) => (
                                <button
                                    className={`nav-link ${currentSubject === subject ? "active" : ""} btn btn-link`}
                                    onClick={() => handleSubjectChange(subject, index)}>
                                    {subject}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="tab-content m-0 ps-2 pe-2 w-100" id="v-pills-tabContent">
                    <div className=" tab-pane fade show active" id="v-pills-english" role="tabpanel"
                        aria-labelledby="v-pills-home-tab">
                        <div className="container p-0">
                            <div className="row " style={{ height: "auto" }}>
                                <div className="col-12  my-2 Questionsscroll">
                                    <div className="card">
                                        <div className="card-body p-5" id="background-img">
                                            <h4 className="card-text questionClass">{`Q.${firstSubject.questions[currentQuestionIndex].QuestionID}) ${firstSubject.questions[currentQuestionIndex].Question}`}</h4>
                                            <div className="form-check mt-4 ms-4">
                                                <input className="form-check-input" type="radio" name="mcqOptions" id="option1" value="option1" checked={selectedAnswers[firstSubject.questions[currentQuestionIndex].QuestionID] === "A"} onChange={() => handleSelectAnswer("A")} />
                                                <label className="form-check-label" htmlFor="option1">{`A) ${firstSubject.questions[currentQuestionIndex].OptionA}`}</label>
                                            </div>
                                            <div className="form-check mt-4 ms-4">
                                                <input className="form-check-input" type="radio" name="mcqOptions" id="option2" value="option2" checked={selectedAnswers[firstSubject.questions[currentQuestionIndex].QuestionID] === "B"} onChange={() => handleSelectAnswer("B")} />
                                                <label className="form-check-label" htmlFor="option2">{`B) ${firstSubject.questions[currentQuestionIndex].OptionB}`}</label>
                                            </div>
                                            <div className="form-check mt-4 ms-4">
                                                <input className="form-check-input" type="radio" name="mcqOptions" id="option3" value="option3" checked={selectedAnswers[firstSubject.questions[currentQuestionIndex].QuestionID] === "C"} onChange={() => handleSelectAnswer("C")} />
                                                <label className="form-check-label" htmlFor="option3">{`C) ${firstSubject.questions[currentQuestionIndex].OptionC}`}</label>
                                            </div>
                                            <div className="form-check mt-4 ms-4">
                                                <input className="form-check-input" type="radio" name="mcqOptions" id="option4" value="option4" checked={selectedAnswers[firstSubject.questions[currentQuestionIndex].QuestionID] === "D"} onChange={() => handleSelectAnswer("D")} />
                                                <label className="form-check-label" htmlFor="option4">{`D) ${firstSubject.questions[currentQuestionIndex].OptionD}`}</label>
                                            </div>
                                        </div>
                                        <div className="card-footer p-3">
                                            <div className="d-flex justify-content-around w-100">
                                                <button className="btn btn-outline-danger" onClick={() => handlePreviousQuestion(currentQuestionIndex)} type="button">Previous</button>
                                                <button className="btn btn-outline-warning" onClick={() => handleMarkForReview(firstSubject.questions[currentQuestionIndex].QuestionID)} type="button">Mark for review</button>
                                                <button className="btn btn-outline-primary" onClick={() => handleNextQuestion(currentQuestionIndex)} type="button">Next</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-100 d-flex row m-0 mt-2 p-4 inner-shadow border-Radius" style={{justifyContent:"space-evenly"}}>
                                        <div className="col-12 col-sm-6 col-md-3" style={{width:"auto"}}>
                                            <h5 className="text-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                            </svg> Answered</h5>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-3" style={{width:"auto"}}>
                                            <h5 className="text-secondary"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                            </svg> Not Answered</h5>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-3" style={{width:"auto"}}>
                                            <h5 className="text-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                            </svg> Marked for review </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-sm-3 p-1">
                <div className="border-Radius inner-shadow p-2 d-flex a justify-content-center">
                    <h4 className="h4 text-center">Time Left:&nbsp;
                        <span className="text-danger">
                            {/* <Timer initialTime={90 * 60} /> */}
                            59:59
                        </span>
                    </h4>
                </div>
                <div className="p-2 inner-shadow mt-1 border-Radius">
                    <h6>Questions Overview:</h6>
                    <div className="d-flex flex-wrap " id="question-marks-div">
                        <div className="row m-0  w-100 mt-2">
                            {QuestionPaperObject.paper.map((subject, subjectIndex) => (
                                subject.questions.map((question, questionIndex) => (
                                    <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1'>
                                        <span className={`question-mark p-2 ${question.QuestionID}} ${markedForReview2.includes(question.QuestionID) ? 'bg-danger' : ''} ${markedForReview1.includes(question.QuestionID) ? 'bg-success' : ''} ${markedForReview.includes(question.QuestionID) ? 'bg-warning' : ''}`} onClick={() => handleNumberQuestion(subjectIndex, questionIndex)}>
                                            {question.QuestionID}
                                        </span>
                                    </div>
                                ))
                            ))}
                        </div>
                    </div>
                    <button className="btn btn-outline-primary w-100 mt-2" type="button">Instructions</button>
                    <button className="btn btn-outline-primary w-100 mt-2" type="button">Questions</button>
                    <button className="btn btn-outline-danger  w-100 mt-2" type="button" onClick={EndTest}>End Test</button>
                </div>
            </div>
        </div >
    );
}
