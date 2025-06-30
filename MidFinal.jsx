import '../styles/midFinal.css';
import Sidebar from './Sidebar';
import Header from './Header';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function MidFinal() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Get all data passed from previous pages
  const selectedUniversity = location.state?.selectedUniversity || "";
  const selectedYear = location.state?.selectedYear || "";
  const selectedStream = location.state?.selectedStream || "";
  const selectedSemester = location.state?.selectedSemester || "";
  const selectedSubject = location.state?.selectedSubject || "";

  const handleBackClick = () => {
    navigate('/Year', { state: { selectedUniversity } });
  };

  const handleTermClick = async (examTerm) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch('https://your-backend-api.com/api/registerExamSelection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          university: selectedUniversity,
          year: selectedYear,
          stream: selectedStream,
          semester: selectedSemester,
          subject: selectedSubject,
          examTerm
        })
      });

      if (!response.ok) {
        throw new Error('Failed to register exam selection.');
      }

      const data = await response.json();

navigate('/Question');


    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="midFinal-container">
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

      <div className="side-midFinal">
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
          <img src={require('../images/logo.jpg')} alt="Logo" className="logo2" />
        </div>

        <Header />

        <main className="main-content with-shadow">
          <div
            className="emoji-container"
            aria-hidden="true"
            role="img"
            aria-label="Book emoji"
          >
            <h1 className="page-title"> 📚 Ready to Ace Your Exams?</h1>
            <div style={{ marginTop: '10px', marginBottom: '20px', fontWeight: 'bold', fontSize: '18px' }}>
              {selectedUniversity} University {selectedYear}
              {selectedStream && ` | ${selectedStream}`}
              {selectedSemester && ` | ${selectedSemester}`}
              {selectedSubject && ` | ${selectedSubject}`}
            </div>
            <p className="subtitle">
              Select the exam term below to review your courses and track your progress.
            </p>
          </div>

          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

          <div className="term-vertical">
            <button
              className="term-btn"
              onClick={() => handleTermClick('Mid')}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Mid Term Exam'}
            </button>
            <button
              className="term-btn"
              onClick={() => handleTermClick('Final')}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Final Term Exam'}
            </button>
          </div>
          <br />
        </main>

        <button className="back-btn" onClick={handleBackClick}>
          ← back
        </button>
      </div>
    </div>
  );
}
