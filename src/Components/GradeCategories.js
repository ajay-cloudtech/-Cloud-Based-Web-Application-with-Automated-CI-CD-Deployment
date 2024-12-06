import React from 'react';

// function for grade analysis that returns its html component
function GradeCategories({ counts }) {
    return (
        <div id="gradeCategories">
            <div className="category" id = "pass">
                <h3>Students doing great: {counts.students_doing_great}</h3>
            </div>
            <div className="category" id = "fail">
                <h3>Students can do better: {counts.students_can_do_better}</h3>
            </div>
            <div className="category" id = "passper">
                <h3>Pass Percentage: 
                    {counts.students_doing_great + counts.students_can_do_better > 0
                    ? ((counts.students_doing_great / (counts.students_doing_great + counts.students_can_do_better)) * 100).toFixed(2)
                    : 0}%
                </h3>
            </div>
        </div>
    );
}

export default GradeCategories;
