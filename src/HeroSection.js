import React from 'react';
import './App.css';


const HeroSection = ({ onLoginClick }) => {

  return (
    <main className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <div className="small-text">Welcome to BOTNOI VOICE N8N</div>
          <h1>Convert Text to Speech with N8N</h1>
          <p>Easily generate realistic voices for every step in your automation process with our n8n node. Choose from over <strong>300 voices</strong> and <strong>10+ languages</strong>. Perfect for voiceovers, ads, educational content, podcasts, articles, lifestyle media, or audiobooks. Easy to use, and generate lifelike voices anytime, anywhere.</p>
          <div className="hero-buttons">
            <a href="#" className="primary-btn" onClick={(e) => {
              e.preventDefault();
              onLoginClick();
            }}>Try for Free</a>
          </div>
        </div>
        <div className="hero-image">
          <img src="/img/example.png" alt="V VOICE Logo with Robot" className="bot-character" />
        </div>
      </div>
    </main>
  );
};

export default HeroSection;