import React from 'react';
import img1 from '../Images/WhatsApp Image 2023-10-01 at 10.00.39 PM (1).jpeg';
import img2 from '../Images/WhatsApp Image 2023-10-02 at 12.59.50 AM (1).jpeg';

export default function OurBatches() {
  return (

    <div className="container-fluid d-flex justify-content-center mb-5">
    <div className="container">
        <h1 className="text-center text-danger">Our Batches</h1>
        <br/>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div className="image-container">
                        <img src={img1} className="d-block w-100"
                            alt="..."/>
                        <div className="hover-box">
                            <h3 className="text-white" >ITEP-Batch 5</h3>
                            <p className="text-white" >SGSITS College Indore</p>
                        </div>
                    </div>
                </div>
                <div className="carousel-item ">
                    <div className="image-container">
                        <img src={img2} className="d-block w-100"
                            alt="..."/>
                            <div className="hover-box">
                                <h3 className=" h3 text-white" >ITEP-Batch 5</h3>
                                <p className="  text-white" >SGSITS College Indore</p>
                            </div>
                    </div>
                </div>
           
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
