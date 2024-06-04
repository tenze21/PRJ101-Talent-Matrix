// opening the profile editing form
// get cookie

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// get client data
const userEmail = decodeURIComponent(getCookie("user_email"));

window.onload = function () {
  set_profile_function();

  console.log(userEmail);
  fetch(`/client/get_client_email/${userEmail}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let userData = data[0];
      document.getElementById("idValue").textContent = userData._id;
      document.getElementById("nameValue").textContent = userData.fullname;
      document.getElementById("emailValue").textContent = userData.email;
      document.getElementById("phone_numberValue").textContent = userData.phone_number;
      document.getElementById("dzongkhagValue").textContent = userData.dzongkhag;
      document.getElementById("regionValue").textContent = userData.region;

      if(userData.profile_img){
        var base64String = arrayBufferToBase64(userData.profile_img.data);
        const wrapper1=document.querySelector('.profile');
        const img=document.createElement("img");
        img.src=`data:image/jpeg;base64,${base64String}`;
        wrapper1.appendChild(img);
  
        const imgWrapper=document.querySelector(".wrapper_main");
        const img2=document.createElement("img");
        img2.src=`data:image/jpeg;base64,${base64String}`;
        imgWrapper.appendChild(img2);

        const wrapperMain=document.querySelector('.wrapper');
        const img3=document.createElement("img");
        img3.src=`data:image/jpeg;base64,${base64String}`;
        img3.style.borderRadius="50%";
        img3.style.height="150px";
        img3.style.width="150px";
        wrapperMain.appendChild(img3);

        const defaultProfile1=document.getElementById("default_profile1");
        const defaultProfile2=document.getElementById("default_profile2");
        const defaultProfile3=document.getElementById("default_profile3");
        defaultProfile1.style.display="none";
        defaultProfile2.style.display="none";
        defaultProfile3.style.display="none";
      }
      // Update organization information
      document.getElementById("organization_nameValue").textContent = userData.organisation;
    });
};

// Function to convert byte array to Base64 string
function arrayBufferToBase64(buffer) {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

const openModel1 = document.querySelector("#edit_personal_info");
const personalInfoModal = document.querySelector(".personal_info_modal");
const closeModel1 = document.querySelector("#cancel_btn");
const openModel2 = document.querySelector("#edit_organization_info");
const organizationInfoModal = document.querySelector(".organization_info_modal");
const closeModel2 = document.querySelector(".organization_info_modal #cancel_btn");

openModel1.addEventListener("click", () => {
  personalInfoModal.showModal();
  displayInitialValue();
});
closeModel1.addEventListener("click", () => {
  personalInfoModal.close();
});

openModel2.addEventListener("click", () => {
  organizationInfoModal.showModal();
  displayInitialValue();
});
closeModel2.addEventListener("click", () => {
  organizationInfoModal.close();
});
// getting the initial values in the input fields
function displayInitialValue() {
  const nameValue = document.querySelector("#nameValue");
  const emailValue = document.querySelector("#emailValue");
  const phone_numberValue = document.querySelector("#phone_numberValue");
  const regionValue = document.querySelector("#regionValue");
  const organization_nameValue = document.querySelector("#organization_nameValue");
  const dzongkhageValue = document.querySelector("#dzongkhagValue").innerText;

  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const phone_number = document.querySelector("#phone_number");
  const region = document.querySelector("#region");
  const organization_name = document.querySelector("#organization_name");
  const dzongkhags = document.querySelectorAll("#dzongkhagOption");

  name.value = nameValue.innerText;
  email.value = emailValue.innerText;
  phone_number.value = phone_numberValue.innerText;
  region.value = regionValue.innerText;
  organization_name.value = organization_nameValue.innerText;

  dzongkhags.forEach((dzongkhag) => {
    if (dzongkhag.innerText === dzongkhageValue) {
      dzongkhag.setAttribute("selected", true);
    }
  });
}

/// Updating profile picture
const profile = document.querySelector(".default_profile");
const profileInput = document.querySelector("#profile");
profileInput.onchange = function () {
  const file = profileInput.files[0];
  profile.src = URL.createObjectURL(file);
  console.log(file);

  const formData = new FormData();
  formData.append("image", file);

  fetch("/client/upload_profile_client_img", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("Image uploaded successfully!");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Image upload failed!");
    });
};

// Form validation for profile update
const personalInfoForm = document.querySelector("#personal_info_edit");
const nameEl = document.querySelector("#name");
const phoneNumberEl = document.querySelector("#phone_number");
const regionEl = document.querySelector("#region");

let isNameValid = false;
let isPhoneNumberValid = false;
let isRegionValid = false;

personalInfoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateName();
  validatePhoneNumber();
  validateRegion();

  if (isNameValid && isPhoneNumberValid && isRegionValid) {
    console.log("fetch update here");
    const fullName = nameEl.value;
    const email = document.getElementById("emailValue").textContent;
    const phoneNumber = phoneNumberEl.value;
    const dzongkhag = document.getElementById("dzongkhagValue").textContent;
    const region = regionEl.value;

    // Create an object to hold the data
    const _data = {
      fullname: fullName,
      email: email,
      phone_number: phoneNumber,
      dzongkhag: dzongkhag,
      region: region,
    };

    fetch(`/client/update_profile/${userEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_data),
    });

    alert("sucessful update");
    window.location.href = "/views/client/account_setting.html";

    console.log(_data);
    // fetch()

    // Here you can make the fetch request to update the user information
  }
});

