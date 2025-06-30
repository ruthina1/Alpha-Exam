import '../styles/registration.css';
import logo from '../images/logo.jpg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
  const [showNaturalList1, setShowNaturalList1] = useState(false);
  const [showNaturalList2, setShowNaturalList2] = useState(false);
  const [showSocialList1, setShowSocialList1] = useState(false);
  const [showSocialList2, setShowSocialList2] = useState(false);

  const navigate = useNavigate();

  const [checked, setChecked] = useState({
    natural1: false,
    natural2: false,
    social1: false,
    social2: false,
  });

  const isAnyChecked = Object.values(checked).some(Boolean);

  const handleCheck = (key) => {
    setChecked((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleDoneClick = () => {
    if (isAnyChecked) {
      navigate('/Payment', { state: { selectedSemesters: checked } });
    }
  };

  return (
    <div className="containerR">
      <div className="registartion-container">
        <img src={logo} />
        <h2>Welcome</h2>

        <div className='stream'>

          <div className='natural'>
            <h1>Natural Science</h1>

            <div className='inp'>
              <input
                type="checkbox"
                checked={checked.natural1}
                onChange={() => handleCheck('natural1')}
              />
              <button
                className={`fieldbtn ${checked.natural1 ? 'checked' : ''}`}
                onClick={() => setShowNaturalList1(!showNaturalList1)}
              >
                First Semester
              </button>
            </div>
            {showNaturalList1 && (
              <ul className='list1'>
                <li>Maths</li>
                <li>Physics</li>
                <li>Communicative English I</li>
                <li>Psychology</li>
                <li>Logic</li>
                <li>Geography</li>
                <li>Civics</li>
              </ul>
            )}

            <div className='inp'>
              <br />
              <input
                type="checkbox"
                checked={checked.natural2}
                onChange={() => handleCheck('natural2')}
              />
              <button
                className={`fieldbtn ${checked.natural2 ? 'checked' : ''}`}
                onClick={() => setShowNaturalList2(!showNaturalList2)}
              >
                Second Semester
              </button>
            </div>
            {showNaturalList2 && (
              <ul className='list2'>
                <li>Applied Maths</li>
                <li>C++</li>
                <li>Communicative English II</li>
                <li>Emmerging</li>
                <li>History</li>
                <li>Anthropology</li>
                <li>Global Trend</li>
              </ul>
            )}
          </div>

          <div className='social'>
            <h1>Social Science</h1>

            <div className='inp2'>
              <input
                type="checkbox"
                checked={checked.social1}
                onChange={() => handleCheck('social1')}
              />
              <button
                className={`fieldbtn ${checked.social1 ? 'checked' : ''}`}
                onClick={() => setShowSocialList1(!showSocialList1)}
              >
                First Semester
              </button>
            </div>
            {showSocialList1 && (
              <ul className='list3'>
                <li>Enterprinuership</li>
                <li>Economics</li>
                <li>Communicative English I</li>
                <li>History</li>
                <li>Social Anthropology</li>
                <li>Global Trend</li>
              </ul>
            )}
            <br />
            <div className='inp2'>
              <input
                type="checkbox"
                checked={checked.social2}
                onChange={() => handleCheck('social2')}
              />
              <button
                className={`fieldbtn ${checked.social2 ? 'checked' : ''}`}
                onClick={() => setShowSocialList2(!showSocialList2)}
              >
                Second Semester
              </button>
            </div>
            {showSocialList2 && (
              <ul className='list4'>
                <li>Social Maths</li>
                <li>Logic</li>
                <li>Communicative English II</li>
                <li>Psychology</li>
                <li>Moral and Civics</li>
                <li>Geography</li>
                <li>Inclusiveness</li>
              </ul>
            )}
          </div>
        </div>

        <button
          className={`done-btn ${isAnyChecked ? 'enabled' : ''}`}
          disabled={!isAnyChecked}
          onClick={handleDoneClick}
        >
          Done
        </button>
      </div>
    </div>
  );
}
