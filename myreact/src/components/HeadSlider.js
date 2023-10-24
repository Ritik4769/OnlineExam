import React from 'react';
import imge1 from '../Images/WhatsApp Image 2023-10-01 at 10.00.39 PM (1).jpeg';
import imge2 from '../Images/WhatsApp Image 2023-10-02 at 12.59.50 AM (1).jpeg';
import imge3 from '../Images/WhatsApp Image 2023-10-06 at 12.02.28 AM.jpeg';

export default function HeadSlide() {
  return (
    <div className="d-flex justify-content-center align-items-center">
    <div id="carouselExampleIndicators" className="carousel slide w-100" data-bs-ride="carousel">
        <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img src={imge1} className="d-block w-100"
                    alt="..."/>
            </div>
            <div className="carousel-item">
                <img src={imge2} className="d-block w-100"
                    alt="..."/>
            </div>
            <div className="carousel-item">
                <img src={imge3} className="d-block w-100" alt="..."/>
            </div>
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
