import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
var photoObj = {};

function UpdateGalleryModal(props) {
    const { data } = props
    const [messageObj, setMessageObj] = useState({ message: "", class: "", icon: <></>, });
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    var photoName = true, photoHeading = true, photoDescription = true, category = true, galleryImg = true;

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'photoName':
                if (value.trim() == "") {
                    document.getElementById("photoName").style.color = "red";
                    document.getElementById("name").innerHTML = "photoName Required";
                    photoName = false;
                    return false;
                }
                else {
                    var reg = /^[A-Za-z0-9\s]+$/;
                    if (reg.test(value)) {
                        document.getElementById('photoName').style.color = "green";
                        document.getElementById("name").innerHTML = "";
                        photoName = true;
                        return true
                    }
                    else {
                        console.log("usertext")
                        document.getElementById('photoName').style.color = "red";
                        document.getElementById("name").innerHTML = "Invalid name";
                        photoName = false;
                        return false;
                    }
                }
                break;
            case 'photoHeading':
                if (value.trim() == "") {
                    document.getElementById("photoHeading").style.color = "red";
                    document.getElementById("name").innerHTML = "photoHeading Required";
                    photoName = false;
                    return false;
                }
                else {
                    var reg = /^[A-Za-z0-9\s]+$/;
                    if (reg.test(value)) {
                        document.getElementById('photoHeading').style.color = "green";
                        document.getElementById("name").innerHTML = "";
                        photoName = true;
                        return true
                    }
                    else {
                        console.log("usertext")
                        document.getElementById('photoHeading').style.color = "red";
                        document.getElementById("name").innerHTML = "Invalid name";
                        photoName = false;
                        return false;
                    }
                }
                break;
            case 'photoDescription':
                if (value.trim() == "") {
                    document.getElementById("photoDescription").style.color = "red";
                    document.getElementById("name").innerHTML = "photoDescription Required";
                    photoName = false;
                    return false;
                }
                else {
                    var reg = /^[A-Za-z0-9\s]+$/;
                    if (reg.test(value)) {
                        document.getElementById('photoDescription').style.color = "green";
                        document.getElementById("name").innerHTML = "";
                        photoName = true;
                        return true
                    }
                    else {
                        console.log("usertext")
                        document.getElementById('photoDescription').style.color = "red";
                        document.getElementById("name").innerHTML = "Invalid name";
                        photoName = false;
                        return false;
                    }
                }
                break;
            case 'category':
                if (value.trim() == "") {
                    document.getElementById("category").style.color = "red";
                    document.getElementById("name").innerHTML = "category Required";
                    photoName = false;
                    return false;
                }
                else {
                    var reg = /^[A-Za-z\s]+$/;
                    if (reg.test(value)) {
                        document.getElementById('category').style.color = "green";
                        document.getElementById("name").innerHTML = "";
                        photoName = true;
                        return true
                    }
                    else {
                        console.log("usertext")
                        document.getElementById('category').style.color = "red";
                        document.getElementById("name").innerHTML = "Invalid name";
                        photoName = false;
                        return false;
                    }
                }
                break;

            case 'galleryImg':
                var galleryImg = document.getElementById("galleryImg");
                if (galleryImg.files.length === 0) {
                    document.getElementById("name").innerHTML = "Image Required";
                    galleryImg = false;
                    return false;
                }
                else {
                    galleryImg = true;
                    return true;
                }
                break;
            default:
                break;
        }

        return error;
    };




    var getBannerdata = (e) => {
        var { name, value } = e.target;
        validateField(name, value);
        if (e.target.type === "file") {
            const galleryImg = e.target.files[0];
            photoObj = { ...photoObj, [name]: galleryImg };
        } else {
            photoObj = { ...photoObj, [name]: value };
        }
    };

    function updateGallery(e) {
        // for (const key in photoObj) {
        //     if (photoObj[key]) {
        //         formData.append(key, photoObj[key]);
        //     }
        // }
        const formData = new FormData();
        Object.entries(photoObj).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.append("_id", data._id);


        try {
            if (photoName && photoHeading && photoDescription && category && galleryImg) {
                axios.post(`http://localhost:3002/admin/updateGalleryData`, formData).then((result) => {
                    if (result.data.status == "Gallery Updated Sucessfully!!!!") {
                        setMessageObj({ message: result.data.status, class: "alert alert-primary", icon: <i className="bi bi-check-lg"></i> })
                    }
                    else {
                        setMessageObj(
                            { message: result.data.status, class: "alert alert-danger", icon: <i className="bi bi-dash-circle"></i> })
                    }
                    if (result.status === 201) {
                        setTimeout(() => {
                            toggle()
                            setMessageObj({ message: "", class: "", icon: <></> })
                        }, 1500);
                    } else {
                        console.log(result.data.status)
                    }
                }).catch((error) => {
                    setMessageObj({ message: "Error While Updating Gallery", class: "alert alert-danger", icon: <i className="bi bi-dash-circle"></i> })
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
            setMessageObj({ message: "Error While Updating Gallery", class: "alert alert-danger", icon: <i className="bi bi-dash-circle"></i> })
            console.log('Error:', error);
            window.alert('Failed to register');
        }
        e.preventDefault();
    }

    return (
        <div>

            <button type="button" onClick={toggle} className='btn btn-sm btn-outline-primary me-2'>Update</button>

            <Modal isOpen={modal} toggle={toggle}>
                <form onSubmit={updateGallery} encType="multipart/form-data">
                    <ModalHeader toggle={toggle}>
                        <h4>
                            <i
                                className="bi bi-image text-info"
                                style={{ fontSize: "40px" }}
                            ></i>
                            &nbsp;uppdate Photo for Gallery
                        </h4>
                    </ModalHeader>
                    <ModalBody>
                        <p id='name'></p>
                        <div className={messageObj.class} role="alert">
                            {messageObj.icon} &nbsp; {messageObj.message}
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" onChange={(e) => { getBannerdata(e); }} required name="photoName" className="form-control" id="photoName" placeholder="name" defaultValue={props.data.photoName} />
                            <label htmlFor="floatingInput">
                                {" "}
                                <i className="bi bi-image"></i> &nbsp; Photo Name
                            </label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="text" onChange={(e) => { getBannerdata(e); }} required name="photoHeading" className="form-control" id="photoHeading" placeholder="Enter Heading" defaultValue={props.data.photoHeading} />
                            <label htmlFor="floatingInput">
                                {" "}
                                <i className="bi bi-image"></i> &nbsp; Photo Heading
                            </label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="text" onChange={(e) => { getBannerdata(e); }} required name="photoDescription" className="form-control" id="photoDescription" placeholder="Enter Heading" defaultValue={props.data.photoDescription} />
                            <label htmlFor="floatingInput">
                                {" "}
                                <i className="bi bi-image"></i> &nbsp; Photo Description
                            </label>
                        </div>

                        <div className="form-floating mb-3">
                            <select className='form-control' id='floatingInput' name="category" onChange={(e) => { getBannerdata(e); }} required>
                                <option className='text-black' value={props.data.category} >{props.data.category}</option>
                                <option className='text-black' value="Celebration">Celebration Photos</option>
                                <option className='text-black' value="Centers">Center's</option>
                                <option className='text-black' value="Corporate">Corporate Visits</option>
                                <option className='text-black' value="Teaching">Teaching Facilities</option>
                            </select>
                            <label htmlFor="floatingInput">
                                {" "}
                                <i className="bi bi-image"></i> &nbsp; Photo Category
                            </label>
                        </div>



                        <div className=" mb-3">
                            <label htmlFor="floatingInput">
                                <i className="bi bi-card-image"></i>&nbsp;Upload Photo
                            </label>
                            <input type="file" onChange={(e) => { getBannerdata(e); }} className="form-control m-0" name="galleryImg" id="floatingInput" placeholder="linkedId" />
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit">
                            <i className="bi bi-plus-lg"></i> &nbsp;Add Photo
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
export default UpdateGalleryModal;