import React from 'react';
import imge1 from '../Images/Banner1.jpg';
import imge2 from '../Images/registration-form-image.jpg';
import imge3 from '../Images/Banner1.jpg';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function HeadSlide() {
    const [bannerDetails, setBanners] = useState([])
    useEffect(() => {
        const getBatches = async () => {
            try {
                var response = await axios.get('http://localhost:3002/admin/getbannerDetails');
                setBanners(response.data)
            } catch (error) {
                console.log("Error While Getting Batch Details for main page", error);
            }
        }
        getBatches()
    }, [])

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div id="carouselExampleIndicators" className="carousel slide w-100" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {bannerDetails.map(
                        (banner, index) => {
                            return (
                                <div key={index} className={index === 0 ? "carousel-item active" : "carousel-item"} style={{ overflow: "hidden", backgroundColor: "black", aspectRatio: "6/2", objectFit: "cover" }}>
                                    <img src={`http://localhost:3002/${banner.bannerImg}`} className="d-block w-100 h-100" alt="..." />
                                </div>
                            )
                        }
                    )}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <div className=' bg-danger p-1 pre-nxt-btn d-flex aling-items-center justify-content-center  '>
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </div>
                </button>

                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <div className=' bg-danger p-1 pre-nxt-btn d-flex aling-items-center justify-content-center  '>
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </div>
                </button>
            </div>
        </div>
    );
}
