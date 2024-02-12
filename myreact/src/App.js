import React from 'react';
import NavBar from './components/NavBar';
import HeadSlide from './components/HeadSlider';
import SlideEffect from './components/SlideEffect';
import SkillSection from './components/SkillsSection1';
import WeFacilitate from './components/WeFacilitate';
import OurBatches from './components/OurBatches';
import OurAchivements from './components/OurAchivements';
import OurTeam from './components/OurTeam';
import AboutInfoBeanstech from "./components/AboutInfoBeanstech";
import Footer from './components/Footer';
import GalleryPage from './components/GalleryFolder/GalleryPage';
import Registration from './components/Registration';
import Login from './components/Login';
import Instructionpage from './components/Instructionpage';
import ModalComponent from './components/ModalComponent';
import AdminModule from './components/AdminModule';
import ExamPortal from './components/ExamPortal1';
import AdminLogin from './components/AdminLogin';
import VerifyAdmin from './components/VerifyAdmin';
import Admission from './components/Admission.js';
import Career from './components/Career.js'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.includes('/admin');
  const isExamPortal = location.pathname.includes('/ExamPortal');
  const renderNavBarAndFooter = !isAdminRoute && !isExamPortal;
  return (
    <>
      {renderNavBarAndFooter && <NavBar />}
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
            <AboutInfoBeanstech />
          </>
        } />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/admin" element={<VerifyAdmin />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminDashboard" element={<AdminModule />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Instructionpage" element={<Instructionpage />} />
        <Route path="/otpcomponent" element={<ModalComponent />} />
        <Route path="/ExamPortal" element={<ExamPortal />} />
        <Route path='/admission' element={<Admission/>}/>
        <Route path='/career' element={<Career/>}/>  
      </Routes>
      {renderNavBarAndFooter && <Footer />}
    </>
  );
}

export default App;