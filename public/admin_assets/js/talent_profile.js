const confirmationModal = document.querySelector(".confirmation_modal");
const modalOpen = document.querySelector(".delete_user_btn");
const modalClose = document.querySelector(".cancel_btn");

modalOpen.addEventListener('click', ()=>{
    confirmationModal.showModal()
})

modalClose.addEventListener("click", () => {
  confirmationModal.close();
});

document.addEventListener('DOMContentLoaded', () => {
  const talentId = '60d...'; // example talent ID, replace with actual ID
  
  fetch(`http://localhost:3000/api/talents/${talentId}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('username').textContent = data.username;
      document.getElementById('fullname').textContent = data.fullname;
      document.getElementById('email').textContent = data.email;
      document.querySelector('.address h5').innerHTML = `<span>${data.location.city}</span>, <span>${data.location.area}</span>`;
      document.getElementById('experience').textContent = data.experience;
      document.getElementById('about').textContent = data.about;
      
      const skillsContainer = document.querySelector('.skills');
      skillsContainer.innerHTML = '';
      data.skills.forEach(skill => {
        const li = document.createElement('li');
        li.className = 'skill';
        li.textContent = skill;
        skillsContainer.appendChild(li);
      });
      
      const education = data.education;
      document.getElementById('school').textContent = education.school;
      document.getElementById('field_of_study').textContent = education.field_of_study;
      document.getElementById('date_from').textContent = education.date_from;
      document.getElementById('date_to').textContent = education.date_to;
      
      const employment = data.employment;
      document.getElementById('title').textContent = employment.title;
      document.getElementById('company').textContent = employment.company;
      document.getElementById('from').textContent = employment.from;
      document.getElementById('to').textContent = employment.to;

      document.querySelector('.Facebook img').parentNode.href = data.social_media.facebook;
      document.querySelector('.twitter img').parentNode.href = data.social_media.twitter;
      document.querySelector('.linkdin img').parentNode.href = data.social_media.linkedin;
    })
    .catch(error => console.error('Error fetching talent:', error));
});
