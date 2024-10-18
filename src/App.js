import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
import AddStudents from './Components/AddStudents';
import StudentDash from './Components/StudentDash';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { AuthProvider, useAuth } from './AuthContext'; // Use the updated AuthContext
import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <main>
                        <Routes>
                            <Route path="/" element={<Navigate to="/login" />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
}

// PrivateRoute checks if the user is authenticated before allowing access to a protected route
function PrivateRoute({ children }) {
  const { currentUser, loading } = useAuth();

  console.log("Current User:", currentUser); // Log to check current user
  console.log("Loading state:", loading);    // Log loading state

  if (loading) {
      return <div>Loading...</div>;
  }

  return currentUser ? children : <Navigate to="/login" />;
}

function Dashboard() {
    return (
        <>
            <AddStudents />
            <StudentDash />
        </>
    );
}

export default App;
