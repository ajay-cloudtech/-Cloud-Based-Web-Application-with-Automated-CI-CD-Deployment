import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import GradeCategories from './GradeCategories';

// function for student dashboard
function StudentDash() {
    const [students, setStudents] = useState([]); // students list
    const [counts, setCounts] = useState({ students_doing_great: 0, students_can_do_better: 0 }); // students count
    const [editStudentId, setEditStudentId] = useState(null);
    const [tempStudentData, setTempStudentData] = useState({});

    // dropdown fields
    const courseOptions = ['Cloud Computing', 'Data Analytics', 'Machine Learning'];
    const semesterOptions = ['1', '2', '3'];
    const yearOptions = ['2020', '2021', '2022','2023', '2024'];
    const gradeOptions = ['A', 'B', 'C', 'D', 'E'];

    // API url selection based on environment
    const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://gradewise-app.zapto.org/api/students'
        : 'http://localhost:5000/api/students';

    // fetch counts of students and list of students
    useEffect(() => {
        const fetchStudentCounts = async () => {
            try {
                const response = await fetch(`${baseUrl}/counts`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCounts(data); // set the counts of passed and failed students
            } catch (error) {
                console.error('Error fetching student counts:', error);
            }
        };

        const fetchStudents = async () => {
            try {
                const response = await fetch(baseUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        // fetch both counts and student data
        fetchStudentCounts();
        fetchStudents();
    }, [baseUrl]);

    // handler for deleting a student
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            try {
                const response = await fetch(`${baseUrl}/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    window.location.reload();
                    alert('Student deleted successfully!');
                    setStudents(students.filter(student => student._id !== id));
                } else {
                    alert('Failed to delete student.');
                }
            } catch (error) {
                console.error('Error deleting student:', error);
                alert('Error connecting to the server.');
            }
        }
    };

    // handler for updating student details
    const handleEditClick = (student) => {
        setEditStudentId(student._id);
        setTempStudentData(student);
    };
    // handle changes to input fields during edit
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempStudentData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
     // save the updated student data
    const handleSave = (id) => {
        handleUpdate(id, tempStudentData);
        setEditStudentId(null);
    };
    //update student data in backend
    const handleUpdate = async (id, updatedStudent) => {
        const { _id, ...dataToUpdate } = updatedStudent;
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToUpdate),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update student.');
            }
            alert('Student updated successfully!');
            window.location.reload();
            setStudents(students.map(student => student._id === id ? { ...student, ...dataToUpdate } : student));
        } catch (error) {
            console.error('Error updating student:', error);
            alert('Error connecting to the server.' + error.message);
        }
    };

    return (
        // html for dashboard component
        <div id='dashboard'>
            {/* render the GradeCategories component*/}
            <GradeCategories counts={counts} />

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
                            <td>{editStudentId === student._id ? (
                                <input
                                    type="text"
                                    name="firstName"
                                    value={tempStudentData.firstName}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                student.firstName
                            )}</td>
                            <td>{editStudentId === student._id ? (
                                <input
                                    type="text"
                                    name="lastName"
                                    value={tempStudentData.lastName}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                student.lastName
                            )}</td>
                            <td>{editStudentId === student._id ? (
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
                            )}</td>
                            <td>{editStudentId === student._id ? (
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
                            )}</td>
                            <td>{editStudentId === student._id ? (
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
                            )}</td>
                            <td>{editStudentId === student._id ? (
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
                            )}</td>
                            <td>
                                {editStudentId === student._id ? (
                                    <>
                                        <button onClick={() => handleSave(student._id)}>✔️</button>
                                        <button onClick={() => setEditStudentId(null)}>❌</button>
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
