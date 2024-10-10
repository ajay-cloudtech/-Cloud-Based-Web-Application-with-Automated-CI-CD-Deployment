import React from 'react'; 
import NavBar from './NavBar';
import StudentForm from './StudentForm';

function AddStudents(){
    
    function toggleForm(){
        
        const form = document.getElementById('studentFormWrapper');
        if (form.style.display === 'none' || form.style.display === ''){
            form.style.display = 'block'; //show the form
        }else{
            form.style.display = 'none'; //hide the form
        }
    }
    function hideForm() {
        const form = document.getElementById('studentFormWrapper');
        form.style.display = 'none'; // hide the form
    }
    return(
        <div>
            <NavBar toggleForm={toggleForm} />
            <div id='studentFormWrapper' style={{display: 'none' }}>
            <StudentForm onSubmit={hideForm} />
            </div>
        </div>
    );
}

export default AddStudents;