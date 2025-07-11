import { useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async (navigate) => {
    setAuthLoading(true);
    setError(null);
    console.log('🔔 signInWithGoogle started');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('✅ UserCredential:', result);
      setUser(result.user);

      const { uid, displayName, photoURL } = result.user;
      console.log('👤 uid:', uid);
      console.log('👤 displayName:', displayName);
      console.log('👤 photoURL:', photoURL);

      const response = await fetch(`https://api-voice.botnoi.ai/db/dashboard/get_token?user_id=${uid}`);
      if (!response.ok) {
        throw new Error('Failed to fetch apikey');
      }
      const data = await response.json();
      console.log('🔑 apikey:', data);

      // 👉 ไปหน้า /apikey แล้วส่ง apikey ด้วย state
      navigate('/apikey', { state: { apikey: data.token } });

      return result.user;
    } catch (error) {
      console.error('❌ Google login error:', error);
      setError(error.message || 'Login failed');
      throw error;
    } finally {
      setAuthLoading(false);
      console.log('🔔 signInWithGoogle finished');
    }
  };


  const logout = async () => {
    setAuthLoading(true);
    setError(null);
    try {
      await signOut(auth);
      setUser(null);
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout error:', error);
      setError(error.message || 'Logout failed');
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  return {
    user,
    loading,
    authLoading: authLoading,
    error,
    signInWithGoogle,
    logout
  };
};
