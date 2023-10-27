import React from 'react';
import logo from '../Images/InfoBeans Foundation Logo - PNG (1).png'

export default function OurAchivements() {
  return (
    <div className="container-fluid p-0 " >
    {/* <svg width="100%"   viewBox="0 0 1727 273" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M-12 49.2406L45.9667 54.5349C103.933 60.2288 219.867 70.218 335.8 75.9119C451.733 81.2062 567.667 81.2062 683.6 70.5177C799.533 60.2288 915.467 38.2524 1031.4 22.5693C1147.33 6.28676 1263.27 -3.7025 1379.2 1.29213C1495.13 6.28676 1611.07 28.2631 1669.03 38.5521L1727 49.2406V273H1669.03C1611.07 273 1495.13 273 1379.2 273C1263.27 273 1147.33 273 1031.4 273C915.467 273 799.533 273 683.6 273C567.667 273 451.733 273 335.8 273C219.867 273 103.933 273 45.9667 273H-12L-12 49.2406Z" fill="#E91F3F" />
    </svg> */}
    <svg width="100vw" viewBox="0 0 1285 119" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 35.5256L80 42.4756C160 49.4256 320 63.3256 480 54.0734C640 44.6475 800 12.5037 960 3.07777C1120 -6.17442 1280 7.72558 1360 14.6756L1440 21.6256V118.926H1360C1280 118.926 1120 118.926 960 118.926C800 118.926 640 118.926 480 118.926C320 118.926 160 118.926 80 118.926H0V35.5256Z" fill="#E91F3F"/>
</svg>



    <div className='infoBeansred '>
      <div className='row w-100  m-0'>
        <h1 className='h1 text-center text-white'>Our Achivements</h1>
        <div className='col-12 offset-md-1 col-md-4  mt-4 sparks' id='degree-icon-parent' >
         
        
          <h1 className='h1 text-white text-center' id='degree-icon' > <i className="fa-solid fa-graduation-cap " ></i> <br /> 100+ Placements</h1>
        </div>
        <div className='col-12 offset-md-2 col-md-4  mt-4 mb-4 sparks ' id='company-icon-parent' >
          <h1 className='h1 text-white text-center' id='company-icon' > <i className="fa-solid fa-building"  ></i>  <br /> 50+ Companies</h1>
        </div>
      </div>

     
      

    </div>
    {/* <svg width="100%" viewBox="0 0 1727 273" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1739 223.759L1681.03 218.465C1623.07 212.771 1507.13 202.782 1391.2 197.088C1275.27 191.794 1159.33 191.794 1043.4 202.482C927.467 212.771 811.533 234.748 695.6 250.431C579.667 266.713 463.733 276.703 347.8 271.708C231.867 266.713 115.933 244.737 57.9667 234.448L0 223.759V0H57.9667C115.933 0 231.867 0 347.8 0C463.733 0 579.667 0 695.6 0C811.533 0 927.467 0 1043.4 0C1159.33 0 1275.27 0 1391.2 0C1507.13 0 1623.07 0 1681.03 0H1739V223.759Z" fill="#E91F3F" />
    </svg> */}

<svg width="100vw" viewBox="0 0 1235 91" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1234.6 55.2249L1154.6 48.2749C1074.6 41.3249 914.604 27.4249 754.604 36.6771C594.604 46.103 434.604 78.2467 274.604 87.6726C114.604 96.9248 -45.396 83.0248 -125.396 76.0748L-205.396 69.1248L-205.396 -28.1752L-125.396 -28.1752C-45.396 -28.1752 114.604 -28.1752 274.604 -28.1752C434.604 -28.1752 594.604 -28.1751 754.604 -28.1751C914.604 -28.1751 1074.6 -28.1751 1154.6 -28.1751L1234.6 -28.1751L1234.6 55.2249Z" fill="#E91F3F"/>
</svg>


    <div className='container-fluid w-100  mt-3  ' >
      <div className="container h-100">
        <div className="row align-items-center h-100">
          <div className="container rounded">
              
            
            <h1 className="text-center text-black h1 ">Top Companies</h1>
            <div className="slider">
              <div className="logos">
                <img src={logo} alt="" width='20%' />
                <img src={logo} alt="" width='20%' />
                <img src={logo} alt="" width='20%' />
                <img src={logo} alt="" width='20%' />
                <img src={logo} alt="" width='20%' />
              </div>
              <div className="logos">
                <img src={logo} alt="" width='20%' />
                <img src={logo} alt="" width='20%' />
                <img src={logo} alt="" width='20%' />
                <img src={logo} alt="" width='20%' />
                <img src={logo} alt="" width='20%' />
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>


  </div>


  );
}