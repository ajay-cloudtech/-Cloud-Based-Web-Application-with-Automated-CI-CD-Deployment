import React from 'react';
import AddStudents from './Components/AddStudents';
import StudentDash from './Components/StudentDash';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App(){
  return (
    <div style = {{height: '100%'}}>
      <AddStudents /> 
      <StudentDash />
    </div>
  );
}
export default App; // Exporting app component for use in other parts of gradewise-app
