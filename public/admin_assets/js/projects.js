// projects tab functionality
const tabContainer = document.querySelector(".tabs_container");
const tabList = document.querySelector(".tab_list");
const tabButtons = document.querySelectorAll(".tab_button");
const tabPanels = document.querySelectorAll(".table_wrapper");

tabList.setAttribute("role", "tablist");

tabList.querySelectorAll("li").forEach((listitem) => {
  listitem.setAttribute("role", "presentation");
});
tabButtons.forEach((tab, index) => {
  tab.setAttribute("role", "tab");
  if (index === 0) {
    tab.setAttribute("aria-selected", "true");
  } else {
    tabPanels[index].setAttribute("hidden", "");
  }
});

tabButtons.forEach((tabButton) => {
  tabButton.addEventListener("click", (e) => {
    e.preventDefault();
    switchTab(tabButton);
  });
});

function switchTab(newTab) {
  const activePanelId = newTab.getAttribute("href");
  const activePanel = tabContainer.querySelector(activePanelId);

  tabButtons.forEach((button) => {
    button.setAttribute("aria-selected", "false");
  });
  console.log(activePanel);
  tabPanels.forEach((panel) => {
    panel.setAttribute("hidden", true);
  });
  activePanel.removeAttribute("hidden");
  newTab.setAttribute("aria-selected", "true");
}

// for opening and closing comfirmation modal for mark as done project
const doneConfirmationModal = document.querySelector(".confirmation_modal_done");
const modalOpen = document.querySelectorAll(".done_btn");
const modalClose = document.querySelector(".cancel_done");

modalOpen.forEach((btn) => {
  btn.addEventListener("click", () => {
    doneConfirmationModal.showModal();
  });
});

modalClose.addEventListener("click", () => {
  doneConfirmationModal.close();
});

// for opening and closing comfirmation modal for delete project
const deleteConfirmModal = document.querySelector(".confirmation_modal_delete");
const openDeleteConfirmModal = document.querySelectorAll(".delete_btn");
const closeDeleteConfirmModel = document.querySelector(".cancel_delete");

openDeleteConfirmModal.forEach((btn) => {
  btn.addEventListener("click", () => {
    deleteConfirmModal.showModal();
  });
});

closeDeleteConfirmModel.addEventListener("click", () => {
  deleteConfirmModal.close();
});

window.onload = function () {
  fetch("/admin/get_pro_com")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const tbody = document.getElementById("projects_tbody");

      // Clear existing rows
      tbody.innerHTML = "";

      if (data.length === 0) {
        const noDataRow = document.createElement("tr");
        noDataRow.innerHTML = '<td colspan="7">No ongoing projects to show yet</td>';
        tbody.appendChild(noDataRow);
      } else {
        // console.log(data[0].client_email);
        data.forEach((project, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
          <td>${index + 1}.</td>
          <td>${project._id}</td>
          <td>${project.prj_title}</td>
          <td>${project.client_email}</td>
          <td><ul class="hire_list"><li>${project.hire_request}</li></ul></td>
          <td>${project.prj_payment}</td>
          <td>
            <button class="delete_btn">Delete Project</button>
            <button class="done_btn">Mark as Done</button>
          </td>
        `;

          tbody.appendChild(row);
        });
      }
    });
};
