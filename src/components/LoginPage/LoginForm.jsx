import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css'
import qs from 'qs';

const LoginForm = () => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
  
    return () => clearTimeout(timer);
  }, []);

  //Login Form Handler
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event, setStateFn) => {
    setStateFn(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const requestBody = qs.stringify({
        username: email,
        password: password,
        grant_type: "password",
      });

      const response = await axios.post(
        "http://0.0.0.0:8000/login",
        requestBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(response.data);
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      navigate("/generateLetter");
  } catch (error) {
      console.error("Login Error:", error.response);
    }
  };

  return (
    <div>
        <div className={`form-container ${animate ? 'appear' : ''}`}>
            <div className="heading">
                <h4>Login</h4>
                <a className='login-anchors' href="#">I dont have an account</a>
            </div>
            <form onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  placeholder='Email'
                  id='email'
                  value={email}
                  onChange={(event) => handleInputChange(event, setEmail)}  
                />
                <input 
                  type="password" 
                  placeholder='Password' 
                  id='password'  
                  value={password}
                  onChange={(event) => handleInputChange(event, setPassword)}
                />
                <button type="submit" id="login-btn">Login</button>
            </form>
            <a className='login-anchors' href="#">Forgot Password?</a>
        </div>
    </div>
  )
}

export default LoginForm