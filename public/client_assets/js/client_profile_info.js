window.onload = function () {
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
