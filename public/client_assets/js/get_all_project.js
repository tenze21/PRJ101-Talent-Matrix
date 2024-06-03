window.onload = function () {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  // get client data
  const userEmail = decodeURIComponent(getCookie("user_email"));

  //get progile data
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
    });

  //fetching project
  fetch(`/project/get_project_email/${userEmail}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showProject(data)
    });
};

function showProject(prj){
    prj.forEach(project=>{
        const main = document.querySelector(".projects_wrapper");
         const section = document.createElement("section");
         section.setAttribute("id", "pro_card");
         section.setAttribute("aria-labelledby", "project_title");
         section.className = "project_wrapper";

         const btnsDiv = document.createElement("div");
         btnsDiv.className = "btns";

         const hireTalentLink = document.createElement("a");
         hireTalentLink.href = "/views/client/talents.html";
         hireTalentLink.className = "hire_talent";
         hireTalentLink.textContent = "Hire Talents";

         const projectEditLink = document.createElement("a");
         projectEditLink.href = "project_creation.html";
         projectEditLink.className = "project_edit";
         projectEditLink.innerHTML = '<i class="bx bx-edit-alt"></i>';

         const projectTitle = document.createElement("h3");
         projectTitle.setAttribute("id", "project_title");
         projectTitle.textContent = project.prj_title;

         const projectIdP = document.createElement("p");
         projectIdP.innerHTML = `Project ID: <span id="project_id_value">${project._id}</span>`;

         const projectDescription = document.createElement("p");
         projectDescription.setAttribute("id", "project_description");
         projectDescription.textContent = project.prj_description;

         const projectScope = document.createElement("p");
         projectScope.setAttribute("id", "project_scope");
         if(project.prj_scope=="small"){
             projectScope.textContent = "Small(1-2 months)";
         }else if(project.prj_scope=="medium"){
            projectScope.textContent = "Medium(3-5 months)";
         }else{
            projectScope.textContent = "Large(6+ months)";
         }

         const paymentP = document.createElement("p");
         paymentP.innerHTML = `Nu. <span id="payment">${project.prj_payment}</span>`;

         const skillsDiv = document.createElement("div");
         skillsDiv.className = "skills";
         const skills=project.prj_skills.split(",");
         skills.forEach(skill=>{
            const p=document.createElement("p");
            p.setAttribute("id", "skill");
            p.textContent=skill;
            skillsDiv.appendChild(p);
         })

         const markAsDoneDiv = document.createElement("div");
         markAsDoneDiv.className = "mark_as_done_btn";

         const markAsDoneBtn = document.createElement("button");
         markAsDoneBtn.className = "open_confirmation_modal";
         markAsDoneBtn.textContent = "Mark As Done";

         const hr = document.createElement("hr");
         hr.style.marginBottom = "20px";

         // Append elements
         btnsDiv.appendChild(hireTalentLink);
         btnsDiv.appendChild(projectEditLink);

         markAsDoneDiv.appendChild(markAsDoneBtn);

         section.appendChild(btnsDiv);
         section.appendChild(projectTitle);
         section.appendChild(projectIdP);
         section.appendChild(projectDescription);
         section.appendChild(projectScope);
         section.appendChild(paymentP);
         section.appendChild(skillsDiv);
         section.appendChild(markAsDoneDiv);

         main.appendChild(section);
         main.appendChild(hr);

         const noProject=document.getElementById("no_pro");
         noProject.style.display="none";

    })
}
