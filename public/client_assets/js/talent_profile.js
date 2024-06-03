// opening and closing confirmation modal for the hire function
const confirmationModal = document.querySelector(".confirmation_modal");
const modalOpen = document.querySelector(".hire_btn");
const modalClose = document.querySelector(".cancel_btn");
const ProjectSelectionForm=document.getElementById("project_selection_form");

modalOpen.addEventListener('click', ()=>{
    confirmationModal.showModal()
})

modalClose.addEventListener("click", () => {
  confirmationModal.close();
});

// create fetch request to post the hire request
ProjectSelectionForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    confirmationModal.close();
    ProjectSelectionForm.reset();
    alert("Hire request successfully sent!");
})

// opening and closing the review form
const reviewModal= document.querySelector('.review_modal');
const reviewModalOpen= document.querySelector('.rate_review');
const reviewModalClose= document.querySelector('#cancel_btn');

reviewModalOpen.addEventListener('click', ()=>{
    reviewModal.showModal();
})
reviewModalClose.addEventListener('click', ()=>{
    reviewModal.close();
})

const reviewForm=document.getElementById('review_form');
const ratingOptions=document.getElementsByName('rating');
const review=document.getElementById('review');
const reviewBox=document.querySelector('.review-box');
const noReview=document.querySelector('.no_review');

// need to send fetch request to get the client name and store the feedback in the database.
reviewForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let rating;
    
    noReview.style.display="none";
    for(i=0; i<ratingOptions.length; i++){
        if(ratingOptions[i].checked){
            rating=ratingOptions[i].value;
            console.log(ratingOptions[i].value);
            break;
        }
    }
    const reviewWrapper=document.createElement('div');
    reviewWrapper.classList.add('review_wrapper');
    reviewBox.appendChild(reviewWrapper);
    const layout=`
    <div class="client">
      <img src="assets/images/default_profile.svg" alt="reviewer profile" />
      <div class="client-name">Client Name</div>
      <h5>
        Rated-<span id="rating">${rating}</span> (<i class='bx bxs-star'></i>)
      </h5>
    </div>
    <p id="review">
      ${review.value}
    </p>
  <hr>`
  reviewWrapper.innerHTML=layout;
  reviewForm.reset();
  reviewModal.close();
})

document.addEventListener("DOMContentLoaded", () => { 
  const talentId = "60d..."; // example talent ID, replace with actual ID
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const email = urlParams.get("email");

  fetch(`/client/get_client_email/${email}`)
    .then((response) => response.json())
    .then((data) => {
      data = data[0];

      document.getElementById("username").textContent = data.username;
      document.getElementById("fullname").textContent = data.fullname;
      document.getElementById("email").textContent = data.email;
      document.querySelector(".address h5").innerHTML = `<span>${data.dzongkhag}</span>, <span>${data.region}</span>`;
      document.getElementById("experience").textContent = data.experiences;
      document.getElementById("about").textContent = data.bio;

      const skillsContainer = document.querySelector(".skills");
      const expertise=data.expertise.split(",");
      expertise.forEach((skill) => {
        const li = document.createElement("li");
        li.className = "skill";
        li.textContent = skill;
        skillsContainer.appendChild(li);
      });

      document.getElementById("school").textContent = data.school;
      document.getElementById("field_of_study").textContent = data.field_of_study;
      document.getElementById("date_from").textContent = data.education_date_from.split("T")[0];
      document.getElementById("date_to").textContent = data.education_date_to.split("T")[0];

      document.getElementById("title").textContent = data.ex_position;
      document.getElementById("company").textContent = data.company;
      document.getElementById("from").textContent = data.employment_from.split("T")[0];
      document.getElementById("to").textContent = data.employment_to.split("T")[0];

      document.querySelector(".Facebook").parentNode.href = data.facebook;
      document.querySelector(".twitter").parentNode.href = data.twitter;
      document.querySelector(".linkdin").parentNode.href = data.linkedin;
    })
    .catch((error) => console.error("Error fetching talent:", error));

})