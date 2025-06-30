import '../styles/natural.css';
import Sidebar from './Sidebar';
import Header from './Header';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NaturalFirst() {
  const navigate = useNavigate();
  const location = useLocation();

  //  data passed from Year.jsx
  const selectedUniversity = location.state?.selectedUniversity || "";
  const selectedYear = location.state?.selectedYear || "";

  const handlebackClick = () => {
    navigate('/Year', { state: { selectedUniversity } });
  };


  const handleSubjectClick = (subject) => {
    navigate('/MidFinal', {
      state: {
        selectedUniversity,
        selectedYear,
        selectedStream: "Natural",
        selectedSemester: "First Semester",
        selectedSubject: subject
      }
    });
  };

  return (
    <div className="naturalFirst-container">
      <Sidebar />
      <div className="side-naturalFirst">
        <Header />
        <h1>Courses</h1>

        <div className='course'>
          <button onClick={() => handleSubjectClick("Maths")}>Maths</button>
          <button onClick={() => handleSubjectClick("Physics")}>Physics</button>
          <button onClick={() => handleSubjectClick("Communication English I")}>Communication English I</button>
          <button onClick={() => handleSubjectClick("Logics")}>Logics</button>
          <button onClick={() => handleSubjectClick("Psychology")}>Psychology</button>
          <button onClick={() => handleSubjectClick("Moral and Civic")}>Moral and Civic</button>
          <button onClick={() => handleSubjectClick("Geography")}>Geography</button>
        </div>

        <p 
          className="back"
          onClick={handlebackClick}
        >
          back
        </p>
      </div>
    </div>
  );
}
