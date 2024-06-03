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
    .then((res) => res.json())
    .then((result) => {
      console.log(result.error);
      if (result.error == "check your email or password") {
        alert("incorrect password or incorrect email");
        window.location.reload();
      } else if (result.message == "Login successful") {
        alert("login sucessful");
        // Redirect based on role
        if (result.userType == "admin") {
          // window.open("views/admin/talent.html", "_self");
          window.location.href = "/views/admin/talent.html";
        } else if (result.userType == "talent") {
          // window.open("views/talent/search.html", "_self");
          window.location.href = "/views/talent/search.html";
        } else {
          // window.open("/client/talents.html", "_self");
          window.location.href = "/views/client/talents.html";
        }
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
