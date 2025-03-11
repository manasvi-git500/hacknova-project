

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
        formTitle.textContent = "Student Login";
    });
});
