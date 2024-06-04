window.onload = function () {
  console.log("Reloading");

  // Fetch data from the server
  fetch("/client/get_clients")
    .then((response) => {
      // Check if the response is ok (status 200-299)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle the data from the response
      console.log(data);
      generateCards(data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error("Error fetching data:", error);
    });
};

function generateCards(data) {
  const wrapper = document.querySelector(".wrapper");
  
  data.forEach((user) => {
    // Create card wrapper
    const cardWrapper = document.createElement("div");
    cardWrapper.classList.add("card_wrapper");

    // Create img element
    let base64String = arrayBufferToBase64(user.profile_img.data);
    const img = document.createElement("img");
    img.src = `data:image/jpeg;base64,${base64String}`;
    img.alt = "client profile";
    cardWrapper.appendChild(img);

    // Create card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card_body");

    // Create and append client name
    const clientName = document.createElement("h3");
    clientName.id = "client_name";
    clientName.textContent = user.fullname;
    cardBody.appendChild(clientName);

    // Create and append user ID
    const userId = document.createElement("p");
    userId.id = "userid";
    userId.textContent = `User ID: ${user._id}`;
    cardBody.appendChild(userId);

    // Create and append address
    const address = document.createElement("p");
    address.id = "address";

    const dzongkhagSpan = document.createElement("span");
    dzongkhagSpan.id = "dzongkhag";
    dzongkhagSpan.textContent = user.dzongkhag;

    const regionSpan = document.createElement("span");
    regionSpan.id = "region";
    regionSpan.textContent = user.region;

    address.appendChild(dzongkhagSpan);
    address.appendChild(document.createTextNode(", "));
    address.appendChild(regionSpan);

    cardBody.appendChild(address);
    cardWrapper.appendChild(cardBody);

    // Create and append button
    const button = document.createElement("button");
    button.textContent = "See More";
    button.addEventListener('click', ()=>{
      window.location.href=`/views/admin/client_profile.html?email=${encodeURIComponent(user.email)}` 
    });
    cardWrapper.appendChild(button);

    // Append card wrapper to the wrapper
    wrapper.appendChild(cardWrapper);
  });
}

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
