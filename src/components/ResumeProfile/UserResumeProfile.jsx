import React, { useState, useEffect, useRef } from 'react';
import './UserResumeProfile.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { Document, Page } from 'react-pdf';

// import * as pdfjs from 'pdfjs-dist';


// Set the workerSrc for pdfjs

const UserResumeProfile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [animationClass, setAnimationClass] = useState('');
  const [resumeData, setResumeData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1)
  const formRef = useRef(null);
  

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this file?");
    if (confirmed) {
      try {
        await axiosInstance.delete('http://localhost:8000/resume');
        setResumeData(null);
      } catch (error) {
        console.error('Error deleting file', error);
      }
    }
  };


  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:8000/resume');
        setResumeData(response.data.resume_file);
      } catch (error) {
        console.log('Error fetching resume: ' + error);
      }
    };
    fetchResume();
  }, []);

  useEffect(() => {
    setAnimationClass('fade-in');
  }, []);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (selectedFile === null) {
        alert('Please select a file');
        return;
      }
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await axiosInstance.post('http://localhost:8000/resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
  
      // Convert the uploaded file to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result.split(',')[1];
        setResumeData(base64data);
      };
      reader.readAsDataURL(selectedFile);
  
      // Reset the form
      formRef.current.reset();
      setSelectedFile(null);
  
    } catch (error) {
      alert('Error uploading file: remember users are only allowed one file upload at a time.');
      console.error('Error uploading file', error);
    }
  };
  
  
  
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <header className="header-animation upload-header">
        <h3>LetterTailor</h3>
        <nav>
          <div className="nav-links">
            <a href="/generateLetter">Generate Letter</a>
            <a href="/">Account</a>
            <a href="#">About</a>
          </div>
        </nav>
        <button onClick={signOut} className="primary-green-btn">
          Sign Out
        </button>
      </header>
      <div className="main2-container">
        <div className="user-upload-container">
        <div className={`upload-form ${animationClass}`}>
            <div className="card-header">
              <h3 id="UploadHeader">Upload Your Qualifications</h3>
              <h5>Tell Us About Yourself</h5>
            </div>
            <form className="file-form" onSubmit={handleFormSubmit} ref={formRef}>
              <input
                className="input-upload"
                type="file"
                name="file"
                id="file"
                onChange={handleFileInputChange}
              />
              <input className="upload-button" type="submit" value="Upload File" />
            </form>
            <p className="instructions">
              Submit your qualifications, projects, and work experience in any format—resume, CV, or list—and let our
              advanced GPT-3 Engine integrated service craft a standout cover letter. Highlight your accomplishments
              with a tailored, persuasive letter created by AI."
            </p>
            <p className="note">
              Note: The file must be a PDF, the contents inside can be in whatever format you like.
        </p>
      </div>
    </div>
    {resumeData && (
        <div className={`user-resume-container ${animationClass}`}>
          <div className="file-container">
            <iframe
              src={`data:application/pdf;base64,${resumeData}`}
              style={{ width: "100%", height: "100%", border: "none", boxShadow: "none" }}
            ></iframe>
          </div>
          <button onClick={handleDelete} className="redbtn">Delete</button>
        </div>
      )}
  </div>
</div>
);
};

export default UserResumeProfile;