const form = document.querySelector(".registration-form");
const nameEl = document.querySelector("#name");
const emailEl = document.querySelector("#email");
const phoneNumberEl = document.querySelector("#phoneNumber");
const dzongkhagEl = document.querySelector("#dzongkhag");
const regionEl = document.querySelector("#region");
const organizationEl = document.querySelector("#organizationName");
const passwordEl = document.querySelector("#password");
const confirmPasswordEl = document.querySelector("#confirmPassword");
const showHidePassword = document.querySelector(".hide_password");
const showHideConfirmPassword = document.querySelector(".hide_comfirmpassword");

let isNameValid = false,
  isphoneNumberValid = false,
  isRegionValid = false,
  isPasswordSecure = false,
  isConfirmPasswordValid = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isFormValid = isNameValid && isphoneNumberValid && isRegionValid && isPasswordSecure && isConfirmPasswordValid;
  if (isFormValid) {
    let data = {
      fullname: nameEl.value,
      email: emailEl.value,
      phone_number: phoneNumberEl.value,
      dzongkhag: dzongkhagEl.value,
      region: regionEl.value,
      organisation: organizationEl.value,
      password: passwordEl.value,
      role: "client",
    };
    console.log(data);
    fetch("/user/create_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 201) {
          alert("Registration Successful! Welcome to Talent Matrix");
          window.location.href = "../views/index.html";
        }else{
          alert("An account with that email already exist on Talent Matrix!")
        }
      })
      .catch((e) => {
        console.error("error:", e)
      }); 
  }
});

function showError(input, message) {
  const formField = input.parentElement;
  const error = formField.querySelector("small");
  error.textContent = message;
}

function hideError(input) {
  const formField = input.parentElement;
  const error = formField.querySelector("small");
  error.textContent = "";
}

nameEl.addEventListener("input", () => {
  const re = /^[a-zA-Z\s]+(?:\s+[a-zA-Z\s]+)?$/;
  if (!re.test(nameEl.value)) {
    showError(nameEl, "Name Cannot have numbers and special characters.");
  } else {
    hideError(nameEl);
    isNameValid = true;
  }
});

phoneNumberEl.addEventListener("input", () => {
  const re = /^(17|77)\d{6}$/;
  if (!re.test(phoneNumberEl.value)) {
    showError(phoneNumberEl, "Invalid phone number.");
  } else {
    hideError(phoneNumberEl);
    isphoneNumberValid = true;
  }
});

regionEl.addEventListener("input", () => {
  const re = /^[a-zA-Z\s]+(?:\s+[a-zA-Z\s]+)?$/;
  if (!re.test(regionEl.value)) {
    showError(regionEl, "Gewog or Thromde name cannot have numbers and special characters.");
  } else {
    hideError(regionEl);
    isRegionValid = true;
  }
});
passwordEl.addEventListener("input", () => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  if (!re.test(passwordEl.value)) {
    showError(passwordEl, "Password must have atleast 8 characters including at least 1 lowercase letter, 1 uppercase letter, 1 digit and 1 special character.");
  } else {
    hideError(passwordEl);
    isPasswordSecure = true;
  }
});

function checkConfirmPassword() {
  let valid = false;
  const confirmPassword = confirmPasswordEl.value.trim();
  const password = passwordEl.value.trim();
  if (confirmPassword !== password) {
    showError(confirmPasswordEl, "Password doesn't match.");
  } else {
    valid = true;
  }
  return valid;
}

confirmPasswordEl.addEventListener("input", () => {
  if (!(confirmPasswordEl.value === passwordEl.value)) {
    showError(confirmPasswordEl, "Password doesn't match");
  } else {
    hideError(confirmPasswordEl);
    isConfirmPasswordValid = true;
  }
});

showHidePassword.addEventListener("click", function () {
  this.classList.toggle("bx-show");
  if (passwordEl.type == "password") {
    passwordEl.type = "text";
  } else {
    passwordEl.type = "password";
  }
});

showHideConfirmPassword.addEventListener("click", function () {
  this.classList.toggle("bx-show");
  if (confirmPasswordEl.type == "password") {
    confirmPasswordEl.type = "text";
  } else {
    confirmPasswordEl.type = "password";
  }
});
