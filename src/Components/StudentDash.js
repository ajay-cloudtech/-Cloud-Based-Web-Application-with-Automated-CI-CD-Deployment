import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function StudentDash() {
    const [students, setStudents] = useState([]);
    const [editStudentId, setEditStudentId] = useState(null);  // Track the student being edited
    const [tempStudentData, setTempStudentData] = useState({}); // Store temporary student data during edit

    // Example options for dropdown fields (same as your form)
    const courseOptions = ['Cloud Computing', 'Data Analytics', 'Machine Learning'];
    const semesterOptions = ['1', '2', '3'];
    const yearOptions = ['2024', '2025', '2026'];
    const gradeOptions = ['A', 'B', 'C', 'D', 'E'];

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://3.250.99.241:5000/api/students');
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
                const response = await fetch(`http://3.250.99.241:5000/api/students/${id}`, {
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

    const handleEditClick = (student) => {
        setEditStudentId(student._id);
        setTempStudentData(student);  // Initialize temp data with the current student's details
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempStudentData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = (id) => {
        handleUpdate(id, tempStudentData);
        setEditStudentId(null);  // Exit edit mode
    };

    const handleUpdate = async (id, updatedStudent) => {
        const { _id, ...dataToUpdate } = updatedStudent;  // Exclude _id from the updated data
        try {
            const response = await fetch(`http://3.250.99.241:5000/api/students/${id}`, {
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
                        <th>Course</th>
                        <th>Semester</th>
                        <th>Year</th>
                        <th>Grade</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student._id}>
                            <td>
                                {editStudentId === student._id ? (
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={tempStudentData.firstName}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    student.firstName
                                )}
                            </td>
                            <td>
                                {editStudentId === student._id ? (
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={tempStudentData.lastName}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    student.lastName
                                )}
                            </td>
                            <td>
                                {editStudentId === student._id ? (
                                    <select
                                        name="courseName"
                                        value={tempStudentData.courseName}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select a course</option>
                                        {courseOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    student.courseName
                                )}
                            </td>
                            <td>
                                {editStudentId === student._id ? (
                                    <select
                                        name="semesterName"
                                        value={tempStudentData.semesterName}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select semester</option>
                                        {semesterOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    student.semesterName
                                )}
                            </td>
                            <td>
                                {editStudentId === student._id ? (
                                    <select
                                        name="yearNumber"
                                        value={tempStudentData.yearNumber}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select year</option>
                                        {yearOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    student.yearNumber
                                )}
                            </td>
                            <td>
                                {editStudentId === student._id ? (
                                    <select
                                        name="grade"
                                        value={tempStudentData.grade}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select grade</option>
                                        {gradeOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    student.grade
                                )}
                            </td>
                            <td>
                                {editStudentId === student._id ? (
                                    <>
                                        <button onClick={() => handleSave(student._id)}>Save</button>
                                        <button onClick={() => setEditStudentId(null)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button id='editBtn' onClick={() => handleEditClick(student)}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button id='delBtn' onClick={() => handleDelete(student._id)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentDash;
