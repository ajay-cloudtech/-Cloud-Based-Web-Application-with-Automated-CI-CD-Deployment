import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AddStudents from './Components/AddStudents';
import StudentDash from './Components/StudentDash';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ForgotPassword from './Components/ForgotPassword'; // Import ForgotPassword
import { AuthProvider, useAuth } from './AuthContext';
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
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/dashboard" element={<DashboardRoute />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

function DashboardRoute() {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return currentUser ? <Dashboard /> : <Navigate to="/login" />;
}

function Dashboard() {
    return (
        <>
            <AddStudents /> {/* Render AddStudents for toggling the form */}
            <StudentDash /> {/* Render the Student Dashboard */}
        </>
    );
}

function Footer() {
    return (
        <footer id="footer">
            <p>© {new Date().getFullYear()} GradeWise. All rights reserved.</p>
        </footer>
    );
}

export default App;
