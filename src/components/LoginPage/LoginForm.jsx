import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css'
import qs from 'qs';
import axiosInstance from '../../utils/axiosInstance';

const LoginForm = () => {
  const [animate, setAnimate] = useState(false);
  const [inputError, setInputError] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
  
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkAuthentication = async () => {
      const response = await axiosInstance.post('/login/token/verify/');
      if (response.data.valid) {
        navigate('/generateLetter');
      }
    };
    checkAuthentication();
  }, []);
  //Login Form Handler
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleInputChange = (event, setStateFn) => {
    setInputError(false);
    setStateFn(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!email || !password) {
      setInputError(true);
      return;
    }
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
      if(error.response && error.response.status == 403 || error.response && error.response.status == 429) {
        setInputError(true);
      }
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
            <form className='login-form' onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  placeholder='Email'
                  id='email'
                  value={email}
                  className={inputError ? 'login-field input-error' : 'login-field'}
                  onChange={(event) => handleInputChange(event, setEmail)}  
                />
                <input 
                  type="password" 
                  placeholder='Password' 
                  id='password'  
                  value={password}
                  className={inputError ? 'login-field input-error' : 'login-field'}
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