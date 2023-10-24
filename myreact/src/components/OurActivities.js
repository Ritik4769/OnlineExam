import React from 'react';

export default function OurActivities() {
    return (
        <div className="container mt-3  drop-shadow bg-white pb-4">
            <div className=" m-4 p-0 pt-4  d-flex align-items-center justify-content-center">
                <h1 className="ms-4 text-center">Activities at InfoBeans Foundation</h1>
            </div>
            <section className='c-slider'>
                <div className='c-slider-init'>
                    <div className='c-slide'
                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1504461407194-07c608d0989b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1900&q=100")' }}>
                        <div className='c-slide-content'>
                            <div className='c-wrap c-wrap--line'>
                                <h2 className='fontFamily color c-slide__title'>
                                    Underwater
                                    <span className='c-slide__title--large'>Monsters</span>
                                </h2>
                            </div>
                            <div className='c-wrap c-wrap--small'>
                                <div className='c-slide__info'>
                                    <h3 className='color c-slide__subtitle'>Saltwater Crocodile</h3>
                                    <p className='color c-slide__body'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='c-slide'
                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544745494-3d8dd3fa1564?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1900&q=100")' }}>
                        <div className='c-slide-content'>
                            <div className='c-wrap c-wrap--line'>
                                <h2 className='fontFamily color c-slide__title'>
                                    The
                                    <span className='c-slide__title--medium'>Gates of Hell</span>
                                </h2>
                            </div>
                            <div className='c-wrap c-wrap--small'>
                                <div className='c-slide__info'>
                                    <h3 className='color c-slide__subtitle'>Special inside volcanoes</h3>
                                    <p className='color c-slide__body'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='c-slide'
                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1528214096798-37891d32174c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1900&q=100")' }}>
                        <div className='c-slide-content'>
                            <div className='c-wrap c-wrap--line'>
                                <h2 className='fontFamily color c-slide__title'>
                                    Exploring
                                    <span className='c-slide__title--large'>Deep Caves</span>
                                </h2>
                            </div>
                            <div className='c-wrap c-wrap--small'>
                                <div className='c-slide__info'>
                                    <h3 className='color c-slide__subtitle'>Real Time Capsules</h3>
                                    <p className='color c-slide__body'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}
