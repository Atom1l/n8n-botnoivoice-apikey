// Header.js
import React, { useState } from 'react';
import { useAuth } from './useAuth';
import { useLanguage } from './Languagecontext'; // ✅ เพิ่ม
import './App.css';


import { useTranslation } from 'react-i18next';

const Header = ({ onLoginClick, user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { logout } = useAuth();
  const { language, changeLanguage } = useLanguage(); // ✅ ใช้ context

  const { t } = useTranslation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setLangDropdownOpen(false);
    setUserDropdownOpen(false);
  };

  const toggleLangDropdown = () => {
    setLangDropdownOpen(!langDropdownOpen);
    setMenuOpen(false);
    setUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
    setMenuOpen(false);
    setLangDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUserDropdownOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleMenuItemClick = () => {
    setMenuOpen(false);
  };

  const handleSelectLang = (lang) => {
    changeLanguage(lang);
    setLangDropdownOpen(false);
  };

  const currentFlag = language === 'th' ? '/img/TH.svg' : '/img/EN.svg';
  const currentLabel = language.toUpperCase();

  return (
    <header className="header">
      <div className="header-left">
        <a href="#" className="logo">
          <img src="/img/botnoi_voice_n8n-logo.png" alt="Logo" />
        </a>

        <nav className={`nav-menu ${menuOpen ? 'show' : ''}`}>
          <ul>
            <li><a href="https://voice.botnoi.ai/marketplace/selectvoice" target="_blank" rel="noopener noreferrer" onClick={handleMenuItemClick}>{t('voicemarketplace')}</a></li>
            <li><a href="https://voice.botnoi.ai/tts/api-developer-v2" target="_blank" rel="noopener noreferrer" onClick={handleMenuItemClick}>{t('api')}</a></li>
            <li><a href="https://voice.botnoi.ai/payment/quote" target="_blank" rel="noopener noreferrer" onClick={handleMenuItemClick}>{t('pricing')} <span className="sale-badge">{t('sale')}</span></a></li>
            <li><a href="https://botnoigroup.com/th/teamprice" target="_blank" rel="noopener noreferrer" onClick={handleMenuItemClick}>{t('enterprisepricing')}</a></li>
            <li><a href="https://voice.botnoi.ai/" target="_blank" rel="noopener noreferrer" onClick={handleMenuItemClick}>{t('voicebot')}</a></li>

            {/* ✅ Mobile-only user/login block */}
            {user ? (
              <li className="mobile-auth">
                <div className="user-info">
                  <img src={user.photoURL} alt="Profile" className="user-avatar" />
                  <div className="user-details">
                    <span className="user-name">{user.displayName}</span>
                    <span className="user-uid">{user.uid}</span>
                  </div>
                </div>
                <button className="logout-btn" onClick={handleLogout}>{t('logout')}</button>
              </li>
            ) : (
              <div className='anon-auth'>
                <a className='anon-login' href="#" onClick={(e) => { e.preventDefault(); onLoginClick(); setMenuOpen(false); }}>{t('loginheader')}</a>
                <a className='anon-signup' href="#">{t('signup')}</a>
              </div>
            )}
          </ul>
        </nav>
      </div>

      <div className="header-right">
        {/* ✅ Language Selector */}
        <div className={`lang-dropdown ${langDropdownOpen ? 'active' : ''}`}>
          <div className="selected-lang" onClick={toggleLangDropdown}>
            <img src={currentFlag} alt={`${currentLabel} Flag`} />
            <span>{currentLabel}</span>
            <div className="arrow-down"></div>
          </div>
          <ul className={`lang-options ${langDropdownOpen ? 'show' : ''}`}>
            <li onClick={() => handleSelectLang('en')}>
              <img src="/img/EN.svg" alt="English Flag" /> <span>EN</span>
            </li>
            <li onClick={() => handleSelectLang('th')}>
              <img src="/img/TH.svg" alt="Thai Flag" /> <span>TH</span>
            </li>
          </ul>
        </div>

        {/* ✅ Desktop-only user/login block */}
        <div className="desktop-auth">
          {user ? (
            <div className={`user-info ${userDropdownOpen ? 'active' : ''}`} onClick={toggleUserDropdown}>
              <img src={user.photoURL} alt="Profile" className="user-avatar" />
              <div className="user-details">
                <span className="user-name">{user.displayName}</span>
                <span className="user-uid">{user.uid}</span>
              </div>
              <div className="dropdown-arrow"></div>
              <div className={`user-dropdown ${userDropdownOpen ? 'show' : ''}`}>
                <button className="logout-btn" onClick={handleLogout}>{t('logout')}</button>
              </div>
            </div>
          ) : (
            <>
              <a href="#" className="login-btn" onClick={(e) => {
                e.preventDefault();
                onLoginClick();
              }}>{t('loginheader')}</a>
              <a href="#" className="signup-btn" onClick={(e) => {
                e.preventDefault();
                onLoginClick();
              }}>{t('signup')}</a>
            </>
          )}
        </div>

        <div className="hamburger-menu" onClick={toggleMenu}>
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
