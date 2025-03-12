document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("assignmentForm");
    const tableBody = document.getElementById("assignmentTable");
    const gradesTable = document.getElementById("gradesTable");

    let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

    function displayAssignments() {
        if (!tableBody) return; // Prevent error if tableBody is null
        tableBody.innerHTML = "";

        assignments.forEach((assignment, index) => {
            if (!assignment.studentName || !assignment.subject || !assignment.fileURL) return;

            const row = `
                <tr>
                    <td>${assignment.studentName}</td>
                    <td>${assignment.subject}</td>
                    <td><a href="${assignment.fileURL}" target="_blank">View File</a></td>
                    <td>${assignment.grade ? assignment.grade : "Not Graded"}</td>
                    <td>
                        <button class="grade-btn" onclick="gradeAssignment(${index})">Grade</button>
                        <button class="delete-btn" onclick="deleteAssignment(${index})">Delete</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const studentName = document.getElementById("studentName").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const file = document.getElementById("assignmentFile").files[0];

            if (!studentName || !subject || !file) {
                alert("Please fill in all fields and upload a file.");
                return;
            }

            const reader = new FileReader();
            reader.onload = function (event) {
                const fileURL = event.target.result;

                const newAssignment = { studentName, subject, fileURL, grade: "" };
                assignments.push(newAssignment);
                localStorage.setItem("assignments", JSON.stringify(assignments));

                displayAssignments();
                displayGrades(); // Update grades table after submission
                form.reset();
                alert("Assignment uploaded successfully!");
            };
            reader.readAsDataURL(file);
        });
    }

    window.gradeAssignment = function (index) {
        const grade = prompt("Enter grade (A, B, C, etc.):");
        if (grade) {
            assignments[index].grade = grade;
            localStorage.setItem("assignments", JSON.stringify(assignments));
            displayAssignments();
            displayGrades(); // Update grades table
        }
    };

    window.deleteAssignment = function (index) {
        assignments.splice(index, 1);
        localStorage.setItem("assignments", JSON.stringify(assignments));
        displayAssignments();
        displayGrades(); // Update grades table
    };

    function displayGrades() {
        if (!gradesTable) return; // Ensure it's only run on the correct page

        gradesTable.innerHTML = ""; // Clear table before adding rows

        let gradedAssignments = assignments.filter(a => a.grade); // Filter graded assignments

        if (gradedAssignments.length === 0) {
            gradesTable.innerHTML = `<tr><td colspan="3">No grades available yet.</td></tr>`;
            return;
        }

        gradedAssignments.forEach((assignment) => {
            const row = `
                <tr>
                    <td>${assignment.studentName}</td>
                    <td>${assignment.subject}</td>
                    <td>${assignment.grade}</td>
                </tr>
            `;
            gradesTable.innerHTML += row;
        });
    }

    displayAssignments();
    displayGrades(); // Display grades on load
});
