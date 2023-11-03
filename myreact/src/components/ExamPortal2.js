import React, { useState } from "react";
import logo from "../Images/InfoBeans Foundation Logo - PNG (1).png";
import { useLocation } from "react-router-dom";
export default function ExamPortal() {
    const location = useLocation();
    const { QuestionPaperObject } = location.state || {};
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentSubject, setCurrentSubject] = useState("ENG01");
    var firstQuestion = QuestionPaperObject.paper[0];

    const handleSubjectChange = (subject, index) => {
        setCurrentSubject(subject);
        var firstQuestion1 = QuestionPaperObject.paper[index];
        firstQuestion = firstQuestion1
        console.log(firstQuestion)
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < QuestionPaperObject.paper.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const currentQuestion = QuestionPaperObject.paper[currentQuestionIndex];

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
                            <button
                                className={`nav-link ${currentSubject === "english" ? "active" : ""
                                    } btn btn-link`}
                                onClick={() => handleSubjectChange("ENG01", 0)}
                            >
                                English
                            </button>
                            <button
                                className={`nav-link ${currentSubject === "hindi" ? "active" : ""
                                    } btn btn-link`}
                                onClick={() => handleSubjectChange("HIN02", 1)}
                            >
                                Hindi
                            </button>
                            <button
                                className={`nav-link ${currentSubject === "math" ? "active" : ""
                                    } btn btn-link`}
                                onClick={() => handleSubjectChange("MAT03", 2)}
                            >
                                Math
                            </button>
                            <button
                                className={`nav-link ${currentSubject === "Computer" ? "active" : ""
                                    } btn btn-link`}
                                onClick={() => handleSubjectChange("COM05", 4)}
                            >
                                Computer
                            </button>
                            <button
                                className={`nav-link ${currentSubject === "G.K" ? "active" : ""
                                    } btn btn-link`}
                                onClick={() => handleSubjectChange("GK06", 5)}
                            >
                                G.K
                            </button>
                            <button
                                className={`nav-link ${currentSubject === "Reasoning" ? "active" : ""
                                    } btn btn-link`}
                                onClick={() => handleSubjectChange("REA06", 3)}
                            >
                                Reasoning
                            </button>
                        </div>
                    </div>
                </div>


                <div className="tab-content m-0 ps-2 pe-2 w-100" id="v-pills-tabContent">
                    <div className=" tab-pane fade show active" id="v-pills-english" role="tabpanel"
                        aria-labelledby="v-pills-home-tab">
                        <div className="container p-0">
                            <div className="row">
                                <div className="col-12 ">
                                    <div className="card">
                                        <div className="card-header">
                                            {/* <h3 className="card-title">Question 1</h3> */}
                                            <h3 className="card-title">{`Question ${currentQuestionIndex + 1}`}</h3>
                                        </div>
                                        <div className="card-body p-5 " id="background-img">
                                            {/* <h4 className="card-text">{`Q1. ${firstQuestion.questions[0].Question}`}</h4> */}
                                            <h4 className="card-text">{`Q${currentQuestionIndex + 1}. ${currentQuestion.questions[0].Question}`}</h4>
                                            <div className="form-check mt-4 ms-5">
                                                <input className="form-check-input" type="radio" name="mcqOptions" id="option1" value="option1" />
                                                <label className="form-check-label" for="option1">{`A) ${currentQuestion.questions[0].OptionA}`}</label>
                                            </div>
                                            <div className="form-check mt-4 ms-5">
                                                <input className="form-check-input" type="radio" name="mcqOptions" id="option2" value="option2" />
                                                <label className="form-check-label" for="option2">{`B) ${currentQuestion.questions[0].OptionB}`}</label>
                                            </div>
                                            <div className="form-check mt-4 ms-5">
                                                <input className="form-check-input" type="radio" name="mcqOptions" id="option3" value="option3" />
                                                <label className="form-check-label" for="option3">{`C) ${currentQuestion.questions[0].OptionC}`}</label>
                                            </div>
                                            <div className="form-check mt-4 ms-5">
                                                <input className="form-check-input" type="radio" name="mcqOptions" id="option4" value="option4" />
                                                <label className="form-check-label" for="option4">{`D) ${currentQuestion.questions[0].OptionD}`}</label>
                                            </div>
                                        </div>
                                        <div className="card-footer p-3 ">
                                            <div className="d-flex justify-content-around w-100">
                                                <button className="btn btn-outline-danger" type="button" onClick={handlePreviousQuestion}>
                                                    <i className="bi bi-arrow-left-circle-fill"></i>Previous
                                                </button>
                                                <button className="btn btn-outline-warning" type="button">Mark for review</button>
                                                <button className="btn btn-outline-primary" type="button" onClick={handleNextQuestion}>
                                                    Next<i className="bi bi-arrow-right-circle-fill"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
