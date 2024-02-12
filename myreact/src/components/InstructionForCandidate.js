import React from "react";

export default function InstructionForCandidate() {
    return (
        <div className="p-2" >
            <h1 >
                {" "}
                Instructions for Online Examinations
            </h1>
            <p className=" text-danger">
                Please read the instruction carefully before starting the
                test.
            </p>
            <ol type="1">
                <li>
                    Click start test on bottom of your screen to begin
                    the test.
                </li>
                <li>
                    Mobile and smart watch are not allowed in during exam you
                    keep your mobile and watch in your bag.{" "}
                </li>
                <li>
                    The clock has been set at server and Count Downtimer at
                    the top Right side of the screen will display left out
                    time to closure from where you can monitor time you have
                    to complete exam
                </li>
                <li>
                    Click on one of the answer,simply click the desired
                    option.
                </li>
                <li>
                    Candidate can change their response of atempted answer
                    anytime during examination slot time by clicking another
                    answer which candidates want to change answer.
                </li>
                <li>
                    Six subject button on top of your screen select the
                    subject and attempt their question
                </li>
                <li>
                    All subject have equal question and all question carry
                    equal number.
                </li>
                <li>Click on previous to going on previous question</li>
                <li>Click on next to going on next question.</li>
                <li>
                    The color coded daigram on right side of screen show the
                    status of questions.
                    <ul>
                        <li>
                            <div
                                className="green"
                                style={{ backgroundColor: "green" }}
                            ></div>{" "}
                            <div className="px-2">
                                {" "}
                                <p>
                                    : Answered / Attempted Question
                                </p>{" "}
                            </div>
                        </li>
                        <li>
                            <div
                                className="red"
                                style={{ backgroundColor: "red" }}
                            ></div>{" "}
                            <div className="px-2">
                                {" "}
                                <p>
                                    : Visited / Not Attempted Question
                                </p>{" "}
                            </div>
                        </li>
                        <li>
                            <div
                                className="yellow"
                                style={{ backgroundColor: "yellow" }}
                            ></div>{" "}
                            <div className="px-2">
                                {" "}
                                <p>
                                    : Answered / Marked for review
                                </p>{" "}
                            </div>
                        </li>
                        <li>
                            <div
                                className="grey"
                                style={{ backgroundColor: "grey" }}
                            ></div>{" "}
                            <div className="px-2">
                                {" "}
                                <p>: Not Visited Question</p>{" "}
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    All the answered questions will be counted for final
                    result
                </li>
                <li>
                    Their is no negative marking for incorrect/wrong{" "}
                    answer
                </li>
                <li>
                    Result will be declared between 2-3 days after exam.
                </li>
            </ol>
        </div>
    );
}