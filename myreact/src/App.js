// import NavBar from './components/NavBar'
// import HeadSlide from './components/HeadSlider'
// import SlideEffect from './components/SlideEffect'
// import SkillSection from './components/SkillsSection'
// import WeFacilitate from './components/WeFacilitate'
// import OurBatches from './components/OurBatches'
// import OurAchivements from './components/OurAchivements'
// import OurTeam from './components/OurTeam'
// import Footer from './components/footer'
// import Registration from './components/registration'
// import ModalComponent from './components/ModalComponent'
// import AdminModule from './components/AdminModule'
// // import OurActivities from './components/OurActivities'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css';
// // import './sliderActivity.js';

// function App() {
//   return (<>
//     <Router>
//       <NavBar />
//       <Routes>
//         <Route path="/" element={
//           <>
//             <HeadSlide />
//             <SlideEffect />
//             <SkillSection />
//             <WeFacilitate />
//             <OurBatches />
//             <OurAchivements />
//             {/* <OurActivities /> */}
//             <OurTeam />
//           </>
//         } />
//         <Route path="/registration" element={<Registration />} />
//         <Route path="/otpcomponent" element={<ModalComponent />} />
//         <Route path="/admin" element={<AdminModule />} />
//       </Routes>
//       <Footer />
//     </Router>
//   </>)
// }

// export default App;


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
import ModalComponent from './components/ModalComponent';
import AdminModule from './components/AdminModule';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Add 'useLocation' here
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
        <Route path="/otpcomponent" element={<ModalComponent />} />
        <Route path="/admin/*" element={<AdminModule />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;