import '../styles/dashboard.css';
import logo2 from '../images/logo.jpg';
import Header from './Header';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

export default function Dashboard() {
  const [progressData, setProgressData] = useState({});
  const [finalProgressData, setFinalProgressData] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const responseMid = await fetch('http://localhost:5000/api/progress/mid');
        const midData = await responseMid.json();
        setProgressData(midData);

        const responseFinal = await fetch('http://localhost:5000/api/progress/final');
        const finalData = await responseFinal.json();
        setFinalProgressData(finalData);
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    fetchProgress();
  }, []);

  const exams = [
    'Maths',
    'Physics',
    'Communication English I',
    'Logics',
    'Psychology',
    'Moral and Civic',
    'Geography',
  ];

  const midAverage =
    exams.reduce((sum, e) => sum + (progressData[e] || 0), 0) / exams.length;

  const finalAverage =
    exams.reduce((sum, e) => sum + (finalProgressData[e] || 0), 0) / exams.length;

  const midPieData = [
    { name: 'Completed', value: Math.round(midAverage) },
    { name: 'Remaining', value: 100 - Math.round(midAverage) },
  ];

  const finalPieData = [
    { name: 'Completed', value: Math.round(finalAverage) },
    { name: 'Remaining', value: 100 - Math.round(finalAverage) },
  ];

  const COLORS = ['#44E5B2', '#eee'];

  return (
    <div className="dashboard-container">
   
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


      <div className="side-dashboard">
   
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

          <img src={logo2} alt="Logo"  className='logo2'/>
    
        </div>

        <Header />

        <div className="dash-sections">
          <div className="exam-card">
            <h3>Mid Exams Progress</h3>
            <PieChart width={200} height={200} className='piee'>
              <Pie
                data={midPieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                label
              >
                {midPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            <ul>
              {exams.map((exam) => (
                <li key={exam} className="exam-item inline">
                  <span className="exam-name">{exam}</span>
                  <div className="progress-container inline-bar">
                    <div
                      className="progress-bar"
                      style={{ width: `${progressData[exam] || 0}%` }}
                    />
                  </div>
                  <span className="progress-percent">{progressData[exam] || 0}%</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="exam-card">
            <h3>Final Exams Progress</h3>
            <PieChart width={200} height={200} className='piee'>
              <Pie
                data={finalPieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                label
              >
                {finalPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            <ul>
              {exams.map((exam) => (
                <li key={exam} className="exam-item inline">
                  <span className="exam-name">{exam}</span>
                  <div className="progress-container inline-bar">
                    <div
                      className="progress-bar"
                      style={{ width: `${finalProgressData[exam] || 0}%` }}
                    />
                  </div>
                  <span className="progress-percent">{finalProgressData[exam] || 0}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
