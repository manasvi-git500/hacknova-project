document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("assignmentForm");
    const tableBody = document.getElementById("assignmentTable");

    let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

    function displayAssignments() {
        if (!tableBody) return; // Prevent error on upload page
        tableBody.innerHTML = "";

        assignments.forEach((assignment, index) => {
            if (!assignment.studentName || !assignment.subject || !assignment.fileURL) return; // Avoid undefined values
            
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
                form.reset();
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
        }
    };

    window.deleteAssignment = function (index) {
        assignments.splice(index, 1);
        localStorage.setItem("assignments", JSON.stringify(assignments));
        displayAssignments();
    };

    displayAssignments();
});
// Function to display grades (for students)
function displayGrades() {
    const gradesTable = document.getElementById("gradesTable");
    if (!gradesTable) return; // Run only on the View Grades page

    let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

    gradesTable.innerHTML = ""; // Clear table before adding rows

    assignments.forEach((assignment) => {
        if (assignment.grade) { // Show only graded assignments
            const row = `
                <tr>
                    <td>${assignment.studentName}</td>
                    <td>${assignment.subject}</td>
                    <td>${assignment.grade}</td>
                </tr>
            `;
            gradesTable.innerHTML += row;
        }
    });

    if (assignments.length === 0 || gradesTable.innerHTML === "") {
        gradesTable.innerHTML = `<tr><td colspan="3">No grades available yet.</td></tr>`;
    }
}

