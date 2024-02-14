import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createExam, createSchedule } from "./adminModule/admindashAxios.js";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import ConfirmBoxCompany from './ConfirmBoxCompany.js';
import UpdateCompanyModal from './UpdateCompanyModal.js';
import ConfirmBoxBatch from './ConfirmBoxBatch.js'
import AddCenterModal from './AddCenterModal.js';
import UpdateBatchModal from './UpdateBatchModal.js'
import AddFacultyModal from './AddFacultyModal.js';
import AddBatchModal from './AddBatchModal.js';
import AddBannerModal from './AddBannerModal.js'
import Addcompany from './AddCompanyModal.js';
import UpdateFacultyModal from './UpdatefacultyModal.js';
import ConfirmBox from './ConfirmBoxFaculty.js';
import logo from '../Images/InfoBeans Foundation Logo - PNG (1).png';
import avatar from '../Images/man-with-beard-avatar-character-isolated-icon-free-vector.jpg';
import { Loader, toggleLoader } from './Loader.js';
import DataTable from 'datatables.net-dt';
import AddGalleryModal from './addGalleryModal.js';
import UpdateGalleryModal from './UpdateGalleryModal.js'
import DeleteGallery from './DeleteGalleryModal.js';

var examobj = {}, sheduleObj = {}, array = [], resultArray = [], homeArray = [], shiftArray = [];

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
    const [batchData, setBatchData] = useState([]);
    const [companies, setCompanies] = useState([]);
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
    const [selectedEnrollID, setSelectedEnrollID] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [bannerData, setBannerData] = useState([]);
    const [updateModal, setUpdateModal] = useState(false);
    const [updateModal2, setUpdateModal2] = useState(false);
    const [updatebannerdata, setUpdateBannerData] = useState({});
    const [updatecenterdata, setUpdateCenterData] = useState({});
    const [messageObj, setMessageObj] = useState({
        message: "",
        class: "",
        icon: <></>,
    });
    const [centerdata, setCenterData] = useState([]);
    const [Managers, setManagers] = useState([]);

    function jqueryTable() {
        console.log("jqueryTable function call");
        let table = new DataTable('#myTable');
        // let table2 = new DataTable('#myTable2');
        let table3 = new DataTable('#myTable3');
        let table4 = new DataTable('#myTable4');
    }

    useEffect(() => {
        axios.get("http://localhost:3002/admin/interViewShow")
            .then((record) => {
                setInterviewRecord(record.data)
                setInterviewClear(record.data);
            })
            .catch(err => console.log('error ', err));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3002/admin/houseVisitShow")
            .then((record) => {
                setHouseVisitRecord(record.data)
                setHouseVisitClear(record.data);
            })
            .catch(err => console.log('error ', err));
    }, []);

    const interviewFilter = (event) => {
        array = []
        if (event.target.value == "All") {
            interviewRecord1.map((data) => {
                array = [...array, {
                    "EnrollID": data.EnrollID
                }]
            })
            setInterviewRecord(interviewRecord1);
        }
        else {
            var arr = [];
            array = [];
            interviewRecord1.map((data) => {
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
        homeArray = [];
        if (event.target.value == "All") {
            houseVisitRecord1.map((data) => {
                homeArray = [...homeArray, {
                    "EnrollID": data.EnrollID
                }]
            })
            setHouseVisitRecord(houseVisitRecord1);
        } else {
            var arr = [];
            homeArray = [];
            houseVisitRecord1.map((data) => {
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
                    homeArray = [...homeArray, {
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
                setTimeout(() => {
                    jqueryTable();
                }, 2000)
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
    useEffect(() => {
        axios.get("http://localhost:3002/admin/getBatchDetails")
            .then((batch) => {
                setBatchData(batch.data)
            })
            .catch(err => console.log('error ', err));
    }, []);

    function getRemainingBatch(batch) {
        setBatchData(batch)
    }
    function getRemainingCompany(comapny) {
        setCompanies(comapny)
    }

    const handleInputs4 = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];
        setInterview({ ...uploadInterview, [name]: file });
    };

    const handleInputs5 = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];
        setHome({ ...uploadHome, [name]: file });
    };

    const insertValue = (event) => {
        if (event.target.value == "All") {
            setShiftRecord(shiftrecordRecord)
        } else {
            var arr = [];
            shiftArray = []
            shiftrecordRecord.map((data) => {
                if (data.shiftNumber == event.target.value) {
                    arr = [...arr, {
                        "shiftNumber": data.shiftNumber,
                        "EnrollId": data.EnrollId,
                        "_doc": {
                            "username": data._doc.username,
                            "phoneNo": data._doc.phoneNo,
                            "email": data._doc.email,
                            "RemainingTime": data._doc.EnrollID[data._doc.EnrollID.length - 1].RemainingTime,
                            "Attendance": data._doc.EnrollID[data._doc.EnrollID.length - 1].Attendance,
                            "Allowance": data._doc.EnrollID[data._doc.EnrollID.length - 1].Allowance
                        }
                    }]
                    shiftArray.push(data._doc.email);
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
            resultArray = []
            users.map((data) => {
                if (data.EnrollID.length != 0) {
                    if (data.EnrollID[data.EnrollID.length - 1].score > 49) {
                        arr = [...arr, {
                            "username": data.username,
                            "email": data.email,
                            "EnrollID": data.EnrollID,
                            "Attempt": data.attempt,
                        }]
                        resultArray = [...resultArray, data.email]
                    }
                }
            })
            setUser5(arr);
        }
        else if (event.target.value == "Fail") {
            var arr = [];
            resultArray = []
            users.map((data) => {
                if (data.EnrollID.length != 0) {
                    if (data.EnrollID[data.EnrollID.length - 1].score <= 49) {
                        arr = [...arr, {
                            "username": data.username,
                            "email": data.email,
                            "EnrollID": data.EnrollID,
                            "Attempt": data.attempt,
                        }]
                        resultArray = [...resultArray, data.email]
                    }
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
                    return false;
                } else {
                    var reg = /^[A-Za-z\s]+$/;
                    if (reg.test(value)) {
                        document.getElementById('studentName').style.color = "green";
                        document.getElementById("studname").innerHTML = "";
                        studName1(true);
                        return true
                    } else {
                        document.getElementById('studentName').style.color = "red";
                        document.getElementById("studname").innerHTML = "Invalid name";
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
                    return false;
                } else {
                    var reg = /^[6789][0-9]{9}$/;
                    if (reg.test(value)) {
                        document.getElementById("studentNumber").style.color = "green";
                        document.getElementById("studnumber").innerHTML = "";
                        studContact1(true);
                        return true;
                    } else {
                        document.getElementById("studentNumber").style.color = "red";
                        document.getElementById("studnumber").innerHTML = "Enter 10 Digit MobileNo.";
                        studContact1(false);
                        return false;
                    }
                }
                break;
            case 'studentEmail':
                if (value.trim() == "") {
                    document.getElementById("studentEmail").style.color = "red";
                    document.getElementById("studemail").innerHTML = "Email Required";
                    studEmail1(false);
                    return false;
                } else {
                    var reg = /^\w+([\.-])?\w*@[a-z]*([\.][a-z]{2,3})+$/;
                    if (reg.test(value)) {
                        document.getElementById("studentEmail").style.color = "green";
                        document.getElementById("studemail").innerHTML = "";
                        studEmail1(true);
                        return true;
                    } else {
                        document.getElementById("studentEmail").style.color = "red";
                        document.getElementById("studemail").innerHTML = "Invalid email";
                        studEmail1(false);
                        return false;
                    }
                }
                break;
            case 'studentCompanyName':
                if (value.trim() == "") {
                    document.getElementById("studentCompanyName").style.color = "red";
                    document.getElementById("studcompanyname").innerHTML = "Company Name Required";
                    studCompanyname1(false);
                    return false;
                } else {
                    var reg = /^[0-9A-Za-z\s]+$/;
                    if (reg.test(value)) {
                        document.getElementById('studentCompanyName').style.color = "green";
                        document.getElementById("studcompanyname").innerHTML = "";
                        studCompanyname1(true);
                        return true
                    } else {
                        document.getElementById('studentCompanyName').style.color = "red";
                        document.getElementById("studcompanyname").innerHTML = "Invalid Company name";
                        studCompanyname1(true);
                        return true
                    }
                }
                break;
            case 'studentJoiningDate':
                if (value == "") {
                    document.getElementById("studentJoiningDate").style.color = "red";
                    document.getElementById("studdate").innerHTML = "Joining Date Required";
                    studJoiningdate1(false);
                    return false;
                } else {
                    document.getElementById("studentJoiningDate").style.color = "green";
                    document.getElementById("studdate").innerHTML = "";
                    studJoiningdate1(true);
                    return true;
                }
                break;
            case 'studentBatchNumber':
                if (value == '') {
                    document.getElementById("studentBatchNumber").style.color = "red";
                    document.getElementById("studbatchnumber").innerHTML = "Batch Number Required";
                    studBatchnumber1(false);
                    return false;
                } else {
                    document.getElementById("studentBatchNumber").style.color = "green";
                    document.getElementById("studbatchnumber").innerHTML = "";
                    studBatchnumber1(true);
                    return true;
                }
                break;
            case 'studentBatchSession':
                if (value == '') {
                    document.getElementById("studentBatchSession").style.color = "red";
                    document.getElementById("studbatchsession").innerHTML = "Batch Session Required";
                    studBatchsession1(false);
                    return false;
                } else {
                    document.getElementById("studentBatchSession").style.color = "green";
                    document.getElementById("studbatchsession").innerHTML = "";
                    studBatchsession1(true);
                    return true;
                }
                break;
            case 'studentPackage':
                if (value == '') {
                    document.getElementById("studentPackage").style.color = "red";
                    document.getElementById("studpackage").innerHTML = "Batch Session Required";
                    studPackage1(false);
                    return false;
                } else {
                    document.getElementById("studentPackage").style.color = "green";
                    document.getElementById("studpackage").innerHTML = "";
                    studPackage1(true);
                    return true;
                }
                break;
            case 'examTitle':
                if (value == '') {
                    document.getElementById("examtitle").style.color = "red";
                    document.getElementById("Examtitle").innerHTML = "Batch Session Required";
                    ExamTitle1(false);
                    return false;
                } else {
                    document.getElementById("examtitle").style.color = "green";
                    document.getElementById("Examtitle").innerHTML = "";
                    ExamTitle1(true);
                    return true;
                }
                break;
            case 'examDate':
                if (value == '') {
                    document.getElementById("examdate").style.color = "red";
                    document.getElementById("Examdate").innerHTML = "Batch Session Required";
                    ExamDate1(false);
                    return false;
                } else {
                    document.getElementById("examdate").style.color = "green";
                    document.getElementById("Examdate").innerHTML = "";
                    ExamDate1(true);
                    return true;
                }
                break;
            case 'examDuration':
                if (value == '') {
                    document.getElementById("examduration").style.color = "red";
                    document.getElementById("Examduration").innerHTML = "Batch Session Required";
                    ExamDuration1(false);
                    return false;
                } else {
                    document.getElementById("examduration").style.color = "green";
                    document.getElementById("Examduration").innerHTML = "";
                    ExamDuration1(true);
                    return true;
                }
                break;
            case 'shiftNumber':
                if (value == '') {
                    document.getElementById("shiftnumber").style.color = "red";
                    document.getElementById("ShiftNumber").innerHTML = "Batch Session Required";
                    ShiftNumber1(false);
                    return false;
                } else {
                    document.getElementById("shiftnumber").style.color = "green";
                    document.getElementById("ShiftNumber").innerHTML = "";
                    ShiftNumber1(true);
                    return true;
                }
                break;
            case 'maxCandidates':
                if (value == '') {
                    document.getElementById("shiftcandidate").style.color = "red";
                    document.getElementById("ShiftCandidate").innerHTML = "Candidate Required";
                    ShiftCandidate1(false);
                    return false;
                } else {
                    document.getElementById("shiftcandidate").style.color = "green";
                    document.getElementById("ShiftCandidate").innerHTML = "";
                    ShiftCandidate1(true);
                    return true;
                }
                break;
            case 'shiftTimeFrom':
                if (value == '') {
                    document.getElementById("shiftstarttime").style.color = "red";
                    document.getElementById("ShiftTimefrom").innerHTML = "Start Time Required";
                    ShiftTimeFrom1(false);
                    return false;
                } else {
                    document.getElementById("shiftstarttime").style.color = "green";
                    document.getElementById("ShiftTimefrom").innerHTML = "";
                    ShiftTimeFrom1(true);
                    return true;
                }
                break;
            case 'shiftTimeTo':
                if (value == '') {
                    document.getElementById("shiftendtime").style.color = "red";
                    document.getElementById("ShiftTimeto").innerHTML = "End Time Required";
                    ShiftTimeTo1(false);
                    return false;
                } else {
                    document.getElementById("shiftendtime").style.color = "green";
                    document.getElementById("ShiftTimeto").innerHTML = "";
                    ShiftTimeTo1(true);
                    return true;
                }
                break;
            case 'examVenue':
                if (value == '') {
                    document.getElementById("examVenue").style.color = "red";
                    document.getElementById("ExamVenue").innerHTML = "Batch Session Required";
                    ExamVenue1(false);
                    return false;
                } else {
                    document.getElementById("examVenue").style.color = "green";
                    document.getElementById("ExamVenue").innerHTML = "";
                    ExamVenue1(true);
                    return true;
                }
                break;
            case 'studentImage':
                var batchImage = document.getElementById("studentImage");
                if (batchImage.files.length === 0) {
                    studimg1(false);
                    return false;
                } else {
                    studimg1(true);
                    return true;
                }
                break;
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
            console.log("result : ", response);
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
            validateField(name, value);
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
            createSchedule(e, sheduleObj);
        } else {
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
            if (studName && studEmail && studJoiningdate && studContact && studCompanyname && studBatchnumber && studBatchsession && studPackage && studimg) {
                toggleLoader();
                axios.post(`http://localhost:3002/admin/addPlacementRecord`, formData).then((result) => {
                    toggleLoader();
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
            } else {
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
                    }]
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
                    }]
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
                    }
                }
            }
        });
        setAbs(absentList);
    }
    const setEnrollIdFunction = async () => {
        try {
            axios.post(`http://localhost:3002/candidate/setEnrollId/${enrollPrefix}`).then((result) => {
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
        try {
            axios.post('http://localhost:3002/admin/uploadInterviewFile', formData).then((result) => {
                if (result.status == '200') {
                    Swal.fire({
                        icon: "success",
                        text: 'Question uploaded Successfully',
                        showConfirmButton: false,
                        timer: 1500.
                    });
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
        const fetchFscluties = async () => {
            try {
                const response = await axios.get("http://localhost:3002/admin/getFaculties")
                setFaculties(response.data)
            } catch (error) {
                console.error("Error While Getting Faculties", error);
            }
        }
        fetchFscluties();
    }, [])

    async function searchFaculty(e) {
        e.preventDefault()
        var Searchdata = document.getElementById("searchFacultuyField").value.trim()
        try {
            const response = await axios.get("http://localhost:3002/admin/searchFaculties", { params: { Searchdata: Searchdata } });
            setFaculties(response.data)
        } catch (e) {
            console.log("Eroor in searching fasculty", e);
        }
    }

    function getRemainingfaculty(faculty) {
        setFaculties(faculty)
    }


    const [GalleryData, setGalleryData] = useState([]);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await axios.get("http://localhost:3002/admin/getGalleryData")
                setGalleryData(response.data)
            } catch (error) {
                console.error("Error While Getting Faculties", error);
            }
        }
        fetchGallery();
    }, [])



    const UploadHome = async (e) => {
        if (e) {
            e.preventDefault();
        }
        const formData = new FormData();
        formData.append('homeFile', uploadHome.homeFile);
        try {
            axios.post('http://localhost:3002/admin/uploadHomeFile', formData).then((result) => {
                if (result.status == '200') {
                    Swal.fire({
                        icon: "success",
                        text: 'Question uploaded Successfully',
                        showConfirmButton: false,
                        timer: 1500.
                    });
                }
            }).catch((error) => {
                console.log('', error);
            })
        } catch (error) {
            console.log('error:', error);
            window.alert('Failed to register');
        }
    };


    var counter = 0;
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get("http://localhost:3002/admin/getCompanies")
                setCompanies(response.data.companies)
            } catch (error) {
                console.error("Error While Getting Companies", error);
            }
        }
        fetchCompanies();
    }, [])

    const EndTestByAdmin = async (e) => {
        if (e) {
            e.preventDefault();
        }
        let status = window.confirm("Are you sure you want to end test explicitly all candidate result will reset!");
        if (status) {
            try {
                toggleLoader();
                axios.post('http://localhost:3002/admin/EndTestByAdmin', shiftRecord).then((result) => {
                    toggleLoader();
                    if (result.status == '200') {
                        Swal.fire({
                            icon: "success",
                            text: 'All candidates result reset successfully',
                            showConfirmButton: false,
                            timer: 2000.
                        });
                    }
                    else {
                        Swal.fire({
                            icon: "error",
                            text: 'Test Data Not Reset Some technical issue',
                            showConfirmButton: false,
                            timer: 1500.
                        });

                    }
                }).catch((error) => {
                    console.log('Error in admin End test axios--> : ', error);
                })
            } catch (error) {
                console.log('error : --->', error);
                window.alert('Failed to End Test');
            }
        }

    };

    const GenerateResultByAdmin = async (e) => {
        if (e) {
            e.preventDefault();
        }
        let status = window.confirm("Are you sure you want to Generate Results explicitly");
        if (status) {

            try {
                toggleLoader();
                axios.post('http://localhost:3002/admin/GenerateResultByAdmin', shiftRecord).then((result) => {
                    toggleLoader();
                    if (result.status == '201') {
                        Swal.fire({
                            icon: "success",
                            text: result.data.message,
                            showConfirmButton: false,
                            timer: 2000.
                        });

                    }
                    else {
                        Swal.fire({
                            icon: "error",
                            text: 'Test Not submited Some technical issue try again after some time',
                            showConfirmButton: false,
                            timer: 2000.
                        });

                    }
                }).catch((error) => {
                    console.log('Error in admin generate test axios--> : ', error);
                    window.alert('Failed to generate test');
                })
            } catch (error) {
                console.log('error : --->', error);
                window.alert('Failed to generate test');
            }
        }
    };


    const AllowCandidate = (Enrollid) => {
        Swal.fire({
            title: "Do you want to Allow that Candidate?",
            showDenyButton: true,
            confirmButtonText: "Allow",
            denyButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.post('http://localhost:3002/admin/AllowCandidate', { Enrollid: Enrollid }).then((result) => {
                        if (result.status == '201') {
                            Swal.fire({
                                icon: "success",
                                text: 'All Test Submited Successfully',
                                showConfirmButton: false,
                                timer: 2000.
                            });

                        } else {
                            console.log("not update allow")
                        }
                    }).catch((error) => {
                        console.log('Error in admin End test axios--> : ', error);
                    })
                } catch (error) {
                    console.log('error : --->', error);
                    window.alert('Failed to End Test');
                }
            } else if (result.isDenied) {
                console.log("Submit Cancel");
            }
        });
    }

    const singleMessage = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setMessage({ ...message, [name]: value });
    }

    const sendMessage = () => {
        const messages = message.message;
        axios.post(`http://localhost:3002/admin/singleMessage`, {
            enrollID: selectedEnrollID,
            messages
        })
            .then(response => {
                console.log('Message sent successfully:', response);
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    };
    const oneMessage = () => {
        const messages = message.message;
        axios.post(`http://localhost:3002/admin/oneMessage`, {
            email: selectedEmail,
            messages
        })
            .then(response => {
                console.log('Message sent successfully:', response);
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    };

    const handleMessage = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setMessage({ ...message, [name]: value });
    };

    const messageFunction = async (num) => {
        try {
            const dataToSend = {
                message: message,
            };
            if (num === 1) {
                dataToSend.array = array;
            } else if (num === 2) {
                dataToSend.array = homeArray;
            }
            await axios.post(`http://localhost:3002/admin/message`, dataToSend);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const messageResultFunction = async (num) => {
        try {
            const dataToSend = {
                message: message,
            };
            if (num === 1) {
                dataToSend.resultArray = resultArray
            } else if (num === 2) {
                dataToSend.resultArray = shiftArray;
            }
            await axios.post(`http://localhost:3002/admin/messageResult`, dataToSend);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const fetchBannerData = async () => {
            try {
                const result = await axios.get("http://localhost:3002/admin/getBannerData");
                if (result.status === 201) {
                    setBannerData(result.data.bannerdata);
                }
                else if (result.status === 500) {
                    Swal.fire({
                        icon: 'error',
                        text: 'Error while fetching data',
                        timer: 3000
                    });
                }
            } catch (error) {
                console.log("Request not sent to Backend ", error);
                Swal.fire({
                    text: "Request not sent",
                    icon: 'error',
                    timer: 3000
                }
                );
            }
        }
        fetchBannerData();
    }, []);

    const deleteBanner = async (id) => {
        try {
            const result = await axios.post('http://localhost:3002/admin/deleteBanner', { id });
            if (result.status === 201) {
                Swal.fire({
                    icon: 'success',
                    text: 'banner deleted'
                })
                setBannerData(result.data.bannerdata);
            }
            else if (result.status === 500) {
                Swal.fire({
                    icon: 'error',
                    text: 'Error while fetching data'
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    text: 'data not deleted'
                })
            }
        } catch (error) {
            console.log('error ', error);
        }
    }
    const updateBanner = (data) => {
        console.log("update : ", data);
        setUpdateBannerData({ ...data });
        setUpdateModal(true);
        console.log('update modal ', updateModal);
    }

    var getBannerdata = (e) => {
        var { name, value } = e.target;
        if (e.target.type === "file") {
            const bannerImg = e.target.files[0];
            setUpdateBannerData({ ...updatebannerdata, [name]: bannerImg });
        } else {
            setUpdateBannerData({ ...updatebannerdata, [name]: value });
        }
    };

    const updateBannerData = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log('update banner ', updatebannerdata);
        Object.entries(updatebannerdata).forEach(([key, value]) => {
            formData.append(key, value);
        });
        console.log('formData ', formData);
        try {
            const result = await axios.post("http://localhost:3002/admin/updateBanner", formData);
            if (result.status === 201) {
                setBannerData(result.data.bannerdata);
                setMessageObj({
                    message: "Banner Updated",
                    class: "alert alert-success",
                    icon: <i className="bi bi-check-lg"></i>,
                });
                setUpdateModal(!updateModal);
            }
            else if (result.status === 203) {
                setMessageObj({
                    message: "Banner Not Updated",
                    class: "alert alert-danger",
                    icon: <i className="bi bi-check-lg"></i>,
                });
                setUpdateModal(!updateModal);
            }
        } catch (error) {
            console.log('error ', error);
            setMessageObj({
                message: "Error while updating banner",
                class: "alert alert-danger",
                icon: <i className="bi bi-check-lg"></i>,
            });
            setUpdateModal(!updateModal);
        }

    }
    useEffect(() => {
        var getTrainers = async () => {
            try {
                const response = await axios.get('http://localhost:3002/admin/getManagers');
                setManagers(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getTrainers();
    }, [])
    useEffect(() => {
        const fetchcenterdata = async () => {
            try {
                const result = await axios.get("http://localhost:3002/admin/getCenterData");
                if (result.status === 201) {
                    setCenterData(result.data.centerdata);
                }
                else if (result.status === 500) {
                    Swal.fire({
                        icon: 'error',
                        text: 'Error while fetching Center Data'
                    });
                }
            } catch (error) {
                console.log("error : ", error);
                Swal.fire({
                    icon: 'error',
                    text: 'Error while Request Sent to Backend'
                });
            }
        }
        fetchcenterdata();
    }, []);

    const deleteCenter = async (id) => {
        console.log("id ", id);
        try {
            const result = await axios.post("http://localhost:3002/admin/deleteCenter", { id });
            if (result.status === 201) {
                setCenterData(result.data.centerdata);
                Swal.fire({
                    icon: 'success',
                    text: 'Center Deleted Successful'
                })
            }
            else if (result.status === 500) {
                Swal.fire({
                    icon: 'error',
                    text: 'Error while deleting center'
                })
            }
        } catch (error) {
            console.log('error : ', error);
            Swal.fire({
                icon: 'error',
                text: 'Error while Sent request to Backend'
            })
        }
    };

    const updateCenter = (center) => {
        console.log('updateCenter : ', center);
        setUpdateCenterData(center);
        setUpdateModal2(true);
    }

    var getCenterdata = (e) => {
        var { name, value } = e.target;
        validateField(name, value);
        if (e.target.type === "file") {
            const centerImg = e.target.files[0];
            setUpdateCenterData({ ...updatecenterdata, [name]: centerImg });
        } else if (e.target.type === 'date') {
            const date = new Date(value).getDate() + '-' + (new Date(value).getMonth() + 1) + '-' + new Date(value).getFullYear();
            console.log('date : ', date);
            setUpdateCenterData({ ...updatecenterdata, [name]: date });
        }
        else {
            setUpdateCenterData({ ...updatecenterdata, [name]: value });
        }
    };

    const updateCenterData = async (e) => {
        e.preventDefault();
        console.log('update center : ', updatecenterdata);
        const formData = new FormData();

        Object.entries(updatecenterdata).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            var result = await axios.post("http://localhost:3002/admin/updateCenter", formData);
            console.log("result ", result);
            if (result.status === 201) {
                setCenterData(result.data.centerdata);
                setMessageObj({
                    message: 'Center Updated Successfully',
                    class: "alert alert-success",
                    icon: <i className="bi bi-check-lg"></i>,
                });
                setUpdateModal2(false);
            } else if (result.status === 203) {
                setMessageObj({
                    message: 'Error while updating Center',
                    class: "alert alert-success",
                    icon: <i className="bi bi-check-lg"></i>,
                });
                setUpdateModal2(false);
            }
        } catch (error) {
            console.log("error ", error);
            setMessageObj({
                message: 'Error When Request Sent To Backend',
                class: "alert alert-success",
                icon: <i className="bi bi-check-lg"></i>,
            });
            setUpdateModal2(false);
        }
    }
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
                                <button className="section-tab nav-link adminNavbar  " id="v-pills-Interview-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-Faculty" role="tab" aria-controls="v-pills-Faculty"
                                    aria-selected="false"><i className="fa-solid fa-chalkboard-user"></i>&nbsp;Faculty</button>
                                <button className="nav-link adminNavbar bg-transparent text-danger" id="v-pills-totalplacements-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-totalplacements" role="tab" aria-controls="v-pills-totalplacements"
                                    aria-selected="false">Total Placements</button>
                                <button className="section-tab nav-link adminNavbar  " id="v-pills-Batches-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-Batches" role="tab" aria-controls="v-pills-Batches"
                                    aria-selected="false"><i className="fa-solid fa-user"></i>&nbsp;Batches</button>
                                <button className="section-tab nav-link adminNavbar  " id="v-pills-Company-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-Company" role="tab" aria-controls="v-pills-Company"
                                    aria-selected="false"><i className="fa-solid fa-building"></i>&nbsp;Company</button>
                                <button className="section-tab nav-link adminNavbar  " id="v-pills-BannerData-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-BannerData" role="tab" aria-controls="v-pills-BannerData"
                                    aria-selected="false"><i className="bi bi-people-fill"></i>&nbsp;See Banners</button>
                                <button className="section-tab nav-link adminNavbar  " id="v-pills-CenterData-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-CenterData" role="tab" aria-controls="v-pills-CenterData"
                                    aria-selected="false"><i className="bi bi-buildings"></i>&nbsp;See Center</button>
                                <button className="section-tab nav-link adminNavbar  " id="v-pills-Interview-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-Gallery" role="tab" aria-controls="v-pills-Gallery"
                                    aria-selected="false"><i className="fa-solid fa-chalkboard-user"></i>&nbsp;Gallery</button>
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
                                    <button className="section-tab nav-link adminNavbar" role="tab" data-bs-toggle="modal"
                                        data-bs-target="#setEnrollModal" ><i className="bi bi-people-fill"></i>&nbsp;Set Enroll</button>
                                    <button className="section-tab nav-link adminNavbar " id="v-pills-addInterview-tab" data-bs-toggle="pill"
                                        data-bs-target="#v-pills-addInterview" role="tab" aria-controls="v-pills-addInterview"
                                        aria-selected="false"><i className="bi bi-bookmark-check-fill"></i>&nbsp;Interview Upload</button>
                                    <button className="section-tab nav-link adminNavbar  " id="v-pills-Interview-tab" data-bs-toggle="pill"
                                        data-bs-target="#v-pills-Interview" role="tab" aria-controls="v-pills-Interview"
                                        aria-selected="false"><i className="bi bi-binoculars-fill"></i>&nbsp;See Interview</button>
                                    <button className="section-tab nav-link adminNavbar " id="v-pills-addHouseVisit-tab" data-bs-toggle="pill"
                                        data-bs-target="#v-pills-addHouseVisit" role="tab" aria-controls="v-pills-addHouseVisit"
                                        aria-selected="false"><i className="bi bi-house-up-fill"></i>&nbsp;Housevisit Upload</button>
                                    <button className="section-tab nav-link adminNavbar  " id="v-pills-HouseVisit-tab" data-bs-toggle="pill"
                                        data-bs-target="#v-pills-HouseVisit" role="tab" aria-controls="v-pills-HouseVisit"
                                        aria-selected="false"><i className="bi bi-house-check"></i>&nbsp;See HouseVisit</button>
                                    <button className="section-tab nav-link adminNavbar  " id="v-pills-Interview-tab" data-bs-toggle="pill"
                                        data-bs-target="#v-pills-Faculty" role="tab" aria-controls="v-pills-Faculty"
                                        aria-selected="false"><i className="fa-solid fa-chalkboard-user"></i>&nbsp;Faculty</button>
                                    <button className="section-tab nav-link adminNavbar  " id="v-pills-totalplacements-tab" data-bs-toggle="pill"
                                        data-bs-target="#v-pills-totalplacements" role="tab" aria-controls="v-pills-totalplacements"
                                        aria-selected="false"><i className="bi bi-mortarboard"></i>&nbsp;Placements</button>
                                    <button className="section-tab nav-link adminNavbar  " id="v-pills-Batches-tab" data-bs-toggle="pill"
                                        data-bs-target="#v-pills-Batches" role="tab" aria-controls="v-pills-Batches"
                                        aria-selected="false"><i className="fa-solid fa-user"></i>&nbsp;Batches</button>
                                    <button className="section-tab nav-link adminNavbar  " id="v-pills-Company-tab" data-bs-toggle="pill"
                                        data-bs-target="#v-pills-Company" role="tab" aria-controls="v-pills-Company"
                                        aria-selected="false"><i className="fa-solid fa-building"></i>&nbsp;Company</button>
                                    <button className="section-tab nav-link adminNavbar" id="v-pills-BannerData-tab" data-bs-toggle="pill"
                                        data-bs-target="#v-pills-BannerData" role="tab" aria-controls="v-pills-BannerData"
                                        aria-selected="false"><i className="bi bi-flag-fill"></i>&nbsp;See Banner</button>
                                    <button className="section-tab nav-link adminNavbar" id="v-pills-CenterData-tab" data-bs-toggle="pill"
                                        data-bs-target="#v-pills-CenterData" role="tab" aria-controls="v-pills-CenterData"
                                        aria-selected="false"><i className="bi bi-buildings"></i>&nbsp;See Center</button>
                                    <button className="section-tab nav-link adminNavbar  " id="v-pills-Interview-tab" data-bs-toggle="pill"
                                        data-bs-target="#v-pills-Gallery" role="tab" aria-controls="v-pills-Gallery"
                                        aria-selected="false"><i className="bi bi-image"></i>&nbsp;Gallery</button>
                                </div>
                            </div>
                        </div>
                        {/*  < !-- ----------------------------------Home Section----------------------------------->} */}
                        <div className="col-12 col-lg-10 p-0 ">
                            <div className="tab-content p-0" id="v-pills-tabContent">
                                <div className="tab-pane fade show active m-0" id="v-pills-home" role="tabpanel"
                                    aria-labelledby="v-pills-home-tab">
                                    <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav bg-danger navShadow mb-2">
                                        <div className="container-fluid">
                                            <div className="d-flex align-items-center ">
                                                <a className="navbar-brand" href="#"><img width="100px"
                                                    src={logo} alt="" /></a>
                                                <h2 className="h2 ms-2"><i className="bi bi-house"></i>&nbsp;Home</h2>
                                            </div>
                                            <div className="d-flex align-items-center  me-2 ">
                                                <button type="submit" onClick={AdminLogout} className="btn btn-outline-danger btn-sm m-2">Log out</button>
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
                                                    <h4><i className="bi bi-people-fill" style={{ fontSize: "30px" }}></i>  &nbsp;&nbsp; 9 Batches</h4>
                                                </div>
                                                <AddBatchModal getRemainingBatch={getRemainingBatch} />
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
                                        <div className='col-12 col-md-4  p-2' >
                                            <div className="alert alert-secondary d-flex align-items-center justify-content-around m-0" role="alert">
                                                <div className='text-center p-2'>
                                                    <h4>  <i className="bi bi-image text-secondary" style={{ fontSize: "30px" }}></i>&nbsp;&nbsp;Add Company </h4>
                                                </div>
                                                <Addcompany getRemainingCompany={getRemainingCompany} />
                                            </div>
                                        </div>
                                        <div className='col-12 col-md-4  p-2' >
                                            <div className="alert alert-dark d-flex align-items-center justify-content-around m-0" role="alert">
                                                <div className='text-center p-2'>
                                                    <h4><i className="bi bi-image text-dark" style={{ fontSize: "30px" }}></i>&nbsp;&nbsp;Add Gallery </h4>
                                                </div>
                                                <AddGalleryModal />
                                            </div>
                                        </div>
                                        <div className='col-12 col-md-4 p-2' >
                                            <div className="alert alert-danger d-flex align-items-center justify-content-around m-0" role="alert">
                                                <div className='text-center p-2'>
                                                    <h4><i className="bi bi-people-fill text-danger" style={{ fontSize: "30px" }}></i>  &nbsp;&nbsp;Add Placements</h4>
                                                </div>
                                                <button type="button" className="btn  btn-outline-danger " data-bs-toggle="modal" data-bs-target="#addplacementrecordmodal"><i className="bi bi-mortarboard"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!------------------------------Regestrations Section------------------------------------------> */}
                                <div className="tab-pane fade pt-2" id="v-pills-registrations" role="tabpanel"
                                    aria-labelledby="v-pills-registrations-tab">
                                    <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav navShadow mb-2">
                                        <div className="container-fluid">
                                            <div className="d-flex align-items-center ">
                                                <a className="navbar-brand" href="#"><img width="100px"
                                                    src={logo} alt="" /></a>
                                                <h2 className="h2 ms-2"> <i className="fa-regular fa-address-card"></i> Total Registrations</h2>
                                            </div>
                                            <div className="d-flex align-items-center me-2">
                                                <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                            </div>
                                        </div>
                                    </nav>
                                    <div className="w-100 dashBorad-table-div ps-2 pe-2">
                                        <table className="table table-bordered table-hover table-sm" id="myTable">
                                            <thead className="sticky-top">
                                                <tr className="bg-danger text-white">
                                                    <th>SNo.</th>
                                                    <th>Name</th>
                                                    <th>Contact</th>
                                                    <th>Aadhar</th>
                                                    <th>Email</th>
                                                    <th>Reg Date</th>
                                                    <th>State</th>
                                                    <th>City</th>
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
                                                            <td className='text-nowrap'>{index + 1}</td>
                                                            <td className='text-nowrap'>{user.username}</td>
                                                            <td className='text-nowrap'>{user.phoneNo}</td>
                                                            <td className='text-nowrap'>{user.aadharNo}</td>
                                                            <td className='text-nowrap'>{user.email}</td>
                                                            <td className='text-nowrap'>{user.registrationDate}</td>
                                                            <td className='text-nowrap'>{user.state}</td>
                                                            <td className='text-nowrap'>{user.city}</td>
                                                            <td className='text-nowrap'>{user.dob}</td>
                                                            <td className='text-nowrap'>{user.attempt}</td>
                                                            <td className='text-nowrap'>
                                                                {(user.attempt >= 3) ? (user.examAllow == false) ? (
                                                                    <button className="btn btn-outline-danger btn-sm" id={`${user._id}`} type="submit" onClick={(e) => handleButtonValue(e, user._id)}><small>Allow</small></button>
                                                                ) : (<button className="btn btn-outline-primary btn-sm" disabled id={`${user._id}`} type="submit"><small>Eligible</small></button>) : (<button className="btn btn-outline-primary btn-sm" disabled id={`${user._id}`} type="submit"><small>Eligible</small></button>)}
                                                            </td>
                                                            <td className='text-nowrap'>
                                                                <button className="btn btn-outline-danger btn-sm" type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setUserDocuments(user._id, true)}><small>Docs</small></button>
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* --------------------Modal Start----------------------*/}
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
                                {/* <!-- ------------------------------------Total Plaements-----------------------------------------------> */}
                                <div className="tab-pane fade" id="v-pills-totalplacements" role="tabpanel"
                                    aria-labelledby="v-pills-totalplacements-tab">
                                    <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav navShadow mb-2">
                                        <div className="container-fluid">
                                            <div className="d-flex align-items-center ">
                                                <a className="navbar-brand" href="#"><img width="100px"
                                                    src={logo} alt="" /></a>
                                                <h2 className="h2 ms-2"><i className="bi bi-mortarboard"></i>&nbsp;Total Placements</h2>
                                            </div>
                                            <div className="d-flex align-items-center  me-2 ">
                                                <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
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
                                                    <input className='form-control' id='studentName' type='text' name='studentName' placeholder='Enter name' onChange={(e) => handleFileChange1(e)} />
                                                    <p id='studname'></p>
                                                    <input className='form-control' id='studentEmail' type='text' name='studentEmail' placeholder='Enter Email' onChange={(e) => handleFileChange1(e)} />
                                                    <p id='studemail'></p>
                                                    <input className='form-control' id='studentNumber' min='1' type='number' name='studentNumber' placeholder='Enter contact Number' onChange={(e) => handleFileChange1(e)} />
                                                    <p id='studnumber'></p>
                                                    <select className='form-control' id='studentCompanyName' name='studentCompanyName' onChange={(e) => handleFileChange1(e)}>
                                                        <option value="Not seleted">Select Company</option>
                                                        {
                                                            companies.map(
                                                                (comapny, index) => {
                                                                    return (<option key={index} value={comapny.companyName}>{comapny.companyName}</option>)
                                                                })
                                                        }
                                                    </select>
                                                    <p id='studcompanyname'></p>
                                                    <label>Enter Joining date</label>
                                                    <input className='form-control' id='studentJoiningDate' type='date' name='studentJoiningDate' onChange={(e) => handleFileChange1(e)} />
                                                    <p id='studdate'></p>
                                                    <input className='form-control' id='studentBatchNumber' min='1' type='number' name='studentBatchNumber' placeholder='Enter Batch Number' onChange={(e) => handleFileChange1(e)} />
                                                    <p id='studbatchnumber'></p>
                                                    <input className='form-control' id='studentBatchSession' min='1' type='number' name='studentBatchSession' placeholder='Enter Batch Session' onChange={(e) => handleFileChange1(e)} />
                                                    <p id='studbatchsession'></p>
                                                    <input className='form-control' id='studentPackage' min='1' type='number' name='studentPackage' placeholder='Enter Student Package' onChange={(e) => handleFileChange1(e)} />
                                                    <p id='studpackage'></p>
                                                    <label>Upload Student Image</label>
                                                    <input type='file' name='studentImage' placeholder='Enter Photo' onChange={(e) => handleFileChange1(e)} id='studentImage' /><br /><br />
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
                                {/* <!-- ---------------------------------_Add Questions-------------------------- --> */}
                                <div className="tab-pane fade" id="v-pills-addquestions" role="tabpanel" aria-labelledby="v-pills-addquestions-tab">
                                    <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav navShadow mb-4">
                                        <div className="container-fluid">
                                            <div className="d-flex align-items-center ">
                                                <a className="navbar-brand" href="#"><img width="100px"
                                                    src={logo} alt="" /></a>
                                                <h2 className="h2 ms-2"><i className="bi bi-patch-question-fill"></i> &nbsp; Add Questions</h2>
                                            </div>
                                            <div className="d-flex align-items-center  me-2 ">
                                                <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>

                                            </div>
                                        </div>
                                    </nav>
                                    <div className="w-100 d-flex align-items-center justify-content-center">
                                        <div className='w-100   d-flex align-items-center justify-content-center' >
                                            <div className='row w-100 m-0' >
                                                <div className='col-12 col-sm-6 offset-sm-3' >
                                                    <form action="" onSubmit={UploadQuestion} encType="multipart/form-data" >
                                                        <div id="driopArea">
                                                            <label htmlFor='questionUplodInput' className="w-100 h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer" >
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="190" width="200" fill="currentColor" className="bi bi-cloud-arrow-up-fill" viewBox="0 0 16 16">
                                                                    <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0z"></path>
                                                                </svg>
                                                                <h3 className="mb-4">Drag & Drop File Or Select File</h3>
                                                                <input id='questionUplodInput' type="file" name="questionFile" onChange={(e) => handleInputs3(e)} /><br />
                                                            </label>
                                                        </div>
                                                        <input type="submit" className="btn btn-outline-danger w-100 mt-2"
                                                            data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                                            aria-expanded="true" aria-controls="collapseThree" value="submit" />
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!------------------------------------View Result--------------------------------------------> */}
                                <div className="tab-pane fade" id="v-pills-viewresult" role="tabpanel"
                                    aria-labelledby="v-pills-viewresult-tab">
                                    <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav navShadow mb-2">
                                        <div className="container-fluid">
                                            <div className="d-flex align-items-center ">
                                                <a className="navbar-brand" href="#"><img width="100px"
                                                    src={logo} alt="" /></a>
                                                <h2 className="h2 ms-2"><i className="bi bi-graph-up-arrow"></i>&nbsp;Result</h2>
                                            </div>
                                            <div className="d-flex align-items-center  me-2 ">
                                                <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
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
                                            <select className="form-control-sm w-100" onChange={passed} >
                                                <option value="null" >Select by Result</option>
                                                <option value="Pass">Passed</option>
                                                <option value="Fail">Failed</option>
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
                                        <div className="col-12 col-sm-6 col-md-3 mb-2 d-flex justify-content-center">
                                            <div className="btn-group " role="group" aria-label="Basic example">
                                                <button className="btn btn-outline-success btn-sm" data-bs-toggle="modal"
                                                    data-bs-target="#setResultModal" type="button">Message To All</button>
                                            </div>
                                        </div>
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
                                {/* <!-----------------------------------------------Send Message------------------------------------------> */}
                                <div className="tab-pane fade" id="v-pills-sendmessage" role="tabpanel"
                                    aria-labelledby="v-pills-sendmessage-tab">
                                    <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav navShadow mb-4">
                                        <div className="container-fluid">
                                            <div className="d-flex align-items-center ">
                                                <a className="navbar-brand" href="#"><img width="100px"
                                                    src={logo} alt="" /></a>
                                                <h2 className="h2 ms-2"><i className="bi bi-send-fill"></i>&nbsp;Send Message</h2>
                                            </div>
                                            <div className="d-flex align-items-center  me-2 ">
                                                <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
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
                                            <button className="btn btn-outline-success btn-sm w-100 " type="button">To Excel  <i className="fa-solid fa-table"></i></button>
                                        </div>

                                        <div className="col-6 col-sm-3 col-md-6 mb-2 d-flex">
                                            <button type="button" onClick={GenerateResultByAdmin} className="btn btn-outline-success btn-sm w-100">Generate Result  <i className="bi bi-book"></i></button>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <button type="button" onClick={EndTestByAdmin} className="btn btn-outline-success btn-sm w-100">End Test  <i className="bi bi-bootstrap-reboot"></i></button>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <button className="btn btn-outline-success btn-sm w-100" data-bs-toggle="modal"
                                                data-bs-target="#setShiftModal" type="button">Message To All  <i className="bi bi-chat-left-text"></i></button>
                                        </div>
                                    </div>
                                    <div className="dashBorad-table-div p-2">
                                        <table className="table table-hover table-sm" >
                                            <thead className="bg-light ">
                                                <tr>
                                                    <th>SNo</th>
                                                    <th>Name</th>
                                                    <th>Phone Number</th>
                                                    <th>Enrollment Number</th>
                                                    <th>Email</th>
                                                    <th>Shift Number</th>
                                                    <th>Remaining Time</th>
                                                    <th>Attendence</th>
                                                    <th>Allowance</th>
                                                    <th>Message</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {shiftRecord.map((data, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{data._doc.username}</td>
                                                        <td>{data._doc.phoneNo}</td>
                                                        <td>{data.EnrollId}</td>
                                                        <td>{data._doc.email}</td>
                                                        <td>{data.shiftNumber}</td>
                                                        {Array.isArray(data._doc.EnrollID) ? (
                                                            <>
                                                                <td>{data._doc.EnrollID[data._doc.EnrollID.length - 1].RemainingTime}</td>
                                                                <td>{data._doc.EnrollID[data._doc.EnrollID.length - 1].Attendance}</td>
                                                                <td>{(data._doc.EnrollID[data._doc.EnrollID.length - 1].Allowance == "NotAllow") ? (<button className="btn btn-outline-primary btn-sm" onClick={() => AllowCandidate(data.EnrollId)}>Allow Candidate</button>) : ("Allow")}</td>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <td>{data._doc.RemainingTime}</td>
                                                                <td>{data._doc.Attendance}</td>
                                                                <td>{(data._doc.Allowance == "NotAllow") ? (<button className="btn btn-outline-primary btn-sm" onClick={() => AllowCandidate(data.EnrollId)}>Allow Candidate</button>) : ("Allow")}</td>
                                                            </>
                                                        )}
                                                        <td>
                                                            <button
                                                                className="btn btn-outline-primary btn-sm"
                                                                data-bs-toggle="modal" data-bs-target="#setOneModal" onClick={() => setSelectedEmail(data._doc.email)}
                                                            >
                                                                <i className="bi bi-send-fill"></i>&nbsp;Message
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* <!-- -------------------------------------------- Schedule Exam --------------------------------------------> */}
                                <div className="tab-pane fade" id="v-pills-scheduleexam" role="tabpanel" aria-labelledby="v-pills-scheduleexam-tab">
                                    <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav navShadow mb-4">
                                        <div className="container-fluid">
                                            <div className="d-flex align-items-center ">
                                                <a className="navbar-brand" href="#"><img width="100px"
                                                    src={logo} alt="" /></a>
                                                <h2 className="h2 ms-2"><i className="bi bi-calendar-event-fill"></i>&nbsp;Schedule Exam</h2>
                                            </div>
                                            <div className="d-flex align-items-center  me-2 ">
                                                <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                            </div>
                                        </div>
                                    </nav>
                                    <div className="row  w-100 m-0">
                                        <div className="col-12 col-md-6 p-5 vh-75 d-flex justify-content-center align-items-center   ">
                                            <div className="mt-5 mb-3 w-100 p-3  pb-4 pt-4 sheduleform" >
                                                <h3 className='text-center'>Exam Schedule Form</h3>
                                                <div className="d-block" >
                                                    <form className='p-3' action="" onSubmit={cllCreateexam}>
                                                        <input className="text-center form-control" type="text" name="examTitle" onChange={handleInputs} id="examtitle" placeholder="Enter Exam Title" />
                                                        <p id='Examtitle'></p>
                                                        <input className="text-center form-control" type="date" name="examDate" id="examdate" onChange={handleInputs} placeholder="Enter examdate" />
                                                        <p id='Examdate'></p>
                                                        <input className="text-center form-control" type="number" min='1' name="examDuration" onChange={handleInputs} id="examduration" placeholder="Enter Exam Duration" />
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
                                                        <select className="form-control  text-center mb-3" name='exam' id='exam' onChange={handleInputs2}>
                                                            <option value="All">Select Exam For Shift</option>
                                                            {examName.map((data, index) => (
                                                                <option key={index} value={data._id}>{data.examTitle}</option>
                                                            ))}
                                                        </select>
                                                        <input className=" text-center form-control" type="number" min='1' name="shiftNumber" onChange={handleInputs2} id="shiftnumber" placeholder="Enter shiftNumber" />
                                                        <p id='ShiftNumber'></p>
                                                        <input className=" text-center form-control" type="number" min='1' name="maxCandidates" onChange={handleInputs2} id="shiftcandidate" placeholder="Enter maxCandidates" />
                                                        <p id='ShiftCandidate'></p>
                                                        <input className=" text-center form-control" type="time" name="shiftTimeFrom" onChange={handleInputs2} id="shiftstarttime" placeholder="Enter shiftTimeFrom" />
                                                        <p id='ShiftTimefrom'></p>
                                                        <input className=" text-center form-control" type="time" name="shiftTimeTo" onChange={handleInputs2} id="shiftendtime" placeholder="Enter shiftTimeTo" />
                                                        <p id='ShiftTimeto'></p>
                                                        <input className=" text-center form-control" type="text" name="examVenue" onChange={handleInputs2} id="examVenue" placeholder="Enter the Venue" />
                                                        <p id='ExamVenue'></p>
                                                        <input className=" w-100 text-center btn btn-outline-danger mt-3" type="submit" />
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------Interview Upload File------------------------------------------------------------ */}
                                <div className="tab-pane fade" id="v-pills-addInterview" role="tabpanel" aria-labelledby="v-pills-addquestions-tab">
                                    <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav navShadow mb-2">
                                        <div className="container-fluid">
                                            <div className="d-flex align-items-center ">
                                                <a className="navbar-brand" href="#"><img width="100px"
                                                    src={logo} alt="" /></a>
                                                <h2 className="h2 ms-2"><i className="bi bi-bookmark-check-fill"></i>&nbsp;Add Interview File</h2>
                                            </div>
                                            <div className="d-flex align-items-center  me-2 ">
                                                <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                            </div>
                                        </div>
                                    </nav>
                                    <div className="w-100 d-flex align-items-center justify-content-center " style={{ height: "75vh" }} >
                                        <div className='w-100   d-flex align-items-center justify-content-center' >
                                            <div className='row w-100 m-0' >
                                                <div className='col-12 col-sm-6 offset-sm-3' >
                                                    <form action="" onSubmit={UploadInterview} encType="multipart/form-data" >
                                                        <div id="driopArea">
                                                            <label htmlFor='uploadInterviewInput' className="w-100 h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer" >
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="190" width="200" fill="currentColor" className="bi bi-cloud-arrow-up-fill" viewBox="0 0 16 16">
                                                                    <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0z"></path>
                                                                </svg>
                                                                <h3 className="mb-4">Drag & Drop File Or Select File</h3>
                                                                <input id='uploadInterviewInput' type="file" name="interviewFile" onChange={(e) => handleInputs4(e, 'interviewFile')} /><br />
                                                            </label>
                                                        </div>
                                                        <input type="submit" className="btn btn-outline-danger w-100 mt-3"
                                                            data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                                            aria-expanded="true" aria-controls="collapseThree" value="submit" />
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------Interview Upload Result------------------------------------------------------------ */}
                                <div className="tab-pane fade" id="v-pills-Interview" role="tabpanel"
                                    aria-labelledby="v-pills-sendmessage-tab">
                                    <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav navShadow mb-4">
                                        <div className="container-fluid">
                                            <div className="d-flex align-items-center ">
                                                <a className="navbar-brand" href="#"><img width="100px"
                                                    src={logo} alt="" /></a>
                                                <h2 className="h2 ms-2"><i className="bi bi-binoculars-fill"></i>&nbsp;See Interview File</h2>
                                            </div>
                                            <div className="d-flex align-items-center  me-2 ">
                                                <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
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
                                        <table className="table table-hover table-sm" id='myTable3'>
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
                                                            <button
                                                                className="btn btn-outline-primary btn-sm"
                                                                data-bs-toggle="modal" data-bs-target="#setSingleModal" onClick={() => setSelectedEnrollID(data.EnrollID)}
                                                            >
                                                                <i className="bi bi-send-fill"></i>&nbsp;Message
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* =============================================== house visit upload ============================================== */}
                                <div className="tab-pane fade" id="v-pills-addHouseVisit" role="tabpanel" aria-labelledby="v-pills-addquestions-tab">
                                    <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav navShadow mb-2">
                                        <div className="container-fluid">
                                            <div className="d-flex align-items-center ">
                                                <a className="navbar-brand" href="#"><img width="100px"
                                                    src={logo} alt="" /></a>
                                                <h2 className="h2 ms-2"><i className="bi bi-house-up-fill"></i> &nbsp; Add Housevisit File</h2>
                                            </div>
                                            <div className="d-flex align-items-center  me-2 ">
                                                <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                            </div>
                                        </div>
                                    </nav>
                                    <div className="w-100 d-flex align-items-center justify-content-center " style={{ height: "75vh" }} >
                                        <div className='w-100   d-flex align-items-center justify-content-center' >
                                            <div className='row w-100 m-0' >
                                                <div className='col-12 col-sm-6 offset-sm-3' >
                                                    <form action="" onSubmit={UploadHome} encType="multipart/form-data" >
                                                        <div id="driopArea">
                                                            <label htmlFor='uploadHouseVisitInput' className="w-100 h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer" >
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="190" width="200" fill="currentColor" className="bi bi-cloud-arrow-up-fill" viewBox="0 0 16 16">
                                                                    <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0z"></path>
                                                                </svg>
                                                                <h3 className="mb-4">Drag & Drop File Or Select File</h3>
                                                                <input id='uploadHouseVisitInput' type="file" name="homeFile" onChange={(e) => handleInputs5(e, 'homeFile')} /><br />
                                                            </label>
                                                        </div>
                                                        <input type="submit" className="btn btn-outline-danger w-100 mt-3"
                                                            data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                                            aria-expanded="true" aria-controls="collapseThree" value="submit" />
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------House Visit Result Section ------------------------------------------------------------ */}
                                <div className="tab-pane fade" id="v-pills-HouseVisit" role="tabpanel"
                                    aria-labelledby="v-pills-sendmessage-tab">
                                    <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav navShadow mb-2">
                                        <div className="container-fluid">
                                            <div className="d-flex align-items-center ">
                                                <a className="navbar-brand" href="#"><img width="100px"
                                                    src={logo} alt="" /></a>
                                                <h2 className="h2 ms-2"><i className="bi bi-house-check"></i>&nbsp;See Housevisit File</h2>
                                            </div>
                                            <div className="d-flex align-items-center  me-2 ">
                                                <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
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
                                        <div className="col-6 col-sm-3 col-md-4 mb-2 d-flex justify-content-center">
                                            <div className="btn-group " role="group" aria-label="Basic example">
                                                <button className="btn btn-outline-success btn-sm" data-bs-toggle="modal"
                                                    data-bs-target="#setHomeMessagesModal" type="button">Message To All</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dashBorad-table-div p-2">
                                        <table className="table table-hover table-sm" id='myTable4'>
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
                                                            <button
                                                                className="btn btn-outline-primary btn-sm"
                                                                data-bs-toggle="modal" data-bs-target="#setSingleModal" onClick={() => setSelectedEnrollID(data.EnrollID)}
                                                            >
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
                                    <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav navShadow mb-2">
                                        <div className="container-fluid">
                                            <div className='row w-100 m-0 ' >
                                                <div className=" col-12 col-lg-6  d-flex align-items-center">
                                                    <a className="navbar-brand" href="#"><img width="100px"
                                                        src={logo} alt="" /></a>
                                                    <h2 className="h2 ms-2"><i className="fa-solid fa-chalkboard-user"></i>&nbsp;Faculties</h2>
                                                </div>
                                                <div className=" col-12 col-lg-6 d-flex align-items-center justify-content-end   ">
                                                    <form className='w-50' onSubmit={searchFaculty} >
                                                        <div className="input-group w-100">
                                                            <div>
                                                                <AddFacultyModal getRemainingfaculty={getRemainingfaculty} />
                                                            </div>
                                                            <input type="search" className="form-control form-control-sm" placeholder="Search here" id='searchFacultuyField' />
                                                            <button className="btn btn-outline-primary btn-sm" type="submit" id="button-addon2"><i className="bi bi-search"></i></button>
                                                        </div>
                                                    </form>
                                                    <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                    <div className='row w-100 m-0' >
                                        {
                                            Faculties.map((Faculty, index) => {
                                                return (<>
                                                    <div className='col-12  col-md-6 col-lg-6 p-3  d-flex justify-content-center' key={index}>
                                                        <div className="card m-0 w-100  " >
                                                            <div className="row g-0">
                                                                <div className=" col-sm-5 col-md-12 col-lg-5">
                                                                    <img src={"http://localhost:3002/" + Faculty.image} className="card-img-top h-100 " alt="Image2" />
                                                                </div>
                                                                <div className=" col-sm-7 col-md-12 col-lg-7">
                                                                    <div className="card-body">
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
                                {/* ----------------------------------------------Gallery Data Section ------------------------------------------------------------ */}
                                <div className="tab-pane fade show  m-0" id="v-pills-Gallery" role="tabpanel" aria-labelledby="#v-pills-Gallery">
                                    <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav navShadow mb-2">
                                        <div className="container-fluid">
                                            <div className='row w-100 m-0 ' >
                                                <div className=" col-12 col-lg-6  d-flex align-items-center">
                                                    <a className="navbar-brand" href="#"><img width="100px"
                                                        src={logo} alt="" /></a>
                                                    <h2 className="h2 ms-2"><i className="fa-solid fa-user"></i>&nbsp;Gallery</h2>
                                                </div>
                                                <div className=" col-12 col-lg-6 d-flex align-items-center justify-content-end   ">
                                                    <div className=''>
                                                        <AddGalleryModal />
                                                    </div>
                                                    <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                    <div className='row w-100 m-0' >
                                        {
                                            GalleryData.map((Data, index) => {
                                                return (<>
                                                    <div className='col-12  col-md-6 col-lg-6 p-3  d-flex justify-content-center' key={index}>
                                                        <div className="card m-0 w-100  " >
                                                            <div className="row g-0">
                                                                <div className=" col-sm-5 col-md-12 col-lg-5">
                                                                    <img src={"http://localhost:3002/" + Data.galleryImg} className="card-img-top h-100 " alt="Image2" />
                                                                </div>
                                                                <div className=" col-sm-7 col-md-12 col-lg-7">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title"><b>Heading</b>: {Data.photoHeading}</h5>
                                                                        <p className="card-text"><b>Description</b>: {Data.photoDescription}</p>
                                                                        <p className="card-text"><b>Category</b>: {Data.category}</p>
                                                                        <div className="w-100">
                                                                            <div className='mt-2 d-flex'>
                                                                                <UpdateGalleryModal data={Data} />
                                                                                <DeleteGallery name={Data.photoName} id={Data._id} />                                            </div>
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
                                {/* ----------------------------------------------Gallery Data Section  Ends------------------------------------------------------------ */}

                                {/* ----------------------------------------------Batches Data Section ------------------------------------------------------------ */}
                                <div className="tab-pane fade show  m-0" id="v-pills-Batches" role="tabpanel" aria-labelledby="#v-pills-Batches">
                                    <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav navShadow mb-2">
                                        <div className="container-fluid">
                                            <div className='row w-100 m-0 ' >
                                                <div className=" col-12 col-lg-6  d-flex align-items-center">
                                                    <a className="navbar-brand" href="#"><img width="100px"
                                                        src={logo} alt="" /></a>
                                                    <h2 className="h2 ms-2"><i className="fa-solid fa-user"></i>&nbsp;Batches</h2>
                                                </div>
                                                <div className=" col-12 col-lg-6 d-flex align-items-center justify-content-end   ">
                                                    <div>
                                                        <AddBatchModal getRemainingBatch={getRemainingBatch} />
                                                    </div>
                                                    <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                    <div className='row w-100 m-0' >
                                        {
                                            batchData.map((batch, index) => {
                                                return (<>
                                                    <div className='col-12  col-md-6 col-lg-6 p-3  d-flex justify-content-center' key={index}>
                                                        <div className="card m-0 w-100  " >
                                                            <div className="row g-0">
                                                                <div className=" col-sm-5 col-md-12 col-lg-5">
                                                                    <img src={"http://localhost:3002/" + batch.batchImage} className="card-img-top h-100 " alt="Image2" />
                                                                </div>
                                                                <div className=" col-sm-7 col-md-12 col-lg-7">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">{batch.batchName}</h5>
                                                                        <p className="card-text"><b>Center</b>&nbsp;&nbsp;{batch.batchCenter}</p>
                                                                        <p className="card-text"><b>Trainer</b>&nbsp;&nbsp;{batch.trainerName}</p>
                                                                        <p className="card-text" ><b>Start Date</b> &nbsp;{
                                                                            new Date(batch.startDate).getDate().toString().padStart(2, '0') + -+
                                                                            new Date(batch.startDate).getMonth().toString().padStart(2, '0') + -+
                                                                            new Date(batch.startDate).getFullYear()
                                                                        } </p>
                                                                        <p className="card-text" ><b>End Date</b>&nbsp; {
                                                                            new Date(batch.endDate).getDate().toString().padStart(2, '0') + -+
                                                                            new Date(batch.endDate).getMonth().toString().padStart(2, '0') + -+
                                                                            new Date(batch.endDate).getFullYear()
                                                                        } </p>
                                                                        <div className="w-100">
                                                                            <div className='mt-2 d-flex'>
                                                                                <UpdateBatchModal batch={batch} getRemainingBatch={getRemainingBatch} />
                                                                                <ConfirmBoxBatch name={batch.batchName} _id={batch._id} getRemainingBatch={getRemainingBatch} />
                                                                            </div>
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
                                {/* ----------------------------------------------Batches Data Section  Ends------------------------------------------------------------ */}
                                {/* ----------------------------------------------Company Data Section ------------------------------------------------------------ */}
                                <div className="tab-pane fade show  m-0" id="v-pills-Company" role="tabpanel" aria-labelledby="#v-pills-Batches">
                                    <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav navShadow mb-2">
                                        <div className="container-fluid">
                                            <div className='row w-100 m-0 ' >
                                                <div className=" col-12 col-lg-6  d-flex align-items-center">
                                                    <a className="navbar-brand" href="#"><img width="100px"
                                                        src={logo} alt="" /></a>
                                                    <h2 className="h2 ms-2"><i className="fa-solid fa-building"></i>&nbsp;Company</h2>
                                                </div>
                                                <div className=" col-12 col-lg-6 d-flex align-items-center justify-content-end   ">
                                                    <div>
                                                        <Addcompany getRemainingCompany={getRemainingCompany} />
                                                    </div>
                                                    <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                    {/* {console.log("companies ",companies )} */}
                                    <div className="w-100 dashBorad-table-div ps-2 pe-2">
                                        <table className="table table-bordered" id="myTable">
                                            <thead className="sticky-top">
                                                <tr className="bg-danger text-white">
                                                    <th>SNo.</th>
                                                    <th>Company Name</th>
                                                    <th>See Image</th>
                                                    <th>Update</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody className="overflow-hidden">
                                                {
                                                    companies.map((company, index) => {
                                                        return <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td className='text-nowrap'>{company.companyName}</td>
                                                            <td><img src={"http://localhost:3002/" + company.companyImg} style={{ height: "45px", width: "100px" }} alt="Image2" /></td>
                                                            <td><UpdateCompanyModal company={company} getRemainingCompany={getRemainingCompany} /></td>
                                                            <td> <ConfirmBoxCompany name={company.companyName} _id={company._id} getRemainingCompany={getRemainingCompany} /></td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* ----------------------------------------------Company Data Section  Ends------------------------------------------------------------ */}
                                {/* ----------------------------------------------Banner Data Data Section  Ends------------------------------------------------------------ */}
                                <div className="tab-pane fade" id="v-pills-BannerData" role="tabpanel"
                                    aria-labelledby="v-pills-BannerData-tab">
                                    <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav navShadow mb-2">
                                        <div className="container-fluid">
                                            <div className="d-flex align-items-center ">
                                                <a className="navbar-brand" href="#"><img width="100px"
                                                    src={logo} alt="" /></a>
                                                <h2 className="h2 ms-2"><i className="bi bi-house-check"></i>&nbsp;See Banner Data</h2>
                                            </div>
                                            <div className="d-flex align-items-center  me-2 ">
                                                <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                            </div>
                                        </div>
                                    </nav>
                                    {/* <div className="row w-100  m-0  p-0 ">
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
                                        <div className="col-6 col-sm-3 col-md-4 mb-2 d-flex justify-content-center">
                                            <div className="btn-group " role="group" aria-label="Basic example">
                                                <button className="btn btn-outline-success btn-sm" data-bs-toggle="modal"
                                                    data-bs-target="#setHomeMessagesModal" type="button">Message To All</button>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="dashBorad-table-div p-2">
                                        <table className="table table-hover table-sm">
                                            <thead className="bg-light ">
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Banner Name</th>
                                                    <th>Banner Image</th>
                                                    <th>Update</th>
                                                    <th>Delete</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bannerData.map((data, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{data.bannerName}</td>
                                                            <td>
                                                                <img src={`http://localhost:3002/${data.bannerImg}`} height={220} width={250} />
                                                            </td>
                                                            <td>
                                                                <button className='btn btn-outline-success' onClick={() => {
                                                                    updateBanner(data);
                                                                }}>
                                                                    Update
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button className='btn btn-outline-danger' onClick={() => {
                                                                    deleteBanner(data._id);
                                                                }}>
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* -----------------------------------------------Center Data Section Start ------------------------------------------------------------ */}
                                <div className="tab-pane fade show  m-0" id="v-pills-CenterData" role="tabpanel" aria-labelledby="#v-pills-CenterData">
                                    <nav className="navbar navbar-expand-lg navbar-light bg-light disaaper-nav navShadow mb-2">
                                        <div className="container-fluid">
                                            <div className='row w-100 m-0 ' >
                                                <div className=" col-12 col-lg-6  d-flex align-items-center">
                                                    <a className="navbar-brand" href="#"><img width="100px"
                                                        src={logo} alt="" /></a>
                                                    <h2 className="h2 ms-2"><i className="fa-solid fa-chalkboard-user"></i>&nbsp;Centers</h2>
                                                </div>
                                                <div className=" col-12 col-lg-6 d-flex align-items-center justify-content-end   ">
                                                    <div>
                                                        <AddCenterModal />
                                                    </div>
                                                    <button type="submit" className="btn btn-outline-danger btn-sm m-2">Log out</button>
                                                </div>
                                            </div>
                                        </div   >
                                    </nav>
                                    <div className='row w-100 m-0' >
                                        {
                                            centerdata.map((center, index) => {
                                                return (<>
                                                    <div className='col-12  col-md-6 col-lg-6 p-3  d-flex justify-content-center' key={index}>
                                                        <div className="card m-0 w-100  " >
                                                            <div className="row g-0">
                                                                <div className=" col-sm-5 col-md-12 col-lg-5">
                                                                    <img src={"http://localhost:3002/" + center.centerImage} className="card-img-top h-100 " alt="Image2" />
                                                                </div>
                                                                <div className=" col-sm-7 col-md-12 col-lg-7">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">{center.centerName}</h5>
                                                                        <p className="card-text"><b>Manager</b> : {center.managerName}</p>
                                                                        <p className="card-text"><b>Address</b> : {center.address}</p>
                                                                        <p className="card-text" ><b>Starting Date</b> : {
                                                                            new Date(center.startDate).getDate().toString().padStart(2, '0') + - +
                                                                            new Date(center.startDate).getMonth().toString().padStart(2, '0') + - +
                                                                            new Date(center.startDate).getFullYear()
                                                                        } </p>
                                                                        <div className="w-100">
                                                                            <div className='mt-2 d-flex'>
                                                                                <button className='btn btn-outline-success mx-2' onClick={() => {
                                                                                    updateCenter(center);
                                                                                }}> Update </button>
                                                                                <button className='btn btn-outline-danger' onClick={() => {
                                                                                    deleteCenter(center._id);
                                                                                }}> Delete </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>)
                                            })
                                        }
                                    </div>
                                </div>
                                {/* -----------------------------------------------Center Data Section End ------------------------------------------------------------ */}
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
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { messageFunction(1) }}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="setHomeMessagesModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { messageFunction(2) }}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="setResultModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { messageResultFunction(1) }}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="setShiftModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { messageResultFunction(2) }}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="setSingleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 text-center" id="exampleModalLabel">Message</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input className="form-control" type="text" name="message" placeholder='Enter Message' onChange={(event) => { singleMessage(event) }}></input>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={sendMessage}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="setOneModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 text-center" id="exampleModalLabel">Message</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input className="form-control" type="text" name="message" placeholder='Enter Message' onChange={(event) => { singleMessage(event) }}></input>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={oneMessage}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            <Modal isOpen={updateModal} toggle={() => { setUpdateModal(!updateModal) }}>
                <form onSubmit={updateBannerData} method='post' encType="multipart/form-data">
                    <ModalHeader toggle={() => { setUpdateModal(!updateModal) }}>
                        <h4>
                            <i
                                className="bi bi-image text-info"
                                style={{ fontSize: "40px" }}
                            ></i>
                            &nbsp;Update Banner
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
                                defaultValue={updatebannerdata.bannerName}
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
                                placeholder={updatebannerdata.bannerImg}
                            />
                        </div>
                        <div class="alert alert-danger" role="alert">
                            <i class="bi bi-info-circle-fill"></i> &nbsp; Recommended banner size  1000X347 px
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit" onClick={(e) => {
                            updateBannerData(e)
                        }}>
                            <i className="bi bi-plus-lg"></i> &nbsp;Update Banner
                        </Button>{" "}
                        <Button color="secondary" onClick={() => { setUpdateModal(!updateModal) }}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>

            {/* ------------------------------------------------------------------Update Center Modal ------------------------------------------------ */}
            <Modal isOpen={updateModal2} toggle={() => { setUpdateModal2(!updateModal2) }}>
                <form onSubmit={updateCenterData} method='post' encType="multipart/form-data">
                    <ModalHeader toggle={() => { setUpdateModal2(!updateModal2) }}>
                        <h4>
                            <i
                                className="bi bi-image text-info"
                                style={{ fontSize: "40px" }}
                            ></i>
                            &nbsp;Update Center
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
                                defaultValue={updatecenterdata.centerName}
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
                                <option value={updatecenterdata.managerName}>{updatecenterdata.managerName}</option>
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
                                defaultValue={updatecenterdata.address}
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
                        <Button color="primary" type="submit" onClick={(e) => {
                            updateCenterData(e)
                        }}>
                            <i className="bi bi-plus-lg"></i> &nbsp;Update Center
                        </Button>{" "}
                        <Button color="secondary" onClick={() => { setUpdateModal2(!updateModal2) }}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>


        </>
    );
}