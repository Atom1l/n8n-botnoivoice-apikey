import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';
import './App.css';

const ApiKeySection = () => {
  const location = useLocation();
  const { user } = useAuth();

  // รับ apikey จาก location state (ถ้ามี)
  const apiKeyFromLogin = location.state?.apikey || '';

  const [apiKey, setApiKey] = useState(apiKeyFromLogin);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ฟังก์ชันดึง apikey จาก API
  const fetchApiKey = async (uid) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api-voice.botnoi.ai/db/dashboard/reset_token?user_id=${uid}`); 
      if (!response.ok) {
        throw new Error('Failed to fetch apikey');
      }
      const data = await response.json();
      if (data?.data?.token) {
        setApiKey(data.data.token);
      } else {
        throw new Error('API key not found in response');
      }
    } catch (err) {
      setError(err.message);
      setApiKey('');
    } finally {
      setLoading(false);
    }
  };

  // โหลด apikey เมื่อ user เข้ามา และถ้า location.state ไม่มี apikey
  useEffect(() => {
    if (user && !apiKeyFromLogin) {
      fetchApiKey(user.uid);
    }
  }, [user, apiKeyFromLogin]);

  const copyApiKey = () => {
    if (!apiKey) return;
    navigator.clipboard.writeText(apiKey)
      .then(() => {
        setShowCopyMessage(true);
        setTimeout(() => setShowCopyMessage(false), 2000);
      })
      .catch(() => {
        // fallback copy
        const textArea = document.createElement('textarea');
        textArea.value = apiKey;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          setShowCopyMessage(true);
          setTimeout(() => setShowCopyMessage(false), 2000);
        } catch {
          // ไม่สามารถ copy ได้
        }
        document.body.removeChild(textArea);
      });
  };

  const refreshApiKey = () => {
    // ตัวอย่างสร้างคีย์ใหม่ (ในโปรเจกต์จริง ควรเรียก API backend)
    const newKey = "sk_" + Math.random().toString(36).substring(2, 32) + Math.random().toString(36).substring(2, 10);
    setApiKey(newKey);
    alert('New API Key generated! (ในแอปจริง ควรเรียก API Backend)');
  };

  if (loading) return <p>Loading API Key...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <main className="api-key-container">
      <div className="api-key-card">
        <h2>Your API Keys</h2>
        <p>You can use the API Keys to generate voices as needed at <a href="#" className="api-docs-link">API Documentation</a></p>
        <div className="api-key-box">
          <input 
            type="text" 
            id="apiKeyInput" 
            value={apiKey} 
            readOnly
          />
          <button 
            className="icon-button" 
            id="refreshApiKeyBtn" 
            aria-label="Refresh API Key"
            onClick={refreshApiKey}
          >
            <i className="fas fa-sync-alt"></i>
          </button>
          <button 
            className="icon-button" 
            id="copyApiKeyBtn" 
            aria-label="Copy API Key"
            onClick={copyApiKey}
          >
            <i className="fas fa-copy"></i>
          </button>
        </div>
        <span className={`copy-message ${showCopyMessage ? 'show' : ''}`} id="copyMessage">
          Copied!
        </span>
      </div>
    </main>
  );
};

export default ApiKeySection;
