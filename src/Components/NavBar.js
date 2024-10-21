import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { useAuth } from '../AuthContext'; // Import useAuth to access auth context

function NavBar({ toggleForm, buttonLabel }) {
    const { currentUser, logout } = useAuth(); // Access current user and logout function

    const handleLogout = async () => {
        try {
            await logout();
            // Optionally, you can navigate to the login page after logout
            // navigate('/login'); // Uncomment this line if you want to redirect after logout
        } catch (error) {
            console.error('Logout failed:', error.message);
        }
    };

    return (
        <nav id='navBar'>
            <h1 id='heading1'>Grade<span style={{ color: 'pink' }}>Wise</span></h1>
            <button id='addbtn' onClick={toggleForm}>{buttonLabel}</button>
            <div id = 'authBtn'>
                {currentUser ? ( // Conditional rendering based on authentication state
                    <>
                        <button onClick={handleLogout}>Logout</button> {/* Logout button */}
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link> {/* Link to login page */}
                        <Link to="/signup">Signup</Link> {/* Link to signup page */}
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
