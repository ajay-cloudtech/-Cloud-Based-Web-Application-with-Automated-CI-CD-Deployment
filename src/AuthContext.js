import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
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

// create context for authentication state
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    // set the persistence on local storage in browser
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        //subscribe to changes in auth state
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);
          setLoading(false);
          //save user in local storage
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

  // function to signup 
  const signup = useCallback((email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }, [auth]);

  // function to login
  const login = useCallback((email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }, [auth]);

  // function to log out
  const logout = useCallback(() => {
    localStorage.removeItem('user'); // clear local storage
    return signOut(auth);
  }, [auth]);

  // function to send password reset email
  const sendPasswordResetEmail = useCallback((email) => {
    return firebaseSendPasswordResetEmail(auth, email);
  }, [auth]);

  // store the value object to avoid unwanted re renders.
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

// hook for auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
