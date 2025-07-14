import React from 'react';
import './App.css';

import { useTranslation } from 'react-i18next';

const HeroSection = ({ onLoginClick }) => {

  const { t } = useTranslation();

  return (
    <main className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <div className="small-text">{t('welcome')}</div>
          <h1 dangerouslySetInnerHTML={{ __html: t('convert') }} />
          <p dangerouslySetInnerHTML={{ __html: t('description') }} />
          <div className="hero-buttons">
            <a href="#" className="primary-btn" onClick={(e) => {
              e.preventDefault();
              onLoginClick();
            }}>{t('tryfree')}</a>
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