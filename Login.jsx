import '../styles/login.css';
import logo from '../images/logo.jpg';
import { useState,useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';

export default function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://login-api.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setError(false);
        navigate('/Universities'); 
      } else {
        setError(true); 
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(true); 
    }
  };

    return(

        <div className='contiainerL'>
            <div className='LoginContainer'>
            <img src={logo} alt="" />
            <h1>Ethio-Freshman Exam</h1>
            <form onSubmit={handleLogin}>
                <div className='row'>
                    <input 
                        type="text" 
                        name="username" 
                        id="username" 
                        className={`txt ${error ? 'error-border' : ''}`}
                        placeholder=''
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    />

                    <label htmlFor="username">Username</label>
                </div>
                

                <br /> 

                <div className='row'>
                     <input 
                         type="password"
                         name='password'
                         id='password'
                         className={`txt ${error ? 'error-border' : ''}`}
                         autoComplete='off'
                         placeholder=''
                         value={password}
                         onChange={(e)=>setPassword(e.target.value)} 
                     />
                     <label htmlFor="username">Password</label>
                </div>
               
                <br />

                <button 
                  type='submit'
                  className='loginbtn'
                  style={{ backgroundColor:"black"}}
                  onClick={handleLogin} >
                    Login
                    
                </button>

            </form>
          
        {error && (
          <p style={{ color: 'red', marginTop: '10px' }}>
            Username or password is incorrect.
          </p>
        )}

            <p>Don't you have account?
                 <Link to="/Registration" style={{color:'#44E5B2'}}> Sign Up</Link>
             </p>

            <p className='trial'>Try free trial!</p>

            <p className='last'>For any issue <font style={{color: 'blue'}}>contact Us</font> at working hour.</p>
        </div>
        </div>
        
        

    );
}