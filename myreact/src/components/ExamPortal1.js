import React, { useState, useEffect } from "react";
import logo from "../Images/InfoBeans Foundation Logo - PNG (1).png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Timer from "./Timer";
import InstructionForCandidate from "./InstructionForCandidate";
import Swal from "sweetalert2";

export default function ExamPortal() {
    const navigate = useNavigate();
    const location = useLocation();
    const { QuestionPaperObject, username, remainingTime } = location.state || {};
    const [currentSubject, setCurrentSubject] = useState("ENG01");
    const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [answerSelected, setAnswerSelected] = useState([]);
    const [markedForReview, setMarkedForReview] = useState([]);
    const [visitedQuestion, setVisitedQuestion] = useState([]);
    var firstSubject = QuestionPaperObject.paper[currentSubjectIndex];
    const subjects = ["ENG01", "HIN02", "MAT03", "REAS04", "COM05", "GK06"];

    useEffect(() => {
        let newSelectedAnswers = {};
        let newAnswerSelected = [];
        let newMarkForReview = [];
        let newVisitedQuestion = [];
        QuestionPaperObject.paper.forEach((subject) => {
            subject.questions.forEach((question) => {
                if (question.selectedAnswer !== "") {
                    newSelectedAnswers = {
                        ...newSelectedAnswers,
                        [question.QuestionID]: question.selectedAnswer,
                    };
                    if (question.answerColor === "green") {
                        newAnswerSelected.push(question.QuestionID);
                    } else if (question.answerColor === "yellow") {
                        newAnswerSelected.push(question.QuestionID);
                        newMarkForReview.push(question.QuestionID);
                    }
                } else if (question.answerColor === "red") {
                    newVisitedQuestion.push(question.QuestionID);
                }
            });
        });
        setSelectedAnswers(newSelectedAnswers);
        setAnswerSelected(newAnswerSelected);
        setMarkedForReview(newMarkForReview);
        setVisitedQuestion(newVisitedQuestion);
    }, []);

    // useEffect(() => {
    //     const enableFullScreen = async () => {
    //         const element = document.documentElement;
    //         try {
    //             await element.requestFullscreen();
    //         } catch (err) {
    //             console.error("Failed to enable fullscreen:", err);
    //         }
    //     };
    //     enableFullScreen();

    //     return () => {
    //         const exitFullScreen = async () => {
    //             try {
    //                 await document.exitFullscreen();
    //             } catch (err) {
    //                 console.error("Failed to exit fullscreen:", err);
    //             }
    //         };
    //         exitFullScreen();
    //     };
    // }, []);

    // useEffect(() => {
    //     const handleKeyDown = (event) => {
    //         event.preventDefault();
    //     };
    //     window.addEventListener('keydown', handleKeyDown);

    //     const handleBeforeUnload = (event) => {
    //         const confirmationMessage = 'Are you sure you want to leave?';
    //         event.returnValue = confirmationMessage;
    //         return confirmationMessage;
    //     };
    //     window.addEventListener('beforeunload', handleBeforeUnload);

    //     const handleContextMenu = (event) => {
    //         event.preventDefault();
    //     };
    //     document.addEventListener('contextmenu', handleContextMenu);

    //     return () => {
    //         window.removeEventListener('keydown', handleKeyDown);
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //         document.removeEventListener('contextmenu', handleContextMenu);
    //     };
    // }, []);

    useEffect(() => {
        if (firstSubject.questions[currentQuestionIndex].QuestionID === 1) {
            document.getElementById("previous").style.visibility = "hidden";
        } else {
            document.getElementById("previous").style.visibility = "visible";
        }

        if (firstSubject.questions[currentQuestionIndex].QuestionID === 60) {
            document.getElementById("next").style.visibility = "hidden";
        } else {
            document.getElementById("next").style.visibility = "visible";
        }
    }, [currentQuestionIndex, currentSubject]);

    var colorObj = {
        EnrollID: QuestionPaperObject.EnrollID,
        currentSubjectIndex,
        currentQuestionIndex,
        selectedColor: "light",
    }

    const handleSubjectChange = (subject, index) => {
        if (!selectedAnswers[firstSubject.questions[currentQuestionIndex].QuestionID]) {
            setVisitedQuestion([...visitedQuestion, firstSubject.questions[currentQuestionIndex].QuestionID]);
            colorObj.selectedColor = "red";
            setSelectedColor(colorObj);
        }
        setCurrentSubject(subject);
        setCurrentSubjectIndex(index);
        setCurrentQuestionIndex(0);
        firstSubject = QuestionPaperObject.paper[index];
    };

    const handlePreviousQuestion = () => {
        if (!selectedAnswers[firstSubject.questions[currentQuestionIndex].QuestionID]) {
            setVisitedQuestion([...visitedQuestion, firstSubject.questions[currentQuestionIndex].QuestionID]);
            colorObj.selectedColor = "red";
            setSelectedColor(colorObj);
        }
        if (currentQuestionIndex != 0)
            setCurrentQuestionIndex(currentQuestionIndex - 1)
        else {
            if (currentSubjectIndex != 0) {
                setCurrentSubjectIndex(currentSubjectIndex - 1)
                setCurrentQuestionIndex(QuestionPaperObject.paper[currentSubjectIndex - 1].questions.length - 1)
                const subjectId = QuestionPaperObject.paper[currentSubjectIndex - 1].subjectID;
                setCurrentSubject(subjectId);
            }
        }
    }

    const handleNextQuestion = () => {
        if (!selectedAnswers[firstSubject.questions[currentQuestionIndex].QuestionID]) {
            setVisitedQuestion([...visitedQuestion, firstSubject.questions[currentQuestionIndex].QuestionID]);
            colorObj.selectedColor = "red";
            setSelectedColor(colorObj);
        }
        if (currentQuestionIndex != firstSubject.questions.length - 1)
            setCurrentQuestionIndex(currentQuestionIndex + 1);
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
        if (!selectedAnswers[firstSubject.questions[currentQuestionIndex].QuestionID]) {
            setVisitedQuestion([...visitedQuestion, firstSubject.questions[currentQuestionIndex].QuestionID]);
            colorObj.selectedColor = "red";
            setSelectedColor(colorObj);
        }
        setCurrentSubjectIndex(subjectIndex);
        setCurrentQuestionIndex(questionIndex);
        setCurrentSubject(QuestionPaperObject.paper[subjectIndex].subjectID)
    }

    const handleMarkForReview = (QuestionID) => {
        const isMarkedForReview = markedForReview.includes(QuestionID);
        if (isMarkedForReview) {
            setMarkedForReview(markedForReview.filter(id => id !== QuestionID));
            colorObj.selectedColor = "green";
        } else {
            if (selectedAnswers[firstSubject.questions[currentQuestionIndex].QuestionID]) {
                setMarkedForReview([...markedForReview, QuestionID]);
                colorObj.selectedColor = "yellow";
            } else {
                console.log("select answer first");
                Swal.fire({
                    icon: "error",
                    title: "Select Answer First",
                    text: "Cannot mark the question because no answer is selected!",
                });
            }
        }
        setSelectedColor(colorObj);
    }

    const setSelectedColor = async (obj) => {
        try {
            var message = await axios.post(`http://localhost:3002/ExamPortal/updateColor`, obj);
            console.log(message);
        } catch (error) {
            console.log('Error:', error);
        }
    }

    const handleSelectAnswer = (userAnswer) => {
        let question = QuestionPaperObject.paper[currentSubjectIndex].questions[currentQuestionIndex];
        var actualAnswer = question.Answer;

        if (!answerSelected.includes(question.QuestionID)) {
            setAnswerSelected([...answerSelected, question.QuestionID]);
        }

        if (visitedQuestion.includes(question.QuestionID)) {
            setVisitedQuestion(visitedQuestion.filter(q => q !== question.QuestionID));
        }
        var obj = {
            EnrollID: QuestionPaperObject.EnrollID,
            currentSubjectIndex,
            currentQuestionIndex,
            selectedColor: "green",
            userAnswer,
        }
        if (actualAnswer === userAnswer) {
            obj.answerStatus = true;
            console.log("Correct answer");
        } else {
            obj.answerStatus = false;
            console.log("Wrong answer");
        }
        try {
            axios.post(`http://localhost:3002/ExamPortal/updateAnswer`, obj).then((response) => {
                console.log("result", response.data.message);
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
            console.log('Error:', error);
        }
        setSelectedAnswers({
            ...selectedAnswers,
            [QuestionPaperObject.paper[currentSubjectIndex].questions[currentQuestionIndex].QuestionID]: userAnswer
        });
    };

    const EndTest = (value) => {
        console.log(value);
        if (value == "endTest") {
            Swal.fire({
                title: "Do you want to submit the test?",
                showDenyButton: true,
                confirmButtonText: "Submit Test",
                denyButtonText: "Cancel"
            }).then((result) => {
                if (result.isConfirmed) {
                    endTestCompleted();
                } else if (result.isDenied) {
                    console.log("Submit Cancel");
                }
            });
        } else if (value == "timeOver") {
            Swal.fire({
                icon: 'warning',
                title: "Your time is over. The test will be submitted.",
                confirmButtonText: "Time Over",
            }).then((result) => {
                if (result.isConfirmed) {
                    endTestCompleted();
                }
            });
        }
    }

    const endTestCompleted = () => {
        Swal.fire({
            icon: "success",
            html: `<p>Test Submitted Successful!</p>
        <b><p style="color: #1bac52">Number of Question Attempted : ${answerSelected.length}</p>
        <p style="color: #ea1b3d">Number of Question Not Attempted : ${60 - answerSelected.length}</p></b>`,
            showConfirmButton: true,
        });
        try {
            axios.post(`http://localhost:3002/ExamPortal/EndTest/${QuestionPaperObject.EnrollID}`).then((response) => {
                console.log("result", response.data.message);
                navigate("/login");
                // navigate("/login", { replace: true });
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
            console.log('Error:', error);
        }
    }

    const handleTimeOver = () => {
        EndTest("timeOver");
    };

    return (
        <div className="w-100 m-0 row ">
            <div className="col-12 col-sm-9 p-0">
                <div className="m-2 bg-light inner-shadow border-Radius">
                    <nav className="navbar navbar-expand-lg navbar-light " id="dashBoeardNav">
                        <div className="row m-0 w-100">
                            <div className="col-2 d-flex justify-content-center align-items-center " id="logoLink">
                                <a className="navbar-brand" href="#"><img className="ms-2" width="100px"
                                    src={logo} alt="" /></a>
                            </div>
                            <div className="col-10 text-center">
                                <h3 className="h3">Information Technology Excellence Program</h3>
                                <center>
                                    <div className="p-2 outer-shadow w-50">Phase 1 <big>|</big> Online Exam <big>|</big> Batch {QuestionPaperObject.EnrollID.slice(4, 6)}</div>
                                </center>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="mt-2 inner-shadow mx-2 border-Radius">
                    <div className="d-flex align-items-start d-flex justify-content-center ">
                        <div className="nav nav-tabs p-3 w-75 d-flex justify-content-around " id="v-pills-tab" role="tablist">
                            {subjects.map((subject, index) => (
                                <button key={index} className={`nav-link examNavlink ${currentSubject === subject ? "active" : ""} btn btn-link`}
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
                            <div className="row" style={{ height: "auto" }}>
                                <div className="col-12 my-2">
                                    <div className="card inner-shadow">
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
                                                <button id="previous" className="btn btn-outline-danger" onClick={() => handlePreviousQuestion()} type="button">Previous</button>
                                                <button className="btn btn-outline-warning" style={{ width: "218px" }} onClick={() => handleMarkForReview(firstSubject.questions[currentQuestionIndex].QuestionID)} type="button">
                                                    {markedForReview.includes(firstSubject.questions[currentQuestionIndex].QuestionID)
                                                        ? "Remove Mark for Review"
                                                        : "Mark for Review"
                                                    }
                                                </button>
                                                <button id="next" className="btn btn-outline-primary" onClick={() => handleNextQuestion()} type="button">Next</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-100 d-flex row m-0 mt-2 p-4 inner-shadow border-Radius" style={{ justifyContent: "space-evenly" }}>
                                        <div className="col-12 col-sm-6 col-md-3 iconWarn" style={{ width: "auto" }}>
                                            <h5 className="text-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                            </svg> Answered</h5>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-3 iconWarn" style={{ width: "auto" }}>
                                            <h5 className="text-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                            </svg> Marked for review </h5>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-3 iconWarn">
                                            <h5 className="text-danger"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                            </svg> Not Answered</h5>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-3 iconWarn" style={{ width: "auto" }}>
                                            <h5 className="text-secondary"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                            </svg> Not Visited</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-sm-3 p-1 d-flex flex-column">
                <div className="border-Radius mt-1 mb-2 p-2 d-flex a justify-content-center" style={{ backgroundColor: "#ea1b3d" }}>
                    <h4 className="h4 text-center text-light m-0">Time Left:&nbsp;
                        <span>
                            <Timer initialTime={remainingTime * 60} onTimeOver={handleTimeOver} />
                        </span>
                    </h4>
                </div>
                <div className="inner-shadow mb-2 border-Radius py-2" style={{ backgroundColor: "whitesmoke" }}>
                    <h5 className="text-center w-100" style={{ color: "#ea1b3d", fontWeight: "900" }}>
                        <span className="px-2">{username} : {QuestionPaperObject.EnrollID}</span>
                    </h5>
                    <h6 className="text-center mb-0">Questions Overview</h6>
                </div>
                <div className="p-2 mb-1 inner-shadow border-Radius flex-grow-1">
                    <div className="d-flex flex-wrap " id="question-marks-div">
                        <div className="row m-0 w-100 mt-2">
                            {QuestionPaperObject.paper.map((subject, subjectIndex) => (
                                subject.questions.map((question, questionIndex) => (
                                    <div key={question.QuestionID} className='col-2 col-sm-3 col-lg-2 mb-3 p-1'>
                                        <span className={`question-mark p-2 ${question.QuestionID}} ${visitedQuestion.includes(question.QuestionID) ? 'visitedClass' : ''} ${answerSelected.includes(question.QuestionID) ? 'answerClass' : ''} ${markedForReview.includes(question.QuestionID) ? 'reviewClass' : ''}`} onClick={() => handleNumberQuestion(subjectIndex, questionIndex)}>
                                            {question.QuestionID}
                                        </span>
                                    </div>
                                ))
                            ))}
                        </div>
                    </div>
                    {/* <!-- Button trigger modal --> */}
                    <button className="btn btn-outline-danger w-100 mt-2" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Instructions</button>
                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <InstructionForCandidate />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-outline-danger w-100 mt-2" type="button" onClick={() => EndTest("endTest")}>End Test</button>
                </div>
            </div>
        </div >
    );
}