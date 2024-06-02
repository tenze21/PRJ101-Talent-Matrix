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
