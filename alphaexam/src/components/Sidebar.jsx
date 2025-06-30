import logo from'../images/logo.jpg';
import '../styles/sidebar.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Sidebar(){
    const navigate = useNavigate();
    const handleLogoutClick = () => {
    navigate('/Login'); 
    };

     const handleQuestionClick = () => {
    navigate('/Universities'); 
    };
      const  handleDashboardClick = () => {
    navigate('/Dashboard'); 
    };
  
    return(
        
        <div className="containerS">
            <img src={logo} className="logo" alt="Logo" /> <br />
            
            <div className="sidebar-container">
                <h2>Ethio-Freshman Exam</h2>
                <button 
                     className='btns'
                     onClick={handleDashboardClick}
                
                >Dashboard</button> <br />
                <button 
                     className='btns'
                      onClick={handleQuestionClick}
                >
                    Questions
                </button> 

                <br /> 

                <button
                     onClick={handleLogoutClick}
                     className='logout'
                >
                        Logout
                </button> <br />
                        <p className='foot'>
                             <Link to="/ForgotPassword" style={{color:'#44E5B2'}}>Forgot password </Link>
                        </p>
                        <p> Feedback </p>
                       
                <p className="last">
                   For any issue <span style={{ color: 'blue' }}>contact Us</span> at working hour.
                </p>
            </div>
        </div>
    );
}