import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
var centerObj = {};
var Managers = [];

function AddCenterModal() {
    const [messageObj, setMessageObj] = useState({
        message: "",
        class: "",
        icon: <></>,
    });
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    var centername = false, managername = false, startdate = false, address = false, centerimage = false;

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'managerName':
                if (value == '') {
                    document.getElementById("managerName").innerHTML = "Managername Required";
                    managername = false;
                    return false;
                } else {
                    managername = true;
                    return true;
                }
                break;
            case 'centerName':
                if (value.trim() == "") {
                    document.getElementById("centerName").style.color = "red";
                    document.getElementById("center").innerHTML = "Center Name Required";
                    centername = false;
                    return false;
                } else {
                    var reg = /^[0-9A-Za-z\s]+$/;
                    if (reg.test(value)) {
                        document.getElementById('centerName').style.color = "green";
                        document.getElementById("center").innerHTML = "";
                        centername = true;
                        return true
                    } else {
                        document.getElementById('centerName').style.color = "red";
                        document.getElementById("center").innerHTML = "Invalid Center Name";
                        centername = true;
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
                } else {
                    document.getElementById("startDate").style.color = "green";
                    document.getElementById("sdate").innerHTML = "";
                    startdate = true;
                    return true;
                }
                break;
            case 'address':
                if (value == "") {
                    document.getElementById("address").style.color = "red";
                    document.getElementById("add").innerHTML = "Address Required";
                    address = false;
                    return false;
                } else {
                    document.getElementById("address").style.color = "green";
                    document.getElementById("add").innerHTML = "";
                    address = true;
                    return true;
                }
                break;
            case 'centerImage':
                var batchImage = document.getElementById("centerImage");
                if (batchImage.files.length === 0) {
                    document.getElementById("img").innerHTML = "Image Required";
                    centerimage = false;
                    return false;
                } else {
                    centerimage = true;
                    return true;
                }
                break;
            default:
                break;
        }
        return error;
    };

    var getCenterdata = (e) => {
        var { name, value } = e.target;
        validateField(name, value);
        if (e.target.type === "file") {
            const centerImg = e.target.files[0];
            centerObj = { ...centerObj, [name]: centerImg };
        } else {
            centerObj = { ...centerObj, [name]: value };
        }
    };

    useEffect(() => {
        var getTriners = async () => {
            try {
                const response = await axios.get('http://localhost:3002/admin/getManagers');
                Managers = response.data;
            } catch (error) {
                console.error('Error fetching data:', error);
                Managers = [{ name: "Unable to get Managers Data" }]
            }
        }
        getTriners()
    }, [centerObj])

    function addCenter(e) {
        const formData = new FormData();
        // for (const key in centerObj) {
        //     if (centerObj[key]) {
        //         formData.append(key, centerObj[key]);
        //     }
        // }
        Object.entries(centerObj).forEach(([key, value]) => {
            formData.append(key, value);
        });
        try {
            if (centername && managername && address && centerimage && startdate) {
                axios
                    .post(`http://localhost:3002/admin/addCenter`, formData)
                    .then((result) => {
                        if (result.data.status == "Center Adeed Sucessfully!!!!") {
                            setMessageObj({
                                message: result.data.status,
                                class: "alert alert-success",
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
                        }
                    }).catch((error) => {
                        setMessageObj({
                            message: "Error While Adding Faculty",
                            class: "alert alert-danger",
                            icon: <i className="bi bi-dash-circle"></i>,
                        });
                        console.log("", error);
                    });
            } else {
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
            <Button className="btn-outline-success" color="" onClick={toggle}>
                {" "}
                <i
                    className="bi bi-building-add "
                    onClick={toggle}
                    style={{ fontSize: "30px" }}
                ></i>
            </Button>

            <Modal isOpen={modal} toggle={toggle}>
                <form onSubmit={addCenter} encType="multipart/form-data">
                    <ModalHeader toggle={toggle}>
                        <h4>
                            <i
                                className="bi bi-person-fill-add text-success"
                                style={{ fontSize: "40px" }}
                            ></i>
                            &nbsp;Add New Center
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
                                    getCenterdata(e);
                                }}
                                name="centerName"
                                className="form-control"
                                id="centerName"
                                placeholder="name"
                            />
                            <label htmlFor="centerName">
                                {" "}
                                <i className="bi bi-building"></i> &nbsp; Center Name
                            </label>
                        </div>
                        <p id="center"></p>
                        <div className="form-floating mb-3">
                            <select className="form-control"
                                onChange={(e) => {
                                    getCenterdata(e);
                                }}
                                name="managerName"
                                id="managerName"
                            >
                                <option value="NULL">Select Manager</option>
                                {
                                    Managers.map((Manager, index) => {
                                        return <option key={index} value={Manager.facultyname}>{Manager.facultyname}</option>
                                    })
                                }
                            </select>
                            <label htmlFor="managerName">
                                {" "}
                                <i className="bi bi-person-circle"></i> &nbsp; Manager Name
                            </label>
                        </div>
                        <p id='manager'></p>
                        <div className="form-floating mb-3">
                            <textarea required className="form-control" placeholder="Leave a comment here" id="address"
                                name="address"
                                onChange={(e) => {
                                    getCenterdata(e);
                                }}
                            ></textarea>
                            <label for="address"> <i className="bi bi-geo-fill"></i> Center Address</label>
                        </div>
                        <p id="add"></p>

                        <div className="form-floating mb-3">
                            <input
                                type="date"
                                max={Date.now()}
                                onChange={(e) => {
                                    getCenterdata(e);
                                }}
                                name="startDate"
                                className="form-control"
                                id="startDate"
                                placeholder="linkedId"
                            />
                            <label htmlFor="startDate">
                                <i className="bi bi-calendar-date"></i>&nbsp;Start Date
                            </label>
                        </div>
                        <p id="sdate"></p>
                        <div className=" mb-3">
                            <label htmlFor="centerImage">
                                <i className="bi bi-card-image"></i>&nbsp;Upload Batch Photo
                            </label>
                            <input
                                type="file"
                                onChange={(e) => {
                                    getCenterdata(e);
                                }}
                                className="form-control m-0"
                                name="centerImage"
                                id="centerImage"
                                placeholder="linkedId"
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit">
                            <i className="bi bi-plus-lg"></i> &nbsp;Add Center
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

export default AddCenterModal;