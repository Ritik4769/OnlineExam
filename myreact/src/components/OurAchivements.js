import React from 'react';
import logo from '../Images/InfoBeans Foundation Logo - PNG (1).png'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function OurAchivements() {

  const [achivemnts, setAchivemnts] = useState({})
  useEffect(() => {

    const parentElement = document?.getElementById('degree-icon-parent');
    const childElement = document?.getElementById('degree-icon');

    parentElement?.addEventListener('mouseover', function () {
      childElement?.classList?.add('fa-bounce');
    });
    parentElement?.addEventListener('mouseout', function () {
      childElement?.classList?.remove('fa-bounce');
    });

    const parentElement1 = document?.getElementById('company-icon-parent');
    const childElement1 = document?.getElementById('company-icon');

    parentElement1?.addEventListener('mouseover', function () {
      childElement1?.classList?.add('fa-beat');
    });
    parentElement1?.addEventListener('mouseout', function () {
      childElement1?.classList?.remove('fa-beat');
    });

  }, [])

  const [companies, setCompanies] = useState([]);
  var counter = 0;
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:3002/admin/getCompanies")
        const res = await axios.get("http://localhost:3002/admin/getAchivements")
        setCompanies(response.data.companies)
        setAchivemnts(res.data.achivments)
      } catch (error) {
        console.error("Error While Getting Companies", error);
      }
    }
    fetchCompanies();
  }, []);

  return (
    <div className="container-fluid p-0 " >
      <svg width="100%" viewBox="0 0 1285 119" style={{ "marginBottom": "-2px" }} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 35.5256L80 42.4756C160 49.4256 320 63.3256 480 54.0734C640 44.6475 800 12.5037 960 3.07777C1120 -6.17442 1280 7.72558 1360 14.6756L1440 21.6256V118.926H1360C1280 118.926 1120 118.926 960 118.926C800 118.926 640 118.926 480 118.926C320 118.926 160 118.926 80 118.926H0V35.5256Z" fill="#E91F3F" />
      </svg>
      <div className='infoBeansred '>
        <div className='row w-100 m-0'>
          <h1 className='h1 text-center text-white'>Our Achivements</h1>
          <div className='col-12 offset-md-1 col-md-4  mt-4 sparks' id='degree-icon-parent' >
            <h1 className='h1 text-white text-center' id='degree-icon' > <i className="fa-solid fa-graduation-cap " ></i> <br /> {achivemnts.placementnum}+ Placements</h1>
          </div>
          <div className='col-12 offset-md-2 col-md-4  mt-4 mb-4 sparks ' id='company-icon-parent' >
            <h1 className='h1 text-white text-center' id='company-icon' > <i className="fa-solid fa-building"  ></i>  <br /> {achivemnts.compainesnum}+ Companies</h1>
          </div>
        </div>
      </div>
      <svg width="100%" viewBox="0 0 1235 91" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1234.6 55.2249L1154.6 48.2749C1074.6 41.3249 914.604 27.4249 754.604 36.6771C594.604 46.103 434.604 78.2467 274.604 87.6726C114.604 96.9248 -45.396 83.0248 -125.396 76.0748L-205.396 69.1248L-205.396 -28.1752L-125.396 -28.1752C-45.396 -28.1752 114.604 -28.1752 274.604 -28.1752C434.604 -28.1752 594.604 -28.1751 754.604 -28.1751C914.604 -28.1751 1074.6 -28.1751 1154.6 -28.1751L1234.6 -28.1751L1234.6 55.2249Z" fill="#E91F3F" />
      </svg>
      <div className='container-fluid w-100 mt-3' >
        <div className="container h-100">
          <div className="row align-items-center h-100">
            <div className="container rounded">
              <h1 className="text-center  h1" style={{ color: "#E91F3F" }}>Top Companies</h1>
              <div className="slider">
                <div className="logos">
                  {/* <img src={logo} alt="" width='20%' /> */}
                  {
                    companies.map(
                      (comapny, index) => {
                        return (<img key={index} id='ourCompany' src={`http://localhost:3002/${comapny.companyImg}`} alt="" width='20%' />)
                      })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}