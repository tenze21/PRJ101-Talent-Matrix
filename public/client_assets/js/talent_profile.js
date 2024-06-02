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

