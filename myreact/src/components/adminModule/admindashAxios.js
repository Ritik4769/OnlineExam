import axios from 'axios';
import Swal from 'sweetalert2'; 
var examid;
var EnrollIDs = [];
export const createExam = async (e,exam) => {
    console.log(e);
     
    if (e) {
        e.preventDefault();
    }
    console.log("in createExam");
     console.log(exam);
    const { examTitle, examDate, examDuration, examVenue } = exam;
    try {
        axios.post('http://localhost:3002/admin/exams',exam).then((response) => {

            console.log("result", response);
            if (response.status === 201) {
                Swal.fire({                        
                    icon: "success",
                    text:'Exam Scheduled succesfully',
                    showConfirmButton: false,
                    timer: 1500
                  });
                const responseData = response.data;
                const newExam = responseData.newExam;
                examid = newExam._id;
                console.log(examid);
                console.log(newExam);
                console.log('component caling');
                EnrollIDs = responseData.EnrollIDs;
                console.log(EnrollIDs);
            }
        }).catch((error) => {
            console.log(error);
        })
    } catch (error) {
        console.log('Error:', error);
        window.alert('Failed to register');
    }
};

export const createSchedule = async (e,schedule) => {
    console.log(schedule);
    if (e) {
        e.preventDefault();
    }
    console.log("in createSchedule");
    const { shiftNumber, maxCandidates, shiftTimeFrom, shiftTimeTo } = schedule;
    try {
       
       /* Shedule bhi ho rahi bus ye eaxam is tum log kese la rhe the dekh lo baki shedule bhi ho rhi h
        Exam sheduyoe bhi hojaygi eaxam id ki gagaj koi sa bhi random num daal dena */
        axios.post(`http://localhost:3002/admin/shifts`, schedule).then((response) => {
            console.log("result", response);
            if (response.status === 201) {
                Swal.fire({                        
                    icon: "success",
                    text:'Shift Scheduled succesfully',
                    showConfirmButton: false,
                    timer: 2000
                  });
                console.log('component caling');
            }
        }).catch((error) => {
            console.log('', error);
        })
    } catch (error) {
        console.log('Error:', error);
        window.alert('Failed to register');
    }
};