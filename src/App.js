import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AddStudents from './Components/AddStudents';
import StudentDash from './Components/StudentDash';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ForgotPassword from './Components/ForgotPassword'; 
import { AuthProvider, useAuth } from './AuthContext';
import './App.css';

function App() {
    return (
        <AuthProvider> {/* Wrapping with AuthProvider for authentication context */}
            <Router>
                <div>
                    <main>
                        <Routes>
                            {/* redirect to the login page by default */}
                            <Route path="/" element={<Navigate to="/login" />} />

                             {/* Auth routes */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />

                            {/* dashboard route */}
                            <Route path="/dashboard" element={<DashboardRoute />} />

                            {/* redirect any other paths to login */}
                            <Route path="*" element={<Navigate to="/login" />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

// function to redirect to dashboard page if user is logged in
function DashboardRoute() {
    const { currentUser, loading } = useAuth();
    if (loading) {
        return <div>Loading...</div>;
    }
    return currentUser ? <Dashboard /> : <Navigate to="/login" />;
}

// function to display the dashboard as well as add student form 
function Dashboard() {
    return (
        <>
            <AddStudents /> 
            <StudentDash /> 
        </>
    );
}

// function for footer
function Footer() {
    return (
        <footer id="footer">
            <p>© {new Date().getFullYear()} GradeWise. All rights reserved.</p>
        </footer>
    );
}

export default App;
