window.onload = function () {
  // Create a new window with specified URL and properties
  var newWindow = window.open("about:blank", "_blank", "width=500,height=400");

  // Fetch data from an API
  fetch("/admin/get_talents")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const wrapperGrid = document.querySelector(".wrapper_grid");
      ///card gererate
      data.forEach((data) => {
        // Create a new talent_card_wrapper div
        const talentCardWrapper = document.createElement("div");
        talentCardWrapper.classList.add("talent_card_wrapper");

        // Create the button element for shortlisting
        const button = document.createElement("button");
        button.classList.add("shortlist");
        button.setAttribute("title", "shortlist");
        button.innerHTML = `
        <svg width="28" height="35" viewBox="0 0 28 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.8164 33.4712L23.8163 33.471L14.4363 26.771L14.0003 26.4597L13.5644 26.771L4.1844 33.471L4.18411 33.4713C3.02577 34.2995 1.41699 33.4715 1.41699 32.048V5.33301C1.41699 4.20584 1.86476 3.12483 2.66179 2.3278C3.45882 1.53077 4.53982 1.08301 5.66699 1.08301H22.3337C23.4608 1.08301 24.5418 1.53077 25.3389 2.3278C26.1359 3.12483 26.5837 4.20584 26.5837 5.33301V32.0463C26.5837 33.4699 24.9731 34.2978 23.8164 33.4712Z" fill="white" stroke="black" stroke-width="1.5" />
        </svg>
    `;

        // Create the profile image element
        const profileImage = document.createElement("div");
        profileImage.classList.add("profile");
        profileImage.innerHTML = '<img src="/admin_assets/images/default_profile.svg" alt="talent profile" />';

        // Create the details div with the user data
        const details = document.createElement("div");
        details.classList.add("details");
        details.innerHTML = `
        <p>Full Name: <span id="name">${data.fullname}</span></p>
        <p>Email Address: <span id="email">${data.email}</span></p>
        <p>CID: <span id="cid">${data.cid}</span></p>
        <p>Phone Number: <span id="phone_number">${data.phone_number}</span></p>
        <p>Portfolio: <span id="portfolio">${data.portfolio}</span></p>
    `;

        // Create the "View full profile" link
        const viewProfileLink = document.createElement("a");

        const url = `/views/admin/talent_profile.html?email=${encodeURIComponent(data.email)}`;
        // Set the href attribute with the constructed URL
        viewProfileLink.setAttribute("href", url);

        viewProfileLink.textContent = "View full profile";

        // Append the elements to the talentCardWrapper
        talentCardWrapper.appendChild(button);
        talentCardWrapper.appendChild(profileImage);
        talentCardWrapper.appendChild(details);
        talentCardWrapper.appendChild(viewProfileLink);

        // Append the talentCardWrapper to the wrapperGrid
        wrapperGrid.appendChild(talentCardWrapper);
      });
    })
    .catch((error) => {
      alert(error);
      console.error("Error fetching data:", error);
    });
};

// projects tab functionality
const tabContainer = document.querySelector(".tabs_container");
const tabList = document.querySelector(".tab_list");
const tabButtons = document.querySelectorAll(".tab_button");
const tabPanels = document.querySelectorAll(".wrapper");

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
  tabPanels.forEach((panel) => {
    panel.setAttribute("hidden", true);
  });
  activePanel.removeAttribute("hidden");
  newTab.setAttribute("aria-selected", "true");
}

// for opening and closing comfirmation modal for shortlisting talent
const shortlistConfirmationModal = document.querySelector(".confirmation_modal_shortlist");
const modalOpen = document.querySelectorAll(".shortlist");
const modalClose = shortlistConfirmationModal.querySelector(".cancel_btn");

modalOpen.forEach((btn) => {
  btn.addEventListener("click", () => {
    shortlistConfirmationModal.showModal();
  });
});

modalClose.addEventListener("click", () => {
  shortlistConfirmationModal.close();
});

// for opening and closing comfirmation modal for shortlisting talent
const approveConfirmationModal = document.querySelector(".confirmation_modal_approve");
const approveModalOpen = document.querySelectorAll(".approve");
const approveModalClose = approveConfirmationModal.querySelector(".cancel_btn");

approveModalOpen.forEach((btn) => {
  btn.addEventListener("click", () => {
    approveConfirmationModal.showModal();
  });
});

approveModalClose.addEventListener("click", () => {
  approveConfirmationModal.close();
});

let viewmore = (email) => {
  console.log(`${email}`);
};
