import React, { useState } from "react";
import logo from "../Images/InfoBeans Foundation Logo - PNG (1).png";
import { useLocation } from "react-router-dom";
export default function ExamPortal() {
  const location = useLocation();
  const [currentSubject, setCurrentSubject] = useState("ENG01");
  const { QuestionPaperObject } = location.state || {};
  var firstQuestion = QuestionPaperObject.paper[0];

  const handleSubjectChange = (subject, index) => {
    setCurrentSubject(subject);
    console.log("subject :", subject)
    var firstQuestion1 = QuestionPaperObject.paper[index];
    firstQuestion = firstQuestion1
    console.log("first : ", firstQuestion)
  };

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
                        <h3 className="card-title">Question 1</h3>
                      </div>
                      <div className="card-body p-5 " id="background-img">
                        <h4 className="card-text">{`Q1. ${firstQuestion.questions[0].Question}`}</h4>
                        <div className="form-check mt-4 ms-5">
                          <input className="form-check-input" type="radio" name="mcqOptions" id="option1" value="option1" />
                          <label className="form-check-label" for="option1">{`A) ${firstQuestion.questions[0].OptionA}`}</label>
                        </div>
                        <div className="form-check mt-4 ms-5">
                          <input className="form-check-input" type="radio" name="mcqOptions" id="option2" value="option2" />
                          <label className="form-check-label" for="option2">{`B) ${firstQuestion.questions[0].OptionB}`}</label>
                        </div>
                        <div className="form-check mt-4 ms-5">
                          <input className="form-check-input" type="radio" name="mcqOptions" id="option3" value="option3" />
                          <label className="form-check-label" for="option3">{`C) ${firstQuestion.questions[0].OptionC}`}</label>
                        </div>
                        <div className="form-check mt-4 ms-5">
                          <input className="form-check-input" type="radio" name="mcqOptions" id="option4" value="option4" />
                          <label className="form-check-label" for="option4">{`D) ${firstQuestion.questions[0].OptionD}`}</label>
                        </div>
                      </div>
                      <div className="card-footer p-3 ">
                        <div className="d-flex justify-content-around w-100">
                          <button className="btn  btn-outline-danger" type="button"><i
                            className="bi bi-arrow-left-circle-fill"></i>Previous</button>
                          <button className="btn  btn-outline-warning" type="button">Mark for review</button>
                          <button className="btn  btn-outline-primary" type="button">Next<i
                            className="bi bi-arrow-right-circle-fill"></i></button>
                        </div>
                      </div>
                    </div>





                  <div className="w-100 d-flex row  m-0 mt-2 p-4  inner-shadow border-Radius  ">
                    <div className="col-12 col-sm-6 col-md-3 ">
                      <h5 className="text-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" className="bi bi-door-closed" viewBox="0 0 16 16">
                        <path
                          d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z" />
                        <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
                      </svg> Not visited</h5>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                      <h5 className="text-success"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg> Answered</h5>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                      <h5 className="text-danger"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                      </svg> Not Answered</h5>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
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
