import React, { useState } from 'react';
import img1 from '../Images/registration-form-image.jpg';
import img2 from '../Images/user_icon.jpg';
import img3 from '../Images/phone_icon.jpg';
import img4 from '../Images/adhaar_icon.jpg';
import img5 from '../Images/dob_icon.jpg';
import img6 from '../Images/email_icon.jpg';
import img7 from '../Images/password_icon.jpg';
import img8 from '../Images/document_icon.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';

export default function Registration() {
    const [isUserRegistered, setUserRegistered] = useState(false);
    const history = useNavigate();
    const [user, setUser] = useState({
        username: '',
        phoneNo: '',
        aadharNo: '',
        dob: '',
        email: '',
        password: ''
    });

    const [user1, setUser1] = useState({
        income: "",
        aadharFile: "",
        incomeCertificate: "",
        fatherAadharcard: "",
        marksheet: "",
        latestMarksheet: ""
    });

    const [errors, setErrors] = useState({
        username: '',
        phoneNo: '',
        aadharNo: '',
        dob: '',
        email: '',
        password: '',
    });

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value });
        const validationErrors = validateField(name, value);
        setErrors({ ...errors, [name]: validationErrors });
        // console.log("name : ",name);
    };

    const handleFileChange1 = (e,) => {
        if (e.target.type === 'file') {
            const name = e.target.name;
            const file = e.target.files[0];
            setUser1({ ...user1, [name]: file });
            console.log(user1)
            console.log("file name : ", file);
            console.log("file: ", file);
        } else {
            const name = e.target.name;
            const value = e.target.value;
            setUser1({ ...user1, [name]: value });
            console.log("field name : ", name);
            console.log("field value : ", value);
        }
    };

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'username':
                if (value.trim() == "") {
                    document.getElementById("username").style.color = "red";
                    document.getElementById("username").innerHTML = "Name Required";
                    return false
                }
                else {
                    var reg = /^[A-Za-z\s]+$/;
                    if (reg.test(value)) {
                        document.getElementById('username').style.color = "green";
                        document.getElementById("username").innerHTML = "Valid name";
                        return true
                    }
                    else {
                        document.getElementById('username').style.color = "red";
                        document.getElementById("username").innerHTML = "Invalid name";
                        return false;
                    }
                }
                break;
            case 'phoneNo':

                var mobile = document.getElementById("login_contact");
                if (value.trim() == "") {
                    document.getElementById("phoneNo").style.color = "red";
                    document.getElementById("phoneNo").innerHTML = "Mobile Number Required";
                    return true;
                }
                else {
                    var reg = /^[6789][0-9]{9}$/;
                    if (reg.test(value)) {
                        document.getElementById("phoneNo").style.color = "green";
                        document.getElementById("phoneNo").innerHTML = "Valid Password";
                        return true;
                    }
                    else {
                        document.getElementById("phoneNo").style.color = "red";
                        document.getElementById("phoneNo").innerHTML = "Enter 10 Digit MobileNo.";
                        return false;
                    }
                }

                break;
            case 'aadharNo':
                if (value.trim() == "") {
                    document.getElementById("aadharNo").style.color = "red";
                    document.getElementById("aadharNo").innerHTML = "Mobile Number Required";
                    return true;
                }
                else {
                    var reg = /^[1234567890][0-9]{11}$/;
                    if (reg.test(value)) {
                        document.getElementById("aadharNo").style.color = "green";
                        document.getElementById("aadharNo").innerHTML = "Valid Password";
                        return true;
                    }
                    else {
                        document.getElementById("aadharNo").style.color = "red";
                        document.getElementById("aadharNo").innerHTML = "Enter 10 Digit MobileNo.";
                        return false;
                    }
                }
                break;
            case 'email':

                var email = document.getElementById("login_email");
                if (value.trim() == "") {
                    document.getElementById("email").style.color = "red";
                    document.getElementById("email").innerHTML = "Email Required";
                    return false;
                }
                else {
                    var reg = /^\w+([\.-])?\w*@[a-z]*([\.][a-z]{2,3})+$/;
                    if (reg.test(value)) {
                        document.getElementById("email").style.color = "green";
                        document.getElementById("email").innerHTML = "Valid Email";
                        return true;
                    }
                    else {
                        document.getElementById("email").style.color = "red";
                        document.getElementById("email").innerHTML = "Invalid email";
                        return false;
                    }
                }

                break;
            case 'password':
                if (value.trim() == "") {
                    document.getElementById("password").style.color = "red";
                    document.getElementById("password").innerHTML = "Password Required";
                    return false;
                }
                else {
                    var reg = /^(?=.+?[A-Z])(?=.+?[a-z])(?=.+?[~!@#$%^&*()_+])(?=.+?[0-9]).{8}$/;
                    if (reg.test(value)) {
                        document.getElementById("password").style.color = "green";
                        document.getElementById("password").innerHTML = "Valid Password";
                        return true;
                    }
                    else {
                        document.getElementById("password").style.color = "red";
                        document.getElementById("password").innerHTML = "Invalid Password";
                        return false;
                    }
                }
                break;
            // Add validation rules for other fields here
            default:
                break;
        }

        return error;
    };

    const PostData = async (e) => {
        if (e) {
            e.preventDefault();
        }
        console.log("in post");

        console.log(user);
        const { username, phoneNo, aadharNo, dob, email, password } = user;
        console.log(username);
//my
        try {
            axios.post('http://localhost:3002/user/verifyemail', user).then((response) => {

                console.log("result",response);
                if(response.status===201){
                    console.log('component caling');
                    history("/otpcomponent");
                }
            }).catch((error) => {
                console.log('', error);
            })
            // axios.post('http://localhost:3002/user/register', user).then((result) => {
            //     console.log(result);
            // }).catch((error) => {
            //     console.log('', error);
            // })
            // const response = await axios.post('http://localhost:3002/user/register', user);
            // console.log(response);

            // if (response.status === 201) {
            // console.log("in if ");

            //     // User is successfully registered
            //     setUserRegistered(false); // Set this to false
            // } else {
            // console.log("in else ");

            //     // User is already registered
            //     setUserRegistered(true); // Set this to true
            // }
        } catch (error) {
            console.log('Error:', error);
            window.alert('Failed to register');
        }
    };

    const PostData1 = async (e) => {
        if (e) {
            e.preventDefault();
        }
        console.log("in post");
        const formData = new FormData();
        for (const key in user1) {
            if (user1[key]) {
                formData.append(key, user1[key]);
            }
        }
        console.log("user 1 : ", user1);
        console.log("form data : ", formData);

        try {
            axios.post('http://localhost:3002/user/documentRegistration', formData).then((result) => {
                console.log(result);
            }).catch((error) => {
                console.log('', error);
            })
        } catch (error) {
            console.log('Error:', error);
            window.alert('Failed to register');
        }
    };

    return (
        <div className="container my-5" style={{ padding: "1 % 10 % 0 % 10 %" }}>
            <div className="" style={{ borderRadius: "2.5%", overflow: "hidden" }}>
                <div>
                    <img src={img1} width="100%" alt="" />
                </div>
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" style={{
                                width: "100%",
                                backgroundColor: "#fff",
                                borderBottom: "2px solid red"
                            }} type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <h3>Basic Details</h3>
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <form method='post' onSubmit={PostData}>
                                    <div className="row">
                                        <div className="mt-4 col-sm-12 col-md-12 col-lg-6 d-flex justify-content-center">
                                            <img src={img2} className="mt-4" height="20vh" alt="user_icon" />
                                            <input type="text" onChange={handleInputs} className=" p-3" name="username" id="username" value={user.name} placeholder="Enter name" />
                                        </div>
                                        <div className="mt-4 col-sm-12 col-md-12 col-lg-6 d-flex justify-content-center">
                                            <img src={img3} className="mt-4" height="20vh" alt="user_icon" />
                                            <input type="number" className=" p-3" name="phoneNo" id="phoneNo" onChange={handleInputs} value={user.name}
                                                placeholder="Enter Mobile Number" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                            <img src={img4} className="mt-4" height="20vh" alt="user_icon" />
                                            <input type="text" className=" p-3" name="aadharNo" id="aadharNo" onChange={handleInputs} value={user.aadharNo}
                                                placeholder="Enter Adhaar Number" />
                                        </div>
                                        <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                            <img src={img5} className="mt-4" height="20vh" alt="user_icon" />
                                            <input type="date" className=" p-3" name="dob" onChange={handleInputs}
                                                placeholder="Enter Date of Birth" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                            <img src={img6} className="mt-4" height="20vh" alt="user_icon" />
                                            <input type="text" className=" p-3" name="email" id="email" onChange={handleInputs} value={user.email} placeholder="Enter your email"
                                            />
                                        </div>
                                        <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                            <img src={img7} className="mt-4" height="20vh"
                                                alt="user_icon" />
                                            <input type="password" className=" p-3" name="password" id="password" onChange={handleInputs} value={user.password}
                                                placeholder="Enter your password" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                            <input type="reset" className="btn btn-danger w-50 mt-3" value="Reset"
                                                style={{ height: "2.5vw" }} />
                                        </div>
                                        <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                            <input type="submit" className="btn btn-outline-danger w-50 mt-3"
                                                data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true"
                                                aria-controls="collapseTwo" value="submit" style={{ height: "2.5vw" }} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button"
                                style={{ width: "100%", border: "0", backgroundColor: "#fff", borderBottom: "2px solid red" }}
                                type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true"
                                aria-controls="collapseTwo">
                                <h3 style={{ color: "red", fontWeight: "600" }}>Documents Upload</h3>
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <form onSubmit={PostData1} enctype="multipart/form-data">
                                    <div className="row">
                                        <div className="mt-4 col-sm-12 col-md-12 col-lg-6 d-block align-items-center">
                                            <img src={img8} className="mt-4" height="20vh" alt="user_icon"
                                                style={{ marginLeft: "18%" }} />
                                            <input type="text" className="income-enter p-3 text-start" name="income" onChange={(e) => handleFileChange1(e, 'income')}
                                                placeholder="Enter Family income" />
                                        </div>
                                        <div className="mt-4 col-sm-12 col-md-12 col-lg-6 d-flex justify-content-center">
                                            <img src={img8} className="mt-4" height="20vh"
                                                alt="user_icon" />
                                            <input type="file" className="" name="aadharFile" onChange={(e) => handleFileChange1(e, 'aadharFile')} style={{ width: "50%" }} />
                                            <label className=" custom-file-label m-4" htmlFor="username" id="fileNameLabel"
                                                style={{ width: "50%" }}>Upload Aadhar Card
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                            <img src={img8} className="mt-4" height="20vh"
                                                alt="user_icon" />
                                            <input type="file" className="" name="incomeCertificate" onChange={(e) => handleFileChange1(e, 'incomeCertificate')} style={{ width: "50%" }} />
                                            <label className="custom-file-label m-4" htmlFor="username" id="fileNameLabel"
                                                style={{ width: "50%" }}>Upload Income Certoficate
                                            </label>
                                        </div>
                                        <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                            <img src={img8} className="mt-4" height="20vh"
                                                alt="user_icon" />
                                            <input type="file" className="" name="fatherAadharcard" onChange={(e) => handleFileChange1(e, 'fatherAadharcard')} style={{ width: "50%" }} />
                                            <label className="custom-file-label m-4" htmlFor="username" id="fileNameLabel"
                                                style={{ width: "50%" }}>Upload Father's Aadhar Card
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                            <img src={img8} className="mt-4" height="20vh"
                                                alt="user_icon" />
                                            <input type="file" className="" name="marksheet" onChange={(e) => handleFileChange1(e, 'marksheet')} style={{ width: "50%" }} />
                                            <label className="custom-file-label m-4" htmlFor="username" id="fileNameLabel"
                                                style={{ width: "50%" }}>Upload 12th class Marksheet
                                            </label>
                                        </div>
                                        <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                            <img src={img8} className="mt-4" height="20vh"
                                                alt="user_icon" />
                                            <input type="file" className="" name="latestMarksheet" onChange={(e) => handleFileChange1(e, 'latestMarksheet')} style={{ width: "100%" }} />
                                            <label className="custom-file-label m-4" htmlFor="username" id="fileNameLabel"
                                                style={{ width: "50%" }}>Upload latest year marksheet
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                            <input type="reset" className="btn btn-danger w-50 mt-3" value="Reset"
                                                style={{ height: "2.5vw" }} />
                                        </div>
                                        <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                            <input type="submit" className="btn btn-outline-danger w-50 mt-3"
                                                data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                                aria-expanded="true" aria-controls="collapseThree" value="submit"
                                                style={{ height: "2.5vw" }} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button"
                                style={{ width: "100%", border: "0", backgroundColor: "#fff", borderBottom: "2px solid red" }}
                                type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true"
                                aria-controls="collapseThree">
                                <h3 style={{ color: "red", fontWeight: "600" }}>Payment Details</h3>
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <form action="">
                                    <div className="p-4">
                                        <input className="mt-2" type="radio" name="phonepe" id="phonepe" /><label htmlFor="phonepe"
                                            className="ms-2">Phone pay</label>
                                        <input className="mt-2" type="radio" name="googlepay" id="googlepay" /><label
                                            htmlFor="googlepay" className="ms-2">google pay</label>
                                        <input className="mt-2" type="radio" name="creditcard" id="creditcard" /><label
                                            htmlFor="creditcard" className="ms-2">credit card</label>
                                        <input className="mt-2" type="radio" name="debitcard" id="debitcard" /><label
                                            htmlFor="debitcard" className="ms-2">debit card</label>
                                        <div className="mt-4 col-lg-6 d-flex justify-content-center">
                                            <input type="reset" className="btn btn-outline-danger w-50 mt-3"
                                                data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                                aria-expanded="true" aria-controls="collapseThree" value="submit"
                                                style={{ height: "2.5vw" }} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    return (
        <div className="container my-5" style={{ padding: "1% 10% 0% 10%" }}>
            {/* Your form and other elements... */}

            <Modal
                isOpen={isUserRegistered}
                contentLabel="User Already Registered Modal"
            // You can customize modal styles and content here
            >
                <h2>User Already Registered</h2>
                <p>You can display a message or any content you want here.</p>
                <button onClick={() => setUserRegistered(false)}>Close Modal</button>
            </Modal>
        </div>
    );
}
