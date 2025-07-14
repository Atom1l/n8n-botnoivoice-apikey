// LoginModal.js
import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Loader2 } from 'lucide-react';
import { useAuth } from './useAuth'; // <- เปลี่ยน path ตามของคุณ
import { useNavigate } from 'react-router-dom'; // 👈 เพิ่ม

import { useTranslation } from 'react-i18next';


const LoginModal = ({ isOpen, onClose }) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { signInWithGoogle, loading, error } = useAuth();
  const navigate = useNavigate(); // 👈 เพิ่ม

  const { t } = useTranslation();

  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn(true);
      await signInWithGoogle(navigate); // 👈 ส่ง navigate เข้าไป
      console.log('✅ Sign in success');
      onClose(); // ปิด modal หลังล็อกอินสำเร็จ
    } catch (error) {
      console.error('❌ Sign in failed:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>{t('loginheader')}</h2>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading || isSigningIn}
          className="login-option google-option"
        >
          {isSigningIn ? (
            <Loader2 className="animate-spin" style={{ width: '1.2rem', height: '1.2rem' }} />
          ) : (
            <>
              <span className="login-google">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                {t('login')}
              </span>
            </>
          )}
        </button>

        {error && <p className="error-text" style={{ color: 'red' }}>{t('loginfailed')}</p>}

        <p className="terms-text">
          {t('terms1')} {' '}
          <a href="https://your-terms-url" target="_blank" rel="noopener noreferrer">
            {t('terms2')}
          </a>{' '}
          {t('and')}{' '}
          <a href="https://your-privacy-url" target="_blank" rel="noopener noreferrer">
            {t('privacy')}
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
