import React from 'react';


export default function SkillSection() {
  return (

   
<div className="container-fluid infoBeansred p-0">
            <div className="container-fluid bg-white" id='curve-div' >
                <div className="container p-5">
                    <h1 className="text-center h1 text-danger">Skill</h1>
                    <div className="row">
                        <div className="col-12 col-md-6 d-flex justify-content-center ">
                            <div>
                                <h4 className="text-danger text-danger">Soft Skills</h4>
                              
                                <ul className="list-unstyled">
                                    <li> <i className="fa-solid fa-code" id='code-icon' ></i>&nbsp;&nbsp; Devleopement</li> <br/>
                                    <li> <i className="fa-solid fa-user" id='User-icon'  ></i>&nbsp;&nbsp;Devleopement</li>
                                    <br/>
                                    <li> <i className="fa-brands fa-figma" id='figma-icon'></i>&nbsp;&nbsp;Figma</li> <br/>
                                    <li> <i className="fa-solid fa-mug-hot" id='java-icon' ></i>&nbsp;&nbsp;Java
                                    </li> <br/>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 d-flex justify-content-center ">
                            <div>
                                <h4 className="text-danger text-danger">Hard Skills</h4>
                                <ul className="list-unstyled">
                                    <li> <i className="fa-brands fa-html5" id='html-icon' ></i>&nbsp;&nbsp;HTML
                                    </li> <br/>
                                    <li> <i className="fa-brands fa-bootstrap " id='btsrp-icon' ></i>&nbsp;&nbsp;BootStrap</li> <br/>
                                    <li> <i className="fa-brands fa-square-js" id='js-icon' ></i>&nbsp;&nbsp;JavaScript</li> <br/>
                                    <li><i className="fa-brands fa-envira" id='mongo-icon'></i>&nbsp;&nbsp;Mongo Db</li> <br/>
                                  </ul>
                                  </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        

 
  );
}
