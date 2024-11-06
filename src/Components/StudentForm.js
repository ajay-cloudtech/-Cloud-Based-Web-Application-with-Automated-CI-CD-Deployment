import React, { useState } from 'react';

function StudentForm({ onSubmit }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [courseName, setCourseName] = useState('');
    const [semesterName, setSemesterName] = useState('');
    const [yearNumber, setYearNumber] = useState('');
    const [grade, setGrade] = useState('');

    // Dynamically set API URL based on the environment
    const baseUrl = process.env.NODE_ENV === 'production'
        ? 'http://54.155.197.147/api/students'  // Production API endpoint
        : 'http://localhost:5000/api/students'; // Local API endpoint

    const handleSubmit = async (e) => {
        e.preventDefault();

        const studentData = {
            firstName,
            lastName,
            courseName,
            semesterName,
            yearNumber,
            grade
        };

        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentData),
            });

            if (response.ok) {
                onSubmit();
                window.location.reload();
                setFirstName('');
                setLastName('');
                setCourseName('');
                setSemesterName('');
                setYearNumber('');
                setGrade('');
                alert('Student added successfully!');
            } else {
                alert('Failed to add student.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error connecting to the server.');
        }
    };

    return (
        <form id='studentForm' onSubmit={handleSubmit}>
            <div id='firstNameDiv'>
                <label htmlFor='firstName'>First Name</label>
                <input
                    id='firstName'
                    type='text'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </div>

            <div id='lastNameDiv'>
                <label htmlFor='lastName'>Last Name</label>
                <input
                    id='lastName'
                    type='text'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </div>

            <div id='courseNameDiv'>
                <label htmlFor='courseName'>Course</label>
                <select
                    id='courseName'
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    required
                >
                    <option value=''>Select a course</option>
                    <option value='Cloud Computing'>Cloud Computing</option>
                    <option value='Data Analytics'>Data Analytics</option>
                    <option value='Machine Learning'>Machine Learning</option>
                </select>
            </div>

            <div id='semesterNameDiv'>
                <label htmlFor='semesterName'>Semester</label>
                <select
                    id='semesterName'
                    value={semesterName}
                    onChange={(e) => setSemesterName(e.target.value)}
                    required
                >
                    <option value=''>Select semester</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                </select>
            </div>

            <div id='yearNumberDiv'>
                <label htmlFor='yearNumber'>Year</label>
                <select
                    id='yearNumber'
                    value={yearNumber}
                    onChange={(e) => setYearNumber(e.target.value)}
                    required
                >
                    <option value=''>Select year</option>
                    <option value='2024'>2024</option>
                    <option value='2025'>2025</option>
                    <option value='2026'>2026</option>
                </select>
            </div>

            <div id='gradeDiv'>
                <label htmlFor='grade'>Grade</label>
                <select
                    id='grade'
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    required
                >
                    <option value=''>Select grade</option>
                    <option value='A'>A</option>
                    <option value='B'>B</option>
                    <option value='C'>C</option>
                    <option value='D'>D</option>
                    <option value='E'>E</option>
                </select>
            </div>

            <div id='submitBtnDiv'>
                <button id='submitBtn' type='submit'>Submit</button>
            </div>
        </form>
    );
}

export default StudentForm;
