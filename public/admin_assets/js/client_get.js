window.onload = function () {
  console.log("reloadiong");
  fetch("/client/get_clients")
    .then((response) => response.json())
    .then((data) => {
      // Handle the data from the response
      console.log(data);
      generateCards(data);
    });
};

function generateCards(data) {
  const wrapper = document.querySelector(".wrapper");

  data.forEach((user) => {
    // Create card wrapper
    const cardWrapper = document.createElement("div");
    cardWrapper.classList.add("card_wrapper");

    // Create img element
    const img = document.createElement("img");
    img.src = "/admin_assets/images/default_profile.svg";
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
    cardWrapper.appendChild(button);

    // Append card wrapper to the wrapper
    wrapper.appendChild(cardWrapper);
  });
}
