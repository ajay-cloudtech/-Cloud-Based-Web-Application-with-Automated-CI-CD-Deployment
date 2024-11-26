import React, { useState } from 'react';

function StudentForm({ onSubmit }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [courseName, setCourseName] = useState('');
    const [semesterName, setSemesterName] = useState('');
    const [yearNumber, setYearNumber] = useState('');
    const [grade, setGrade] = useState('');
    const [errors, setErrors] = useState({});

    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => 2000 + i);

    const validateForm = () => {
        const errors = {};
        if (!firstName.trim()) {
            errors.firstName = "First Name is required";
        } else if (firstName.length > 20) {
            errors.firstName = "First Name cannot exceed 20 characters";
        } else if (!/^[a-zA-Z\s]+$/.test(firstName)) {
            errors.firstName = "First Name can only contain letters";
        }

        if (!lastName.trim()) {
            errors.lastName = "Last Name is required";
        } else if (lastName.length > 20) {
            errors.lastName = "Last Name cannot exceed 20 characters";
        } else if (!/^[a-zA-Z\s]+$/.test(lastName)) {
            errors.lastName = "Last Name can only contain letters";
        }

        if (!courseName) errors.courseName = "Please select a course";
        if (!semesterName) errors.semesterName = "Please select a semester";
        if (!yearNumber) errors.yearNumber = "Please select a year";
        if (!grade) errors.grade = "Please select a grade";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const baseUrl = process.env.NODE_ENV === 'production'
        ? 'http://54.155.197.147/api/students'
        : 'http://localhost:5000/api/students';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

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
                setErrors({});
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
                    maxLength="20"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>

            <div id='lastNameDiv'>
                <label htmlFor='lastName'>Last Name</label>
                <input
                    id='lastName'
                    type='text'
                    value={lastName}
                    maxLength="20"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                {errors.lastName && <span className="error">{errors.lastName}</span>}
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
                {errors.courseName && <span className="error">{errors.courseName}</span>}
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
                {errors.semesterName && <span className="error">{errors.semesterName}</span>}
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
                    {yearOptions.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                {errors.yearNumber && <span className="error">{errors.yearNumber}</span>}
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
                {errors.grade && <span className="error">{errors.grade}</span>}
            </div>

            <div id='submitBtnDiv'>
                <button id='submitBtn' type='submit'>Submit</button>
            </div>
        </form>
    );
}

export default StudentForm;
