import React from "react";
import { useEffect } from "react";
import Typed from "typed.js";

export default function SkillSection() {
  // useEffect(() => {
  //   new Typed(".en-auto", {
  //     strings: ["Vovels", "Tense"],
  //     typeSpeed: 150,
  //     backSpeed: 150,
  //     loop: true,
  //     cursorChar:"\u00A0"
  //   });

  //   new Typed(".confident-auto", {
  //     strings: ["Confidence", "Empathy", "Respect", "feedback"],
  //     typeSpeed: 150,
  //     backSpeed: 150,
  //     loop: true,
  //     cursorChar:"\u00A0"
  //   });

  //   new Typed(".team-auto", {
  //     strings: [
  //       "Problem Solving",
  //       "Innovation",
  //       "Personal Growth",
  //       "Productivity",
  //     ],
  //     typeSpeed: 150,
  //     backSpeed: 150,
  //     loop: true,
  //     cursorChar:"\u00A0"
  //   });

  //   new Typed(".leader-auto", {
  //     strings: ["Inspires Hard Work", "Increases Efficiency", "Motivates Team"],
  //     typeSpeed: 150,
  //     backSpeed: 150,
  //     loop: true,
  //     cursorChar:"\u00A0"
  //   });

  //   new Typed(".html-auto", {
  //     strings: ["Forms", "Tables", "Div", "Media", "Semantic Tags"],
  //     typeSpeed: 150,
  //     backSpeed: 150,
  //     loop: true,
  //     cursorChar:"\u00A0"
  //   });

  //   new Typed(".css-auto", {
  //     strings: [
  //       "CSS Selectors",
  //       "Box Model",
  //       "Flexbox",
  //       "Grid",
  //       "Media Queries",
  //     ],
  //     typeSpeed: 150,
  //     backSpeed: 150,
  //     loop: true,
  //     cursorChar:"\u00A0"
  //   });

  //   new Typed(".js-auto", {
  //     strings: [
  //       "Asynchronous",
  //       "Box Model",
  //       "Promises",
  //       "Async/Await",
  //       "Call Backs",
  //     ],
  //     typeSpeed: 150,
  //     backSpeed: 150,
  //     loop: true,
  //     cursorChar:"\u00A0"
  //   });

  //   new Typed(".mongo-auto", {
  //     strings: ["DataBase", "Collections", "Documents", "Fields", "Query"],
  //     typeSpeed: 150,
  //     backSpeed: 150,
  //     loop: true,
  //     cursorChar:"\u00A0"
  //   });
  // },[]);

  useEffect(() => {
    const initializeTyped = (selector, strings, delay) => {
      return setTimeout(() => {
        new Typed(selector, {
          strings,
          typeSpeed: 150,
          backSpeed: 150,
          loop: true,
          cursorChar: "|",
        });
      }, delay);
    };

    // Delay between instances
    const delay = 500;

    const timeouts = [
      initializeTyped(".en-auto", ["Vowels", "Tense"], 0),
      initializeTyped(".confident-auto", ["Confidence", "Empathy", "Respect", "feedback"], delay),
      initializeTyped(".team-auto", ["Problem Solving", "Innovation", "Personal Growth", "Productivity"], 2 * delay),
      initializeTyped(".leader-auto", ["Inspires Hard Work", "Increases Efficiency", "Motivates Team"], 3 * delay),
      initializeTyped(".html-auto", ["Forms", "Tables", "Div", "Media", "Semantic Tags"], 4 * delay),
      initializeTyped(".css-auto", ["CSS Selectors", "Box Model", "Flexbox", "Grid", "Media Queries"], 5 * delay),
      initializeTyped(".js-auto", ["Asynchronous", "Promises", "Async/Await", "Call Backs"], 6 * delay),
      initializeTyped(".mongo-auto", ["Database", "Collections", "Documents", "Fields", "Query"], 7 * delay),
    ];

    return () => {
      // Clear timeouts on component unmount
      timeouts.forEach(clearTimeout);
    };
  }, []);





  return (
    <div className="container-fluid infoBeansred p-0">
      <div className="container-fluid bg-white" id="curve-div">
        <div className="container p-5">
          <h1 className="text-center h1 text-danger">Skill</h1>
          <div className="row ">
            <div className="col-12 col-lg-6">
              <div className="w-100">
                <div className="w-100">
                  <h4 className=" text-center text-danger">Soft Skills</h4>
                </div>
                <div className=" w-100 ">
                  <div
                    className="w-50 d-flex align-items-start"
                    style={{ marginLeft: "20%" }}
                  >
                    <ul className="row list-unstyled p-0 m-0 ">
                      <div className="col-12 mt-5">
                        <li className="">
                          {" "}
                          <i
                            className="fa-solid fa-language"
                            style={{ fontSize: "40px", color: "orange" }}
                          ></i>
                          &nbsp; English
                        </li>
                      </div>
                      <div className="col-12 pt-1">
                        <div>
                          <span className="en-auto text-muted text-center"></span>
                        </div>
                      </div>
                      <div className="col-12  mt-5   ">
                        <li className="">
                          {" "}
                          <i
                            className="fa-solid fa-volume-high"
                            style={{ fontSize: "40px", color: "lightgreen" }}
                          ></i>
                          &nbsp;Communication
                        </li>
                      </div>

                      <div className="col-12 pt-1">
                        <div>
                          <span className="confident-auto text-muted"></span>
                        </div>
                      </div>
                      <div className="col-12 mt-5">
                        <li className="">
                          {" "}
                          <i
                            className="fa-solid fa-people-group"
                            id="figma-icon"
                            style={{ fontSize: "40px" }}
                          ></i>
                          &nbsp;&nbsp;Team Work
                        </li>
                      </div>
                      <div className="col-12 pt-1">
                        <div>
                          <span className="team-auto text-muted"></span>
                        </div>
                      </div>
                      <div className="col-12  mt-5">
                        <li className="">
                          {" "}
                          <i
                            className="fa-solid fa-person"
                            id="java-icon"
                            style={{ fontSize: "40px" }}
                          ></i>
                          &nbsp;&nbsp;Leadership
                        </li>
                      </div>
                      <div className="col-12    pt-1">
                        <div>
                          <span className="leader-auto text-muted "></span>
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="w-100 ">
                <div className="w-100">
                  <h4 className=" text-center text-danger">Hard Skills</h4>
                </div>
                <div className=" w-100 ">
                  <div
                    className="w-50 d-flex align-items-start"
                    style={{ marginLeft: "20%" }}
                  >
                    <ul className="row list-unstyled p-0 m-0 ">
                      <div className="col-12 mt-5">
                        <li className="">
                          {" "}
                          <i
                            className="fa-brands fa-html5"
                            style={{ fontSize: "40px", color: "red" }}
                          ></i>
                          &nbsp; HTML
                        </li>
                      </div>
                      <div className="col-12 pt-1">
                        <div>
                          <span className="html-auto text-muted text-center"></span>
                        </div>
                      </div>
                      <div className="col-12  mt-5  ">
                        <li className="">
                          {" "}
                          <i
                            className="fa-brands fa-css3"
                            style={{ fontSize: "40px", color: "blue" }}
                          ></i>
                          &nbsp;Css
                        </li>
                      </div>
                      <div className="col-12 pt-1">
                        <div>
                          <span className="css-auto text-muted"></span>
                        </div>
                      </div>
                      <div className="col-12 mt-5">
                        <li className="">
                          <i
                            className="fa-brands fa-js"
                            style={{ fontSize: "40px", color: "darkyellow" }}
                          ></i>
                          &nbsp;Java Script
                        </li>
                      </div>
                      <div className="col-12 pt-1">
                        <div>
                          <span className="js-auto text-muted"></span>
                        </div>
                      </div>
                      <div className="col-12  mt-5">
                        <li className="">
                          {" "}
                          <i
                            className="fa-brands fa-envira"
                            style={{ fontSize: "40px", color: "green" }}
                          ></i>
                          &nbsp;Mongo Db
                        </li>
                      </div>
                      <div className="col-12    pt-1">
                        <div>
                          <span className="mongo-auto text-muted "></span>
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
