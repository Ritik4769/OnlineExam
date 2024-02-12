import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
var companyObj = {};

function UpdateCompanyModal(props) {
    const [messageObj, setMessageObj] = useState({
        message: "",
        class: "",
        icon: <></>,
    });
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const {getRemainingCompany,company} = props

    var getCompanydata = (e) => {
        var { name, value } = e.target;
        if (e.target.type === "file") {
            const companyImg = e.target.files[0];
            companyObj = { ...companyObj, [name]: companyImg };
        } else {
            companyObj = { ...companyObj, [name]: value };
        }
    };

    function addCompany(e) {
        const formData = new FormData();
        // for (const key in companyObj) {
        //     if (companyObj[key]) {
        //         formData.append(key, companyObj[key]);
        //     }
        // }
        Object.entries(companyObj).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.append("_id", company._id);
        try {
            axios
                .post(`http://localhost:3002/admin/updateCompany`, formData).then((result) => {
                    if (result.data.status == "Company Updated Sucessfully!!!!") {
                        setMessageObj({ message: result.data.status, class: "alert alert-primary", icon: <i className="bi bi-check-lg"></i> })
                        getRemainingCompany(result.data.company)
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
                    setMessageObj({
                        message: "Error While Updating Company",
                        class: "alert alert-danger",
                        icon: <i className="bi bi-dash-circle"></i>,
                    });
                    console.log("Error: ", error);
                });
        } catch (error) {
            setMessageObj({
                message: "Error While Adding Company",
                class: "alert alert-danger",
                icon: <i className="bi bi-dash-circle"></i>,
            });
            console.log("Error:", error);
            window.alert("Failed to add Company");
        }
        e.preventDefault();
    }

    return (
        <div>
            <Button className="btn-outline-secondary" color="" onClick={toggle}>
                Update
            </Button>

            <Modal isOpen={modal} toggle={toggle}>
                <form onSubmit={addCompany} encType="multipart/form-data">
                    <ModalHeader toggle={toggle}>
                        <h4>
                            <i
                                className="bi bi-image text-info"
                                style={{ fontSize: "40px" }}
                            ></i>
                            &nbsp;Add New Company
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
                                    getCompanydata(e);
                                }}
                                required
                                name="companyName"
                                className="form-control"
                                id="floatingInput"
                                defaultValue={company.companyName}
                                placeholder="name"
                            />
                            <label htmlFor="floatingInput">
                                {" "}
                                <i className="bi bi-image"></i> &nbsp; Company Name
                            </label>
                        </div>
                        <div className=" mb-3">
                            <label htmlFor="floatingInput">
                                <i className="bi bi-card-image"></i>&nbsp;Upload Logo
                            </label>
                            <input
                                type="file"
                                onChange={(e) => {
                                    getCompanydata(e);
                                }}
                                className="form-control m-0"
                                name="companyImg"
                                id="floatingInput"
                                placeholder="linkedId"
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit">
                            Update Company
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

export default UpdateCompanyModal;