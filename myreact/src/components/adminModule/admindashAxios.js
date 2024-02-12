import axios from 'axios';
import Swal from 'sweetalert2';

export const createExam = async (event, exam) => {
    event.preventDefault();
    try {
        axios.post('http://localhost:3002/admin/exams', exam).then((response) => {

            console.log("result", response);
            if (response.status === 201) {
                Swal.fire({
                    icon: "success",
                    text: 'Exam Scheduled succesfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                const responseData = response.data;
                const newExam = responseData.newExam;
            }
        }).catch((error) => {
            console.log("Error: ",error);
        })
    } catch (error) {
        console.log('Error: ', error);
        window.alert('Failed to register');
    }
};

export const createSchedule = async (event, schedule) => {
    event.preventDefault();
    try {
        axios.post(`http://localhost:3002/admin/shifts`, schedule).then((response) => {
            if (response.status === 201) {
                Swal.fire({
                    icon: "success",
                    text: 'Shift Scheduled succesfully',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        }).catch((error) => {
            console.log('Error: ', error);
        })
    } catch (error) {
        console.log('Error: ', error);
        window.alert('Failed to register');
    }
};