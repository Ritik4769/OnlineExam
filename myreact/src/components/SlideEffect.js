import imge1 from '../Images/WhatWeDo.png';
import imge2 from '../Images/InfoBeans Foundation Logo - PNG (1).png';
import React, { useEffect } from 'react';
import { initializeSlider } from '../sliderEffect';

export default function SlideEffect() {
  useEffect(() => {
    initializeSlider();
  }, []);

  return (
    <>
    <div className="container-fluid infoBeansred bigDeviceSections p-0">
      <div className="container-fluid bg-white" id='SlideEffect'>
        <div id="text-image-scroll" className="text-image-scroll-viewer">
          <div id="text-wrapper" className="text-wrapper">
            <div id="hero-digital-transformation" className="slide-text-container">
              <div className="hero-content">
                <h1 className=" h1">What We Do ?</h1>
                <p  >InfoBeans Technologies, via the InfoBeans Foundation, focuses on CSR initiatives that educate underprivileged children in web and app development. We provide essential skills, mentorship, and training to empower them for employment opportunities in the software industry. Our commitment is to brighten their futures through technology education and skill development.</p>
              </div>
            </div>
            <div id="hero-product-engineering" className="slide-text-container">
              <div className="hero-content">
                <h1 className="h1">What is InfoBeans Foundation ?</h1>
                <p>InfoBeans Technologies, via the InfoBeans Foundation, focuses on CSR initiatives that educate underprivileged children in web and app development. We provide essential skills, mentorship, and training to empower them for employment opportunities in the software industry. Our commitment is to brighten their futures through technology education and skill development.</p>
              </div>
            </div>
          </div>

          <div id="images-wrapper" className="images-wrapper">
            <div id="center-image1" className="images">
              <img className="ios_devices" src={imge1} alt="Digital Transformation" />
            </div>
            <div id="center-image2" className="images">
              <img className="ios_devices" src={imge2} alt="Product Engineering" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="container-fluid infoBeansred p-0 smallDeviceSections">
      <div className="container-fluid bg-white" id='SlideEffect'>
        <section>
          <div className="container" style={{ marginTop: "5vh" }}>
            <div className="row">
              <div className="column col-lg-6 px-4 pt-4 pb-1 section-content hero-content1">
                <div className="change" style={{ position: "relative" }}>
                  <h1 className='main-heading1'>What We Do ?</h1>
                  <p className='pe-5' style={{ fontSize: "3vw", marginTop: "5vh", hyphens: "none" }}>InfoBeans Technologies, via the InfoBeans Foundation, focuses on CSR initiatives that educate underprivileged children in web and app development. We provide essential skills, mentorship, and training to empower them for employment opportunities in the software industry. Our commitment is to brighten their futures through technology education and skill development.</p>
                </div>
              </div>
              <div className="column col-lg-6 section-image">
                <div className="imgdiv container">
                  <img src={imge1} className="img-fluid" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container" style={{ marginTop: "5vh" }}>
            <div className="row">
              <div className="column col-lg-6 px-4 pt-4 pb-1 section-content hero-content1">
                <div className="change" style={{ position: "relative" }}>
                  <h1 className='main-heading1'>What is InfoBeans Foundation ?</h1>
                  <p style={{ fontSize: "3vw", marginTop: "5vh", hyphens: "none" }}>
                    InfoBeans Technologies, via the InfoBeans Foundation, focuses on CSR initiatives that educate underprivileged children in web and app development. We provide essential skills, mentorship, and training to empower them for employment opportunities in the software industry. Our commitment is to brighten their futures through technology education and skill development.
                  </p>
                </div>
              </div>
              <div className="column col-lg-6 section-image">
                <div className="imgdiv container">
                  <img src={imge2} className="img-fluid" style={{ marginBottom: "10vh" }} alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </>
  );
}
