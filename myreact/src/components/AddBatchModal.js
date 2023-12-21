import React, { useState,useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
var batchObj = {};
var Trainers=[];
function AddBatchModal(props) {
    const [messageObj, setMessageObj] = useState({
        message: "",
        class: "",
        icon: <></>,
    });
    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);
    const toggle = () => setModal(!modal);
    const toggleNested = () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);
    };
    const toggleAll = () => {
        setNestedModal(!nestedModal);
        setCloseAll(true);
    };
    
    const [messageBox, setMessageBox] = useState();
    var batchname=false,trainername=false,center=false,startdate=false,enddate=false,batchimage=false;
    const validateField = (name, value) => {
        let error = '';

        switch (name) {
                case 'trainerName':
                    if (value == '') {
                        document.getElementById("trainerName").innerHTML = "Center Required";
                        trainername = false;
                        return false;
                    }
                    else {               
                        trainername = true;
                        return true;                    
                    }
                break;
                case 'batchName':
                    if (value.trim() == "") {
                        document.getElementById("batchName").style.color = "red";
                        document.getElementById("batch").innerHTML = "Company Name Required";
                        batchname = false;
                        return false;
                    }
                    else {
                        var reg = /^[0-9A-Za-z\s]+$/;
                        if (reg.test(value)) {
                            document.getElementById('batchName').style.color = "green";
                            document.getElementById("batch").innerHTML = "";                        
                            batchname = true;
                            return true
                        }
                        else{
                            document.getElementById('batchName').style.color = "red";
                            document.getElementById("batch").innerHTML = "Invalid Company name";                        
                            batchname = true;
                            return true
                        }                        
                    }
                break;      
                
                case 'startDate':
                    if (value == "") {
                        document.getElementById("startDate").style.color = "red";
                        document.getElementById("sdate").innerHTML = "Joining Date Required";
                        startdate = false;
                        return false;
                    }
                    else {               
                        document.getElementById("startDate").style.color = "green";
                        document.getElementById("sdate").innerHTML = "";
                        startdate = true;
                        return true;                    
                    }
                break;

                case 'endDate':
                    if (value == "") {
                        document.getElementById("endDate").style.color = "red";
                        document.getElementById("edate").innerHTML = "Joining Date Required";
                        enddate = false;
                        return false;
                    }
                    else {               
                        document.getElementById("endDate").style.color = "green";
                        document.getElementById("edate").innerHTML = "";
                        enddate = true;
                        return true;                    
                    }
                break;
                
                case 'batchCenter':
                    if (value == '') {
                        document.getElementById("center").innerHTML = "Center Required";
                        center = false;
                        return false;
                    }
                    else {               
                        center = true;
                        return true;                    
                    }
                break;
                case 'batchImage':
                    var batchImage = document.getElementById("batchImage");
                    if (batchImage.files.length === 0) {
                        document.getElementById("img").innerHTML = "Image Required";
                        batchimage = false;
                        return false;
                    }
                    else {               
                        batchimage = true;
                        return true;                    
                    }
                break;

            default:
                break;
        }
        return error;
    };
    
    const [centers,setCenters]=useState([]);
    
     useEffect(()=>{
     const fetchCenters = async () => {
            try {
                const response = await axios.get('http://localhost:3002/admin/getCenters');
                var Centers = response.data;
                console.log(Centers);
                setCenters(Centers);
            } catch (error) {
                console.error('Error fetching data:', error);
                Trainers = [{ name: "Unable to get Centers Data" }];
            }
        };
        fetchCenters();
     },[]);    

    var getBatchdata = (e) => {
        var { name, value } = e.target;
        if (e.target.type === "file") {
            const batchImg = e.target.files[0];
            validateField(name,value);
            batchObj = { ...batchObj, [name]: batchImg };
        } else {
            validateField(name,value);
            batchObj = { ...batchObj, [name]: value };
        }
    };
    useEffect(()=>{
        var getTrainers =async ()=>{
         try {
             const response = await axios.get('http://localhost:3002/admin/getTrainers');
              Trainers=response.data;
         } catch (error) {
           console.error('Error fetching data:', error);
           Trainers=[{name:"Unable to get Trainers Data"}]
         }
        } 
        getTrainers()
     },[batchObj])

    function addBatch(e) {
        const formData = new FormData();
        for (const key in batchObj) {
            if (batchObj[key]) {
                formData.append(key, batchObj[key]);
            }
        }
        try {
            if(batchname && trainername && startdate && enddate && center && batchimage){
            axios.post(`http://localhost:3002/admin/addBatch`, formData)
                .then((result) => {
                    if (result.data.status == "Batch Adeed Sucessfully!!!!") {
                        setMessageObj({
                            message: result.data.status,
                            class: "alert alert-primary",
                            icon: <i className="bi bi-check-lg"></i>,
                        });
                    } else {
                        setMessageObj({
                            message: result.data.status,
                            class: "alert alert-danger",
                            icon: <i className="bi bi-dash-circle"></i>,
                        });
                    }

                    if (result.status === 201) {
                        setTimeout(() => {
                            toggle();
                            setMessageObj({ message: "", class: "", icon: <></> });
                        }, 1000);
                    } else {
                        console.log(result.data.status);
                    }
                })
                .catch((error) => {
                    setMessageObj({
                        message: "Error While Adding Faculty",
                        class: "alert alert-danger",
                        icon: <i className="bi bi-dash-circle"></i>,
                    });
                    console.log("", error);
                });
            }
            else{
                Swal.fire({
                    icon: "error",
                    text: 'Some fields are empty',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        } catch (error) {
            setMessageObj({
                message: "Error While Adding Faculty",
                class: "alert alert-danger",
                icon: <i className="bi bi-dash-circle"></i>,
            });

            console.log("Error:", error);
            window.alert("Failed to register");
        }
        e.preventDefault();
    }

    return (
        <div>
            <Button color="" onClick={toggle}>
                {" "}
                <i
                    className="bi bi-person-fill-add"
                    onClick={toggle}
                    style={{ fontSize: "30px" }}
                ></i>
            </Button>

            <Modal isOpen={modal} toggle={toggle}>
                <form onSubmit={addBatch} enctype="multipart/form-data">
                    <ModalHeader toggle={toggle}>
                        <h4>
                            <i
                                className="bi bi-person-fill-add"
                                style={{ fontSize: "40px", color: "blue" }}
                            ></i>
                            &nbsp;Add New Batch
                        </h4>
                    </ModalHeader>
                    <ModalBody>
                        <div className={messageObj.class} role="alert">
                            {messageObj.icon} &nbsp; {messageObj.message}
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                onChange={(e) => {
                                    getBatchdata(e);
                                }}
                                
                                name="batchName"
                                className="form-control"
                                id="batchName"
                                placeholder="name"
                            />
                            <label for="batchName">
                                {" "}
                                <i className="bi bi-person-circle"></i> &nbsp; Batch Name
                            </label>
                        </div>
                        <p id="batch"></p>

                        <div className="form-floating mb-3">
                            <select className="form-control"
                             onChange={(e) => {
                                getBatchdata(e);
                            }}
                            name="trainerName"
                            id='trainerName'>
                                <option value="NULL">Select Trainer</option>                               
                                {
                                    Trainers.map((Trainer)=>{
                                        return <option value={Trainer.facultyname}>{Trainer.facultyname}</option>
                                    })
                                }
                                
                            </select>
                            <label htmlFor="trainerName">
                                {" "}
                                <i className="bi bi-person-circle"></i> &nbsp; Trainer Name
                            </label>                           
                        </div>
                         <p id="trainer"></p>
                        <div className=" mb-3">
                            <label for="batchCenter">Batch Center</label>
                            <select className="batchCenter form-control" onChange={(e) => {getBatchdata(e);}} name="batchCenter">
                                <option value=''>Select Center</option>
                                {
                                    centers.map((center,index)=>{
                                        return(
                                            <option key={index} value={center.centerName}>{center.centerName}</option>
                                        )
                                    })
                                }                               
                            </select>
                        </div>
                        <p id="center"></p>

                        <div className="form-floating mb-3">
                            <input
                                type="date"
                                min={Date.now()}
                                onChange={(e) => {
                                    getBatchdata(e);
                                }}
                                name="startDate"
                                className="form-control"
                                id="startDate"
                                placeholder="linkedId"
                            />
                            <label for="startDate">
                                <i className="bi bi-calendar-date"></i>&nbsp;Start Date
                            </label>
                        </div>
                       <p id="sdate"></p>
                        <div className="form-floating mb-3">
                            <input
                                type="date"
                                min={Date.now()}
                                onChange={(e) => {
                                    getBatchdata(e);
                                }}
                                name="endDate"
                                className="form-control"
                                id="endDate"
                                placeholder=""
                            />
                            <label for="endDate">
                                <i className="bi bi-calendar-date"></i>&nbsp;Approx End Date
                            </label>
                        </div>
                        <p id="edate"></p>
                        <div className=" mb-3">
                            <label for="batchImage">
                                <i className="bi bi-card-image"></i>&nbsp;Upload Batch Photo
                            </label>
                            <input
                                type="file"
                                onChange={(e) => {
                                    getBatchdata(e);
                                }}
                                className="form-control m-0"
                                name="batchImage"
                                id="batchImage"
                                placeholder="linkedId"
                                
                            />
                        </div>
                        <p id="img"></p>
                     
                        {messageBox}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit">
                            <i className="bi bi-plus-lg"></i> &nbsp;Add Batch
                        </Button>{" "}
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
}

export default AddBatchModal;
