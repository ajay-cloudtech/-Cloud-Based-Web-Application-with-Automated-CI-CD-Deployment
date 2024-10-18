import React, { useState } from 'react'; 
import NavBar from './NavBar';
import StudentForm from './StudentForm';

function AddStudents() {
    const [isFormVisible, setIsFormVisible] = useState(false); // Track form visibility

    function toggleForm() {
        setIsFormVisible(prevState => !prevState); // Toggle form visibility
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
