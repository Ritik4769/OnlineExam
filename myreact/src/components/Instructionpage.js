import React from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../Images/InfoBeans Foundation Logo - PNG (1).png";
import InstructionForCandidate from "./InstructionForCandidate";

export default function Instructionpage() {
  const location = useLocation();
  const user = JSON.parse(location.state);
  const navigate = useNavigate();
  var EnrollId = Cookie.get("EnrollID");

  const removeClass = () => {
    document.getElementById('check').classList.toggle('disabled');
    document.getElementById('check').classList.toggle('btn-light');
    if (document.getElementById('checkbox').checked)
      document.getElementById('containClass').style.color = 'rgb(59, 154, 57)';
    else
      document.getElementById('containClass').style.color = 'rgb(0,0,0)';
  }
  const portalPageQuestion = async (e) => {
    if (e) {
      e.preventDefault();
    }
    console.log("in ExamPortal");
    try {
      axios
        .post("http://localhost:3002/candidate/ExamPortal", { EnrollId })
        .then((response) => {
          if (response.status === 201) {
            const responseData = response.data;
            var QuestionPaperObject = responseData.QuestionPaperObject;
            navigate("/ExamPortal", { state: { QuestionPaperObject, username: user.username, remainingTime: user.EnrollID[user.EnrollID.length - 1].RemainingTime } });
            // navigate("/ExamPortal", { state: { QuestionPaperObject, username : user.username }, replace: true });
          } else {
            console.log("Something went wrong");
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    } catch (error) {
      console.log("Error: ", error);
      window.alert("Failed to register");
    }
  };

  return (
    <>
      <section className="w-100 h-100 bg-rgba p-2">
        <div className="container p-2 shadow bg-white rounded-2 my-2">
          <div className="row bg-light">
            <div className="col-md-1 p-2">
              <img
                width="110px"
                className="mx-auto d-block"
                src={logo}
                alt=""
              />
            </div>
            <div className="col-md-11 py-2 px-2 border-left text-center">
              <h3>Information Technology Excellence Program</h3>
              <div
                className="w-25 d-flex align-items-center justify-content-center px-2 mx-auto bg-light text-center"
                style={{ borderRadius: "30px" }}
              >
                <p
                  style={{
                    textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                    marginTop: "10px",
                  }}
                >
                  Phase 1 : Online Exam
                </p>
              </div>
            </div>
          </div>
          <div className="instructions p-3">
            <div className="row w-100 m-0">
              <div className="col-12 col-md-9">
                <div className="order-last order-md-first instructionTable">
                  <InstructionForCandidate />
                  <div className="w-100" >
                    <hr />
                    <h3>General Instructions:-</h3>
                    <h6>Read the Instructions carefully</h6>
                    <table className="table table-responsive">
                      <thead>
                        <tr>
                          <th>S.No.</th>
                          <th>Subject Section Name</th>
                          <th>No. of Questions</th>
                          <th>Marks Per Question</th>
                          <th>Negative Marking</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>English</td>
                          <td>10</td>
                          <td>1</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Hindi</td>
                          <td>10</td>
                          <td>1</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>GK</td>
                          <td>15</td>
                          <td>1</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>COMP</td>
                          <td>15</td>
                          <td>1</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>Maths</td>
                          <td>25</td>
                          <td>1</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>6</td>
                          <td>LR</td>
                          <td>25</td>
                          <td>1</td>
                          <td>0</td>
                        </tr>
                      </tbody>
                    </table>
                    <hr />
                  </div>
                </div>
                <div>
                  <input id="checkbox" type="checkbox" className=" d-inline" onClick={removeClass} />
                  <p id="containClass" className="d-inline" style={{ marginLeft: "10px", fontWeight: "900" }}>The Computer provided to me is in proper working condition.
                    <br />
                    <span className="ps-4">
                      I have read and understood the instruction given above
                    </span>
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-3 infoBeansred d-flex flex-direction-column">
                <div className="row m-0 w-100 ">
                  <div className="col-md-12 col-sm-6 col-6 ">
                    <img src={logo} className="w-100 rounded-circle " alt="" />
                  </div>
                  <div className="col-md-12 col-sm-6 col-6 text-light align-items-center justify-content-center ">
                    <span>
                      <h5><b>Name:</b> {user.username} </h5>
                      <h5><b>Enroll Id:</b> {EnrollId}</h5>
                      <h5><b>DOB:</b> {user.dob}</h5>
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "end", marginBottom: "10%" }}>
                    <button className="btn disabled px-5 py-2" id="check" onClick={portalPageQuestion}>
                      Start Test
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}