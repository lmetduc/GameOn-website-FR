function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/**
 * DOM Element
 */
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelector(".close");

/**
 * launch modal event
 */
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));


/**
 * close modal event
 */
modalCloseBtn.addEventListener("click", closeModal);


/**
 * form
 */
const form = document.querySelector("form");

/**
 * email validation regex
 */
const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * add an eventlistener for keyup event on each .formData element
 */
formData.forEach((formElement) => {
  const input = formElement.querySelector("input");

  if (input.name === "location") {
    const radios = formElement.querySelectorAll("input[type=radio]");
    radios.forEach((radio) => radio.addEventListener("change", function() { validateRadio(formElement) } ));
  } else if (input.id === "checkbox1" || input.id === "checkbox2") {
    const checkbox = formElement.querySelector("input#checkbox1");
    const inputId = checkbox.id;
    checkbox.addEventListener("change", function() { validateInput(inputId, checkbox.checked) } );
  } else if (input.id === "quantity" || input.id === "birthdate") {
    const inputId = input.id;
    input.addEventListener("change", function() { validateInput(inputId, input.value) } );
  } else {
    const inputId = input.id;
    input.addEventListener("keyup", function() { validateInput(inputId, input.value) } );
  }
})

/**
 * Validate an input
 * @param {*} inputId this id of the input to validate
 * @param {*} value the value of the input to validate
 */
function validateInput(inputId, value) {
  let isValid = true;
  let errorMsg = "";
  
  if (inputId === "first" || inputId === "last") {
    isValid = value.trim().length >= 2;
    errorMsg = "Veuillez compléter votre champ avec plus de deux caractères";
  } else if (inputId === "email") {
    if (value.trim().length === 0) {
      isValid = false;
      errorMsg = "Ce champ est requis";
    } else if (!value.toLowerCase().match(emailPattern)) {
      isValid = false;
      errorMsg = "Veuillez renseigner un email valide";
    }
  } else if (inputId === "quantity") {
    if (value === "") {
      isValid = false;
      errorMsg = "Ce champ est requis";
    } else if (value < 0 || value > 99) {
      isValid = false;
      errorMsg = "Veuillez indiquer un nombre compris entre 0 et 99";
    }
  } else if (inputId === "checkbox1") {
    isValid = value;
    errorMsg = "Vous devez accepter les termes et conditions";
  } else if (inputId === "birthdate") {
    const birthdate = new Date(value).getTime();
    // Do not allow birthdate less than 18 years ago
    const minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18)).getTime();
    // Do not allow birthdate 150 years ago
    const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 150)).getTime();
    if (birthdate < maxDate) {
      isValid = false;
      errorMsg = "Veilleuz choisir une date plus récente";
    } else if (birthdate > minDate) {
      isValid = false;
      errorMsg = "Vous devez avoir au moins 18 ans pour participer";
    } else if (value === "") {
      isValid = false;
      errorMsg = "Veillez indiquer votre date de naissance";
    }
  }

  if (isValid) {
    removeError(inputId);
  } else {
    setError(inputId, errorMsg);
  }
}

/**
 * Validate radio in a given form element (validate a radio is checked)
 * @param {*} formElement the form element to validate radio for
 */
function validateRadio(formElement) {
  const input = formElement.querySelectorAll("input[type=radio]");

  let isChecked = false;
  let name = input[0].name;
  input.forEach((radio) => {
    if (radio.checked) {
      isChecked = true;
    }
  });

  const formError = document.querySelector(`#${name}-error`);
  if (!isChecked) {
    input.forEach((radio) => {
      radio.classList.add("invalid");
    });
    formError.innerHTML = "Veuillez choisir un tournois";
    formError.style.display = "block";
  } else {
    input.forEach((radio) => {
      radio.classList.remove("invalid");
    });
    formError.innerHTML = "";
    formError.style.display = "none";
  }
}

/**
 * Set the error message for the given input discriminate by its id
 * @param {*} inputId the id of the input to set the error on
 * @param {*} errorMsg the error message to set for the given input
 */
function setError(inputId, errorMsg) {
  const formError = document.querySelector(`#${inputId}-error`);
  const input = document.querySelector(`#${inputId}`);

  const checkbox = document.querySelector(`label[for=${inputId}] > .checkbox-icon`);  
  if (checkbox) {
    checkbox.classList.add("invalid");
  }

  input.classList.add("invalid");
  formError.innerHTML = errorMsg;
  formError.style.display = "block";
}

/**
 * Clear the error message for the given input discriminate by its id
 * @param {*} inputId the id of the input to remove error for
 */
function removeError(inputId) {
  const formError = document.querySelector(`#${inputId}-error`);
  const input = document.querySelector(`#${inputId}`);

  const checkbox = document.querySelector(`label[for=${inputId}] > .checkbox-icon`);  
  if (checkbox) {
    checkbox.classList.remove("invalid");
  }

  input.classList.remove("invalid");
  formError.innerHTML = "";
  formError.style.display = "none";
}

/**
 * Validate form: 
 * - prevent default behaviour
 * - validate each fields
 */
function validateForm(e) {
  e.preventDefault();
  formData.forEach((formElement) => {
    const input = formElement.querySelector("input");
    if (input.name === "location") {
      validateRadio(formElement);
    } else if (input.id === "checkbox1" || input.id === "checkbox2") {
      const checkbox = formElement.querySelector("input#checkbox1");
      const inputId = checkbox.id;
      validateInput(inputId, checkbox.checked);
    } else {
      const inputId = input.id;
      validateInput(inputId, input.value);
    }
  })
}

/**
 * Validate form on submit
 */
form.addEventListener("submit", validateForm);

/**
 * launch modal form
 */
function launchModal() {
  modalbg.style.display = "block";
}

/**
 * close modal form
 */
function closeModal() {
  modalbg.style.display = "none";
}


