import logo from '../images/logo.jpg';
import '../styles/thankyou.css';
import { Link, useNavigate  } from 'react-router-dom';

export default function Thankyou(){
    return(
        <div className="containerT">
            <div className='thankyou-container'>
                <img src={logo} alt="" />
                <h1>Thank You!</h1>
                <p>Account will be active after 24 Hours.</p>
                 <Link to="/Login" style={{color:'#44E5B2'}}> Login </Link>
                
            </div>
            <p className="last">
                   For any issue <span style={{ color: 'blue' }}>contact Us</span> at working hour.
                </p>
            
        </div>
        
    );
}