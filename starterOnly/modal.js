function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelector(".close");
const firstNameInput = document.querySelector("#first");
const lastNameInput = document.querySelector("#last");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalCloseBtn.addEventListener("click", closeModal);

// check firstname event

firstNameInput.addEventListener("keyup", function() { validateValueLength(firstNameInput) });
lastNameInput.addEventListener("keyup", function() { validateValueLength(lastNameInput) });

// validate input value length
function validateValueLength(textInput) {
  if (textInput.value.trim().length < 2) {
    textInput.setCustomValidity("Veuillez compléter votre champ avec plus de deux caractères");
    textInput.reportValidity();
  } else {
    textInput.setCustomValidity("");
  }
}


// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}


