import Header from "./Header";
import Sidebar from "./Sidebar";
import '../styles/university.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Universities() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleBackClick = () => {
    navigate('/Login');
  };

  const handleUniversitySelect = (university) => {
    navigate('/Year', { state: { selectedUniversity: university } });
  };

  return (
    <div className="university-container">
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

      <div className="side-university">
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

        <div className="packunvi">
          <h1>Universities</h1>

          <div className="univ">
            <button onClick={() => handleUniversitySelect('Addis Ababa')}>Addis Ababa</button>
            <button onClick={() => handleUniversitySelect('Bahir Dar')}>Bahir Dar</button>
            <button onClick={() => handleUniversitySelect('Gonder')}>Gonder</button>
            <button onClick={() => handleUniversitySelect('Hawassa')}>Hawassa</button>
            <button onClick={() => handleUniversitySelect('Dire Dawa')}>Dire Dawa</button>
            <button onClick={() => handleUniversitySelect('Jimma')}>Jimma</button>
            <button onClick={() => handleUniversitySelect('Debre Markos')}>Debre Markos</button>
            <button onClick={() => handleUniversitySelect('Debre Tabor')}>Debre Tabor</button>
          </div>
        </div>

        <button className="back-btn" onClick={handleBackClick}>
          ← back
        </button>
      </div>
    </div>
  );
}
