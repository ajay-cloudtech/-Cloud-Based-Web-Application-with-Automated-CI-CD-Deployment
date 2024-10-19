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
                            <Route path="/dashboard" element={<DashboardRoute />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
}

// PrivateRoute checks if the user is authenticated before allowing access to a protected route
function DashboardRoute() {
    const { currentUser, loading } = useAuth();
  
    if (loading) {
        return <div>Loading...</div>;
    }
  
    // If user is authenticated, render the dashboard directly
    return currentUser ? <Dashboard /> : <Navigate to="/login" />;
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
