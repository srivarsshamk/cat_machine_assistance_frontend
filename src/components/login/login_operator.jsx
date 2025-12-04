import React, { useState } from 'react';
import './login.css';
import LetterGlitch from './LetterGlitch';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = () => {
    console.log('Login submitted:', { email, password, role });
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>
      
      <div className="login-right">
        <div className="login-box">
          <div className="logo">CATERPILLAR®</div>
          
          <h1 className="welcome-text">Welcome back</h1>
          
          <div className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="role">Select Role</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="form-input form-select"
              >
                <option value="">Select a role</option>
                <option value="spotter">Spotter</option>
                <option value="operator">Operator</option>
              </select>
            </div>
            
            <button onClick={handleSubmit} className="login-button">
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;