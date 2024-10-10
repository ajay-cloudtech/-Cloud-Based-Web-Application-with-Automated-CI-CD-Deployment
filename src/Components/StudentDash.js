import React, { useEffect, useState } from 'react';

//const [<state variable>, <state update function>] = useState(<initial value>);

function StudentDash(){
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/students');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStudents(data); 
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };
        fetchStudents(); 
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            try {
                const response = await fetch(`http://localhost:5000/api/students/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Student deleted successfully!');
                    setStudents(students.filter(student => student._id !== id)); // Update local state
                } else {
                    alert('Failed to delete student.');
                }
            } catch (error) {
                console.error('Error deleting student:', error);
                alert('Error connecting to the server.');
            }
        }
    };

    const handleEdit = (student) => {
        const newFirstName = prompt("Edit First Name:", student.firstName);
        const newLastName = prompt("Edit Last Name:", student.lastName);
        const newCourseName = prompt("Edit Course Name:", student.courseName);
        const newSemesterName = prompt("Edit Semester Name:", student.semesterName);
        const newYearNumber = prompt("Edit Year:", student.yearNumber);
        const newGrade = prompt("Edit Grade:", student.grade);

        const updatedStudent = {
            ...student,
            firstName: newFirstName,
            lastName: newLastName,
            courseName: newCourseName,
            semesterName: newSemesterName,
            yearNumber: newYearNumber,
            grade: newGrade,
        };

        handleUpdate(student._id, updatedStudent);
    };

    const handleUpdate = async (id, updatedStudent) => {
        console.log("Updating student ID:", id);  // Log the student ID
        console.log("Updated data:", updatedStudent);  // Log the updated data
        const { _id, ...dataToUpdate } = updatedStudent;  // Exclude _id from the updated data
        try {
            const response = await fetch(`http://localhost:5000/api/students/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToUpdate),  // Pass dataToUpdate, not updatedStudent
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update student.');
            }
            alert('Student updated successfully!');
            setStudents(students.map(student => student._id === id ? { ...student, ...dataToUpdate } : student));
        } catch (error) {
            console.error('Error updating student:', error);
            alert('Error connecting to the server.' + error.message);
        }
    };

    return (
        <div id='dashboard'>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Course Name</th>
                        <th>Semester</th>
                        <th>Year</th>
                        <th>Grade</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {students
                    .filter(student => student.firstName && student.lastName)
                    .map(function(student){
                        return(
                        <tr key={student._id}>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.courseName}</td>
                            <td>{student.semesterName}</td>
                            <td>{student.yearNumber}</td>
                            <td>{student.grade}</td>
                            <td>
                                <button id = 'editBtn' onClick={() => handleEdit(student)}><i className="fas fa-edit"></i></button>
                            </td>
                            <td>
                                <button id = 'delBtn' onClick={() => handleDelete(student._id)}><i className="fas fa-trash"></i></button>
                            </td>
                        </tr>);
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default StudentDash;