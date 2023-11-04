import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/footer';
import HeadSlide from './components/HeadSlider';
import SlideEffect from './components/SlideEffect';
import SkillSection from './components/SkillsSection';
import WeFacilitate from './components/WeFacilitate';
import OurBatches from './components/OurBatches';
import OurAchivements from './components/OurAchivements';
import OurTeam from './components/OurTeam';
import Registration from './components/registration';
import Login from './components/Login';
import Instructionpage from './components/Instructionpage';
import ModalComponent from './components/ModalComponent';
import AdminModule from './components/AdminModule2';
import ExamPortal from './components/ExamPortal5';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Add 'useLocation' here
import './App.css';
function App() {
  return (
    <Router>
      <AppContent/>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.includes('/admin');  

  return (
    <>
      {!isAdminRoute && <NavBar />}
      <Routes>
        <Route path="/" element={
          <>
            <HeadSlide />
            <SlideEffect />
            <SkillSection />
            <WeFacilitate />
            <OurBatches />
            <OurAchivements />
            <OurTeam />
          </>
        } />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Instructionpage" element={<Instructionpage />} />
        <Route path="/otpcomponent" element={<ModalComponent />} />
        <Route path="/admin" element={<AdminModule />} />
        <Route path="/ExamPortal" element={<ExamPortal/>} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;