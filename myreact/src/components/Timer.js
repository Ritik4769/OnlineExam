import React, { useState, useEffect } from 'react';
import Cookie from "js-cookie";
import axios from "axios";

const Timer = ({ initialTime, onTimeOver }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    var EnrollId = Cookie.get("EnrollID");

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime === 0) {
                    updateBackendTime(prevTime);
                    clearInterval(timer);
                    onTimeOver();
                    return 0;
                }

                if (prevTime % 60 === 0) {
                    updateBackendTime(prevTime);
                }

                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const updateBackendTime = async (remainingTime) => {
        const minutes = Math.floor(remainingTime / 60);

        try {
            await axios.post(`http://localhost:3002/ExamPortal/updateTime?enrollId=${EnrollId}`, { minutes });
            console.log('Time updated successfully in the backend.');
        } catch (error) {
            console.error('Error updating time in the backend:', error);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <>
            {formatTime(timeLeft)}
        </>
    );
};

export default Timer;