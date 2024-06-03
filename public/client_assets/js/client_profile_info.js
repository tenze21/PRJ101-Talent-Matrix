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
      console.log(data)

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
      const base64String = arrayBufferToBase64(data.profile_img.data);
      // Set the image source
      const wrapper=document.querySelector('.profile');
      const img=document.createElement("img");
      img.src=`data:image/jpeg;base64,${base64String}`;
      img.classList.add("client_img");
      wrapper.appendChild(img);

      const imgWrapper=document.querySelector(".img_wrapper");
      const img2=document.createElement("img");
      img2.src=`data:image/jpeg;base64,${base64String}`;
      imgWrapper.appendChild(img2);
    })
    .catch((error) => {
      console.error("Error fetching profile:", error);
      alert("An error occurred while fetching the profile.");
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
