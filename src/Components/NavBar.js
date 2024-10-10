import React from 'react';

function NavBar({toggleForm}){
    return(
        <nav id = 'navBar'>
            <h1 id = 'heading1'>Grade<span style = {{color: '#e1f013'}}>Wise</span></h1>
            <button id = 'addbtn' onClick={toggleForm}>Add Student</button>
        </nav>
    );
}

export default NavBar;
