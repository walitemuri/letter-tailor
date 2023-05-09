import React, { useState, useEffect } from 'react';
import './GenerateLetter.css';
import './GenerateLetterAnimations.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const GenerateLetter = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();

  const typeNextCharacter = () => {
    setCurrentWord((prevWord) => prevWord + displayText[counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    if (displayText !== "" && counter < displayText.length) {
      const timer = setTimeout(typeNextCharacter, 20);
      return () => clearTimeout(timer);
    }
  }, [counter, displayText]);
  

  const [formData, setFormData] = useState({
    data: {job_description: "",
    sending_address: "",
    recieve_address: "",},
    gpt_request: {},
  });

  const signOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      data: {
        ...prevFormData.data,
        [event.target.name]: event.target.value,
      },
    }));
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisplayText("");
    setIsLoading(true);
  
    try {
      const response = await axiosInstance.post("http://localhost:8000/generate", formData);
      console.log(response.data.response.text);
      setDisplayText(response.data.response.text);
      setCurrentWord("");
      setCounter(0);
    } catch (e) {
      console.error("Error submitting form: ", e);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="rootContainer">
      <header className="header-animation">
        <h3>LetterTailor</h3>
        <nav>
          <div className="nav-links">
            <a href="/upload">Upload Resume</a>
            <a href="/">Account</a>
            <a href="#">About</a>
          </div>
        </nav>
        <button onClick={signOut} className="primary-green-btn">
          Sign Out
        </button>
      </header>
      <div className="main-container">
        <div className="typing98-animation output-container slide-in-right">
        {currentWord.split('').map((char, index) => (
          <span key={index} style={{ animationDelay: `${index / 9000}ms` }}>{char === '\n' ? <br /> : char}</span>
        ))}
        </div>
        <div className="information-container slide-in-left">
          <div className="generate-container">
            <button disabled={isLoading} onClick={handleSubmit} className="primary-green-btn generate">Generate</button>
          </div>
          <h3 className="info-title">Enter Your Information</h3>
          <h5>Generate Your Letter</h5>
          <form className="form-">
            <div className="address-container">
            <textarea
              name="sending_address"
              onChange={handleChange}
              placeholder="Enter Address"
              className="address"
            ></textarea>
            <textarea
              name="recieve_address"
              onChange={handleChange}
              placeholder="Enter Receiving Address"
              className="address"
            ></textarea>
          </div>
          <textarea
            name="job_description"
            onChange={handleChange}
            placeholder="Job Description"
            className="job-desc"
            id=""
          ></textarea>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GenerateLetter;
