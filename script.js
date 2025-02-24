const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');


registerBtn.addEventListener('click',()=>{
    container.classList.add('active');
})

loginBtn.addEventListener('click',()=>{
    container.classList.remove('active');
})

const example = ({ a, b, c }) => { console.log(a, b, c); }; example(0, 1, 2);

/***********************************************************************************/
document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.querySelector(".register form");
    const loginForm = document.querySelector(".login form");
    const alertContainer = document.getElementById("alert-container");

    function showAlert(message, type) {
        const alert = document.createElement("div");
        alert.className = `alert alert-${type} alert-dismissible fade show text-center`;
        alert.role = "alert";
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        alertContainer.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 3000);
    }

    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = registerForm.querySelector("input[type='text']").value.trim();
            const email = registerForm.querySelector("input[type='email']").value.trim();
            const password = registerForm.querySelector("input[type='password']").value.trim();

            let users = JSON.parse(localStorage.getItem("users")) || [];

            if (users.some(user => user.email === email)) {
                showAlert("This email already exists", "danger");
                return;
            }

            users.push({ username, email, password });
            localStorage.setItem("users", JSON.stringify(users));

            showAlert("Registration successful! You can log in now.", "success");
            registerForm.reset();
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = loginForm.querySelector("input[type='text']").value.trim();
            const password = loginForm.querySelector("input[type='password']").value.trim();

            let users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                showAlert(`Welcome ${user.username}! You have successfully logged in.`, "success");
                localStorage.setItem("loggedInUser", JSON.stringify(user));

                setTimeout(() => {
                    window.location.href = "profile.html"; 
                }, 1000);
            } else {
                showAlert("Incorrect email or password.", "danger");
            }
        });
    }

    document.querySelector(".register-btn")?.addEventListener("click", function () {
        document.querySelector(".container").classList.add("active");
    });

    document.querySelector(".login-btn")?.addEventListener("click", function () {
        document.querySelector(".container").classList.remove("active");
    });

    if (window.location.pathname.includes("profile.html")) {
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!user) {
            window.location.href = "index.html"; 
        } else {
            document.getElementById("profile-username").textContent = user.username;
            document.getElementById("profile-email").textContent = user.email;
        }

        document.getElementById("logout-btn")?.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            window.location.href = "index.html"; 
        });
    }
});
