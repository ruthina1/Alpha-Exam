import Header from "./Header";
import Sidebar from "./Sidebar";
import "../styles/year.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Year() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // These come from Registration
  const selectedUniversity = location.state?.selectedUniversity || "Unknown University";
  const selectedStream = location.state?.selectedStream || "Unknown Stream";
  const selectedSemester = location.state?.selectedSemester || "Unknown Semester";

  const handleBackClick = () => {
    navigate("/Universities");
  };

  // When user clicks a year, navigate to the right component
  const handleYearClick = (year) => {
    let targetPath = "";

    if (selectedStream === "Natural" && selectedSemester === "First") {
      targetPath = "/NaturalFirst";
    } else if (selectedStream === "Natural" && selectedSemester === "Second") {
      targetPath = "/NaturalSecond";
    } else if (selectedStream === "Social" && selectedSemester === "First") {
      targetPath = "/SocialFirst";
    } else if (selectedStream === "Social" && selectedSemester === "Second") {
      targetPath = "/SocialSecond";
    } else {
      alert("Invalid stream/semester selection.");
      return;
    }

    navigate(targetPath, {
      state: {
        selectedUniversity,
        selectedStream,
        selectedSemester,
        selectedYear: year
      }
    });
  };

  return (
    <div className="year-container">
      <div className={`sidebar-container-wrapper ${sidebarOpen ? "open" : ""}`}>
        <Sidebar />
        <button
          className="close-btn"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          ×
        </button>
      </div>

      <div className="side-year">
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
            src={require("../images/logo.jpg")}
            alt="Logo"
            className="logo2"
          />
        </div>

        <Header />

        <h1 className="page-title">Select Year</h1>
        <h2 style={{ marginTop: "10px" }}>
          {selectedUniversity} University
        </h2>
        <p style={{ marginTop: "5px", fontSize: "14px", color: "#555" }}>
          Stream: {selectedStream} | Semester: {selectedSemester}
        </p>

        <div className="year">
          {["2012", "2013", "2014", "2015", "2016", "2017"].map((year) => (
            <button
              key={year}
              onClick={() => handleYearClick(year)}
            >
              {year}
            </button>
          ))}
        </div>

        <button className="back-btn" onClick={handleBackClick}>
          ← back
        </button>
      </div>
    </div>
  );
}
