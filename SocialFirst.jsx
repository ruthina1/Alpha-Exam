import '../styles/natural.css';
import Sidebar from './Sidebar';
import Header from './Header';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function SocialFirst() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ Read previous data
  const selectedUniversity = location.state?.selectedUniversity || "";
  const selectedYear = location.state?.selectedYear || "";

  const handleBackClick = () => {
    navigate('/Year', { state: { selectedUniversity } });
  };

  // ✅ Handle subject click
  const handleSubjectClick = (subject) => {
    navigate('/MidFinal', {
      state: {
        selectedUniversity,
        selectedYear,
        selectedStream: "Social",
        selectedSemester: "First Semester",
        selectedSubject: subject
      }
    });
  };

  return (
    <div className="socialFirst-container">
      <div className={`sidebar-container-wrapper ${sidebarOpen ? 'open' : ''}`}>
        <Sidebar />
        <button
          className="close-btn"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          ×
        </button>
      </div>

      <div className="side-socialFirst">
        <div className="header-mobile">
          <button
            className="burger-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <div className="burger-line"></div>
            <div className="burger-line"></div>
            <div className="burger-line"></div>
          </button>
          <img
            src={require('../images/logo.jpg')}
            alt="Logo"
            className="logo2"
          />
        </div>

        <Header />
        <div className='packcourse'>
          <h1>Courses</h1>

          <div className="course">
            <button onClick={() => handleSubjectClick("Entrepreneurship")}>Entrepreneurship</button>
            <button onClick={() => handleSubjectClick("Economics")}>Economics</button>
            <button onClick={() => handleSubjectClick("Communication English I")}>Communication English I</button>
            <button onClick={() => handleSubjectClick("History")}>History</button>
            <button onClick={() => handleSubjectClick("Social Anthropology")}>Social Anthropology</button>
            <button onClick={() => handleSubjectClick("Global Trend")}>Global Trend</button>
          </div>
        </div>

        <button className="back-btn" onClick={handleBackClick}>
          ← back
        </button>
      </div>
    </div>
  );
}