const organizationInfoForm = document.getElementById("organization_edit_form");
organizationInfoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    organisation: document.getElementById("organization_name").value,
  };
  fetch(`/client/update_profile/${userEmail}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  alert("sucessful update");
  window.location.href = "/views/client/account_setting.html";
});

function showError(input, message) {
  const formField = input.parentElement;
  const error = formField.querySelector("small");
  if (error) {
    error.textContent = message;
    formField.classList.add("error");
    formField.classList.remove("success");
  } else {
    const errorElement = document.createElement("small");
    errorElement.textContent = message;
    formField.appendChild(errorElement);
    formField.classList.add("error");
    formField.classList.remove("success");
  }
}

function hideError(input) {
  const formField = input.parentElement;
  const error = formField.querySelector("small");
  if (error) {
    error.textContent = "";
    formField.classList.remove("error");
    formField.classList.add("success");
  }
}

function validateName() {
  const re = /^[a-zA-Z\s]+(?:\s+[a-zA-Z\s]+)?$/;
  if (!re.test(nameEl.value)) {
    showError(nameEl, "Name cannot have numbers and special characters.");
    isNameValid = false;
  } else {
    isNameValid = true;
    hideError(nameEl);
  }
}

function validatePhoneNumber() {
  const re = /^(17|77)\d{6}$/;
  if (!re.test(phoneNumberEl.value)) {
    showError(phoneNumberEl, "Invalid phone number.");
    isPhoneNumberValid = false;
  } else {
    isPhoneNumberValid = true;
    hideError(phoneNumberEl);
  }
}

function validateRegion() {
  const re = /^[a-zA-Z\s]+(?:\s+[a-zA-Z\s]+)?$/;
  if (!re.test(regionEl.value)) {
    showError(regionEl, "Gewog or Thromde name cannot have numbers and special characters.");
    isRegionValid = false;
  } else {
    isRegionValid = true;
    hideError(regionEl);
  }
}

nameEl.addEventListener("input", validateName);
phoneNumberEl.addEventListener("input", validatePhoneNumber);
regionEl.addEventListener("input", validateRegion);

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const set_profile_function = () => {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  // get client data
  const userEmail = decodeURIComponent(getCookie("user_email"));

  fetch(`/client/get_profile_email/${userEmail}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json(); // Assuming the response contains the user data
      } else {
        return res.json().then((data) => {
          alert(`Failed to load profile: ${data.message}`);
          throw new Error(data.message);
        });
      }
    })
    .then((data) => {
      data = data[0];
      console.log(data);
      // Assuming the response data has the fields `profile`, `fullname`, and `role`
      //   const profilePictureUrl = data.profile || "/client_assets/images/default_profile.svg"; // Use default if not provided
      const clientName = data.fullname;
      const userType = data.role;

      // Update the DOM elements with the fetched data
      //   document.getElementById("profile_picture").src = profilePictureUrl;
      document.getElementById("client_name").textContent = clientName;
      document.getElementById("user_type").textContent = userType;
    })
    .catch((error) => {
      console.error("Error fetching profile:", error);
      alert("An error occurred while fetching the profile.");
    });
};
