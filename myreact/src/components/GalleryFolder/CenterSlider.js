import React from 'react';
import img1 from '../../../src/Images/WhatsApp Image 2023-10-02 at 12.59.50 AM (1).jpeg'
import img2 from '../../../src/Images/WhatsApp Image 2023-10-02 at 12.59.50 AM (1).jpeg'
import axios, { Axios } from 'axios';
import { useEffect, useState } from 'react';
import "./CenterSlider.css"
var BatchDetails = [];
export default function CenterSider() {
    const [sliderData, setSliderData] = useState([]);

    useEffect(() => {
        const getdata = async () => {
            try {
                const category ='Centers';
                var response = await axios.get(`http://localhost:3002/admin/getSliderData/${category}`);
                setSliderData(response.data)
            } catch (error) {
                console.log("Error While Getting Batch Details for main page", error);
            }
        }
        getdata()
    }, [])

    return (
        <div className="container-fluid d-flex justify-content-center ">
            <div className="container">
                <h1 className="text-center "><span style={{ color: "#E91F3F" }}>Center's</span> of InfoBeans Foundation</h1>
                <br />
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {
                            sliderData.map(
                                (data, index) => {
                                    return (
                                        <div key={index} className={index == 0 ? "carousel-item active" : "carousel-item"}>
                                    
                                            <div className="image-container">
                                                <img src={`http://localhost:3002/${data.galleryImg}`} className="d-block w-100 h-100 sliderImage"
                                                    alt="..." />
                                                <div className="hover-box">
                                                    <h3 className="text-white" >{data.photoHeading}</h3>
                                                    <p className="text-white" >{data.photoDescription}</p>
                                                </div>
                                            </div>
                                        </div>)
                                }
                            )
                        }
                    </div>

                    <button className=" carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                        data-bs-slide="prev">
                        <div className=' bg-danger p-1 pre-nxt-btn  d-flex aling-items-center justify-content-center'>
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </div>
                    </button>

                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                        data-bs-slide="next">

                        <div className=' bg-danger p-1 pre-nxt-btn d-flex aling-items-center justify-content-center  '>
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
