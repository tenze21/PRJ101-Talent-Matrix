const password= document.querySelector('#password');
const showHidePassword= document.querySelector('.password-hide');


// Use the function to get the contactnumber cookie
let role = getCookie('role');
showHidePassword.addEventListener('click', function(){
    this.classList.toggle('bx-show')
    if(password.type==='password'){
        password.type='text'
    }else{
        password.type='password'
    }
})

const form =document.querySelector(".login-form");
const loginError=document.getElementById('login_error');
// Use the function to get the contactnumber cookie
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let data={
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };
    fetch('/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        if (result.token) {
            // Set the role in a cookie
            document.cookie = `role=${result.role};path=/`;

            // Redirect based on role
            if (result.role === 'admin') {
                window.open("views/admin/talent.html", "_self");
            } else if (result.role === 'talent') {
                window.open("views/talent/search.html", "_self");
            } else {
                window.open("views/client/talents.html", "_self");
            }
        } else {
            // Handle login errors
            loginError.textContent = result.message || 'Login failed';
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        loginError.textContent = 'An error occurred during login';
    });
});

function getCookie(name) {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        // Check if this cookie string begins with the name we want
        if (cookie.indexOf(name + '=') == 0) {
            return cookie.substring((name + '=').length, cookie.length);
        }
    }
    return null;
};
