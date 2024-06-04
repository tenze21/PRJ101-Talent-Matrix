// opening the profile editing form
// get cookie

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  
  // get client data
  const userEmail = decodeURIComponent(getCookie("user_email"));
  
  window.onload = function () {
  
    console.log(userEmail);
    fetch(`/client/get_client_email/${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let userData = data[0];

        const skillsContainer = document.querySelector(".skills");
      const expertise=userData.expertise.split(",");
      expertise.forEach((skill) => {
        const li = document.createElement("li");
        li.className = "skill";
        li.textContent = skill;
        skillsContainer.appendChild(li);
      });

      document.getElementById("username").textContent = userData.username;
      document.getElementById("fullname").textContent = userData.fullname;
      document.getElementById("email").textContent = userData.email;
      document.querySelector(".address h5").innerHTML = `<span>${userData.dzongkhag}</span>, <span>${userData.region}</span>`;
      document.getElementById("experience").textContent = userData.experiences;
      document.getElementById("about").textContent = userData.bio;

      document.getElementById("school").textContent = userData.school;
      document.getElementById("field_of_study").textContent = userData.field_of_study;
      document.getElementById("date_from").textContent = userData.education_date_from.split("T")[0];
      document.getElementById("date_to").textContent = userData.education_date_to.split("T")[0];

      document.getElementById("title").textContent = userData.ex_position;
    //   document.getElementById("company").textContent = userData.company;
    //   document.getElementById("from").textContent = userData.employment_from.split("T")[0];
    //   document.getElementById("to").textContent = userData.employment_to.split("T")[0];

    //   document.querySelector(".facebook").parentNode.href = userData.facebook;
    //   document.querySelector(".twitter").parentNode.href = userData.twitter;
    //   document.querySelector(".linkdin").parentNode.href = userData.linkedin;
  
        if(userData.profile_img){
          var base64String = arrayBufferToBase64(userData.profile_img.data);
          const wrapper1=document.querySelector('.profile');
          const img=document.createElement("img");
          img.style.borderRadius="50%";
          img.style.width="70px";
          img.style.height="40px";
          img.src=`data:image/jpeg;base64,${base64String}`;
          wrapper1.appendChild(img);
    
          const imgWrapper=document.querySelector(".wrapper_main");
          const img2=document.createElement("img");
          img2.src=`data:image/jpeg;base64,${base64String}`;
          img2.style.borderRadius="50%";
          imgWrapper.appendChild(img2);
  
          const wrapperMain=document.querySelector('.wrapper');
          const img3=document.createElement("img");
          img3.src=`data:image/jpeg;base64,${base64String}`;
          img3.style.borderRadius="50%";
          img3.style.height="150px";
          img3.style.width="150px";
          wrapperMain.appendChild(img3);
  
          const defaultProfile1=document.getElementById("default_profile1");
          const defaultProfile2=document.getElementById("default_profile2");
          const defaultProfile3=document.getElementById("default_profile3");
          defaultProfile1.style.display="none";
          defaultProfile2.style.display="none";
          defaultProfile3.style.display="none";
        }
        // Update organization information
        document.getElementById("organization_nameValue").textContent = userData.organisation;
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
  