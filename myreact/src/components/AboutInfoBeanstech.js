import InfoBeanslogo from "../Images/InfoBeansLogo.svg"
import "./AboutInfoBeanstech.css"

function AboutInfoBeanstech() {
    return (<>

        <div className="container mt-5 mb-5">
            <div className="row m-0 w-100" id="Mainbox">
                <div className=" col-12 col-sm-12  col-md-12 col-lg-5 p-5 d-flex justify-content-center" >
                    <img src={InfoBeanslogo} className="w-75" alt="" />
                </div>
                <div className=" col-12 col-sm-12 col-md-12 col-lg-7 bg-secondary p-3" >
                    <h1 className="text-white">About <br /> InfoBeans  <span className="text-danger" >Technologies</span></h1>
                    <p id="aboutPara" className="fs-5 text-white" >InfoBeans is a global digital transformation company that designs, builds and manages digital applications. Our mission is to do meaningful work that creates long term value for our entire ecosystem — our team, clients, partners, shareholders and the environment.</p>
                </div>
            </div>
        </div>
    </>);
}

export default AboutInfoBeanstech;