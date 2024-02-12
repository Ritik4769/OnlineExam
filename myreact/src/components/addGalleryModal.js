import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
var photoObj = {};

function AddGalleryModal() {
    const [messageObj, setMessageObj] = useState({
        message: "",
        class: "",
        icon: <></>,
    });
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    var getBannerdata = (e) => {
        var { name, value } = e.target;
        if (e.target.type === "file") {
            const galleryImg = e.target.files[0];
            photoObj = { ...photoObj, [name]: galleryImg };
        } else {
            photoObj = { ...photoObj, [name]: value };
        }
    };

    function addBatch(e) {
        const formData = new FormData();
        // for (const key in photoObj) {
        //     if (photoObj[key]) {
        //         formData.append(key, photoObj[key]);
        //     }
        // }
        Object.entries(photoObj).forEach(([key, value]) => {
            formData.append(key, value);
        });
        try {
            axios
                .post(`http://localhost:3002/admin/addGalleryData`, formData)
                .then((result) => {
                    if (result.data.status == "Photo Adeed Sucessfully!!!!") {
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
            <Button className="btn-outline-info" color="" onClick={toggle}>
                {" "}
                <i
                    className="bi bi-image"
                    onClick={toggle}
                    style={{ fontSize: "30px" }}
                ></i>
            </Button>

            <Modal isOpen={modal} toggle={toggle}>
                <form onSubmit={addBatch} encType="multipart/form-data">
                    <ModalHeader toggle={toggle}>
                        <h4>
                            <i
                                className="bi bi-image text-info"
                                style={{ fontSize: "40px" }}
                            ></i>
                            &nbsp;Add Photo for Gallery
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
                                    getBannerdata(e);
                                }}
                                required
                                name="photoName"
                                className="form-control"
                                id="floatingInput"
                                placeholder="name"
                            />
                            <label htmlFor="floatingInput">
                                {" "}
                                <i className="bi bi-image"></i> &nbsp; Photo Name
                            </label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                onChange={(e) => {
                                    getBannerdata(e);
                                }}
                                required
                                name="photoHeading"
                                className="form-control"
                                id="floatingInput"
                                placeholder="Enter Heading"
                            />
                            <label htmlFor="floatingInput">
                                {" "}
                                <i className="bi bi-image"></i> &nbsp; Photo Heading
                            </label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                onChange={(e) => {
                                    getBannerdata(e);
                                }}
                                required
                                name="photoDescription"
                                className="form-control"
                                id="floatingInput"
                                placeholder="Enter Heading"
                            />
                            <label htmlFor="floatingInput">
                                {" "}
                                <i className="bi bi-image"></i> &nbsp; Photo Description
                            </label>
                        </div>
                        
                        <div className="form-floating mb-3">


                                <select className='form-control' id='floatingInput' name="category" onChange={(e) => {
                                    getBannerdata(e);
                                }}
                                required>
                                    <option className='text-black' value=" " >Select Category</option>
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
                            <input
                                type="file"
                                onChange={(e) => {
                                    getBannerdata(e);
                                }}
                                className="form-control m-0"
                                name="galleryImg"
                                id="floatingInput"
                                placeholder="linkedId"
                            />
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
export default AddGalleryModal;