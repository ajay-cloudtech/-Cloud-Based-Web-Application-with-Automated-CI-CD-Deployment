import React from 'react';
import { Link } from 'react-router-dom';  // import link for navigation
import { useAuth } from '../AuthContext'; 

// function for Nav bar
function NavBar({ toggleForm, buttonLabel }) {
    const { currentUser, logout } = useAuth(); 

    // handler function for logout button click
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error.message);
        }
    };

    return (
        //html component for nav bar
        <nav id='navBar'>
            <h1 id='heading1'>GradeWise📚</h1>
            <button id={buttonLabel === 'Cancel' ? 'cancelbtn' : 'addbtn'}  onClick={toggleForm}>{buttonLabel}</button>
            <div id = 'authBtn'>
                {currentUser ? ( // conditional rendering based on auth state
                    <>
                        <button 
                            id = 'logBtn'
                            onClick={handleLogout}>Logout</button> 
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link> 
                        <Link to="/signup">Signup</Link> 
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
