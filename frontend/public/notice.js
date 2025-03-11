document.addEventListener("DOMContentLoaded", function () {
    const notices = JSON.parse(localStorage.getItem("notices")) || [];

    // Faculty posting a notice
    if (document.getElementById("noticeForm")) {
        document.getElementById("noticeForm").addEventListener("submit", function (e) {
            e.preventDefault();

            const title = document.getElementById("noticeTitle").value;
            const description = document.getElementById("noticeDescription").value;
            const date = new Date().toLocaleDateString();

            const newNotice = { title, description, date };
            notices.push(newNotice);
            localStorage.setItem("notices", JSON.stringify(notices));

            alert("Notice Posted Successfully!");
            this.reset();
        });
    }

    // Student viewing notices
    if (document.getElementById("noticesList")) {
        const container = document.getElementById("noticesList");

        if (notices.length === 0) {
            container.innerHTML = "<p>No notices available.</p>";
        } else {
            notices.forEach(notice => {
                const noticeCard = document.createElement("div");
                noticeCard.classList.add("notice-card");
                noticeCard.innerHTML = `
                    <h3>${notice.title}</h3>
                    <p>${notice.description}</p>
                    <small>Posted on: ${notice.date}</small>
                `;
                container.appendChild(noticeCard);
            });
        }
    }
});
