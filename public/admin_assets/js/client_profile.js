const confirmationModal = document.querySelector(".confirmation_modal");
const modalOpen = document.querySelector("#delete_user_btn");
const modalClose = document.querySelector(".cancel");

modalOpen.addEventListener("click", () => {
    confirmationModal.showModal();
  });

modalClose.addEventListener("click", () => {
  confirmationModal.close();
});

document.addEventListener('DOMContentLoaded', function () {
  const deleteUserBtn = document.getElementById('delete_user_btn');
  const confirmationModal = document.querySelector('.confirmation_modal');
  const cancelBtn = confirmationModal.querySelector('.cancel');
  const yesBtn = confirmationModal.querySelector('.yes');
  const userId = document.getElementById('userid').textContent;

  deleteUserBtn.addEventListener('click', function () {
    confirmationModal.showModal();
  });

  cancelBtn.addEventListener('click', function () {
    confirmationModal.close();
  });

  yesBtn.addEventListener('click', function () {
    fetch(`/api/clients/${userId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      confirmationModal.close();
      // Optionally, redirect or update the UI after deletion
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
});

document.addEventListener("DOMContentLoaded",()=> {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const email = urlParams.get("email");
  fetch(`/client/get_client_email/${email}`)
  .then(res=>res.json())
  .then(data=>{
    console.log(data);
    data=data[0];
    document.getElementById("userid").textContent=data._id;
    document.getElementById("fullname").textContent=data.fullname;
    document.getElementById("phonenumber").textContent=data.phone_number;
    document.getElementById("email").textContent=data.email;
    document.getElementById("dzongkhag").textContent=data.dzongkhag;
    document.getElementById("region").textContent=data.region;
    document.getElementById("organization").textContent=data.organisation;
  })
  .catch(e=>console.error("error fetching client data:", e));
});