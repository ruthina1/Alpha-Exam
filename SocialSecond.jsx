import '../styles/natural.css';
import Sidebar from './Sidebar';
import Header from './Header';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function SocialSecond() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get previous info from Year.jsx
  const selectedUniversity = location.state?.selectedUniversity || "";
  const selectedYear = location.state?.selectedYear || "";

  const handleBackClick = () => {
    navigate('/Year', { state: { selectedUniversity } });
  };

  // Send selected subject and all info to MidFinal.jsx
  const handleSubjectClick = (subject) => {
    navigate('/MidFinal', {
      state: {
        selectedUniversity,
        selectedYear,
        selectedStream: "Social",
        selectedSemester: "Second Semester",
        selectedSubject: subject
      }
    });
  };

  return (
    <div className="socialSecond-container">
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

      <div className="side-socialSecond">
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
            <button onClick={() => handleSubjectClick("Social Maths")}>Social Maths</button>
            <button onClick={() => handleSubjectClick("Logic")}>Logic</button>
            <button onClick={() => handleSubjectClick("Communication English I")}>Communication English I</button>
            <button onClick={() => handleSubjectClick("Psychology")}>Psychology</button>
            <button onClick={() => handleSubjectClick("Moral and Civics")}>Moral and Civics</button>
            <button onClick={() => handleSubjectClick("Geography")}>Geography</button>
            <button onClick={() => handleSubjectClick("Inclusiveness")}>Inclusiveness</button>
          </div>

        </div>
        
        <button className="back-btn" onClick={handleBackClick}>
          ← back
        </button>
      </div>
    </div>
  );
}
