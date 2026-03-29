import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DisplayStatus from './DisplayStatus';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    if (statusType === 'success') {
      const timer = setTimeout(() => {
        navigate('/flavors');
      }, 2000);
      return () => clearTimeout(timer); 
    }
  }, [statusType, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      setStatusType("error");
      return;
    }

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();

      const userFound = users.find(u => 
        u.username === username && u.email === password
      );

      if (userFound) {
        setMessage("Login successful");
        setStatusType("success");
      } else {
        setMessage("Invalid username or password.");
        setStatusType("error");
      }
    } catch (error) {
      setMessage("An error occurred during login.");
      setStatusType("error");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username  </label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <br/>
        <div>
          <label>Password  </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
        <p style={{ cursor: 'pointer', textDecoration: 'underline' }}>Forgot password?</p>
      </form>
      {message && <DisplayStatus type={statusType} message={message} />}
    </div>
  );
}

export default LoginForm;