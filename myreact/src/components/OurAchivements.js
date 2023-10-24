import React from 'react';
import logo from '../Images/InfoBeans Foundation Logo - PNG (1).png'

export default function OurAchivements() {
  return (
    <div className="container-fluid p-0 " >
      <svg width="100%" viewBox="0 0 1727 273" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-12 49.2406L45.9667 54.5349C103.933 60.2288 219.867 70.218 335.8 75.9119C451.733 81.2062 567.667 81.2062 683.6 70.5177C799.533 60.2288 915.467 38.2524 1031.4 22.5693C1147.33 6.28676 1263.27 -3.7025 1379.2 1.29213C1495.13 6.28676 1611.07 28.2631 1669.03 38.5521L1727 49.2406V273H1669.03C1611.07 273 1495.13 273 1379.2 273C1263.27 273 1147.33 273 1031.4 273C915.467 273 799.533 273 683.6 273C567.667 273 451.733 273 335.8 273C219.867 273 103.933 273 45.9667 273H-12L-12 49.2406Z" fill="#E91F3F" />
      </svg>
      <div className='infoBeansred '>
        <div className='row w-100  m-0'>
          <h1 className='h1 text-center text-white'>Our Achivements</h1>
          <div className='col-12 offset-md-1 col-md-4  mt-5 ' >
            <h1 className='h2 text-white text-center'> <i className="fa-solid fa-graduation-cap"></i> <br /> 100+ Placements</h1>
          </div>
          <div className='col-12 offset-md-2 col-md-4  mt-5 ' >
            <h1 className='h2 text-white text-center'> <i className="fa-solid fa-building"></i>  <br /> 50+ Companies</h1>
          </div>
        </div>
        <div className="container h-100 mt-5">
          <div className="row align-items-center h-100">
            <div className="container rounded">
              <h2 className="text-center text-white">Top Companies</h2>
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
      <svg width="100%" viewBox="0 0 1727 273" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1739 223.759L1681.03 218.465C1623.07 212.771 1507.13 202.782 1391.2 197.088C1275.27 191.794 1159.33 191.794 1043.4 202.482C927.467 212.771 811.533 234.748 695.6 250.431C579.667 266.713 463.733 276.703 347.8 271.708C231.867 266.713 115.933 244.737 57.9667 234.448L0 223.759V0H57.9667C115.933 0 231.867 0 347.8 0C463.733 0 579.667 0 695.6 0C811.533 0 927.467 0 1043.4 0C1159.33 0 1275.27 0 1391.2 0C1507.13 0 1623.07 0 1681.03 0H1739V223.759Z" fill="#E91F3F" />
      </svg>
    </div>
  );
}