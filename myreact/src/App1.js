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
import AdminModule from './components/AdminModule';
import ExamPortal from './components/ExamPortal';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Add 'useLocation' here
import './App.css';

const QuestionPaperObject = {
  // Define the properties and data here
  
    EnrollID: "ITEP0914",
    paper: [
      {
        subjectID: "ENG01",
        questions: [
          {
            QuestionID: 13,
            Question: "What is the capital of France?",
            OptionA: "Paris",
            // Other question properties
          },
          {
            QuestionID: 15,
            Question: "What is the chemical symbol for gold?",
            OptionA: "Au",
            // Other question properties
          },
          // Add more questions for the ENG01 subject
        ],
      },
      {
        subjectID: "HIN02",
        questions: [
          // Questions for HIN02 subject
        ],
      },
      {
        subjectID: "MAT03",
        questions: [
          // Questions for MAT03 subject
        ],
      },
      {
        subjectID: "REAS04",
        questions: [
          // Questions for REAS04 subject
        ],
      },
      {
        subjectID: "COM05",
        questions: [
          // Questions for COM05 subject
        ],
      },
      {
        subjectID: "GK06",
        questions: [
          // Questions for GK06 subject
        ],
      },
    ],
  
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  // const isAdminRoute = location.pathname.includes('/admin');
  const isAdminRoute = location.pathname.includes('/ExamPortal');

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
        {/* <Route path="/ExamPortal" element={<ExamPortal />} /> */}
        <Route path="/ExamPortal" element={<ExamPortal QuestionPaperObject={QuestionPaperObject} />} />
      </Routes>
      {!isAdminRoute && <Footer />}
      
    </>
  );
}

export default App;