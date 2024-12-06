import React, { useState } from 'react'; 
import NavBar from './NavBar';
import StudentForm from './StudentForm';

// function to manage form visibility as well as add and cancel buttons on Nav bar
function AddStudents() {
    const [isFormVisible, setIsFormVisible] = useState(false); 

    function toggleForm() {
        setIsFormVisible(prevState => !prevState); // toggle form visibility
    }

    function hideForm() {
        setIsFormVisible(false); // hide the form
    }

    return (
        <div>
            <NavBar toggleForm={toggleForm} buttonLabel={isFormVisible ? 'Cancel' : 'Add Student'} />
            <div id='studentFormWrapper' style={{ display: isFormVisible ? 'block' : 'none' }}>
                <StudentForm onSubmit={hideForm} />
            </div>
        </div>
    );
}

export default AddStudents;
