// AuthContext.js
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail // Import and rename the function
} from 'firebase/auth';
import app from './firebaseConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);
          setLoading(false);
          
          if (user) {
            localStorage.setItem('user', JSON.stringify(user)); 
          } else {
            localStorage.removeItem('user'); 
          }
        });
        return unsubscribe;
      })
      .catch(error => {
        console.error("Failed to set persistence", error);
        setLoading(false);
      });
  }, [auth]);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    localStorage.removeItem('user');
    return signOut(auth);
  };

  // Define and export the sendPasswordResetEmail function
  const sendPasswordResetEmail = (email) => {
    return firebaseSendPasswordResetEmail(auth, email);
  };

   // Memoize the value object to prevent unnecessary re-renders
   const value = useMemo(() => ({
    currentUser,
    signup,
    login,
    logout,
    sendPasswordResetEmail,
    loading,
  }), [currentUser, signup, login, logout, sendPasswordResetEmail, loading]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
