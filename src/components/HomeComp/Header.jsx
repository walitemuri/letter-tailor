import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './header.css';
import IMG from '../../../assets/hero.png';
import IMG2 from '../../../assets/GreenLines.png';

const Header = () => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    // Trigger animations after a short delay
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Function to handle the login button click
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="">
      <header className="header-animation">
        <h3>LetterTailor</h3>
        <nav>
          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Coming Soon</a>
          </div>
        </nav>
        <button className="primary-green-btn" onClick={handleLoginClick}>Login</button>
      </header>
      <article>
        <img
          className={`hero-img ${animate ? 'animate-hero-img' : ''}`}
          src={IMG}
        />
        <div
          className={`main-article-container ${
            animate ? 'animate-main-article-container' : ''
          }`}
        >
        <div className='green-layover'>
          <h1 className='main-title'>Create Compelling Cover Letters with <span>LetterTailor.</span></h1>
          <h4 className='subheading-title'>Supercharge your Job Search</h4>
        </div>
          <p>
            Empower your job search with LetterTailor - the key to unlocking internships and opportunities in diverse fields, from Mathematics and Science to Engineering, Business, Accounting, and Finance. Don't let your dream opportunity slip away!
          </p>
          <button id="signup" className="primary-green-btn">Sign Up Now</button>
        </div>
      </article>
    </div>
  );
};

export default Header;
