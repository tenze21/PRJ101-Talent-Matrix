const password = document.querySelector("#password");
const showHidePassword = document.querySelector(".password-hide");

let role = getCookie("role");
showHidePassword.addEventListener("click", function () {
  this.classList.toggle("bx-show");
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
});

const form = document.querySelector(".login-form");
const loginError = document.getElementById("login_error");
// Use the function to get the contactnumber cookie
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  fetch("/user/login_user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json().then((result) => ({ status: res.status, body: result }));
    })
    .then(({ status, body }) => {
      console.log(status);
      if (status === 200) {
        console.log(body.userType);
        // Redirect based on role
        if (body.userType === "admin") {
          window.location.href = "/views/admin/talent.html";
        } else if (body.userType === "talent") {
          window.location.href = "/views/talent/search.html";
        } else if (body.userType === "client") {
          window.location.href = "/views/client/talents.html";
        }
      } else {
        const error = document.getElementById("login_error");
        error.style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Error in fetch request:", error);
      alert("An error occurred. Please try again.");
    });
});

function getCookie(name) {
  let cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    // Check if this cookie string begins with the name we want
    if (cookie.indexOf(name + "=") == 0) {
      return cookie.substring((name + "=").length, cookie.length);
    }
  }
  return null;
}
