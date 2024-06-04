
// Search suggestions logic
const options = [
  "Machine Learning",
  "Natural Language Processing",
  "Neural Networks",
  "Deep Learning",
  "Reinforcement Learning",
  "Autonomous Systems",
  "Drawing",
  "Painting",
  "Digital Art",
  "Sculpture",
  "Photography",
  "Photo Editing",
  "Illustration",
  "Fashion Design",
  "Textile Design",
  "Pattern Making",
  "Model Casting",
  "Fashion Marketing",
  "Brand Management",
  "Fashion Photography",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe Indesign",
  "Typography",
  "Logo Design",
  "Branding",
  "Layout Design",
  "Motion Graphics",
  "UI/UX Design",
  "User Centered Design",
  "Music Production",
  "Audio Engineering",
  "Song Writing",
  "Sound Editing",
  "Voiceover",
  "Python",
  "Java",
  "C++",
  "Operating Systems",
  "Angular",
  "React",
  "Golang",
  "Next js",
  "Data Structure & Algorithm",
  "Cloud Computing",
  "Server Management",
  "Ruby",
  "GraphQl",
  "Network Management",
  "Ethical Hacking",
  "Cyber Security",
  "Digital Marketing",
  "Social Media Marketing",
  "Content Marketing",
  "Search Engine Optimization",
  "Market Research",
  "Sales Strategy",
  "Customer Relationship Management",
  "Advertising",
  "3D Modeling",
  "Video Editing",
  "Visual Effects",
  "Character Design",
  "Cinematography",
  "Animation",
  "Frontend Development",
  "Backend Development",
  "Full-Stack Development",
  "Mobile App Development (iOS/Android)",
  "Responsive Design",
  "DevOps",
  "Copywriting",
  "Creative Writing",
  "Technical Writing",
  "Editing & Proofreading",
  "Translation (various languages)",
  "Content Creation",
  "Scriptwriting",
  "Transcreation",
  "Carpentry",
  "Music & Audio",
  "Artificial Intelligence",
  "Blockchain Technology",
  "Graphics Design",
  "Web Design"
];

const searchInput= document.querySelector('#search');
const resultDisplay= document.querySelector('.search_box');
const searchForm= document.querySelector('#search_form');

searchInput.onkeyup= function(){
  resultDisplay.style.display='block';
  let result=[];
  let input= searchInput.value;
  if(input){
      result= options.filter((option)=>{
      return option.toLowerCase().includes(input.toLowerCase());
    })
  }
  display(result);
}

function display(result){
  const content=result.map((list)=>{
    return "<li onclick=selectInput(this)>"+ list + "</li>";
  })
  resultDisplay.innerHTML="<ul>"+ content.join('') +"</ul>";
}

function selectInput(list){
  let selectedOption= list.innerHTML;
  searchInput.value=selectedOption;
  resultDisplay.innerHTML="";
  searchForm.submit();
  searchInput.value= selectedOption;
};

window.onload = function () {
  console.log("here");
  fetch("/talent/get_all_talent")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showTalents(data);
    });

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
        if(data.profile_img.data){
          var base64String = arrayBufferToBase64(data.profile_img.data);
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
  
          const defaultProfile1=document.getElementById("default_profile1")
          const defaultProfile2=document.getElementById("default_profile2")
          defaultProfile1.style.display="none";
          defaultProfile2.style.display="none";
        }
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


;

function showTalents(talents){
  const wrapper=document.querySelector(".talent_cards_wrapper");
  talents.forEach((talent)=>{
    const container=document.createElement("div");
    container.classList.add("card_container");

    const imgWrapper=document.createElement("div");
    imgWrapper.classList.add("talent_image");
    const img=document.createElement("img");
    img.src="/admin_assets/images/_Co-working Life__ by Stocksy Contributor _BONNINSTUDIO _ 1.svg";
    imgWrapper.appendChild(img);
    container.appendChild(imgWrapper);

    const name=document.createElement("h2");
    name.classList.add("username");
    name.textContent=talent.username;
    container.appendChild(name);

    const address=document.createElement("p");
    address.classList.add("address");
    address.innerHTML=`<span class="address-icon material-symbols-outlined">location_on</span>
    <span id="dzongkhag">${talent.dzongkhag}</span>, <span>${talent.region}</span>`
    container.appendChild(address);

    const skillsWrapper=document.createElement("div");
    skillsWrapper.classList.add("skills_wrapper");
    const skills=talent.expertise.split(",");
    skillsWrapper.innerHTML=`
    <ul>
    <li>${skills[0]}</li>
    <li>${skills[1]}</li>
    <li>${skills[2]}</li>
    </ul>
    `
    container.appendChild(skillsWrapper)

    const btn=document.createElement("a");
    btn.classList.add("card_btn");
    btn.textContent="see more";
    btn.href=`/views/client/talent_profile.html?email=${encodeURIComponent(talent.email)}`;
    container.appendChild(btn);

    wrapper.appendChild(container);
  });
}