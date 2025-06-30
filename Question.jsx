import '../styles/question.css';
import Sidebar from './Sidebar';
import Header from './Header';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Question() {
  const navigate = useNavigate();
  const location = useLocation();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Extract exam context from navigation
  const {
    stream,
    semester,
    university,
    year,
    exam
  } = location.state || {};

  // ❗️ You still have your mock data for reference
  /*
  useEffect(() => {
    const mockQuestions = [
      {
        id: 1,
        questionText: "Which of the following is a JavaScript framework?",
        choices: [
          { id: 'a', text: "Laravel", description: "Laravel is a PHP framework." },
          { id: 'b', text: "Django", description: "Django is a Python framework." },
          { id: 'c', text: "React", description: "Correct! React is a JavaScript library." },
          { id: 'd', text: "Ruby on Rails", description: "Ruby on Rails is a Ruby framework." }
        ],
        correctChoiceId: 'c'
      },
      {
        id: 2,
        questionText: "What does CSS stand for?",
        choices: [
          { id: 'a', text: "Computer Style Sheets", description: "Incorrect. It is Cascading Style Sheets." },
          { id: 'b', text: "Creative Style Sheets", description: "Not quite." },
          { id: 'c', text: "Cascading Style Sheets", description: "Correct!" },
          { id: 'd', text: "Colorful Style Sheets", description: "Nope." }
        ],
        correctChoiceId: 'c'
      }
    ];

    setQuestions(mockQuestions);
  }, []);
  */

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (!stream || !semester || !university || !year || !exam) {
          console.error('Missing exam context.');
          return;
        }

        const queryParams = new URLSearchParams({
          stream,
          semester,
          university,
          year,
          exam
        }).toString();

        const response = await fetch(`https://your-backend-api.com/api/questions?${queryParams}`);

        if (!response.ok) {
          throw new Error('Failed to fetch questions.');
        }

        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [stream, semester, university, year, exam]);

  const handleChoiceSelect = (questionId, choiceId) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: choiceId }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleBackClick = () => {
    navigate('/Year');
  };

  const correctCount = questions.filter(
    q => answers[q.id] === q.correctChoiceId
  ).length;

  return (
    <div className="question-container">
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

      <div className="side-question">
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

        <main className="main-content with-shadow">
          <h1 className="page-title">
            {exam?.toUpperCase()} Exam - {stream} Stream ({semester} Semester) - {university}, {year}
          </h1>
          {questions.length === 0 ? (
            <p>Loading questions...</p>
          ) : (
            <>
              {questions.map((q, idx) => (
                <div key={q.id} className="question-block">
                  <h2 className="question-text">
                    {idx + 1}. {q.questionText}
                  </h2>
                  <ul className="choices">
                    {q.choices.map(c => (
                      <li
                        key={c.id}
                        className={`choice ${
                          submitted && c.id === q.correctChoiceId
                            ? 'correct'
                            : submitted && answers[q.id] === c.id
                            ? 'incorrect'
                            : answers[q.id] === c.id
                            ? 'selected'
                            : ''
                        }`}
                        onClick={() => handleChoiceSelect(q.id, c.id)}
                      >
                        <span className="custom-radio">
                          {answers[q.id] === c.id && (
                            <span className="checked-dot"></span>
                          )}
                        </span>
                        {c.text}
                      </li>
                    ))}
                  </ul>
                  {submitted && (
                    <p className="description">
                      {
                        q.choices.find(
                          c => c.id === q.correctChoiceId
                        )?.description
                      }
                    </p>
                  )}
                </div>
              ))}
              {!submitted ? (
                <div className="button-group">
                  <button onClick={handleSubmit} className="submit-btn">
                    Submit Answers
                  </button>
                  <button
                    onClick={() => {
                      const payload = {
                        score: correctCount,
                        total: questions.length,
                        answers,
                        stream,
                        semester,
                        university,
                        year,
                        exam
                      };
                      console.log("Saving score to backend...", payload);
                      alert("Score saved successfully!");
                    }}
                    className="save-btn"
                  >
                    Save Score
                  </button>
                </div>
              ) : (
                <div className="score">
                  You scored {correctCount} / {questions.length}
                </div>
              )}
            </>
          )}
        </main>
        <button onClick={handleBackClick} className="back-btn">
          ← Go Back
        </button>
      </div>
    </div>
  );
}
