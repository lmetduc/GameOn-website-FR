function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


// DOM Element
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelectorAll(".close-btn");
const confirmationMsg = document.querySelector(".confirmation__title");
const confirmationBtn = document.querySelector(".button-confirm.close-btn");
const form = document.querySelector("form");

/*
 * launch modal event
 */
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));


/*
 * close modal event
 */
modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));


/*
 * add an eventlistener for keyup event on each .formData element
 */
formData.forEach((formElement) => {
  const input = formElement.querySelector("input");

  if (input.name === "location") {
    const radios = formElement.querySelectorAll("input[type=radio]");
    radios.forEach((radio) => radio.addEventListener("change", function () { validateRadio(radios, "location") }));
  } else if (input.id === "checkbox1") {
    input.addEventListener("change", function () {
      validateInput(input.id, input.checked)
    });
  } else if (input.id === "quantity" || input.id === "birthdate") {
    input.addEventListener("change", function () {
      validateInput(input.id, input.value)
    });
  } else {
    input.addEventListener("keyup", function () {
      validateInput(input.id, input.value)
    });
  }
})

/*
 * Validate an input
 *
 * @param {*} inputId this id of the input to validate
 * @param {*} value the value of the input to validate
 */
function validateInput(inputId, value) {
  let isValid = true;
  let errorMsg = "";

  if (inputId === "first" || inputId === "last") {
    ({ isValid, errorMsg } = validateLength(value));
  } else if (inputId === "email") {
    ({ isValid, errorMsg } = validateEmail(value));
  } else if (inputId === "quantity") {
    ({ isValid, errorMsg } = validateQuantity(value));
  } else if (inputId === "checkbox1") {
    ({ isValid, errorMsg } = validateChecked(value));
  } else if (inputId === "birthdate") {
    ({ isValid, errorMsg } = validateBirthdate(value));
  }

  setError(inputId, errorMsg, isValid);
  return isValid;
}

function validateLength(value, minLength = 2) {

  if (value.trim().length < minLength) {
    return { isValid: false, errorMsg: "Veuillez compléter votre champ avec plus de deux caractères" };
  }
  return { isValid: true, errorMsg: "" };
}

function validateEmail(value) {
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (value.trim().length === 0) {
    return { isValid: false, errorMsg: "Ce champ est requis" };
  } else if (!value.match(emailPattern)) {
    return { isValid: false, errorMsg: "Veuillez renseigner un email valide" };
  }
  return { isValid: true, errorMsg: "" };
}

function validateQuantity(value) {
  if (value.trim() === "") {
    return { isValid: false, errorMsg: "Ce champ est requis" };
  } else if (parseInt(value) < 0 || parseInt(value) > 99) {
    return { isValid: false, errorMsg: "Veuillez indiquer un nombre compris entre 0 et 99" };
  }
  return { isValid: true, errorMsg: "" };
}

function validateBirthdate(value) {
  const birthdate = new Date(value).getTime();
  let now = new Date();
  let currentYear = now.getFullYear();

  // Do not allow birthdate less than 18 years ago
  const minDate = new Date(now.setFullYear(currentYear - 18)).getTime();
  
  if (birthdate > minDate) {
    return { isValid: false, errorMsg: "Vous devez avoir au moins 18 ans pour participer" };
  } else if (value === "") {
    return { isValid: false, errorMsg: "Veillez indiquer votre date de naissance" };
  }
  return { isValid: true, errorMsg: "" };
}

function validateChecked(checked) {
  if (!checked) {
    return { isValid: false, errorMsg: "Vous devez accepter les termes et conditions" };
  }
  return { isValid: true, errorMsg: "" };
}

/*
 * Validate radio in a given form element (validate a radio is checked)
 * @param {*} formElement the form element to validate radio for
 */
function validateRadio(inputs, name) {
  let isChecked = false;
  inputs.forEach((radio) => {
    if (radio.checked) {
      isChecked = true;
    }
  });

  const formError = document.querySelector(`#${name}-error`);
  if (!isChecked) {
    inputs.forEach((radio) => {
      radio.classList.add("invalid");
    });
    formError.innerHTML = "Veuillez choisir un tournois";
    formError.style.display = "block";
  } else {
    inputs.forEach((radio) => {
      radio.classList.remove("invalid");
    });
    formError.innerHTML = "";
    formError.style.display = "none";
  }

  return isChecked;
}

/*
 * Set the error message for the given input discriminate by its id
 *
 * @param {*} inputId the id of the input to set the error on
 * @param {*} errorMsg the error message to set for the given input
 * @param {*} toRemove define if the error need to be added or cleared
 */
function setError(inputId, errorMsg, toRemove) {
  const formError = document.querySelector(`#${inputId}-error`);
  const input = document.querySelector(`#${inputId}`);

  const checkbox = document.querySelector(`label[for=${inputId}] > .checkbox-icon`);
  if (checkbox) {
    if (toRemove) {
      checkbox.classList.remove("invalid");
    } else {
      checkbox.classList.add("invalid");
    }
  }

  if (toRemove) {
    input.classList.remove("invalid");
    formError.innerHTML = "";
    formError.style.display = "none";
  } else {
    input.classList.add("invalid");
    formError.innerHTML = errorMsg;
    formError.style.display = "block";
  }
}

/*
 * Validate form: 
 * - prevent default behaviour
 * - validate each fields
 */
function validateForm(e) {
  e.preventDefault();

  let isValid = true;
  
  formData.forEach((formElement) => {
    const input = formElement.querySelector("input");
    if (input.name === "location") {
      const valid = validateRadio(formElement.querySelectorAll("input[type=radio]"), "location");
      if (!valid) {
        isValid = false;
      }
    } else if (input.id === "checkbox1") {
      const valid = validateInput(input.id, input.checked)
      if (!valid) {
        isValid = false;
      }
    } else {
      const valid = validateInput(input.id, input.value);
      if (!valid) {
        isValid = false;
      }
    }
  });

  if (isValid) {
    displayConfirmation();
    form.reset();
  }
}

/*
 * Validate form on submit
 */
form.addEventListener("submit", validateForm);

function displayConfirmation() {
  confirmationMsg.style.display = "block";
  confirmationBtn.style.display = "block";
  form.style.display = "none";
}

/*
 * launch modal form
 */
function launchModal() {
  modalbg.style.display = "block";
}

/*
 * close modal form
 */
function closeModal() {
  confirmationMsg.style.display = "none";
  confirmationBtn.style.display = "none";
  form.style.display = "block";
  modalbg.style.display = "none";
}


