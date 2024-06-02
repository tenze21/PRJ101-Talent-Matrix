let skills = [];

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

(function () {
  // Your existing expertise.js code here
  const dropdown1 = document.getElementById("custom-dropdown");
  const selectedOptionsDiv = document.getElementById("selected-options");
  const optionsDiv = document.getElementById("options");
  const searchInput = document.getElementById("search-input");
  const MAX_SELECTION = 10;

  // Mock options, replace with your own
  const options = ["Animation", "App Development", "Ajax", "Artificial Intelligence", "Bootstrap", "Branding", "Business", "Development", "Content Writing", "Copy Writing", "Creative Writing", "CSS 3", "C#", "Data Analysis", "Digital Marketing", "Django", "Event Planning", "Express js", "Figma", "Graphic Design", "GraphQL", "HTML 5", "Illustration", "Javascript", "Marketing Strategy", "Mobile Development", "MongoDB", "Music", "Production", "Node js", "Photography", "PHP", "Posgre", "SQL", "Project Management", "Python 3", "React", "Responsive Development", "Ruby", "Search Engine Optimization (SEO)", "Software Development", "Translation", "User Experience (UX) Design", "User Interface (UI) Design", "Videography", "Web Design", "Wordpress"];

  // Function to create option elements
  function createOption(optionText) {
    const option = document.createElement("div");
    option.textContent = optionText;
    option.classList.add("option");
    option.addEventListener("click", function () {
      toggleSelection(optionText);
    });
    return option;
  }

  // Function to toggle selection of an option
  function toggleSelection(optionText) {
    const optionTextWithoutCross = optionText.replace(/&times;/g, ""); // Remove close icon character,
    // console.log(optionTextWithoutCross);
    skills.push(optionTextWithoutCross);
    const selectedOptionIndex = Array.from(selectedOptionsDiv.children).findIndex((option) => {
      // Use strict equality instead of includes
      const optionTextTrimmed = option.textContent.slice(0, -1).trim().toLowerCase();
      // console.log("Option text trimmed:", optionTextTrimmed);
      // console.log("Option text without cross:", optionTextWithoutCross);
      return optionTextTrimmed === optionTextWithoutCross.trim().toLowerCase();
    }); // Use includes() instead of strict equality
    if (selectedOptionIndex !== -1) {
      // If already selected, deselect
      selectedOptionsDiv.children[selectedOptionIndex].remove();
    } else {
      if (selectedOptionsDiv.children.length >= MAX_SELECTION) {
        alert("You can only select up to " + MAX_SELECTION + " options.");
        return;
      }

      const selectedOption = document.createElement("div");
      selectedOption.textContent = optionText;
      selectedOption.classList.add("selected-option");
      selectedOption.addEventListener("click", function () {
        selectedOption.remove();
        skills.pop();
      });
      const closeIcon = document.createElement("span");
      closeIcon.innerHTML = "&times;";
      closeIcon.classList.add("close");
      closeIcon.addEventListener("click", function (event) {
        selectedOption.remove();
      });
      selectedOption.appendChild(closeIcon);

      selectedOptionsDiv.appendChild(selectedOption);
    }
  }

  // Populate dropdown with options
  options.forEach((optionText) => {
    const option = createOption(optionText);
    optionsDiv.appendChild(option);
  });

  // Search functionality
  searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.trim().toLowerCase();
    const optionElements = optionsDiv.getElementsByClassName("option");
    Array.from(optionElements).forEach((option) => {
      const optionText = option.textContent.toLowerCase();
      if (optionText.includes(searchText)) {
        option.style.display = "block";
      } else {
        option.style.display = "none";
      }
    });
  });

  // Toggle options display on arrow click
  dropdown1.querySelector(".arrow").addEventListener("click", function () {
    optionsDiv.classList.toggle("show");
  });

  // Hide options when clicking outside the dropdown
  window.addEventListener("click", function (event) {
    if (!dropdown1.contains(event.target)) {
      optionsDiv.classList.remove("show");
    }
  });
})();

const usernameEl = document.getElementById("username");
const dzongkhagEl = document.getElementById("dzongkhag");
const regionEl = document.getElementById("gewog");
const bioEl = document.getElementById("bio");
const schoolEl = document.getElementById("school");
const StudyFieldEl = document.getElementById("study-field");
const eduFromEl = document.getElementById("edufrom");
const eduTillEl = document.getElementById("edutill");
const categoryEl = document.getElementById("category");
const experienceEl = document.getElementById("experience");
const companyEl = document.getElementById("company");
const titleEl = document.getElementById("title");
const empFromEl = document.getElementById("emp_from");
const empToEl = document.getElementById("date_to");
const facebookEl = document.getElementById("facebook");
const twitterEl = document.getElementById("twitter");
const linkedinEl = document.getElementById("linkedin");
const form = document.getElementById("talent_form");
const submit = document.getElementById("submit_btn");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const data = {
    username: usernameEl.value,
    dzongkhag: dzongkhagEl.value,
    region: regionEl.value,
    bio: bioEl.value,
    school: schoolEl.value,
    field_of_study: StudyFieldEl.value,
    education_date_from: eduFromEl.value,
    education_date_to: eduTillEl.value,
    category: categoryEl.value,
    experiences: experienceEl.value,
    company: companyEl.value,
    ex_position: titleEl.value,
    employment_from: empFromEl.value,
    employment_to: empToEl.value,
    facebook: facebookEl.value,
    twitter: twitterEl.value,
    linkedin: linkedinEl.value,
    expertise: skills.toString(),
  };

  const email = getQueryParam("email");

  console.log(data);
  fetch(`/talent/update_talent/${email}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        alert("Your profile has been successfully created. Please login again to continue!");
        window.location.href = "/views/index.html";
      }
    })
    .catch((e) => console.error("Error:", e));
});
