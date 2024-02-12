import axios from 'axios';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './ourTeamStyle.css';

export default function OurTeam() {
    const [Faculties, setFaculties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getFaculties = async () => {
            try {
                var response = await axios.get('http://localhost:3002/admin/getFaculties');
                setFaculties(response.data)
                setLoading(false)
            } catch (error) {
                console.log("Error While Getting Faculty Details for main page", error);
                setLoading(false)
            }
        }
        getFaculties()
    }, []);

    if (loading) {
        return <></>
    } else {
        return (
            <div className='mt-3'>
                <h1 className='text-center teamHeading'>Our Team</h1>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={25}
                    centeredSlides={true}
                    loop={true}
                    grabCursor={true}
                    navigation={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1
                        },
                        520: {
                            slidesPerView: 2
                        },
                        950: {
                            slidesPerView: 3
                        }
                    }}
                    modules={[Autoplay, Navigation]}
                    className="mySwiper mb-4 p-4"
                >
                    {Faculties.map((Faculty, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className="ourTeamCard">
                                    <div className="image-content">
                                        <span className="overlay"></span>
                                        <div className="ourTeamCard-image">
                                            <img className="ourTeamCard-img" src={`http://localhost:3002/${Faculty.image}`} />
                                        </div>
                                    </div>
                                    <div className="ourTeamCard-content">
                                        <h2 className="nameClass">{Faculty.facultyname}</h2>
                                        <h2 className="nameClass">{Faculty.department}</h2>
                                        <h5 className='linkedInClass'>
                                            <a className='text-decoration-none link-danger' href="/"><i className="fa-brands fa-linkedin"></i>&nbsp;{Faculty.linkedInid}</a>
                                        </h5>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    }
                    )}
                </Swiper >
            </div>
        )
    }
}
