// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence } from 'firebase/auth';
import app from './firebaseConfig';

const AuthContext = createContext(); // Create the AuthContext

// Provide authentication context to the app
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const auth = getAuth(app);

  // On mount, fetch user from localStorage and Firebase authentication
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setCurrentUser(JSON.parse(userData)); // Restore user state from localStorage
    }

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);  // Update the current user state
          setLoading(false); // Done loading once we know the auth state
          
          if (user) {
            localStorage.setItem('user', JSON.stringify(user)); // Store user in localStorage
          } else {
            localStorage.removeItem('user'); // Remove user from localStorage
          }
        });
        return unsubscribe; // Cleanup function to unsubscribe
      })
      .catch(error => {
        console.error("Failed to set persistence", error);
        setLoading(false); // Handle persistence error
      });
  }, [auth]);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    localStorage.removeItem('user'); // Clear user from localStorage on logout
    return signOut(auth);
  };

  // Expose currentUser, login, signup, logout, and loading
  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout, loading }}>
      {!loading && children} {/* Ensure children are rendered after loading */}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext values
export const useAuth = () => {
  return useContext(AuthContext);
};
