const form= document.querySelector('#project_creation_form');
const success= document.querySelector('.success');
const logo= document.querySelector('.logo');
const main= document.querySelector('main');

const title=document.getElementById("project_title");
const description=document.getElementById("project_description");
const scopes=document.getElementsByName("Project_Scope");
let selectedScope;
scopes.forEach(scope=>{
    scope.addEventListener('click',()=>{
        selectedScope=scope.value
    })
});
const payment=document.getElementById("payment");

// let skills;
// let selectedSkills=[];
// skills.forEach(skill=>{
//     selectedSkills.push(skill["label"])
// })
let skills=[];
// const selectedSkill=skills.map(item=>item.label)
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data={
        prj_title: title.value,
        prj_description: description.value,
        prj_scope: selectedScope,
        prj_skills: skills.toString(),
        prj_payment: payment.value
    }
    console.log(data);
    
    fetch("/create_project", {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data),
    })
    .then((res)=>{
        if(res.status===201){
            showSuccess();
        }else{
            alert("Project Creation error!")
        }
    })
    .catch(e=>{
        console.error("error:", e)
    });
});

function showSuccess(){
    main.style.display="none";
    success.style.display="flex";
}


// Skill selection functionality (library)
new MultiSelectTag('skills', {
    rounded: true,    // default true
    shadow: false,      // default false
    placeholder: 'Search',  // default Search...
    tagColor: {
        textColor: '#0d79dd',
        borderColor: '#0d79dd',
        bgColor: '#fff',
    },
    onChange: function(values) {
        skills = values.map(item => item.value);
        console.log(skills); 
    }
});

