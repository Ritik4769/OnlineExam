import React from 'react';
import img1 from '../Images/WhatsApp Image 2023-10-01 at 10.00.39 PM (1).jpeg';
import img2 from '../Images/WhatsApp Image 2023-10-02 at 12.59.50 AM (1).jpeg';
import axios, { Axios } from 'axios';
import { useEffect, useState } from 'react';
var BatchDetails = [];
export default function OurBatches() {
    const [BatchDetails, setBatches] = useState([])
    useEffect(() => {
        const getBatches = async () => {
            try {
                var response = await axios.get('http://localhost:3002/admin/getBatchDetails');
                setBatches(response.data)
            } catch (error) {
                console.log("Error While Getting Batch Details for main page");
                console.log(error);
            }
        }
        getBatches()
    }, [])

    return (
        <div className="container-fluid d-flex justify-content-center mb-5">
            <div className="container mb-3">
                <h1 className="text-center text-danger">Our Batches</h1>
                <br />
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {
                            BatchDetails.map(
                                (Batch, index) => {
                                    return (
                                        <div key={index} className={index == 0 ? "carousel-item active" : "carousel-item"}  style={{ overflow: "hidden", aspectRatio: "7/3", objectFit: "contain" }}>
                                            <div className="image-container">
                                                <img src={`http://localhost:3002/${Batch.batchImage}`} className="d-block" style={{ width: '100%', height: '100%'}}
                                                    alt="..." />
                                                <div className="hover-box">
                                                    <h3 className="text-white" >{Batch.batchName}</h3>
                                                    <p className="text-white" >{Batch.batchCenter}</p>
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
