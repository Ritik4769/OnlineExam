import React, { useState } from "react";
import logo from "../Images/InfoBeans Foundation Logo - PNG (1).png";
import { useLocation } from "react-router-dom";
var subjectCode;
export default function ExamPortal() {
    const location = useLocation();
    const { QuestionPaperObject } = location.state || {};
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentSubject, setCurrentSubject] = useState("ENG01");
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const subjects = ["ENG01", "HIN02", "MAT03", "REA04", "COM05", "GK06"];
    const handleSubjectChange = (subject, index) => {
        // console.log("subject : ", subject);
        // console.log(index)
        console.log("currentSubject : ", setCurrentSubject);
        subjectCode = currentSubject;
        console.log("subjectCode : ", subjectCode);
        setCurrentSubject(subject);
        setCurrentQuestionIndex(index);
    };

    const handleSelectAnswer = (questionIndex, answer) => {
        console.log("question index : ", answer)
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: answer,
        });
        console.log("setSelectedAnswers : ", selectedAnswers)
    };

    // console.log("selectedAnswers : ",selectedAnswers)

    // Get the current question and its selected answer
    // const currentQuestion2 = QuestionPaperObject.paper[currentQuestionIndex];
    const currentQuestion = QuestionPaperObject.paper[currentQuestionIndex].questions;
    console.log("current : ", currentQuestion);
    // console.log("current : ",currentQuestion2);
    const selectedAnswer = selectedAnswers[currentQuestionIndex] || "";

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
                                    key={subject}
                                    className={`nav-link ${currentSubject === subject ? "active" : ""} btn btn-link`}
                                    onClick={() => handleSubjectChange(subject, index)}
                                >
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
                            <div className="row Questionsscroll" style={{ height: "480px" }}>
                                {currentQuestion.map((question, index) => (
                                    <div className="col-12  my-2 Questionsscroll" key={index}>
                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">{`Question ${currentQuestionIndex + index + 1}`}</h3>
                                            </div>
                                            <div className="card-body p-5" id="background-img">
                                                <h4 className="card-text">{`Q${currentQuestionIndex + index + 1}. ${question.Question}`}</h4>
                                                <div className="form-check mt-4 ms-5">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name={`mcqOptions-${index}`}
                                                        id={`option1-${index}`}
                                                        value="option1"
                                                        checked={selectedAnswers[currentQuestionIndex + index] === "option1"}
                                                        onChange={() => handleSelectAnswer(currentQuestionIndex + index, question.OptionA)}
                                                    />
                                                    <label className="form-check-label" htmlFor={`option1-${index}`}>{`A) ${question.OptionA}`}</label>
                                                </div>
                                                <div className="form-check mt-4 ms-5">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name={`mcqOptions-${index}`}
                                                        id={`option2-${index}`}
                                                        value={question.OptionA}
                                                        checked={selectedAnswers[currentQuestionIndex + index] === "option2"}
                                                        onChange={() => handleSelectAnswer(currentQuestionIndex + index, question.OptionB)}
                                                    />
                                                    <label className="form-check-label" htmlFor={`option2-${index}`}>{`B) ${question.OptionB}`}</label>
                                                </div>
                                                <div className="form-check mt-4 ms-5">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name={`mcqOptions-${index}`}
                                                        id={`option3-${index}`}
                                                        value="option3"
                                                        checked={selectedAnswers[currentQuestionIndex + index] === "option3"}
                                                        onChange={() => handleSelectAnswer(currentQuestionIndex + index, question.OptionC)}
                                                    />
                                                    <label className="form-check-label" htmlFor={`option3-${index}`}>{`C) ${question.OptionC}`}</label>
                                                </div>
                                                <div className="form-check mt-4 ms-5">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name={`mcqOptions-${index}`}
                                                        id={`option4-${index}`}
                                                        value="option4"
                                                        checked={selectedAnswers[currentQuestionIndex + index] === "option4"}
                                                        onChange={() => handleSelectAnswer(currentQuestionIndex + index, question.OptionD)}
                                                    />
                                                    <label className="form-check-label" htmlFor={`option4-${index}`}>{`D) ${question.OptionD}`}</label>
                                                </div>
                                            </div>
                                            <div className="card-footer p-3">
                                                <div className="d-flex justify-content-around w-100">
                                                    {/* <button className="btn btn-outline-danger" type="button" onClick={handlePreviousQuestion}>
                                                        <i className="bi bi-arrow-left-circle-fill"></i>Previous
                                                    </button> */}
                                                    <button className="btn btn-outline-warning" type="button">Mark for review</button>
                                                    {/* <button className="btn btn-outline-primary" type="button" onClick={handleNextQuestion}>
                                                        Next<i className="bi bi-arrow-right-circle-fill"></i>
                                                    </button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="tab-pane fade" id="v-pills-hindi" role="tabpanel" aria-labelledby="v-pills-profile-tab">hindi
                    </div>
                    <div className="tab-pane fade" id="v-pills-math" role="tabpanel" aria-labelledby="v-pills-messages-tab">math</div>
                    <div className="tab-pane fade" id="v-pills-computer" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                        computer</div>
                    <div className="tab-pane fade" id="v-pills-gk" role="tabpanel" aria-labelledby="v-pills-settings-tab">gk</div>
                    <div className="tab-pane fade" id="v-pills-lr" role="tabpanel" aria-labelledby="v-pills-settings-tab">LR</div>
                </div>
            </div>
            {/* <!-- ========================header Ends========================== --> */}
            <div className="col-12 col-sm-3 p-1">
                <div className="border-Radius inner-shadow p-2 d-flex a justify-content-center">
                    <h4 className="h4 text-center">Time Left:&nbsp;<span className="text-danger">02:59:59</span> </h4>
                </div>
                <div className="p-2 inner-shadow mt-1 border-Radius">
                    <h6>Questions Overview:</h6>
                    <div className="d-flex flex-wrap " id="question-marks-div">
                        <div className="row m-0  w-100 mt-2">
                            <div className="col-2 col-sm-3 col-lg-2 mb-3 p-1   "><span className="question-mark bg-danger p-2">01</span></div>
                            <div className="col-2 col-sm-3 col-lg-2 mb-3 p-1  "><span className="question-mark p-2">02</span></div>
                            <div className="col-2 col-sm-3 col-lg-2 mb-3 p-1  "><span className="question-mark p-2">03</span></div>
                            <div className="col-2 col-sm-3 col-lg-2 mb-3 p-1  "><span className="question-mark p-2 bg-success">04</span></div>
                            <div className="col-2 col-sm-3 col-lg-2 mb-3 p-1  "><span className="question-mark p-2">05</span></div>
                            <div className="col-2 col-sm-3 col-lg-2 mb-3 p-1  "><span className="question-mark p-2">06</span></div>
                            <div className="col-2 col-sm-3 col-lg-2 mb-3 p-1  "><span className="question-mark p-2">07</span></div>
                            <div className="col-2 col-sm-3 col-lg-2 mb-3 p-1  "><span className="question-mark p-2">08</span></div>
                            <div className="col-2 col-sm-3 col-lg-2 mb-3 p-1  "><span className="question-mark p-2">09</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>10</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>11</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>12</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>13</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>14</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>15</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>16</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>17</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>18</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>19</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>20</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>21</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>22</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>23</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>24</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>25</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>26</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>27</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>28</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>29</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>30</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>31</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>32</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>33</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>34</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>35</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>36</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>37</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>38</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>39</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>40</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>41</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>42</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>43</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>44</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>45</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>46</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>47</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>48</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>49</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>50</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>51</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>52</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>53</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>54</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>55</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>56</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>57</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>58</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>59</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>60</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>61</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>62</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>63</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>64</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>65</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>66</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>67</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>68</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>69</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>70</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>71</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>72</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>73</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>74</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>75</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>76</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>77</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>78</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>79</span></div>
                            <div className='col-2 col-sm-3 col-lg-2 mb-3 p-1 '><span className='question-mark p-2'>80</span></div>
                        </div>
                    </div>
                    <button className="btn btn-outline-primary w-100 mt-2" type="button">Instructions</button>
                    <button className="btn btn-outline-primary w-100 mt-2" type="button">Questions</button>
                    <button className="btn btn-outline-danger  w-100 mt-2" type="button">End Test</button>
                </div>
            </div>
        </div >
    );
}
