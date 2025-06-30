import '../styles/natural.css';
import Sidebar from './Sidebar';
import Header from './Header';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function NaturalSecond() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ Get data from Year.jsx
  const selectedUniversity = location.state?.selectedUniversity || "";
  const selectedYear = location.state?.selectedYear || "";

  const handleBackClick = () => {
    navigate('/Year', { state: { selectedUniversity } });
  };

  // ✅ Handle subject selection
  const handleSubjectClick = (subject) => {
    navigate('/MidFinal', {
      state: {
        selectedUniversity,
        selectedYear,
        selectedStream: "Natural",
        selectedSemester: "Second Semester",
        selectedSubject: subject
      }
    });
  };

  return (
    <div className="naturalSecond-container">
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

      <div className="side-naturalSecond">
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
            <button onClick={() => handleSubjectClick("Applied Maths")}>Applied Maths</button>
            <button onClick={() => handleSubjectClick("C++")}>C++</button>
            <button onClick={() => handleSubjectClick("Communication English II")}>Communication English II</button>
            <button onClick={() => handleSubjectClick("Emerging")}>Emerging</button>
            <button onClick={() => handleSubjectClick("History")}>History</button>
            <button onClick={() => handleSubjectClick("Anthropology")}>Anthropology</button>
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
