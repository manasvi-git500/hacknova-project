document.addEventListener("DOMContentLoaded", () => {
    const attendanceRecords = JSON.parse(localStorage.getItem("attendanceRecords")) || [];
    const form = document.getElementById("attendanceForm");
    const tableBody = document.getElementById("attendanceTable");

    // Function to display attendance records
    function displayAttendance() {
        if (!tableBody) return; // Prevent errors if table doesn't exist
        tableBody.innerHTML = "";
        attendanceRecords.forEach((record, index) => {
            const row = `
                <tr>
                    <td>${record.studentName}</td>
                    <td>${record.date}</td>
                    <td>${record.status}</td>
                    ${record.isFaculty ? `<td><button onclick="deleteAttendance(${index})">Delete</button></td>` : ""}
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

    // Handle faculty attendance submission
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const studentName = document.getElementById("studentName").value;
            const date = document.getElementById("date").value;
            const status = document.getElementById("status").value;

            if (!studentName || !date || !status) {
                alert("Please fill out all fields.");
                return;
            }

            attendanceRecords.push({ studentName, date, status, isFaculty: true });
            localStorage.setItem("attendanceRecords", JSON.stringify(attendanceRecords));

            displayAttendance();
            form.reset();
        });
    }

    // Function to delete attendance (faculty only)
    window.deleteAttendance = (index) => {
        attendanceRecords.splice(index, 1);
        localStorage.setItem("attendanceRecords", JSON.stringify(attendanceRecords));
        displayAttendance();
    };

    displayAttendance();
});
