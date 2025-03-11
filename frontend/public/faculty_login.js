document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const formTitle = document.getElementById("form-title");

    const switchToSignup = document.getElementById("switch-to-signup");
    const switchToLogin = document.getElementById("switch-to-login");

    switchToSignup.addEventListener("click", function (event) {
        event.preventDefault();
        loginForm.classList.add("hidden");
        signupForm.classList.remove("hidden");
        formTitle.textContent = "Create Account";
    });

    switchToLogin.addEventListener("click", function (event) {
        event.preventDefault();
        signupForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
        formTitle.textContent = "Faculty Login";
    });

    

    // Handle Signup Form
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const fullName = signupForm.querySelector("input[type='text']").value;
        const email = signupForm.querySelector("input[type='email']").value;
        const password = signupForm.querySelector("input[type='password']").value;
        const confirmPassword = signupForm.querySelectorAll("input[type='password']")[1].value;

       

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Simulate successful signup
        alert("User registered successfully!");
        signupForm.reset();
        signupForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
        formTitle.textContent = "Faculty Login";
    });

    // Handle Login Form
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = loginForm.querySelector("input[type='email']").value;
        const password = loginForm.querySelector("input[type='password']").value;


        // Simulate successful login
        alert("Login successful!");
        window.location.href = "faculty_dashboard.html"; // Redirect after login
    });
});
