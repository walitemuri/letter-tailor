import React, { useState, useEffect } from 'react';
import './GenerateLetter.css';
import './GenerateLetterAnimations.css';
import { useNavigate } from 'react-router-dom';

const GenerateLetter = () => {
  const displayText = "lorm ipsum do  lorem do lorem dim an";
  const [currentWord, setCurrentWord] = useState("");
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();

  const typeNextCharacter = () => {
    setCurrentWord((prevWord) => prevWord + displayText[counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    if (counter < displayText.length) {
      const timer = setTimeout(typeNextCharacter, 100);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  const signOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };


  return (
    <div className='rootContainer'>
      <header className="header-animation">
        <h3>LetterTailor</h3>
        <nav>
          <div className="nav-links">
            <a href="#">Upload Resume</a>
            <a href="/">Account</a>
            <a href="#">About</a>
          </div>
        </nav>
        <button onClick={signOut} className="primary-green-btn">Sign Out</button>
      </header>
      <div className="main-container">
        <div className="typing-animation output-container slide-in-right">
          {currentWord}
        </div>
        <div className="information-container slide-in-left">
          <div className="generate-container">
            <button className='primary-green-btn generate'>Generate</button>
          </div>
          <h3 className='info-title'>Enter Your Information</h3>
          <h5>Generate Your Letter</h5>
          <form class="form-" action="">
            <div className="address-container">
              <textarea placeholder="Enter Address" className='address'></textarea>
              <textarea placeholder="Enter Recieveing Address" className='address'></textarea>
            </div>
            <textarea placeholder='Job Description' className='job-desc' name="Job Description" id=""></textarea>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GenerateLetter;
