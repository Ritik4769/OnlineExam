import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createExam, createSchedule } from "./adminModule/admindashAxios"
import Cookies from 'js-cookie';
import './adminModule/adminModule.css';
import AddCenterModal from './AddCenterModal';
import AddFacultyModal from './AddFacultyModal';
import AddBatchModal from './AddBatchModal';
import AddBannerModal from './addBannerModal'
import logo from '../Images/InfoBeans Foundation Logo - PNG (1).png';
import avatar from '../Images/man-with-beard-avatar-character-isolated-icon-free-vector.jpg';
import ConfirmBox from './confirmBoxFaculty';
import UpdateFacultyModal from './UpdatefacultyModal';
import {Loader,toggleLoader} from './Loader.js';
var examobj = {}, sheduleObj = {}, array = [],resultArray=[];
export default function AdminModule() {
    const [interviewRecord, setInterviewRecord] = useState([]);
    const [houseVisitRecord, setHouseVisitRecord] = useState([]);
    const [houseVisitRecord1, setHouseVisitClear] = useState([]);

    const [interviewRecord1, setInterviewClear] = useState([]);
    const [uploadInterview, setInterview] = useState({ interviewFile: '' });
    const [uploadHome, setHome] = useState({ homeFile: '' });
    const [enrollPrefix, setEnrollId] = useState("");
    const [users, setUser3] = useState([]);
    const [users5, setUser5] = useState([]);
    const [userDocument, setUser4] = useState([]);
    const [placementData, setplacementrocord] = useState([]);
    const [shiftRecord, setShiftRecord] = useState([]);
    const [shiftrecordRecord, setShiftrecordRecord] = useState([]);
    const [examName, setExamName] = useState([]);
    const [placementData1, setplacementrocord1] = useState([]);
    const [shiftNumber, setShiftNumber] = useState([]);
    const [pass, setPass] = useState(0);
    const [absent, setAbs] = useState(0);
    const [fail, setFail] = useState(0);
    const [studName, studName1] = useState(false);
    const [studEmail, studEmail1] = useState(false);
    const [studContact, studContact1] = useState(false);
    const [studJoiningdate, studJoiningdate1] = useState(false);
    const [studCompanyname, studCompanyname1] = useState(false);
    const [studBatchnumber, studBatchnumber1] = useState(false);
    const [studBatchsession, studBatchsession1] = useState(false);
    const [studPackage, studPackage1] = useState(false);
    const [studimg, studimg1] = useState(false);
    const [ExamTitle, ExamTitle1] = useState(false);
    const [ExamDate, ExamDate1] = useState(false);
    const [ExamDuration, ExamDuration1] = useState(false);
    const [ShiftNumber, ShiftNumber1] = useState(false);
    const [ShiftTimeFrom, ShiftTimeFrom1] = useState(false);
    const [ShiftTimeTo, ShiftTimeTo1] = useState(false);
    const [ExamVenue, ExamVenue1] = useState(false);
    const [ShiftCandidate, ShiftCandidate1] = useState(false);
    const [message, setMessage] = useState("");

    // var studName=false,studEmail=false,studContact=false,studJoiningdate=false,studCompanyname=false,
    // studBatchnumber=false,studBatchsession=false,studPackage=false,studimg=false,ExamTitle=false,ExamDate=false,ExamDuration=false,ShiftNumber=false,ShiftTimeFrom=false,ShiftTimeTo=false,ExamVenue=false,ShiftCandidate=false;
    useEffect(() => {
        axios.get("http://localhost:3002/admin/interViewShow")
            .then((record) => {
                setInterviewRecord(record.data)
                setInterviewClear(record.data);
            })
            .catch(err => console.log('error ', err));
    }, []);

    useEffect(() => {
        console.log("in housevisit : : :")
        axios.get("http://localhost:3002/admin/houseVisitShow")
            .then((record) => {
                console.log("in housevisit : response  ")
                console.log("record.data : ",record.data)
                setHouseVisitRecord(record.data)
                setHouseVisitClear(record.data);
            })
            .catch(err => console.log('error ', err));
    }, []);

    const interviewFilter = (event) => {
        if (event.target.value == "All") {
            setInterviewRecord(interviewRecord1);
        } else {
            var arr = [];
            console.log("insid :");
            array = [];
            interviewRecord1.map((data) => {
                console.log("data.status", data.status);
                if (data.status == event.target.value) {
                    arr = [...arr, {
                        "EnrollID": data.EnrollID,
                        "name": data.name,
                        "marks": data.marks,
                        "feedback": data.feedback,
                        "interviewDate": data.interviewDate,
                        "curDate": data.curDate,
                        "status": data.status
                    }]
                    array = [...array, {
                        "EnrollID": data.EnrollID
                    }]
                }
            })
            setInterviewRecord(arr);
        }
    }



    const houseVisitFilter = (event) => {
        console.log("houseVisitFilter : ")
        if (event.target.value == "All") {
            setHouseVisitRecord(houseVisitRecord1);
        } else {
            var arr = [];
            console.log("insid house visit :");
            array = [];
            houseVisitRecord1.map((data) => {
                console.log("data.status", data.status);
                if (data.status == event.target.value) {
                    arr = [...arr, {
                        "EnrollID": data.EnrollID,
                        "name": data.name,
                        "marks": data.marks,
                        "feedback": data.feedback,
                        "interviewDate": data.interviewDate,
                        "curDate": data.curDate,
                        "status": data.status
                    }]

                    console.log("arrrrrrrrrrrrrr : ",arr)
                    array = [...array, {
                        "EnrollID": data.EnrollID
                    }]
                }
            })
            setHouseVisitRecord(arr);
        }
    }

    useEffect(() => {
        axios.get("http://localhost:3002/admin/viewRegistrationCandidate")
            .then((users) => {
                setUser3(users.data)
                setUser5(users.data)
            })
            .catch(err => console.log('error ', err));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3002/admin/viewPlacementRecord")
            .then((placedusers) => {
                setplacementrocord(placedusers.data)
                setplacementrocord1(placedusers.data)
            })
            .catch(err => console.log('error ', err));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3002/admin/viewShiftRecord")
            .then((record) => {
                setShiftRecord(record.data)
                setShiftrecordRecord(record.data);
            })
            .catch(err => console.log('error ', err));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3002/admin/viewShiftNumber")
            .then((number) => {
                setShiftNumber(number.data)
            })
            .catch(err => console.log('error ', err));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3002/admin/examControllerName")
            .then((name) => {
                setExamName(name.data)
            })
            .catch(err => console.log('error ', err));
    }, []);

    const handleInputs4 = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];
        setInterview({ ...uploadInterview, [name]: file });
        console.log("uploadInterview", uploadInterview);
        console.log("name :=", name);
        console.log("File:-", file);
    };
    const handleInputs5 = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];
        setHome({ ...uploadHome, [name]: file });
        console.log("uploadHome", uploadHome);
        console.log("name :=", name);
        console.log("File:-", file);
    };
    const insertValue = (event) => {
        if (event.target.value == "All") {
            setShiftRecord(shiftrecordRecord)
        } else {
            var arr = [];
            shiftrecordRecord.map((data) => {
                if (data.shiftNumber == event.target.value) {
                    console.log("data.shiftNumber : ", data.shiftNumber)
                    arr = [...arr, {
                        "shiftNumber": data.shiftNumber,
                        "EnrollId": data.EnrollId,
                        "_doc": {
                            "username": data._doc.username,
                            "phoneNo": data._doc.phoneNo,
                            "email": data._doc.email
                        }
                    }]
                }
            })
            setShiftRecord(arr);
        }
    };

    const passed = (event) => {
        if (event.target.value == "null") {
            setUser5(users)
        } else if (event.target.value == "Pass") {
            var arr = [];
            // resultArray=[]
            users.map((data) => {
                if (data.EnrollID[data.EnrollID.length - 1].score > 49) {
                    arr = [...arr, {
                        "username": data.username,
                        "email": data.email,
                        "EnrollID": data.EnrollID,
                        "Attempt": data.attempt,
                    }]
                    // resultArray = [...resultArray, {
                    //     "email": data.email,
                    // }]

                }
            })
            setUser5(arr);
        }
        else if (event.target.value == "Fail") {
            var arr = [];
            // resultArray=[]
            users.map((data) => {
                if (data.EnrollID[data.EnrollID.length - 1].score < 49) {
                    arr = [...arr, {
                        "username": data.username,
                        "email": data.email,
                        "EnrollID": data.EnrollID,
                        "Attempt": data.attempt,
                    }]
                    // resultArray = [...resultArray, {
                    //     "email": data.email,
                    // }]
                }
            })
            setUser5(arr);
        }
    };

    const history = useNavigate();
    const [exam, setUser] = useState({
        examTitle: '',
        examDate: '',
        examDuration: ''
    });

    const [schedule, setUser1] = useState({
        exam: '',
        shiftNumber: '',
        maxCandidates: '',
        shiftTimeFrom: '',
        shiftTimeTo: '',
        examVenue: ''
    });
    
    const [uploadQuestion, setUser2] = useState({
        questionFile: '',
        questionFile2: ''
    });

    const [placedStudentRecord, setPlacedStudent] = useState({
        studentName: '',
        studentNumber: '',
        studentEmail: '',
        studentCompanyName: '',
        studentImage: ''
    });

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log('name : ', name);
        console.log('value : ', value);
        examobj = { ...exam, [name]: value }
        setUser({ ...exam, [name]: value });
        validateField(name, value);
    };
    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'studentName':
                if (value.trim() == "") {
                    document.getElementById("studentName").style.color = "red";
                    document.getElementById("studname").innerHTML = "Name Required";
                    studName1(false);
                    console.log('studName ', studName);
                    return false;
                }
                else {
                    var reg = /^[A-Za-z\s]+$/;
                    if (reg.test(value)) {
                        document.getElementById('studentName').style.color = "green";
                        document.getElementById("studname").innerHTML = "";
                        studName1(true);

                        console.log('studName ', studName);
                        return true
                    }
                    else {
                        console.log("usertext")
                        document.getElementById('studentName').style.color = "red";
                        // document.getElementById("username").innerHTML = "Invalid name";
                        document.getElementById("studname").innerHTML = "Invalid name";
                        console.log('studName ', studName);
                        studName1(false);
                        return false;
                    }
                }
                break;
            case 'studentNumber':

                if (value.trim() == "") {
                    document.getElementById("studentNumber").style.color = "red";
                    document.getElementById("studnumber").innerHTML = "Mobile Number Required";
                    studContact1(false);
                    console.log('studContact ', studContact);
                    return false;
                }
                else {
                    var reg = /^[6789][0-9]{9}$/;
                    if (reg.test(value)) {
                        document.getElementById("studentNumber").style.color = "green";
                        document.getElementById("studnumber").innerHTML = "";
                        studContact1(true);
                        console.log('studContact ', studContact);
                        return true;
                    }
                    else {
                        document.getElementById("studentNumber").style.color = "red";
                        document.getElementById("studnumber").innerHTML = "Enter 10 Digit MobileNo.";
                        studContact1(false);
                        console.log('studContact ', studContact);
                        return false;
                    }
                }
                break;

            case 'studentEmail':

                if (value.trim() == "") {
                    document.getElementById("studentEmail").style.color = "red";
                    document.getElementById("studemail").innerHTML = "Email Required";
                    studEmail1(false);
                    console.log('studEmail ', studEmail);
                    return false;
                }
                else {
                    var reg = /^\w+([\.-])?\w*@[a-z]*([\.][a-z]{2,3})+$/;
                    if (reg.test(value)) {
                        document.getElementById("studentEmail").style.color = "green";
                        document.getElementById("studemail").innerHTML = "";
                        studEmail1(true);
                        console.log('studEmail ', studEmail);
                        return true;
                    }
                    else {
                        document.getElementById("studentEmail").style.color = "red";
                        document.getElementById("studemail").innerHTML = "Invalid email";
                        studEmail1(false);
                        console.log('studEmail ', studEmail);
                        return false;
                    }
                }
                break;

            case 'studentCompanyName':
                if (value.trim() == "") {
                    document.getElementById("studentCompanyName").style.color = "red";
                    document.getElementById("studcompanyname").innerHTML = "Company Name Required";
                    studCompanyname1(false);
                    console.log('studCompanyname ', studCompanyname);
                    return false;
                }
                else {
                    var reg = /^[0-9A-Za-z\s]+$/;
                    if (reg.test(value)) {
                        document.getElementById('studentCompanyName').style.color = "green";
                        document.getElementById("studcompanyname").innerHTML = "";
                        studCompanyname1(true);
                        console.log('studCompanyname ', studCompanyname);
                        return true
                    }
                    else {
                        document.getElementById('studentCompanyName').style.color = "red";
                        document.getElementById("studcompanyname").innerHTML = "Invalid Company name";
                        studCompanyname1(true);
                        console.log('studCompanyname ', studCompanyname);
                        return true
                    }
                }
                break;
            case 'studentJoiningDate':
                if (value == "") {
                    document.getElementById("studentJoiningDate").style.color = "red";
                    document.getElementById("studdate").innerHTML = "Joining Date Required";
                    studJoiningdate1(false);
                    console.log('studCompanyname ', studJoiningdate);
                    return false;
                }
                else {
                    document.getElementById("studentJoiningDate").style.color = "green";
                    document.getElementById("studdate").innerHTML = "";
                    studJoiningdate1(true);
                    console.log('studCompanyname ', studJoiningdate);
                    return true;
                }
                break;
            case 'studentBatchNumber':
                if (value == '') {
                    document.getElementById("studentBatchNumber").style.color = "red";
                    document.getElementById("studbatchnumber").innerHTML = "Batch Number Required";
                    studBatchnumber1(false);
                    console.log('studBatchnumber ', studBatchnumber);
                    return false;
                }
                else {
                    document.getElementById("studentBatchNumber").style.color = "green";
                    document.getElementById("studbatchnumber").innerHTML = "";
                    studBatchnumber1(true);
                    console.log('studBatchnumber ', studBatchnumber);
                    return true;
                }
                break;
            case 'studentBatchSession':
                if (value == '') {
                    document.getElementById("studentBatchSession").style.color = "red";
                    document.getElementById("studbatchsession").innerHTML = "Batch Session Required";
                    studBatchsession1(false);
                    console.log('studBatchsession ', studBatchsession);
                    return false;
                }
                else {
                    document.getElementById("studentBatchSession").style.color = "green";
                    document.getElementById("studbatchsession").innerHTML = "";
                    studBatchsession1(true);
                    console.log('studBatchsession ', studBatchsession);
                    return true;
                }
                break;
            case 'studentPackage':
                if (value == '') {
                    document.getElementById("studentPackage").style.color = "red";
                    document.getElementById("studpackage").innerHTML = "Batch Session Required";
                    studPackage1(false);
                    console.log('studPackage ', studPackage);
                    return false;
                }
                else {
                    document.getElementById("studentPackage").style.color = "green";
                    document.getElementById("studpackage").innerHTML = "";
                    studPackage1(true);
                    console.log('studPackage ', studPackage);
                    return true;
                }
                break;
            case 'examTitle':
                if (value == '') {
                    document.getElementById("examtitle").style.color = "red";
                    document.getElementById("Examtitle").innerHTML = "Batch Session Required";
                    ExamTitle1(false);
                    console.log('ExamTitle ', ExamTitle);
                    return false;
                }
                else {
                    document.getElementById("examtitle").style.color = "green";
                    document.getElementById("Examtitle").innerHTML = "";
                    ExamTitle1(true);
                    console.log('ExamTitle ', ExamTitle);
                    return true;
                }
                break;
            case 'examDate':
                if (value == '') {
                    document.getElementById("examdate").style.color = "red";
                    document.getElementById("Examdate").innerHTML = "Batch Session Required";
                    ExamDate1(false);
                    console.log('ExamDate ', ExamDate);
                    return false;
                }
                else {
                    document.getElementById("examdate").style.color = "green";
                    document.getElementById("Examdate").innerHTML = "";
                    ExamDate1(true);
                    console.log('ExamDate ', ExamDate);
                    return true;
                }
                break;
            case 'examDuration':
                if (value == '') {
                    document.getElementById("examduration").style.color = "red";
                    document.getElementById("Examduration").innerHTML = "Batch Session Required";
                    ExamDuration1(false);
                    console.log('ExamDuration ', ExamDuration);
                    return false;
                }
                else {
                    document.getElementById("examduration").style.color = "green";
                    document.getElementById("Examduration").innerHTML = "";
                    ExamDuration1(true);
                    console.log('ExamDuration ', ExamDuration);
                    return true;
                }
                break;
            case 'shiftNumber':
                if (value == '') {
                    document.getElementById("shiftnumber").style.color = "red";
                    document.getElementById("ShiftNumber").innerHTML = "Batch Session Required";
                    ShiftNumber1(false);
                    console.log('hi1', ShiftNumber);
                    return false;
                }
                else {
                    document.getElementById("shiftnumber").style.color = "green";
                    document.getElementById("ShiftNumber").innerHTML = "";
                    ShiftNumber1(true);
                    console.log('hello1', ShiftNumber);
                    return true;
                }
                break;
            case 'maxCandidates':
                if (value == '') {
                    document.getElementById("shiftcandidate").style.color = "red";
                    document.getElementById("ShiftCandidate").innerHTML = "Candidate Required";
                    ShiftCandidate1(false);
                    console.log('hi2', ShiftCandidate);
                    return false;
                }
                else {
                    document.getElementById("shiftcandidate").style.color = "green";
                    document.getElementById("ShiftCandidate").innerHTML = "";
                    ShiftCandidate1(true);
                    console.log('hello2', ShiftCandidate);
                    return true;
                }
                break;
            case 'shiftTimeFrom':
                if (value == '') {
                    document.getElementById("shiftstarttime").style.color = "red";
                    document.getElementById("ShiftTimefrom").innerHTML = "Start Time Required";
                    ShiftTimeFrom1(false);
                    console.log('hi3', ShiftTimeFrom);
                    return false;
                }
                else {
                    document.getElementById("shiftstarttime").style.color = "green";
                    document.getElementById("ShiftTimefrom").innerHTML = "";
                    ShiftTimeFrom1(true);
                    console.log('hello3', ShiftTimeFrom);
                    return true;
                }
                break;
            case 'shiftTimeTo':
                if (value == '') {
                    document.getElementById("shiftendtime").style.color = "red";
                    document.getElementById("ShiftTimeto").innerHTML = "End Time Required";
                    ShiftTimeTo1(false);
                    console.log('hi4', ShiftTimeTo);
                    return false;
                }
                else {
                    document.getElementById("shiftendtime").style.color = "green";
                    document.getElementById("ShiftTimeto").innerHTML = "";
                    ShiftTimeTo1(true);
                    console.log('hello4', ShiftTimeTo);
                    return true;
                }
                break;
            case 'examVenue':
                if (value == '') {
                    document.getElementById("examVenue").style.color = "red";
                    document.getElementById("ExamVenue").innerHTML = "Batch Session Required";
                    ExamVenue1(false);
                    console.log('hi5', ExamVenue);
                    return false;
                }
                else {
                    document.getElementById("examVenue").style.color = "green";
                    document.getElementById("ExamVenue").innerHTML = "";
                    ExamVenue1(true);
                    console.log('hello5', ExamVenue);
                    return true;
                }
                break;
            case 'studentImage':
                var batchImage = document.getElementById("studentImage");
                if (batchImage.files.length === 0) {
                    studimg1(false);
                    return false;
                }
                else {
                    studimg1(true);
                    return true;
                }
                break;
            // Add validation rules for other fields here
            default:
                break;
        }

        return error;
    };
    function cllCreateexam(e) {
        e.preventDefault();
        if (ExamTitle && ExamDuration && ExamDate)
            createExam(e, examobj);
        else {
            console.log('exam ', ExamTitle, ' duration ', ExamDuration, ' date ', ExamDate);
            Swal.fire({
                icon: "error",
                text: 'Some fields are empty',
                showConfirmButton: false,
                timer: 2000
            });
        }
    }

    const handleInputs3 = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];
        setUser2({ ...uploadQuestion, [name]: file });
    };

    const UploadQuestion = async (e) => {
        if (e) {
            e.preventDefault();
        }
        const formData = new FormData();
        formData.append('questionFile', uploadQuestion.questionFile);
        try {
            axios.post('http://localhost:3002/admin/uploadQuestionFile', formData).then((result) => {
                if (result.status == '200') {
                    Swal.fire({
                        icon: "success",
                        text: 'Question uploaded Successfully',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    console.log(result);
                }
            }).catch((error) => {
                console.log('', error);
            })
        } catch (error) {
            console.log('error:', error);
            window.alert('Failed to register');
        }
    };

    function AdminLogout() {
        Cookies.remove('adEmail');
        history('/admin')
    }

    const handleButtonValue = (e, userId) => {
        axios.post(`http://localhost:3002/admin/allowUser/${userId}`).then((response) => {
            console.log("result", response);
        }).catch((error) => {
            console.log('', error);
        })
    };

    const handleDeleteButtonValue = (e, userId) => {
        axios.post(`http://localhost:3002/admin/deletePlacementRecord/${userId}`).then((response) => {
            console.log("reult : ", response);
        }).catch((error) => {
            console.log("error : ", error);
        })
    }

    const setUserDocuments = (userId, modalStatus) => {
        axios.post(`http://localhost:3002/admin/viewRegistrationCandidateDocument/${userId}`).then((response) => {
            setUser4(response.data);
        }).catch((error) => {
            console.log('', error);
        })
    }

    const handleFileChange1 = (e) => {
        if (e.target.type === 'file') {
            const name = e.target.name;
            const value = e.target.value;
            const file = e.target.files[0];
            validateField(name, value);
            setPlacedStudent({ ...placedStudentRecord, [name]: file });
        } else {
            const name = e.target.name;
            const value = e.target.value;
            setPlacedStudent({ ...placedStudentRecord, [name]: value });
            const validationErrors = validateField(name, value);
        }
    };

    const handleInputs2 = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        sheduleObj = { ...schedule, [name]: value };
        validateField(name, value);
        setUser1({ ...schedule, [name]: value });
    };
    function callShedule(e) {
        e.preventDefault();
        if (ShiftNumber && ShiftCandidate && ShiftTimeFrom && ShiftTimeTo && ExamVenue) {
            console.log('hello6');
            createSchedule(e, sheduleObj);
        }
        else {
            console.log('hi6');
            Swal.fire({
                icon: "error",
                text: 'Some fields are empty',
                showConfirmButton: false,
                timer: 2000
            });
        }
    }
    const PostData1 = async (e) => {
        if (e) {
            e.preventDefault();
        }
        const formData = new FormData();
        for (const key in placedStudentRecord) {
            if (placedStudentRecord[key]) {
                formData.append(key, placedStudentRecord[key]);
            }
        }
        try {
            console.log('studname ', studName, 'studEmail ', studEmail, 'studbatch ', studBatchnumber, 'studbatchsess ', studBatchsession, 'studcompany ', studCompanyname, 'studpackage ', studPackage, 'studcon ', studContact, ' ', studJoiningdate);
            if (studName && studEmail && studJoiningdate && studContact && studCompanyname && studBatchnumber && studBatchsession && studPackage && studimg) {
                toggleLoader();
                axios.post(`http://localhost:3002/admin/addPlacementRecord`, formData).then((result) => {
                    toggleLoader();
                    console.log(result);
                    if (result.status === 201) {
                        Swal.fire({
                            icon: "success",
                            text: 'Data Added Succesfully',
                            showConfirmButton: false,
                            timer: 2000
                        });
                    } else {
                        console.log("Something went wrong....");
                    }
                }).catch((error) => {
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
            console.log('error:', error);
            window.alert('Failed to register');
        }
    };

    const setstudentbatchnumber = (event) => {
        if (event.target.value == "All") {
            setplacementrocord(placementData1)
        } else {
            var arr = [];
            placementData1.map((data, index) => {
                if (data.studentbatchnumber == event.target.value) {
                    arr = [...arr,
                    {
                        "studentname": data.studentname,
                        "studentnumber": data.studentnumber,
                        "studentemail": data.studentemail,
                        "studentcompanyname": data.studentcompanyname,
                        "studentjoiningdate": data.studentjoiningdate,
                        "studentbatchnumber": data.studentbatchnumber,
                        "studentbatchsession": data.studentbatchsession,
                        "studentpackage": data.studentpackage,
                        "studentimage": data.studentimage,
                    }
                    ]
                }
            })
            setplacementrocord(arr);
        }
    }

    const setstudentcompanyname = (event) => {
        if (event.target.value == "All") {
            setplacementrocord(placementData1)
        }
        else {
            var arr = [];
            placementData1.map((data, index) => {
                if (data.studentcompanyname == event.target.value) {
                    arr = [...arr,
                    {
                        "studentname": data.studentname,
                        "studentnumber": data.studentnumber,
                        "studentemail": data.studentemail,
                        "studentcompanyname": data.studentcompanyname,
                        "studentjoiningdate": data.studentjoiningdate,
                        "studentbatchnumber": data.studentbatchnumber,
                        "studentbatchsession": data.studentbatchsession,
                        "studentpackage": data.studentpackage,
                        "studentimage": data.studentimage,
                    }
                    ]
                }
            })
            setplacementrocord(arr);
        }
    }

    const countStudent = () => {
        var passList = 0, absentList = 0, failedList = 0;
        users.map((data) => {
            if (data.EnrollID.length > 0) {
                if (data.EnrollID[data.EnrollID.length - 1].hasOwnProperty("Attendance")) {
                    if (data.EnrollID[data.EnrollID.length - 1].Attendance === 'Present' && data.EnrollID[data.EnrollID.length - 1].score > 49) {
                        passList++;
                        console.log('passList : ', passList);
                    }
                }
            }
        });
        setPass(passList);
        users.map((data) => {
            if (data.EnrollID.length > 0) {
                if (data.EnrollID[data.EnrollID.length - 1].hasOwnProperty("Attendance")) {
                    if (data.EnrollID[data.EnrollID.length - 1].Attendance === 'Present' && data.EnrollID[data.EnrollID.length - 1].score < 49) {
                        failedList++;
                        console.log('failedList : ', failedList);
                    }
                }
            }
        });
        setFail(failedList);
        users.map((data) => {
            if (data.EnrollID.length > 0) {
                if (data.EnrollID[data.EnrollID.length - 1].hasOwnProperty("Attendance")) {
                    if (data.EnrollID[data.EnrollID.length - 1].Attendance == 'Absent') {
                        absentList++;
                        console.log('absentList : ', absentList);
                    }
                }
            }
        });
        setAbs(absentList);
    }
    const setEnrollIdFunction = async () => {
        try {
            axios.post(`http://localhost:3002/candidate/setEnrollId/${enrollPrefix}`).then((result) => {
                console.log(result);
                if (result.status === 201) {
                    alert("Enroll Id Set successfully")
                } else {
                    alert("Some technical Issue");
                }
            }).catch((error) => {
                console.log('errror catch : ', error);
            })
        } catch (error) {
            console.log('error:', error);
            alert('Failed to set enroll Id');
        }
    }
    const UploadInterview = async (e) => {
        if (e) {
            e.preventDefault();
        }
        const formData = new FormData();
        formData.append('interviewFile', uploadInterview.interviewFile);
        const { interviewFile } = uploadInterview;
        try {
            axios.post('http://localhost:3002/admin/uploadInterviewFile', formData).then((result) => {
                if (result.status == '200') {
                    Swal.fire({
                        icon: "success",
                        text: 'Question uploaded Successfully',
                        showConfirmButton: false,
                        timer: 1500.
                    });
                    console.log(result);
                }
            }).catch((error) => {

                console.log('', error);
            })
        } catch (error) {
            console.log('error:', error);
            window.alert('Failed to register');
        }
    };

    const [Faculties, setFaculties] = useState([]);
    var counter = 0;
    useEffect(() => {
        console.log("hiii");
        const fetchFscluties = async () => {
            try {
                const response = await axios.get("http://localhost:3002/admin/getFaculties")
                setFaculties(response.data)
                console.log(response.data);

            } catch (error) {
                console.error("Error While Getting Faculties", error);
            }

        }
        fetchFscluties();
        console.log(Faculties);

    }, [])

    async function searchFaculty(e) {
        e.preventDefault()
        var Searchdata = document.getElementById("searchFacultuyField").value.trim()
        try {
            const response = await axios.get("http://localhost:3002/admin/searchFaculties", { params: { Searchdata: Searchdata } });
            setFaculties(response.data)
            console.log(response.data);
        } catch (e) {
            console.log("Eroor in searching fasculty", e);
        }
    }
    function getRemainingfaculty(faculty) {
        setFaculties(faculty)
    }

    const UploadHome = async (e) => {
        if (e) {
            e.preventDefault();
        }
        const formData = new FormData();
        formData.append('homeFile', uploadHome.homeFile);
        const { homeFile } = uploadHome;
        try {
            axios.post('http://localhost:3002/admin/uploadHomeFile', formData).then((result) => {
                if (result.status == '200') {
                    Swal.fire({
                        icon: "success",
                        text: 'Question uploaded Successfully',
                        showConfirmButton: false,
                        timer: 1500.
                    });
                    console.log(result);
                }
            }).catch((error) => {

                console.log('', error);
            })
        } catch (error) {
            console.log('error:', error);
            window.alert('Failed to register');
        }
    };

    const handleMessage = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setMessage({ ...message, [name]: value });
    };

    const messageFunction = async () => {
        try {
            console.log("array", array);
            console.log("message", message);
            const dataToSend = {
                message: message,
                array: array
            };
            const result = await axios.post(`http://localhost:3002/admin/message`, dataToSend);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    // const messageResultFunction = async () => {
    //     try {
    //         console.log("array", resultArray);
    //         console.log("message", message);
    //         const dataToSend = {
    //             message: message,
    //             resultArray: resultArray
    //         };
    //         const result = await axios.post(`http://localhost:3002/admin/messageResult`, dataToSend);
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    return (
        <>
        <Loader />
       
        <section>
            <div className="modal fade" id="setEnrollModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-center" id="exampleModalLabel">Set Enroll Id for New Batch</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input className="form-control" type="text" placeholder='Set Enroll ID For New Batch' onChange={(event) => { setEnrollId(event.target.value) }}></input>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={setEnrollIdFunction}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100">
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                        <h5 id="offcanvasRightLabel">InfoBeans Foundation</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <div className="w-100 m-2 d-flex justify-content-center flex-column">
                            <div className=" w-100  p-4 m-0 d-flex justify-content-center ">
                                <img className="img fa-circle w-50" src={avatar} alt="" />
                            </div>
                            <center className="small text-break">Ayush Rajput</center>
                            <center className="small text-break">ayush.rajput@infobeansfoundation.com</center>
                        </div>

                        <div className="nav flex-column justify-content-around nav-pills" id="v-pills-tab" role="tablist"
                            aria-orientation="vertical">
                            <button className="nav-link adminNavbar bg-transparent text-danger active" id="v-pills-home-tab" data-bs-toggle="pill"
                                data-bs-target="#v-pills-home" role="tab" aria-controls="v-pills-home"
                                aria-selected="true">Home</button>
                            <button className="nav-link adminNavbar bg-transparent text-danger" id="v-pills-profile-tab" data-bs-toggle="pill"
                                data-bs-target="#v-pills-registrations" role="tab" aria-controls="v-pills-registrations"
                                aria-selected="false">View Registration</button>
                            <button className="nav-link adminNavbar bg-transparent text-danger" id="v-pills-totalplacements-tab" data-bs-toggle="pill"
                                data-bs-target="#v-pills-totalplacements" role="tab" aria-controls="v-pills-totalplacements"
                                aria-selected="false">Total Placements</button>
                            <button className="nav-link adminNavbar bg-transparent text-danger" id="v-pills-addquestions-tab" data-bs-toggle="pill"
                                data-bs-target="#v-pills-addquestions" role="tab" aria-controls="v-pills-addquestions"
                                aria-selected="false">Add Questions</button>
                            <button className="nav-link adminNavbar bg-transparent text-danger" id="v-pills-viewresult-tab" data-bs-toggle="pill"
                                data-bs-target="#v-pills-viewresult" role="tab" aria-controls="v-pills-viewresult"
                                aria-selected="false">View Result</button>
                            <button className="nav-link adminNavbar bg-transparent text-danger" id="v-pills-sendmessage-tab" data-bs-toggle="pill"
                                data-bs-target="#v-pills-sendmessage" role="tab" aria-controls="v-pills-sendmessage"
                                aria-selected="false">Send Message</button>
                            <button className="nav-link adminNavbar bg-transparent text-danger" id="v-pills-scheduleexam-tab" data-bs-toggle="pill"
                                data-bs-target="#v-pills-scheduleexam" role="tab" aria-controls="v-pills-scheduleexam"
                                aria-selected="false">Schedule Exam</button>
                            <button className="nav-link adminNavbar bg-transparent text-danger" id="v-pills-studentrecord-tab" data-bs-toggle="pill"
                                data-bs-target="#v-pills-studentrecord" role="tab" aria-controls="v-pills-studentrecord"
                                aria-selected="false">Student Record</button>
                            <button className="nav-link adminNavbar bg-transparent text-danger" data-bs-toggle="modal"
                                data-bs-target="#setEnrollModal" >Set Enroll</button>
                            <button className="section-tab nav-link adminNavbar bg-transparent text-danger" id="v-pills-addInterview-tab" data-bs-toggle="pill"
                                data-bs-target="#v-pills-addInterview" role="tab" aria-controls="v-pills-addInterview"
                                aria-selected="false">Interview Upload</button>
                            <button className="section-tab nav-link adminNavbar bg-transparent text-danger" id="v-pills-Interview-tab" data-bs-toggle="pill"
                                data-bs-target="#v-pills-Interview" role="tab" aria-controls="v-pills-Interview"
                                aria-selected="false">See Interview</button>
                            <button className="section-tab nav-link adminNavbar " id="v-pills-addHouseVisit-tab" data-bs-toggle="pill"
                                data-bs-target="#v-pills-addHouseVisit" role="tab" aria-controls="v-pills-addHouseVisit"
                                aria-selected="false"><i className="bi bi-people-fill"></i>&nbsp;Housevisit Upload</button>
                            <button className="section-tab nav-link adminNavbar  " id="v-pills-HouseVisit-tab" data-bs-toggle="pill"
                                data-bs-target="#v-pills-HouseVisit" role="tab" aria-controls="v-pills-HouseVisit"
                                aria-selected="false"><i className="bi bi-people-fill"></i>&nbsp;See HouseVisit</button>
                        </div>
                    </div>
                </div>

                <nav className="navbar navbar-expand-lg navbar-light bg-light" id="dashBoardNav">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#"><img width="100px" src={logo}
                            alt="" /></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                        </div>
                    </div>
                </nav>

                <div className="row w-100 m-0 p-0" style={{ height: "min-content" }}>
                    <div className="col-lg-2 p-0" id="nav-pills-disapear">
                        <div style={{ height: "100vh", position: "sticky", top: "0" }} className=" inbeansred nav flex-column justify-content-center nav-pills bg-danger"
                            id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <div style={{ height: "30vh" }} className="">
                                <div className=" w-100 p-4 m-0 d-flex justify-content-center ">
                                    <img className="img fa-circle w-25" src={avatar} alt="" />
                                </div>
                                <center className="text-light small text-break  ">Ayush Rajput</center>
                                <center className="text-light small text-break  ">ayush.rajput@infobeansfoundation.com</center>
                            </div>
                            <div style={{ height: "70vh" }} id='scrollDivs'>
                                <button className="section-tab nav-link adminNavbar active" id="v-pills-home-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true"><i
                                        className="bi bi-house"></i>&nbsp;Home</button>
                                <button className="section-tab nav-link adminNavbar  " id="v-pills-profile-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-registrations" role="tab" aria-controls="v-pills-registrations"
                                    aria-selected="false"><i className="bi bi-file-earmark-person-fill"></i>&nbsp;Registrations</button>
                                <button className="section-tab nav-link adminNavbar  " id="v-pills-totalplacements-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-totalplacements" role="tab" aria-controls="v-pills-totalplacements"
                                    aria-selected="false"><i className="bi bi-mortarboard"></i>&nbsp;Placements</button>
                                <button className="section-tab nav-link adminNavbar  " id="v-pills-addquestions-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-addquestions" role="tab" aria-controls="v-pills-addquestions"
                                    aria-selected="false"><i className="bi bi-patch-question-fill"></i>&nbsp;Questions</button>
                                <button className="section-tab nav-link adminNavbar  " id="v-pills-viewresult-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-viewresult" role="tab" aria-controls="v-pills-viewresult"
                                    aria-selected="false" onClick={countStudent}><i className="bi bi-clipboard2-data-fill"></i>&nbsp;Result</button>
                                <button className="section-tab nav-link adminNavbar  " id="v-pills-sendmessage-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-sendmessage" role="tab" aria-controls="v-pills-sendmessage"
                                    aria-selected="false"><i className="bi bi-send-fill"></i>&nbsp;Message</button>
                                <button className="section-tab nav-link adminNavbar  " id="v-pills-scheduleexam-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-scheduleexam" role="tab" aria-controls="v-pills-scheduleexam"
                                    aria-selected="false"><i className="bi bi-calendar-event-fill"></i>&nbsp;Exam</button>
                                <button className="section-tab nav-link adminNavbar  " id="v-pills-studentrecord-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-studentrecord" role="tab" aria-controls="v-pills-studentrecord"
                                    aria-selected="false"><i className="bi bi-people-fill"></i>&nbsp;Students</button>
                                <button className="section-tab nav-link adminNavbar" role="tab" data-bs-toggle="modal"
                                    data-bs-target="#setEnrollModal" ><i className="bi bi-people-fill"></i>&nbsp;Set Enroll</button>
                                <button className="section-tab nav-link adminNavbar " id="v-pills-addInterview-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-addInterview" role="tab" aria-controls="v-pills-addInterview"
                                    aria-selected="false"><i className="bi bi-people-fill"></i>&nbsp;Interview Upload</button>
                                <button className="section-tab nav-link adminNavbar  " id="v-pills-Interview-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-Interview" role="tab" aria-controls="v-pills-Interview"
                                    aria-selected="false"><i className="bi bi-people-fill"></i>&nbsp;See Interview</button>
                                <button className="section-tab nav-link adminNavbar " id="v-pills-addHouseVisit-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-addHouseVisit" role="tab" aria-controls="v-pills-addHouseVisit"
                                    aria-selected="false"><i className="bi bi-people-fill"></i>&nbsp;Housevisit Upload</button>
                                <button className="section-tab nav-link adminNavbar  " id="v-pills-HouseVisit-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-HouseVisit" role="tab" aria-controls="v-pills-HouseVisit"
                                    aria-selected="false"><i className="bi bi-people-fill"></i>&nbsp;See HouseVisit</button>

                                <button className="section-tab nav-link adminNavbar  " id="v-pills-Interview-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-Faculty" role="tab" aria-controls="v-pills-Interview"
                                    aria-selected="false"><i className="bi bi-people-fill"></i>&nbsp;Facutlty</button>

                            </div>
                        </div>
                    </div>
                    {/*  < !-- ----------------------------------Home Section----------------------------------->} */}
                    <div className="col-12 col-lg-10 p-0 ">
                        <div className="tab-content p-0" id="v-pills-tabContent">

                            <div className="tab-pane fade show active m-0" id="v-pills-home" role="tabpanel"
                                aria-labelledby="v-pills-home-tab">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav">
                                    <div className="container-fluid">
                                        <div className="d-flex align-items-center ">
                                            <a className="navbar-brand" href="#"><img width="100px"
                                                src={logo} alt="" /></a>
                                            <h2 className="h2 ms-2"><i className="bi bi-house"></i>&nbsp;Home</h2>
                                        </div>
                                        <div className="d-flex align-items-center  me-2 ">
                                            <button type="submit" onClick={AdminLogout} className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                            <button type="button" className="btn btn-outline-danger position-relative btn-sm">
                                                <i className="bi bi-bell-fill"></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    5
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </nav>
                                <div className='row w-100 m-0 ' >
                                    <div className='col-12 col-md-4 p-2' >
                                        <div className="alert alert-primary d-flex align-items-center justify-content-around m-0" role="alert">
                                            <div className='text-center p-2'>
                                                <h4>  <i className="bi bi-person-workspace" style={{ fontSize: "30px" }}></i> &nbsp;&nbsp; 15 Trainers</h4>
                                            </div>
                                            <AddFacultyModal getRemainingfaculty={getRemainingfaculty} />
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4  p-2' >
                                        <div className="alert alert-warning d-flex align-items-center justify-content-around m-0" role="alert">
                                            <div className='text-center p-2'>
                                                <h4>  <i className="bi bi-people-fill" style={{ fontSize: "30px" }}></i>  &nbsp;&nbsp; 9 Batches</h4>
                                            </div>
                                            <AddBatchModal />
                                        </div>
                                    </div>

                                    <div className='col-12 col-md-4  p-2' >
                                        <div className="alert alert-success d-flex align-items-center justify-content-around m-0" role="alert">
                                            <div className='text-center p-2'>
                                                <h4>  <i className="bi bi-people-fill" style={{ fontSize: "30px" }}></i>  &nbsp;&nbsp; 3 Centers</h4>
                                            </div>
                                            <AddCenterModal />
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-4  p-2' >
                                        <div className="alert alert-info d-flex align-items-center justify-content-around m-0" role="alert">
                                            <div className='text-center p-2'>
                                                <h4>  <i className="bi bi-image text-info" style={{ fontSize: "30px" }}></i>&nbsp;&nbsp;New Banner</h4>

                                            </div>
                                            <AddBannerModal />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- ----------------------------------Home Section Ends-----------------------------------> */}

                            {/* <!-- ---------------------Regestrations Section--------------------------------- --> */}
                            <div className="tab-pane fade pt-2" id="v-pills-registrations" role="tabpanel"
                                aria-labelledby="v-pills-registrations-tab">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav">
                                    <div className="container-fluid">
                                        <div className="d-flex align-items-center ">
                                            <a className="navbar-brand" href="#"><img width="100px"
                                                src={logo} alt="" /></a>
                                            <h2 className="h2 ms-2"> <i className="fa-regular fa-address-card"></i> Total Registrations</h2>
                                        </div>
                                        <div className="d-flex align-items-center  me-2 ">
                                            <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                            <button type="button" className="btn btn-outline-danger position-relative btn-sm">
                                                <i className="bi bi-bell-fill"></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    5
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </nav>
                                {/* <!-- --------------------------Filter Section--------------------------- --> */}
                                <div className="row w-100 m-0 ">
                                    <div className="col-12  col-md-3 p-2">
                                        <select className="form-control-sm w-100">
                                            <option value="null">Select Gender</option>
                                            <option value="null">Male</option>
                                            <option value="null">Female</option>
                                            <option value="null">All</option>
                                        </select>
                                    </div>
                                    <div className="col-12  col-md-3 p-2">
                                        <select className="form-control-sm w-100">
                                            <option value="null">Select by Sections</option>
                                            <option value="null">View All</option>
                                            <option value="null">Section 1</option>
                                            <option value="null">Section 2</option>
                                            <option value="null">Section 3</option>
                                            <option value="null">Section 1 & 2</option>
                                            <option value="null">Section 2 & 3</option>
                                            <option value="null">Section 3 & 1</option>
                                        </select>
                                    </div>
                                    <div className="col-12  col-md-6 p-2 order-first order-md-last">
                                        <div className="row rowId">
                                            <div className="col-4  d-flex justify-content-end">
                                                <button className="btn btn-outline-success btn-sm w-100 " type="button">To Excel &nbsp; <i
                                                    className="fa-solid fa-table"></i></button>
                                            </div>
                                            <div className="col-8 d-flex justify-content-end ">
                                                <div className="btn-group" role="group" aria-label="Basic example">
                                                    <input className="form-control-sm" placeholder="Search Here" type="text" name="" value="" />
                                                    <button type="button" className="btn btn-outline-primary btn-sm"><i
                                                        className="bi bi-search"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- --------------------------Filter SectionEnds --------------------------- --> */}
                                <div className="w-100 dashBorad-table-div ps-2 pe-2">
                                    <table className="table table-bordered table-hover table-responsive-md ">
                                        <thead className="sticky-top">
                                            <tr className="bg-danger text-white">
                                                <th>SNo.</th>
                                                <th>Name</th>
                                                <th>Phone Number</th>
                                                <th>Aadhar Number</th>
                                                <th>Email</th>
                                                <th>Registration Date</th>
                                                <th>DOB</th>
                                                <th>Attempt</th>
                                                <th>Allow</th>
                                                <th>See</th>
                                            </tr>
                                        </thead>
                                        <tbody className="overflow-hidden">
                                            {
                                                users.map((user, index) => {
                                                    return <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{user.username}</td>
                                                        <td>{user.phoneNo}</td>
                                                        <td>{user.aadharNo}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.registrationDate}</td>
                                                        <td>{user.dob}</td>
                                                        <td>{user.attempt}</td>
                                                        <td>
                                                            {(user.attempt >= 3) ? (user.examAllow == false) ? (
                                                                <button className="btn btn-outline-danger btn-sm" id={`${user._id}`} type="submit" onClick={(e) => handleButtonValue(e, user._id)}><small>Allow</small></button>
                                                            ) : (<button className="btn btn-outline-primary btn-sm" disabled id={`${user._id}`} type="submit"><small>Eligible</small></button>) : (<button className="btn btn-outline-primary btn-sm" disabled id={`${user._id}`} type="submit"><small>Eligible</small></button>)}
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-outline-danger btn-sm" type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setUserDocuments(user._id, true)}><small>See Document</small></button>
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* ---------------Modal Start */}
                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-lg modal-dialog-scrollable">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">See Documents</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            {
                                                <>
                                                    <div>
                                                        <h4>Father's Income</h4>
                                                        <h4>{userDocument.income}</h4>
                                                    </div>
                                                    <div className='row mt-5'>
                                                        <div className='col-lg-6'>
                                                            <h4>Adhaar Card Photo</h4>
                                                            <a href={"http://localhost:3002/" + userDocument.aadharFile}>
                                                                <img width={"100%"} height={"300vw"} src={"http://localhost:3002/" + userDocument.aadharFile}></img>
                                                            </a>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <h4>Income Certificate Image</h4>
                                                            <a href={"http://localhost:3002/" + userDocument.incomeCertificate}>
                                                                <img width={"100%"} height={"300vw"} src={"http://localhost:3002/" + userDocument.incomeCertificate}></img>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className='row mt-5'>
                                                        <div className='col-lg-6'>
                                                            <h4>Father Adhaar Card Image</h4>
                                                            <a href={"http://localhost:3002/" + userDocument.fatherAadharcard}>
                                                                <img width={"100%"} height={"300vw"} src={"http://localhost:3002/" + userDocument.fatherAadharcard}></img>
                                                            </a>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <h4>Marksheet Image</h4>
                                                            <a href={"http://localhost:3002/" + userDocument.marksheet}>
                                                                <img width={"100%"} height={"300vw"} src={"http://localhost:3002/" + userDocument.marksheet}></img>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className='row mt-5'>
                                                        <div className='col-lg-6'>
                                                            <h4>Latest year Marksheet Image</h4>
                                                            <a href={"http://localhost:3002/" + userDocument.latestMarksheet}>
                                                                <img width={"100%"} height={"300vw"} src={"http://localhost:3002/" + userDocument.latestMarksheet}></img>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary">Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* ---------------Modal End */}
                            {/* <!-----------------------Regestrations Section Ends--------------------------------- --> */}
                            {/* <!-- ------------------------------------Total Plaements-----------------------------------------------> */}
                            <div className="tab-pane fade" id="v-pills-totalplacements" role="tabpanel"
                                aria-labelledby="v-pills-totalplacements-tab">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav">
                                    <div className="container-fluid">
                                        <div className="d-flex align-items-center ">
                                            <a className="navbar-brand" href="#"><img width="100px"
                                                src={logo} alt="" /></a>
                                            <h2 className="h2 ms-2"> <i className="fa-regular fa-address-card"></i> Total Placements</h2>
                                        </div>
                                        <div className="d-flex align-items-center  me-2 ">
                                            <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                            <button type="button" className="btn btn-outline-danger position-relative btn-sm">
                                                <i className="bi bi-bell-fill"></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    5
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </nav>
                                <div className="row w-100 m-0 p-3">
                                    <div className="col-12 col-md-3 mb-1">
                                        <select className="form-control-sm w-100" onChange={setstudentbatchnumber}>
                                            <option value='All'>select by batch (All)</option>
                                            {[...new Set(placementData1.map((placed) => placed.studentbatchnumber))].map((batchNumber, index) => (
                                                <option key={index} value={batchNumber}>
                                                    {batchNumber}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-12 col-md-3 mb-1">
                                        <select className="form-control-sm w-100" onChange={setstudentcompanyname}>
                                            <option value='All'>All</option>
                                            {[...new Set(placementData1.map((placed) => placed.studentcompanyname))].map((companyName, index) => (
                                                <option key={index} value={companyName}>
                                                    {companyName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-12 col-md-2 mb-1">
                                        <button className="btn btn-outline-success btn-sm w-100 " type="button">To Excel &nbsp; <i
                                            className="fa-solid fa-table"></i></button>
                                    </div>
                                    <div className="col-12 col-md-4 order-first order-md-last d-flex justify-content-between  mb-1 ">
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <input className="form-control-sm" placeholder="Search Here" type="text" name="" value="" />
                                            <button type="button" className="btn btn-outline-primary btn-sm"><i className="bi bi-search"></i></button>
                                        </div>
                                        <button type="button" className="btn  btn-outline-primary " data-bs-toggle="modal" data-bs-target="#addplacementrecordmodal"><i className="bi bi-plus"></i></button>
                                    </div>
                                </div>
                                {/* <!-- ======================================= --> */}
                                <div className="row w-100 m-0 p-2 dashBorad-table-div ">
                                    {
                                        placementData.map((user, index) => {
                                            return <div key={index} className="col-6 col-md-3 col-lg-4 mt-3">
                                                <div className="card w-100  m-1">
                                                    <div className="w-100 d-flex justify-content-center mt-3" style={{ height: '20vh' }}>
                                                        <img src={"http://localhost:3002/" + user.studentimage}
                                                            className="card-img-top w-50" alt="..." height={'100%'} width={'100%'} style={{ borderRadius: '50%' }} />
                                                    </div>
                                                    <div className="card-body">
                                                        <h5 className="card-title">Name : {user.studentname}</h5>
                                                        <p className="text-muted">mobile Number : {user.studentnumber}</p>
                                                        <p className="text-muted">Email : {user.studentemail}</p>
                                                        <p className="card-text text-muted  text-sm-start">Compay Name : <i className="bi bi-buildings"></i> {user.studentcompanyname} </p>
                                                        <p className="card-text text-muted  text-sm-start">Joining Date : {user.studentjoiningdate} </p>
                                                        <p className="card-text text-muted  text-sm-start">Batch : ITEP{user.studentbatchnumber} </p>
                                                        <p className="card-text text-muted  text-sm-start">Session : {user.studentbatchsession} </p>
                                                        <p className="card-text text-muted  text-sm-start">Package : {user.studentpackage} </p>
                                                        <button className="btn btn-outline-primary btn-sm m-3 mb-1"><i className="bi bi-send-fill"></i>&nbsp;Message</button>
                                                        <button className="btn btn-outline-warning btn-sm m-3 mb-1"><i className="bi bi-envelope"></i>&nbsp;Mail</button>
                                                        <button className="btn btn-outline-danger btn-sm m-3 mb-1" onClick={(e) => handleDeleteButtonValue(e, user._id)}>&nbsp;Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                            {/* -----------------------ADD PLACEMENT RECORD MODAL START--------------------------- */}
                            <div className="modal fade" id="addplacementrecordmodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Add New Placement</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={PostData1} encType="multipart/form-data">
                                                <input className='form-control' id='studentName' type='text' name='studentName' placeholder='Enter name' onKeyUp={(e) => handleFileChange1(e)} />
                                                <p id='studname'></p>
                                                <input className='form-control' id='studentEmail' type='text' name='studentEmail' placeholder='Enter Email' onKeyUp={(e) => handleFileChange1(e)} />
                                                <p id='studemail'></p>
                                                <input className='form-control' id='studentNumber' min='1' type='number' name='studentNumber' placeholder='Enter contact Number' onKeyUp={(e) => handleFileChange1(e)} />
                                                <p id='studnumber'></p>
                                                <input className='form-control' id='studentCompanyName' type='text' name='studentCompanyName' placeholder='Enter Company Name' onKeyUp={(e) => handleFileChange1(e)} />
                                                <p id='studcompanyname'></p>
                                                <label>Enter Joining date</label>
                                                <input className='form-control' id='studentJoiningDate' type='date' name='studentJoiningDate' onKeyUp={(e) => handleFileChange1(e)} />
                                                <p id='studdate'></p>
                                                <input className='form-control' id='studentBatchNumber' min='1' type='number' name='studentBatchNumber' placeholder='Enter Batch Number' onKeyUp={(e) => handleFileChange1(e)} />
                                                <p id='studbatchnumber'></p>
                                                <input className='form-control' id='studentBatchSession' min='1' type='number' name='studentBatchSession' placeholder='Enter Batch Session' onKeyUp={(e) => handleFileChange1(e)} />
                                                <p id='studbatchsession'></p>
                                                <input className='form-control' id='studentPackage' min='1' type='number' name='studentPackage' placeholder='Enter Student Package' onKeyUp={(e) => handleFileChange1(e)} />
                                                <p id='studpackage'></p>
                                                <label>Upload Student Image</label>
                                                <input type='file' name='studentImage' placeholder='Enter Photo' onKeyUp={(e) => handleFileChange1(e)} id='studentImage' /><br /><br />
                                                <input type='submit' className='btn btn-outline-primary w-100 mt-2' value="Add Placement" /><br />
                                                <button className='btn btn-outline-danger w-100 mt-2' type="reset" data-bs-dismiss="modal"><i className="bi bi-arrow-clockwise"></i>&nbsp;reset</button>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* -----------------------ADD PLACEMENT RECORD MODAL END----------------------------- */}

                            {/* <!-- ---------------------------------_Add Questions-------------------------- --> */}
                            <div className="tab-pane fade" id="v-pills-addquestions" role="tabpanel" aria-labelledby="v-pills-addquestions-tab">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav">
                                    <div className="container-fluid">
                                        <div className="d-flex align-items-center ">
                                            <a className="navbar-brand" href="#"><img width="100px"
                                                src={logo} alt="" /></a>
                                            <h2 className="h2 ms-2"><i className="bi bi-patch-question-fill"></i> &nbsp; Add Questions</h2>
                                        </div>
                                        <div className="d-flex align-items-center  me-2 ">
                                            <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                            <button type="button" className="btn btn-outline-danger position-relative btn-sm">
                                                <i className="bi bi-bell-fill"></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    5
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </nav>
                                <div className="w-100 d-flex align-items-center justify-content-center " style={{ height: "75vh" }} >
                                    <div className='w-100   d-flex align-items-center justify-content-center' >
                                        <div className='row w-100 m-0' >
                                            <div className='col-12 col-sm-6 offset-sm-3' >
                                                <form action="" onSubmit={UploadQuestion} encType="multipart/form-data" >
                                                    <label className='p-2' htmlFor="inputFile" id="driopArea">
                                                        <h1><i className="bi bi-cloud-arrow-up"></i> &nbsp; Upload File</h1>
                                                        <p>Drag & Drop File in the box or click the box to open files</p>
                                                        <input className=" w-100" id='questionUplodInput' type="file" name="questionFile" onChange={(e) => handleInputs3(e, 'questionFile')} />
                                                        <label id='questionuploadlabel'>Upload here</label>
                                                        <div>
                                                        </div>
                                                    </label>
                                                    <input type="submit" className="btn btn-outline-danger w-100 mt-3"
                                                        data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                                        aria-expanded="true" aria-controls="collapseThree" value="submit" />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- ---------------------------------_Add Questions Ends-------------------------- --> */}

                            {/* <!-- -----------------------------View Result----------------------------------------- --> */}
                            <div className="tab-pane fade" id="v-pills-viewresult" role="tabpanel"
                                aria-labelledby="v-pills-viewresult-tab">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav">
                                    <div className="container-fluid">
                                        <div className="d-flex align-items-center ">
                                            <a className="navbar-brand" href="#"><img width="100px"
                                                src={logo} alt="" /></a>
                                            <h2 className="h2 ms-2"><i className="bi bi-graph-up-arrow"></i>&nbsp;Result</h2>
                                        </div>
                                        <div className="d-flex align-items-center  me-2 ">
                                            <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                            <button type="button" className="btn btn-outline-danger position-relative btn-sm">
                                                <i className="bi bi-bell-fill"></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    5
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </nav>
                                <div className="row m-0 p-2 w-100">
                                    <div className="col-6 col-sm-6 col-md-3">
                                        <div className="alert alert-info p-2 d-flex" role="alert">
                                            <div className="d-flex align-items-center ">
                                                <h1 className="h1"><i className="bi bi-person"></i></h1>
                                            </div>
                                            <div className="ms-2">
                                                <p className="m-0">Total Students</p>
                                                <h4>{users.length}</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-sm-6 col-md-3">
                                        <div className="alert alert-success p-2 d-flex" role="alert">
                                            <div className="d-flex align-items-center ">
                                                <h1 className="h1"><i className="bi bi-clipboard2-data"></i></h1>
                                            </div>
                                            <div className="ms-2">
                                                <p className="m-0">Total Passed</p>
                                                <h4>{pass}</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-sm-6 col-md-3">
                                        <div className="alert alert-warning p-2 d-flex" role="alert">
                                            <div className="d-flex align-items-center ">
                                                <h1 className="h1"><i className="bi bi-person-exclamation"></i></h1>
                                            </div>
                                            <div className="ms-2">
                                                <p className="m-0">Total Absent</p>
                                                <h4>{absent}</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-sm-6 col-md-3">
                                        <div className="alert alert-danger p-2 d-flex" role="alert">
                                            <div className="d-flex align-items-center ">
                                                <h1 className="h1"><i className="bi bi-exclamation-circle"></i></h1>
                                            </div>
                                            <div className="ms-2">
                                                <p className="m-0">Total Failed</p>
                                                <h4>{fail}</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-3 mb-2">
                                        <select className="form-control-sm w-100">
                                            <option value="null">Select by Status</option>
                                            <option value="null">All</option>
                                            <option value="null">Passed</option>
                                            <option value="null">Failed</option>
                                            <option value="null">Absent</option>
                                        </select>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-3 mb-2">
                                        <select className="form-control-sm w-100" onChange={passed} >
                                            <option value="null" >Select by Result</option>
                                            <option value="Pass">Pass</option>
                                            <option value="Fail">Fail</option>
                                        </select>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-3 mb-2">
                                        <button className="btn btn-outline-success btn-sm w-100 " type="button">To Excel &nbsp;
                                            <i className="fa-solid fa-table"></i></button>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-3">
                                        <div className="btn-group w-75 " role="group" aria-label="Basic example">
                                            <input className="form-control-sm " style={{ width: "207px" }} placeholder="Search Here" type="text" name="" value="" />
                                            <button type="button" className="btn btn-outline-primary btn-sm"><i className="bi bi-search"></i></button>
                                        </div>
                                    </div>
                                    {/* <div className="col-6 col-sm-3 col-md-4 mb-2 d-flex justify-content-center">
                                        <div className="btn-group " role="group" aria-label="Basic example">
                                            <button className="btn btn-outline-success btn-sm" data-bs-toggle="modal"
                                                data-bs-target="#setResultModal" type="button">Message To All</button>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="w-100 p-2 dashBorad-table-div ">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Degree</th>
                                                <th>Attempts</th>
                                                <th>Percent</th>
                                                <th>Status</th>
                                                <th>Result</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users5.map((data, index) => {
                                                    if (data.EnrollID.length > 0) {
                                                        if (data.EnrollID[data.EnrollID.length - 1].hasOwnProperty("Attendance")) {
                                                            if (data.EnrollID[data.EnrollID.length - 1].Attendance == "Present") {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{data.username}</td>
                                                                        <td>{data.email}</td>
                                                                        <td>{data.EnrollID[data.EnrollID.length - 1].enrollID}</td>
                                                                        <td align='center'>{data.attempt}</td>
                                                                        <td>{data.EnrollID[data.EnrollID.length - 1].score}</td>
                                                                        <td>
                                                                            {data.EnrollID[data.EnrollID.length - 1].score > 49 ? (
                                                                                <span className="badge bg-success">Passed</span>
                                                                            ) : (
                                                                                <span className="badge bg-danger">Failed</span>
                                                                            )}
                                                                        </td>
                                                                        <td>
                                                                            <select className="form-select" style={{ border: 'none' }}>
                                                                                {data.EnrollID.map((enrollID, index) => (
                                                                                    <option key={index}>
                                                                                        {enrollID.enrollID} : {enrollID.score}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            }
                                                        }
                                                    }
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* <!-- -----------------------------View Result Ends----------------------------------------- --> */}

                            {/* <!-- --------------------------------------------Send Message--------------------------------------- --> */}
                            <div className="tab-pane fade" id="v-pills-sendmessage" role="tabpanel"
                                aria-labelledby="v-pills-sendmessage-tab">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav">
                                    <div className="container-fluid">
                                        <div className="d-flex align-items-center ">
                                            <a className="navbar-brand" href="#"><img width="100px"
                                                src={logo} alt="" /></a>
                                            <h2 className="h2 ms-2"><i className="bi bi-send-fill"></i>&nbsp;Send Message</h2>
                                        </div>
                                        <div className="d-flex align-items-center  me-2 ">
                                            <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                            <button type="button" className="btn btn-outline-danger position-relative btn-sm">
                                                <i className="bi bi-bell-fill"></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    5
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </nav>
                                <div className="row w-100  m-0  p-0 ">
                                    <div className="col-12 col-sm-6 col-md-2 mb-2">
                                        <select className="form-control-sm w-100">
                                            <option>Select by Batch (All)</option>
                                            <option>Batch 1</option>
                                            <option>Batch 2</option>
                                            <option>Batch 3</option>
                                            <option>Batch 4</option>
                                            <option>Batch 5</option>
                                        </select>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-2 mb-2">
                                        <select className="form-control-sm w-100" onChange={insertValue}>
                                            <option value="All">Select by Shift (ALL)</option>
                                            {shiftNumber.map((data, index) => (
                                                <option key={index} value={data.shiftNumber}>Shift {data.shiftNumber}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-6 col-sm-6 col-md-2 mb-2">
                                        <button className="btn btn-outline-success btn-sm w-100 " type="button">To Excel &nbsp; <i
                                            className="fa-solid fa-table"></i></button>
                                    </div>
                                    <div className="col-6 col-sm-3 col-md-4 mb-2 d-flex justify-content-center">
                                        <div className="btn-group " role="group" aria-label="Basic example">
                                            <input className="form-control-sm" placeholder="Search Here" type="text" />
                                            <button type="button" className="btn btn-outline-primary btn-sm"><i className="bi bi-search"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="dashBorad-table-div p-2">
                                    <table className="table table-hover table-sm">
                                        <thead className="bg-light ">
                                            <tr>
                                                <th>SNo</th>
                                                <th>Name</th>
                                                <th>Phone Number</th>
                                                <th>Enrollment Number</th>
                                                <th>Email</th>
                                                <th>Shift Number</th>
                                                <th>Message</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {shiftRecord.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data._doc.username}</td>
                                                    <td>{data._doc.phoneNo}</td>
                                                    <td>{data.EnrollId}</td>
                                                    <td>{data._doc.email}</td>
                                                    <td>{data.shiftNumber}</td>
                                                    <td>
                                                        <button className="btn btn-outline-primary btn-sm">
                                                            <i className="bi bi-send-fill"></i>&nbsp;Message
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))} */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* <!-- --------------------------------------------Send Message Ends--------------------------------------- --> */}

                            {/* <!-- --------------------------------Schedule Exam ------------------------------------ --> */}
                            <div className="tab-pane fade" id="v-pills-scheduleexam" role="tabpanel" aria-labelledby="v-pills-scheduleexam-tab">
                                <div className="row  w-100 m-0">
                                    <div className="col-12 col-md-6 p-5 vh-75 d-flex justify-content-center align-items-center   ">
                                        <div className="mt-5 mb-3 w-100 p-3  pb-4 pt-4 sheduleform" >
                                            <h3 className='text-center'>Exam Schedule Form</h3>
                                            <div className="d-block" >
                                                <form className='p-3' action="" onSubmit={cllCreateexam}>
                                                    <input className="text-center form-control" type="text" name="examTitle" onKeyUp={handleInputs} id="examtitle" placeholder="Enter Exam Title" />
                                                    <p id='Examtitle'></p>
                                                    <input className="text-center form-control" type="date" name="examDate" id="examdate" onKeyUp={handleInputs} placeholder="Enter examdate" />
                                                    <p id='Examdate'></p>
                                                    <input className="text-center form-control" type="number" min='1' name="examDuration" onKeyUp={handleInputs} id="examduration" placeholder="Enter Exam Duration" />
                                                    <p id='Examduration'></p>
                                                    <input className="btn w-100 btn-outline-danger text-center" type="submit" />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6  p-5 vh-75 d-flex justify-content-center align-items-center">
                                        <div className=" mt-5 mb-3 w-100 p-3  pb-4 pt-4 sheduleform">
                                            <h3 className='text-center'>Shift Schedule Form</h3>
                                            <div className="d-block " >
                                                <form className='p-3' action="" onSubmit={callShedule}>
                                                    <select className="form-control  text-center mb-3" name='exam' id='exam' onKeyUp={handleInputs2}>
                                                        <option value="All">Select Exam For Shift</option>
                                                        {examName.map((data, index) => (
                                                            <option key={index} value={data._id}>{data.examTitle}</option>
                                                        ))}
                                                    </select>
                                                    <input className=" text-center form-control" type="number" min='1' name="shiftNumber" onKeyUp={handleInputs2} id="shiftnumber" placeholder="Enter shiftNumber" />
                                                    <p id='ShiftNumber'></p>
                                                    <input className=" text-center form-control" type="number" min='1' name="maxCandidates" onKeyUp={handleInputs2} id="shiftcandidate" placeholder="Enter maxCandidates" />
                                                    <p id='ShiftCandidate'></p>
                                                    <input className=" text-center form-control" type="time" name="shiftTimeFrom" onKeyUp={handleInputs2} id="shiftstarttime" placeholder="Enter shiftTimeFrom" />
                                                    <p id='ShiftTimefrom'></p>
                                                    <input className=" text-center form-control" type="time" name="shiftTimeTo" onKeyUp={handleInputs2} id="shiftendtime" placeholder="Enter shiftTimeTo" />
                                                    <p id='ShiftTimeto'></p>
                                                    <input className=" text-center form-control" type="text" name="examVenue" onKeyUp={handleInputs2} id="examVenue" placeholder="Enter the Venue" />
                                                    <p id='ExamVenue'></p>
                                                    <input className=" w-100 text-center btn btn-outline-danger mt-3" type="submit" />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- --------------------------------Schedule Exam Ends------------------------------------ --> */}

                            {/* <!--------------------------------------Students Records----------------------------------> */}
                            <div className="tab-pane fade mb-2 ms-2 pt-2" id="v-pills-studentrecord" role="tabpanel"
                                aria-labelledby="v-pills-studentrecord-tab p-2">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav">
                                    <div className="container-fluid">
                                        <div className="d-flex align-items-center ">
                                            <a className="navbar-brand" href="#"><img width="100px"
                                                src={logo} alt="" /></a>
                                            <h2 className="h2 ms-2"> <i className="fa-solid fa-graduation-cap"></i> &nbsp; Student Records</h2>
                                        </div>
                                        <div className="d-flex align-items-center  me-2 ">
                                            <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                            <button type="button" className="btn btn-outline-danger position-relative btn-sm">
                                                <i className="bi bi-bell-fill"></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    5
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </nav>
                                <div className="row w-100 m-0 ">
                                    <div className="col-12  col-md-3 p-2">
                                        <select className="form-control-sm w-100">
                                            <option value="null">Select Gender</option>
                                            <option value="null">Male</option>
                                            <option value="null">Female</option>
                                            <option value="null">All</option>
                                        </select>
                                    </div>
                                    <div className="col-12  col-md-3 p-2">
                                        <select className="form-control-sm w-100">
                                            <option value="null">Select Batch</option>
                                            <option value="null">Batch 1</option>
                                            <option value="null">Batch 2</option>
                                            <option value="null">Batch 3</option>
                                        </select>
                                    </div>
                                    <div className="col-12  col-md-6 p-2">
                                        <div className="row">
                                            <div className="col-4   d-flex justify-content-end ">
                                                <button className="btn btn-outline-success btn-sm w-100 " type="button">To Excel &nbsp; <i
                                                    className="fa-solid fa-table"></i></button>
                                            </div>
                                            <div className="col-8 d-flex justify-content-end">
                                                <div className="btn-group " role="group" aria-label="Basic example">
                                                    <input className="form-control-sm" placeholder="Search Here" type="text" name="" value="" />
                                                    <button type="button" className="btn btn-outline-primary btn-sm"><i
                                                        className="bi bi-search"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-100 dashBorad-table-div ps-2 pe-2">
                                    <table className="table  table-hover table-sm table-responsive-md">
                                        <thead className="sticky-top bg-white ">
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone Number</th>
                                                <th>City</th>
                                                <th>Degree</th>
                                                <th>Age</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>John Doe</td>
                                                <td>johndoe@example.com</td>
                                                <td>(123) 456-7890</td>
                                                <td>New York</td>
                                                <td>Bachelor's</td>
                                                <td>20</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>John Cena</td>
                                                <td>johncena@example.com</td>
                                                <td>(123) 456-7890</td>
                                                <td>New York</td>
                                                <td>Bachelor's</td>
                                                <td>22</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Bob Johnson</td>
                                                <td>bobj@example.com</td>
                                                <td>(789) 123-4567</td>
                                                <td>Chicago</td>
                                                <td>Bachelor's</td>
                                                <td>22</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>Alice Wilson</td>
                                                <td>alicew@example.com</td>
                                                <td>(234) 567-8901</td>
                                                <td>Houston</td>
                                                <td>Ph.D.</td>
                                                <td>28</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>David Brown</td>
                                                <td>davidb@example.com</td>
                                                <td>(567) 890-1234</td>
                                                <td>Miami</td>
                                                <td>Bachelor's</td>
                                                <td>21</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>Susan Lee</td>
                                                <td>susanl@example.com</td>
                                                <td>(890) 123-4567</td>
                                                <td>San Francisco</td>
                                                <td>Master's</td>
                                                <td>27</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>Michael Taylor</td>
                                                <td>michaelt@example.com</td>
                                                <td>(123) 456-7890</td>
                                                <td>Seattle</td>
                                                <td>Bachelor's</td>
                                                <td>23</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>8</td>
                                                <td>Linda Clark</td>
                                                <td>lindac@example.com</td>
                                                <td>(456) 789-1234</td>
                                                <td>Boston</td>
                                                <td>Master's</td>
                                                <td>26</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>9</td>
                                                <td>William Adams</td>
                                                <td>williama@example.com</td>
                                                <td>(789) 123-4567</td>
                                                <td>Dallas</td>
                                                <td>Bachelor's</td>
                                                <td>24</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>10</td>
                                                <td>Karen Hall</td>
                                                <td>karenh@example.com</td>
                                                <td>(234) 567-8901</td>
                                                <td>Philadelphia</td>
                                                <td>Ph.D.</td>
                                                <td>29</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>11</td>
                                                <td>Mary Adams</td>
                                                <td>marya@example.com</td>
                                                <td>(567) 890-2345</td>
                                                <td>San Diego</td>
                                                <td>Bachelor's</td>
                                                <td>22</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>12</td>
                                                <td>James Brown</td>
                                                <td>jamesb@example.com</td>
                                                <td>(890) 123-5678</td>
                                                <td>Denver</td>
                                                <td>Master's</td>
                                                <td>27</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>13</td>
                                                <td>Laura Carter</td>
                                                <td>laurac@example.com</td>
                                                <td>(123) 456-6789</td>
                                                <td>Phoenix</td>
                                                <td>Bachelor's</td>
                                                <td>24</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>14</td>
                                                <td>Richard Davis</td>
                                                <td>richardd@example.com</td>
                                                <td>(456) 789-2345</td>
                                                <td>Atlanta</td>
                                                <td>Ph.D.</td>
                                                <td>31</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>15</td>
                                                <td>Sarah Evans</td>
                                                <td>sarahe@example.com</td>
                                                <td>(789) 123-5678</td>
                                                <td>Miami</td>
                                                <td>Master's</td>
                                                <td>28</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>16</td>
                                                <td>Thomas Foster</td>
                                                <td>thomasf@example.com</td>
                                                <td>(234) 567-7890</td>
                                                <td>Chicago</td>
                                                <td>Bachelor's</td>
                                                <td>25</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>17</td>
                                                <td>Emily Green</td>
                                                <td>emilyg@example.com</td>
                                                <td>(567) 890-3456</td>
                                                <td>Los Angeles</td>
                                                <td>Ph.D.</td>
                                                <td>30</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>18</td>
                                                <td>Robert Harris</td>
                                                <td>roberth@example.com</td>
                                                <td>(890) 123-6789</td>
                                                <td>New York</td>
                                                <td>Master's</td>
                                                <td>29</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>19</td>
                                                <td>Jennifer Jackson</td>
                                                <td>jenniferj@example.com</td>
                                                <td>(123) 456-7890</td>
                                                <td>San Francisco</td>
                                                <td>Bachelor's</td>
                                                <td>26</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>20</td>
                                                <td>Daniel King</td>
                                                <td>danielk@example.com</td>
                                                <td>(456) 789-3456</td>
                                                <td>Houston</td>
                                                <td>Ph.D.</td>
                                                <td>32</td>
                                                <td><button className="btn btn-outline-danger btn-sm" type="submit"><small>Remove</small></button>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* <!--------------------------------------Students Records Ends----------------------------------> */}
                            <div className="tab-pane fade" id="v-pills-addInterview" role="tabpanel" aria-labelledby="v-pills-addquestions-tab">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav">
                                    <div className="container-fluid">
                                        <div className="d-flex align-items-center ">
                                            <a className="navbar-brand" href="#"><img width="100px"
                                                src={logo} alt="" /></a>
                                            <h2 className="h2 ms-2"><i className="bi bi-patch-question-fill"></i> &nbsp; Add Clear Interview</h2>
                                        </div>
                                        <div className="d-flex align-items-center  me-2 ">
                                            <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                            <button type="button" className="btn btn-outline-danger position-relative btn-sm">
                                                <i className="bi bi-bell-fill"></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    5
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </nav>
                                <div className="w-100 d-flex align-items-center justify-content-center " style={{ height: "75vh" }} >
                                    <div className='w-100   d-flex align-items-center justify-content-center' >
                                        <div className='row w-100 m-0' >
                                            <div className='col-12 col-sm-6 offset-sm-3' >
                                                <form action="" onSubmit={UploadInterview} encType="multipart/form-data" >
                                                    <label className='p-2' htmlFor="inputFile" id="driopArea">
                                                        <h1><i className="bi bi-cloud-arrow-up"></i> &nbsp; Upload File</h1>
                                                        <p>Drag & Drop File in the box or click the box to open files</p>
                                                        <input className=" w-100" id='questionUplodInput' type="file" name="interviewFile" onChange={(e) => handleInputs4(e, 'interviewFile')} />
                                                        <label id='questionuploadlabel'>Upload here</label>
                                                        <div>
                                                        </div>
                                                    </label>
                                                    <input type="submit" className="btn btn-outline-danger w-100 mt-3"
                                                        data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                                        aria-expanded="true" aria-controls="collapseThree" value="submit" />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* ----------------------------------------------Interview Upload File------------------------------------------------------------ */}
                            <div className="tab-pane fade" id="v-pills-Interview" role="tabpanel"
                                aria-labelledby="v-pills-sendmessage-tab">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav">
                                    <div className="container-fluid">
                                        <div className="d-flex align-items-center ">
                                            <a className="navbar-brand" href="#"><img width="100px"
                                                src={logo} alt="" /></a>
                                            <h2 className="h2 ms-2"><i className="bi bi-send-fill"></i>&nbsp;Send Message</h2>
                                        </div>
                                        <div className="d-flex align-items-center  me-2 ">
                                            <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                            <button type="button" className="btn btn-outline-danger position-relative btn-sm">
                                                <i className="bi bi-bell-fill"></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    5
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </nav>
                                <div className="row w-100  m-0  p-0 ">
                                    <div className="col-12 col-sm-6 col-md-2 mb-2">
                                        <select className="form-control-sm w-100" onChange={interviewFilter}>
                                            <option value="All">Select by Status (All)</option>
                                            <option value="Select">Select</option>
                                            <option value="Reject">Reject</option>
                                            <option value="Pending">Pending</option>
                                        </select>
                                    </div>
                                    <div className="col-6 col-sm-6 col-md-2 mb-2">
                                        <button className="btn btn-outline-success btn-sm w-100 " type="button">To Excel &nbsp; <i
                                            className="fa-solid fa-table"></i></button>
                                    </div>
                                    <div className="col-6 col-sm-3 col-md-4 mb-2 d-flex justify-content-center">
                                        <div className="btn-group " role="group" aria-label="Basic example">
                                            <input className="form-control-sm" placeholder="Search Here" type="text" />
                                            <button type="button" className="btn btn-outline-primary btn-sm"><i className="bi bi-search"></i></button>
                                        </div>
                                    </div>
                                    <div className="col-6 col-sm-3 col-md-4 mb-2 d-flex justify-content-center">
                                        <div className="btn-group " role="group" aria-label="Basic example">
                                            <button className="btn btn-outline-success btn-sm" data-bs-toggle="modal"
                                                data-bs-target="#setMessageModal" type="button">Message To All</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="dashBorad-table-div p-2">
                                    <table className="table table-hover table-sm">
                                        <thead className="bg-light ">
                                            <tr>
                                                <th>SNo</th>
                                                <th>Enroll ID</th>
                                                <th>Name</th>
                                                <th>Marks</th>
                                                <th>Feedback</th>
                                                <th>Interview Date</th>
                                                <th>Current Date</th>
                                                <th>Status</th>
                                                <th>Message</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {interviewRecord.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.EnrollID}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.marks}</td>
                                                    <td>{data.feedback}</td>
                                                    <td>{data.interviewDate}</td>
                                                    <td>{data.curDate}</td>
                                                    <td>{data.status}</td>
                                                    <td>
                                                        <button className="btn btn-outline-primary btn-sm">
                                                            <i className="bi bi-send-fill"></i>&nbsp;Message
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* ----------------------------------------------Facutlty Data Section ------------------------------------------------------------ */}
                            <div className="tab-pane fade show  m-0" id="v-pills-Faculty" role="tabpanel" aria-labelledby="#v-pills-Faculty">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav">
                                    <div className="container-fluid">
                                        <div className='row w-100 m-0 ' >

                                            <div className=" col-12 col-lg-6  d-flex align-items-center">
                                                <a className="navbar-brand" href="#"><img width="100px"
                                                    src={logo} alt="" /></a>
                                                <h2 className="h2 ms-2"><i className="bi bi-send-fill"></i>&nbsp;Facltuy data</h2>
                                            </div>
                                            <div className=" col-12 col-lg-6 d-flex align-items-center justify-content-end   ">
                                                <form className='w-50' onSubmit={searchFaculty} >
                                                    <div class="input-group w-100">
                                                        <div>
                                                            <AddFacultyModal getRemainingfaculty={getRemainingfaculty} />
                                                        </div>
                                                        <input type="search" class="form-control form-control-sm" placeholder="Search here" id='searchFacultuyField' />
                                                        <button class="btn btn-outline-primary btn-sm" type="submit" id="button-addon2">S</button>
                                                    </div>
                                                </form>
                                                <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                                <button type="button" className="btn btn-outline-danger position-relative btn-sm">
                                                    <i className="bi bi-bell-fill"></i>
                                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                        5
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </nav>
                                <div className='row w-100 m-0' >
                                    {
                                        Faculties.map((Faculty, index) => {
                                            return (<>
                                                <div className='col-12  col-md-6 col-lg-6 p-3  d-flex justify-content-center' key={index}>
                                                    <div class="card m-0 w-100  " >
                                                        <div class="row g-0">
                                                            <div class=" col-sm-5 col-md-12 col-lg-5">
                                                                <img src={"http://localhost:3002/" + Faculty.image} className="card-img-top h-100 " alt="Image2" />
                                                            </div>
                                                            <div class=" col-sm-7 col-md-12 col-lg-7">
                                                                <div class="card-body">
                                                                    <h5 className="card-title">{Faculty.facultyname}</h5>
                                                                    <p className="card-text">{Faculty.department}</p>
                                                                    <p className="card-text">{Faculty.facultyemail}</p>
                                                                    <p className="card-text" ><b>Joining Date</b> {
                                                                        new Date(Faculty.joiningDate).getDate().toString().padStart(2, '0') + -+
                                                                        new Date(Faculty.joiningDate).getMonth().toString().padStart(2, '0') + -+
                                                                        new Date(Faculty.joiningDate).getFullYear()
                                                                    } </p>
                                                                    <p className="card-text"><b>Skills</b>: {Faculty.Skills}</p>
                                                                    <div className="w-100">
                                                                        <p><b>Contact No.</b> {Faculty.number}</p>
                                                                        <a className='text-decoration-none link-danger' href="/"><i className="fa-brands fa-linkedin"></i>&nbsp;{Faculty.linkedInid}</a>
                                                                        <div className='mt-2 d-flex'>
                                                                            <UpdateFacultyModal Faculty={Faculty} getRemainingfaculty={getRemainingfaculty} />
                                                                            <ConfirmBox name={Faculty.facultyname} id={Faculty._id} getRemainingfaculty={getRemainingfaculty} />                                            </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>)
                                            counter++;
                                        })
                                    }
                                </div>


                            </div>
                            {/* ----------------------------------------------Facutlty Data Section  Ends------------------------------------------------------------ */}


                            {/* ===============================================house visit start ============================================== */}
                            <div className="tab-pane fade" id="v-pills-addHouseVisit" role="tabpanel" aria-labelledby="v-pills-addquestions-tab">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav">
                                    <div className="container-fluid">
                                        <div className="d-flex align-items-center ">
                                            <a className="navbar-brand" href="#"><img width="100px"
                                                src={logo} alt="" /></a>
                                            <h2 className="h2 ms-2"><i className="bi bi-patch-question-fill"></i> &nbsp; Add Clear Interview</h2>
                                        </div>
                                        <div className="d-flex align-items-center  me-2 ">
                                            <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                            <button type="button" className="btn btn-outline-danger position-relative btn-sm">
                                                <i className="bi bi-bell-fill"></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    5
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </nav>
                                <div className="w-100 d-flex align-items-center justify-content-center " style={{ height: "75vh" }} >
                                    <div className='w-100   d-flex align-items-center justify-content-center' >
                                        <div className='row w-100 m-0' >
                                            <div className='col-12 col-sm-6 offset-sm-3' >
                                                <form action="" onSubmit={UploadHome} encType="multipart/form-data" >
                                                    <label className='p-2' htmlFor="inputFile" id="driopArea">
                                                        <h1><i className="bi bi-cloud-arrow-up"></i> &nbsp; Upload File</h1>
                                                        <p>Drag & Drop File in the box or click the box to open files</p>
                                                        <input className=" w-100" id='questionUplodInput' type="file" name="homeFile" onChange={(e) => handleInputs5(e, 'homeFile')} />
                                                        <label id='questionuploadlabel'>Upload here</label>
                                                        <div>
                                                        </div>
                                                    </label>
                                                    <input type="submit" className="btn btn-outline-danger w-100 mt-3"
                                                        data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                                        aria-expanded="true" aria-controls="collapseThree" value="submit" />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tab-pane fade" id="v-pills-HouseVisit" role="tabpanel"
                                aria-labelledby="v-pills-sendmessage-tab">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav">
                                    <div className="container-fluid">
                                        <div className="d-flex align-items-center ">
                                            <a className="navbar-brand" href="#"><img width="100px"
                                                src={logo} alt="" /></a>
                                            <h2 className="h2 ms-2"><i className="bi bi-send-fill"></i>&nbsp;Send Message</h2>
                                        </div>
                                        <div className="d-flex align-items-center  me-2 ">
                                            <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                            <button type="button" className="btn btn-outline-danger position-relative btn-sm">
                                                <i className="bi bi-bell-fill"></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    5
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </nav>
                                <div className="row w-100  m-0  p-0 ">
                                    <div className="col-12 col-sm-6 col-md-2 mb-2">
                                        <select className="form-control-sm w-100" onChange={houseVisitFilter}>
                                            <option value="All">Select by Status (All)</option>
                                            <option value="Select">Selected</option>
                                            <option value="Reject">Rejected</option>
                                            <option value="Pending">Pending</option>
                                        </select>
                                    </div>
                                    <div className="col-6 col-sm-6 col-md-2 mb-2">
                                        <button className="btn btn-outline-success btn-sm w-100 " type="button">To Excel &nbsp; <i
                                            className="fa-solid fa-table"></i></button>
                                    </div>
                                    <div className="col-6 col-sm-3 col-md-4 mb-2 d-flex justify-content-center">
                                        <div className="btn-group " role="group" aria-label="Basic example">
                                            <input className="form-control-sm" placeholder="Search Here" type="text" />
                                            <button type="button" className="btn btn-outline-primary btn-sm"><i className="bi bi-search"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="dashBorad-table-div p-2">
                                    <table className="table table-hover table-sm">
                                        <thead className="bg-light ">
                                            <tr>
                                                <th>SNo</th>
                                                <th>Enroll ID</th>
                                                <th>Name</th>
                                                <th>Marks</th>
                                                <th>Feedback</th>
                                                <th>Interview Date</th>
                                                <th>Current Date</th>
                                                <th>Status</th>
                                                <th>Message</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {houseVisitRecord.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.EnrollID}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.marks}</td>
                                                    <td>{data.feedback}</td>
                                                    <td>{data.interviewDate}</td>
                                                    <td>{data.curDate}</td>
                                                    <td>{data.status}</td>
                                                    <td>
                                                        <button className="btn btn-outline-primary btn-sm">
                                                            <i className="bi bi-send-fill"></i>&nbsp;Message
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="setMessageModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-center" id="exampleModalLabel">Message</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input className="form-control" type="text" name="message" placeholder='Enter Message' onChange={(event) => { handleMessage(event) }}></input>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={messageFunction}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="modal fade" id="setResultModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-center" id="exampleModalLabel">Message</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input className="form-control" type="text" name="message" placeholder='Enter Message' onChange={(event) => { handleMessage(event) }}></input>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={messageResultFunction}>Submit</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </section >
        </>
    );
}