import React from "react";
import { useEffect } from "react";
import Typed from "typed.js";
import logo from "../Images/InfoBeans Foundation LogoOnly.png";

export default function SkillSection() {
    useEffect(() => {
        const initializeTyped = (selector, strings, delay) => {
            return setTimeout(() => {
                new Typed(selector, {
                    strings,
                    typeSpeed: 200,
                    backSpeed: 200,
                    loop: true,
                    cursorChar: "|",
                });
            }, delay);
        };

        const delay = 1000;

        const timeouts = [
            initializeTyped(
                ".en-auto",
                ["Vowels", "Tense"],
                0
            ),
            initializeTyped(
                ".confident-auto",
                ["Confidence", "Empathy", "Respect", "feedback"],
                2 * delay
            ),
            initializeTyped(
                ".team-auto",
                ["Problem Solving", "Innovation", "Personal Growth", "Productivity"],
                4 * delay
            ),
            initializeTyped(
                ".leader-auto",
                ["Inspires Hard Work", "Increases Efficiency", "Motivates Team"],
                6 * delay
            ),
            initializeTyped(
                ".html-auto",
                ["Forms", "Tables", "Div", "Media", "Semantic Tags"],
                delay
            ),
            initializeTyped(
                ".css-auto",
                ["CSS Selectors", "Box Model", "Flexbox", "Grid", "Media Queries"],
                3 * delay
            ),
            initializeTyped(
                ".js-auto",
                ["Asynchronous", "Promises", "Async/Await", "Call Backs"],
                5 * delay
            ),
            initializeTyped(
                ".mongo-auto",
                ["Database", "Collections", "Documents", "Fields", "Query"],
                7 * delay
            ),
        ];

        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, []);

    return (
        <div className="container-fluid mb-5 p-0">
            <h1 className="text-center h1 text-white infoBeansred p-2">Skills</h1>
            <div className="row m-0 p-0 d-none d-md-flex">
                <div className="col-12 col-md-4">
                    {/* English */}
                    <div className="d-flex justify-content-end p-4">
                        <div>
                            <h4 className="p-0 m-0" style={{ width: "200px" }}>
                                <i
                                    className="fa-solid fa-language"
                                    style={{ fontSize: "40px", color: "red" }}
                                ></i>
                                &nbsp; English
                            </h4>
                            <div className="w-100">
                                <span className="en-auto text-muted text-center"></span>
                            </div>
                        </div>
                    </div>
                    {/* Communication */}
                    <div className="d-flex justify-content-center p-4">
                        <div>
                            <h4 className="p-0 m-0" style={{ width: "280px" }}>
                                <i
                                    className="fa-solid fa-volume-high"
                                    style={{ fontSize: "40px", color: "blue" }}
                                ></i>
                                &nbsp; Communication
                            </h4>
                            <div className="w-100">
                                <span className="confident-auto text-muted text-center"></span>
                            </div>
                        </div>
                    </div>
                    {/* Team Work */}
                    <div className="d-flex justify-content-center p-4">
                        <div>
                            <h4 className="p-0 m-0" style={{ width: "280px" }}>
                                <i
                                    className="fa-solid fa-people-group"
                                    style={{ fontSize: "40px", color: "#eeee21" }}
                                ></i>
                                &nbsp; Team Work
                            </h4>
                            <div className="w-100">
                                <span className="team-auto text-muted text-center"></span>
                            </div>
                        </div>
                    </div>
                    {/* Leadership */}
                    <div className="d-flex justify-content-end p-4">
                        <div>
                            <h4 className="p-0 m-0" style={{ width: "200px" }}>
                                <i
                                    className="fa-solid fa-person"
                                    style={{ fontSize: "40px", color: "green" }}
                                ></i>
                                &nbsp; Leadership
                            </h4>
                            <div className="w-100">
                                <span className="leader-auto text-muted text-center"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-4 d-flex align-items-center">
                    <img
                        src={logo}
                        className="w-100"
                        alt="InfoBeans Foundation Logo"
                        id="skillsLogo"
                    />
                </div>

                <div className="col-12 col-md-4">
                    {/* HTML */}
                    <div className="d-flex justify-content-start p-4">
                        <div>
                            <h4 className="p-0 m-0" style={{ width: "200px" }}>
                                <i
                                    className="fa-brands fa-html5"
                                    style={{ fontSize: "40px", color: "red" }}
                                ></i>
                                &nbsp; HTML
                            </h4>
                            <div className="w-100">
                                <span className="html-auto text-muted text-center"></span>
                            </div>
                        </div>
                    </div>
                    {/* CSS */}
                    <div className="d-flex justify-content-center p-4">
                        <div>
                            <h4 className="p-0 m-0" style={{ width: "200px" }}>
                                <i
                                    className="fa-brands fa-css3"
                                    style={{ fontSize: "40px", color: "blue" }}
                                ></i>
                                &nbsp; CSS
                            </h4>
                            <div className="w-100">
                                <span className="css-auto text-muted text-center"></span>
                            </div>
                        </div>
                    </div>
                    {/* JavaScript */}
                    <div className="d-flex justify-content-center p-4">
                        <div>
                            <h4 className="p-0 m-0" style={{ width: "200px" }}>
                                <i
                                    className="fa-brands fa-js"
                                    style={{ fontSize: "40px", color: "#eeee21" }}
                                ></i>
                                &nbsp; JavaScript
                            </h4>
                            <div className="w-100">
                                <span className="js-auto text-muted text-center"></span>
                            </div>
                        </div>
                    </div>
                    {/* MongoDB */}
                    <div className="d-flex justify-content-start p-4">
                        <div>
                            <h4 className="p-0 m-0" style={{ width: "200px" }}>
                                <i
                                    className="fa-brands fa-envira"
                                    style={{ fontSize: "40px", color: "green" }}
                                ></i>
                                &nbsp; MongoDB
                            </h4>
                            <div className="w-100">
                                <span className="mongo-auto text-muted text-center"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-block d-md-none row d-flex justify-content-evenly">
                <div className="col-6 col-md-6 ps-3">
                    {/* English */}
                    <div className="py-4 ps-2">
                        <div style={{ width: "auto" }}>
                            <h6 className="p-0 m-0">
                                <i
                                    className="fa-solid fa-language"
                                    style={{ fontSize: "30px", color: "red" }}
                                ></i>
                                &nbsp; English
                            </h6>
                        </div>
                    </div>
                    {/* Communication */}
                    <div className="py-4 ps-2">
                        <div style={{ width: "auto" }}>
                            <h6 className="p-0 m-0">
                                <i
                                    className="fa-solid fa-volume-high"
                                    style={{ fontSize: "20px", color: "blue" }}
                                ></i>
                                &nbsp; Communication
                            </h6>
                        </div>
                    </div>
                    {/* Team Work */}
                    <div className="py-4 ps-2">
                        <div style={{ width: "auto" }}>
                            <h6 className="p-0 m-0">
                                <i
                                    className="fa-solid fa-people-group"
                                    style={{ fontSize: "30px", color: "#eeee21" }}
                                ></i>
                                &nbsp; Team Work
                            </h6>
                        </div>
                    </div>
                    {/* Leadership */}
                    <div className="py-4 ps-2">
                        <div style={{ width: "auto" }}>
                            <h6 className="p-0 m-0">
                                <i
                                    className="fa-solid fa-person"
                                    style={{ fontSize: "30px", color: "green" }}
                                ></i>
                                &nbsp; Leadership
                            </h6>
                        </div>
                    </div>
                </div>

                <div className="col-6 col-md-6">
                    {/* HTML */}
                    <div className="p-4">
                        <div style={{ width: "auto" }}>
                            <h6 className="p-0 m-0">
                                <i
                                    className="fa-brands fa-html5"
                                    style={{ fontSize: "30px", color: "red" }}
                                ></i>
                                &nbsp; HTML
                            </h6>
                        </div>
                    </div>
                    {/* CSS */}
                    <div className="p-4">
                        <div style={{ width: "auto" }}>
                            <h6 className="p-0 m-0">
                                <i
                                    className="fa-brands fa-css3"
                                    style={{ fontSize: "30px", color: "blue" }}
                                ></i>
                                &nbsp; CSS
                            </h6>
                        </div>
                    </div>
                    {/* JavaScript */}
                    <div className="p-4">
                        <div style={{ width: "auto" }}>
                            <h6 className="p-0 m-0">
                                <i
                                    className="fa-brands fa-js"
                                    style={{ fontSize: "30px", color: "#eeee21" }}
                                ></i>
                                &nbsp; JavaScript
                            </h6>
                        </div>
                    </div>
                    {/* MongoDB */}
                    <div className="p-4">
                        <div style={{ width: "auto" }}>
                            <h6 className="p-0 m-0">
                                <i
                                    className="fa-brands fa-envira"
                                    style={{ fontSize: "30px", color: "green" }}
                                ></i>
                                &nbsp; MongoDB
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
