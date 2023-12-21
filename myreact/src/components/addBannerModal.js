import React, { useState,useEffect } from "react";
import axios from "axios";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
var bannerObj = {};
var Trainers=[];
function AddBannerModal(props) {
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
    var getBannerdata = (e) => {
        var { name, value } = e.target;
        if (e.target.type === "file") {
            const bannerImg = e.target.files[0];
            bannerObj = { ...bannerObj, [name]: bannerImg };
        } else {
            bannerObj = { ...bannerObj, [name]: value };
        }
        console.log(bannerObj);
    };



    function addBatch(e) {
        const formData = new FormData();
        for (const key in bannerObj) {
            if (bannerObj[key]) {
                formData.append(key, bannerObj[key]);
            }
        }
        try {
            axios
                .post(`http://localhost:3002/admin/addBanner`, formData)
                .then((result) => {
                    if (result.data.status == "Banner Adeed Sucessfully!!!!") {
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
                                style={{ fontSize: "40px"}}
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
                                    getBannerdata(e);
                                }}
                                required
                                name="bannerName"
                                className="form-control"
                                id="floatingInput"
                                placeholder="name"
                            />
                            <label htmlFor="floatingInput">
                                {" "}
                                <i className="bi bi-image"></i> &nbsp; Banner Name
                            </label>
                        </div>
                        <div className=" mb-3">
                            <label htmlFor="floatingInput">
                                <i className="bi bi-card-image"></i>&nbsp;Upload Banner
                            </label>
                            <input
                                type="file"
                                onChange={(e) => {
                                    getBannerdata(e);
                                }}
                                className="form-control m-0"
                                name="bannerImg"
                                id="floatingInput"
                                placeholder="linkedId"
                            />
                        </div>

                        {messageBox}
                        <div class="alert alert-danger" role="alert">
                        <i class="bi bi-info-circle-fill"></i> &nbsp; Recommended banner size  1000X347 px
                        </div>

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
export default AddBannerModal;
