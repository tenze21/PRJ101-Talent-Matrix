const form= document.querySelector('#verification_form');
const inputs= document.querySelectorAll('#verification_code');
const button= document.querySelector('#next_btn');

let code=[];
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    code=[];
    inputs.forEach(input=>{
        code.push(input.value)
    })
    if(code.length>4){
        code.splice(0,4)
    }
    let codeStr=code.join('');
    let codeInt=parseInt(codeStr)
    console.log(code);
    console.log(codeStr);
    console.log(codeInt);
    window.location.href ="../passwordreset.html";
})

inputs.forEach((input, index1)=>{
    input.addEventListener('keyup', (e)=>{
        const currentInput=input,
         nextInput=input.nextElementSibling,
         prevInput=input.previousElementSibling;

         if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value!==""){
             nextInput.removeAttribute("disabled");
             nextInput.focus();
         }

         if(e.key==="Backspace"){
            inputs.forEach((input, index2)=>{
                if(index1<=index2 && prevInput){
                    input.setAttribute("disabled", true);
                    input.value="";
                    prevInput.focus();
                }
            })
         }

         if (!inputs[3].disabled && inputs[3].value !== ""){
            button.classList.add("active");
            return;
         }
         button.classList.remove("active");
    });
});

window.addEventListener("load", ()=>{
    inputs[0].focus();
})

function SentOTP(){
    const email = document.getElementById("email");
    const otpverify = document.getElementsByClassName("email-verify")[0];

    let otp_code = Math.floor(Math.random()*10000);
    let emailbody = `<h1> Your OTP is </h1> ${otp_code}`
    Email.send({
        SecureToken : "dac5733e-18ac-4e7f-9374-01685dd4ac17",
        To : email.value,
        From : "talentmatrix.bht@gmail.com",
        Subject : "Password Recovery",
        Body : "And this is the body"
    }).then(
      message => {
        if(message ==="OK"){
            alert("OTP sent to your email" + email.value);

            otpverify.computedStyleMap.display = "flex";
            let otp_inp = document.getElementById("verification_code");
            let otp_btn = document.getElementById("next_btn");

            otp_btn.addEventListener("click", ()=>{
                if(codeInt.value == otp_code) {
                    alert("Proceed to create new password");
                    otpverify.computedStyleMap.display = "none";
                    email.value ="";
                    otp_inp.value ="";
                }
                else{
                    alert("Invalid OTP")
                }
            })
        }
      }
    );
}

