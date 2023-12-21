import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
var facultyObj = {};

function AddFacultyModal(props) {


    var { getRemainingfaculty } = props;
    const [messageObj, setMessageObj] = useState({ message: "", class: "", icon: <></> })
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
    var Name = false, Email = false, Number = false, linkedid = false, joindate = false, department = false, facultyimg = false, skill = false;


    const [messageBox, setMessageBox] = useState();
    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'facultyname':
                if (value.trim() == "") {
                    document.getElementById("facultyname").style.color = "red";
                    document.getElementById("name").innerHTML = "Name Required";
                    Name = false;
                    return false;
                }
                else {
                    var reg = /^[A-Za-z\s]+$/;
                    if (reg.test(value)) {
                        document.getElementById('facultyname').style.color = "green";
                        document.getElementById("name").innerHTML = "";
                        Name = true;
                        return true
                    }
                    else {
                        console.log("usertext")
                        document.getElementById('facultyname').style.color = "red";
                        // document.getElementById("username").innerHTML = "Invalid name";
                        document.getElementById("name").innerHTML = "Invalid name";
                        Name = false;
                        return false;
                    }
                }
                break;
            case 'number':

                if (value.trim() == "") {
                    document.getElementById("number").style.color = "red";
                    document.getElementById("Number").innerHTML = "Mobile Number Required";
                    Number = false;
                    return false;
                }
                else {
                    var reg = /^[6789][0-9]{9}$/;
                    if (reg.test(value)) {
                        document.getElementById("number").style.color = "green";
                        document.getElementById("Number").innerHTML = "";
                        Number = true;
                        return true;
                    }
                    else {
                        document.getElementById("number").style.color = "red";
                        document.getElementById("Number").innerHTML = "Enter 10 Digit MobileNo.";
                        Number = false;
                        return false;
                    }
                }
                break;

            case 'facultyemail':

                if (value.trim() == "") {
                    document.getElementById("facultyemail").style.color = "red";
                    document.getElementById("email").innerHTML = "Email Required";
                    Email = false;
                    return false;
                }
                else {
                    var reg = /^\w+([\.-])?\w*@[a-z]*([\.][a-z]{2,3})+$/;
                    if (reg.test(value)) {
                        document.getElementById("facultyemail").style.color = "green";
                        document.getElementById("email").innerHTML = "";
                        Email = true;
                        return true;
                    }
                    else {
                        document.getElementById("facultyemail").style.color = "red";
                        document.getElementById("email").innerHTML = "Invalid email";
                        Email = false;
                        return false;
                    }
                }
                break;

            case 'joiningDate':
                if (value == "") {
                    document.getElementById("joiningDate").style.color = "red";
                    document.getElementById("date").innerHTML = "Joining Date Required";
                    joindate = false;
                    return false;
                }
                else {
                    document.getElementById("joiningDate").style.color = "green";
                    document.getElementById("date").innerHTML = "";
                    joindate = true;
                    return true;
                }
                break;
            case 'linkedInid':
                if (value == '') {
                    document.getElementById("linkedid").style.color = "red";
                    document.getElementById("linkid").innerHTML = "Linkedin id Required";
                    linkedid = false;
                    return false;
                }
                else {
                    document.getElementById("linkedid").style.color = "green";
                    document.getElementById("linkid").innerHTML = "";
                    linkedid = true;
                    return true;
                }
                break;

            case 'department':
                if (value == '') {
                    document.getElementById("select").innerHTML = "Department Required";
                    department = false;
                    return false;
                }
                else {
                    department = true;
                    return true;
                }
                break;
            case 'image':
                var batchImage = document.getElementById("image");
                if (batchImage.files.length === 0) {
                    document.getElementById("img").innerHTML = "Image Required";
                    facultyimg = false;
                    return false;
                }
                else {
                    facultyimg = true;
                    return true;
                }
                break;
            // Add validation rules for other fields here
            default:
                break;
        }

        return error;
    };
    var getFacultydata = (e) => {
        var { name, value } = e.target;
        console.log(facultyObj);
        validateField(name, value);
        if (e.target.type === 'file') {
            const file = e.target.files[0];
            facultyObj = { ...facultyObj, [name]: file };
        } else {
            facultyObj = { ...facultyObj, [name]: value }
        }
        console.log('facultyObj ', facultyObj);
    }
    function addFaculty(e) {
        const formData = new FormData();
        for (const key in facultyObj) {
            if (facultyObj[key]) {
                formData.append(key, facultyObj[key]);
            }
        }
        try {
            console.log(facultyObj);
            if (Name && Email && Number && department && joindate && linkedid && facultyimg) {
                axios.post(`http://localhost:3002/admin/addFaculty`, formData).then((result) => {
                    console.log(result);
                    if (result.data.status == "Faculty Adeed Sucessfully!!!!") {
                        setMessageObj({ message: result.data.status, class: "alert alert-primary", icon: <i className="bi bi-check-lg"></i> })
                    }
                    else {
                        setMessageObj(
                            { message: result.data.status, class: "alert alert-danger", icon: <i className="bi bi-dash-circle"></i> })
                    }
                    if (result.status === 201) {
                        getRemainingfaculty(result.data.Faculties)
                        setTimeout(() => {
                            toggle()
                            setMessageObj({ message: "", class: "", icon: <></> })
                        }, 1500);
                    } else {
                        console.log(result.data.status)
                    }
                }).catch((error) => {
                    setMessageObj({ message: "Error While Adding Faculty", class: "alert alert-danger", icon: <i className="bi bi-dash-circle"></i> })
                    console.log('', error);
                })
            }
            else {
                Swal.fire({
                    icon: "error",
                    text: 'Some fields are empty',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        } catch (error) {
            setMessageObj({ message: "Error While Adding Faculty", class: "alert alert-danger", icon: <i className="bi bi-dash-circle"></i> })

            console.log('Error:', error);
            window.alert('Failed to register');
        }
        e.preventDefault();
    }

    return (
        <div>
            {/* <Button color="" onClick={toggle}> <i className="bi bi-person-fill-add" onClick={toggle} style={{ fontSize: "30px" }}></i></Button> */}
            <button className='btn btn-sm p-0 me-3' type="button" onClick={toggle}> <i className="bi bi-person-fill-add" onClick={toggle} style={{ fontSize: "20px" }}></i></button>
            <Modal isOpen={modal} toggle={toggle}>
                <form onSubmit={addFaculty} enctype="multipart/form-data" >
                    <ModalHeader toggle={toggle}><h4><i className="bi bi-person-fill-add" style={{ fontSize: "40px", color: "blue" }}></i>&nbsp;Add New Faculty</h4></ModalHeader>
                    <ModalBody>
                        <div className={messageObj.class} role="alert">
                            {messageObj.icon} &nbsp; {messageObj.message}
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" onChange={(e) => { getFacultydata(e) }} name='facultyname' className="form-control" id="facultyname" placeholder="name" />
                            <label for="facultyname" > <i className="bi bi-person-circle"></i> &nbsp; Faculty Name</label>
                        </div>
                        <p id='name'></p>
                        <div className="form-floating mb-3">
                            <input type="email" onChange={(e) => { getFacultydata(e) }} name='facultyemail' className="form-control" id="facultyemail" placeholder="linkedId" />
                            <label for="facultyemail"><i className="bi bi-envelope"></i>&nbsp;Email Id</label>
                        </div>
                        <p id='email'></p>
                        <div className="form-floating mb-3">
                            <input type="number" onChange={(e) => { getFacultydata(e) }} name='number' className="form-control" id="number" placeholder="linkedId" />
                            <label for="number"><i className="bi bi-telephone"></i>&nbsp;Phone Number</label>
                        </div>
                        <p id='Number'></p>
                        <div className="form-floating mb-3">
                            <input type="text" onChange={(e) => { getFacultydata(e) }} name='linkedInid' className="form-control" id="linkedid" placeholder="linkedId" />
                            <label for="linkedid"><i className="bi bi-linkedin"></i>&nbsp;LinkedIn Id</label>
                        </div>
                        <p id='linkid'></p>
                        <div className="mb-3">
                            <select className='form-control' onChange={(e) => { getFacultydata(e) }} name='department' id='department'>
                                <option className='option' value="">Select Department</option>
                                <option className='option' value="Trainer">Trainer</option>
                                <option className='option' value="Management">Management</option>
                            </select>
                        </div>
                        <p id='select'></p>
                        <div className="form-floating mb-3">
                            <input type="date" min={Date.now()} onChange={(e) => { getFacultydata(e) }} name='joiningDate' className="form-control" id="joiningDate" placeholder="linkedId" />
                            <label for="joiningDate"><i className="bi bi-calendar-date"></i>&nbsp;Joining Date</label>
                        </div>
                        <p id='date'></p>
                        <div className=" mb-3">
                            <label for="image">Upload Photo</label>
                            <input type="file" onChange={(e) => { getFacultydata(e) }} className="form-control m-0" name='image' id="image" />
                        </div>
                        <p id='img'></p>
                        <div className="form-floating mb-3">
                            <textarea onChange={(e) => { getFacultydata(e) }} required name='Skills' className='form-control' rows="5" ></textarea>
                            <label for="floatingInput"><i className="bi bi-calendar-date"></i>&nbsp;Add Technologiie Skills | Separate with commas  </label>
                        </div>
                        {messageBox}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit" >
                            <i className="bi bi-plus-lg"></i> &nbsp;Add Faculty
                        </Button>{' '}
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
}

export default AddFacultyModal;