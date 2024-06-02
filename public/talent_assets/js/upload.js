let profilePic=document.getElementById("profile-pic");
let inputFile=document.getElementById("input-file");

inputFile.onchange=function(){
    profilePic.src=URL.createObjectURL(inputFile.files[0]);
}


const usernameEl=document.getElementById("username");
const dzongkhagEl=document.getElementById("dzongkhag");
const regionEl=document.getElementById("gewog");
const bioEl=document.getElementById("bio");
const schoolEl=document.getElementById("school");
const StudyFieldEl=document.getElementById("study-field");
const eduFromEl=document.getElementById("edufrom");
const eduTillEl=document.getElementById("edutill");
