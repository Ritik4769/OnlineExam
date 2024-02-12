import React, { useState, useEffect } from "react";
import './celebrationStyle.css'
import img1 from '../../Images/WhatsApp Image 2023-10-01 at 10.00.39 PM (1).jpeg'
import { Carousel } from "bootstrap";
import axios from 'axios';

export default function CelebrationSlider() {

    const [sliderData, setSliderData] = useState([]);

    useEffect(() => {
        const getdata = async () => {
            try {
                const category ='Celebration';
                var response = await axios.get(`http://localhost:3002/admin/getSliderData/${category}`);
                setSliderData(response.data)
            } catch (error) {
                console.log("Error While Getting Batch Details for main page", error);
            }
        }
        getdata()
    }, [])

    useEffect(() => {
        var preCelebrationBtn1 = document.getElementById("preCelebrationBtn1");
        var nextCelebrationBtn2 = document.getElementById("nextCelebrationBtn2");

        preCelebrationBtn1.addEventListener("click", () => {
            document.getElementById("preCelebrationBtn2").click()
        });
        nextCelebrationBtn2.addEventListener("click", () => {
            document.getElementById("nextCelebrationBtn1").click()
        });

        var mainContainer = document.getElementById("main-Container1");
        const CelebrationImageCarousel = new Carousel(document.getElementById('CelebrationImageController'), {
            interval: 3000,
            pause: 'hover',
            wrap: true
        });
        const CelebrationContainCarousel = new Carousel(document.getElementById('CelebrationContainController'), {
            interval: 3000,
            pause: 'hover',
            wrap: true
        });

        CelebrationImageCarousel.cycle();
        CelebrationContainCarousel.cycle();

        mainContainer.addEventListener("mouseover", () => {
            CelebrationImageCarousel.pause();
            CelebrationContainCarousel.pause();
        });
        mainContainer.addEventListener("mouseout", () => {
            CelebrationImageCarousel.cycle();
            CelebrationContainCarousel.cycle();
        });

        return () => {
            mainContainer.removeEventListener("mouseover", () => {
                CelebrationImageCarousel.pause();
                CelebrationContainCarousel.pause();
            });
            mainContainer.removeEventListener("mouseout", () => {
                CelebrationImageCarousel.cycle();
                CelebrationContainCarousel.cycle();
            });
        };
    }, []);

    return (
        <div className="p-5">
            <h1 className="text-center"><span style={{ color: "#E91F3F" }}>Celebrations</span> at InfoBeans Foundation</h1>
            <br />
            <div className="container-fluid p-0  d-flex" id="main-Container1" >
                <button type="button" id="preCelebrationBtn1" data-bs-target="#CelebrationImageController"
                    data-bs-slide="prev" style={{ backgroundColor: 'transparent', border: 'none' }}><i className="bi bi-caret-left-fill fs-1 text-danger"></i></button>
                <div className="row m-0 w-100 bg-secondary" id="row-div">
                    <div className=" col-12 col-md-8 p-0">
                        <div id="CelebrationImageController" className="carousel slide " data-bs-ride="false">
                            <div className="carousel-inner">
                                {sliderData.map(
                                    (banner, index) => {
                                        return (
                                            <div key={index} className="carousel-item active">
                                                <img src={`http://localhost:3002/${banner.galleryImg}`}  className="d-block w-100 sliderImage" alt="..." />
                                            </div>
                                        )
                                    }
                                )}
                            </div>
                            <button className="carousel-control-next d-none" id="nextCelebrationBtn1" type="button"
                                data-bs-target="#CelebrationImageController" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 p-0">
                        <div id="CelebrationContainController" className="carousel slide vertical position-relative h-100 w-100"
                            data-bs-ride="false">
                            <div className="carousel-inner h-100 w-100">
                                {sliderData.map(
                                    (banner, index) => {
                                        return (

                                            <div key={index} className="carousel-item active h-100 w-100 infoBeansred p-3">
                                                <div className="h-50 w-100 d-flex justify-content-center align-items-end" >
                                                    <h2 className="text-center text-white" >{banner.photoHeading}</h2>
                                                </div>
                                                <div className="h-50 w-100 d-flex justify-content-center" >
                                                    <p className=" text-white text-center">{banner.photoDescription}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                )}

                            </div>
                            <button className="carousel-control-prev d-none" type="button" id="preCelebrationBtn2"
                                data-bs-target="#CelebrationContainController" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                        </div>
                    </div>
                </div>
                <button type="button" id="nextCelebrationBtn2" data-bs-target="#CelebrationContainController"
                    data-bs-slide="next" style={{ backgroundColor: 'transparent', border: 'none' }}><i className="bi bi-caret-right-fill fs-1 text-danger"></i></button>
            </div>
        </div>
    );
}