// When the form is submitted, validate
document.getElementById("pizza-form").onsubmit = () => {
  clearErrors();
  // flag variable to determine if form data is valid
  let isValid = true;

  let fname = document.getElementById("fname").value.trim();
  let lname = document.getElementById("lname").value.trim();
  let email = document.getElementById("email").value.trim();

  if (!fname) {
    isValid = false;
    document.getElementById("err-fname").style.display = "block";
  }

  if (!lname) {
    isValid = false;
    document.getElementById("err-lname").style.display = "block";
  }

  if (!email || email.indexOf("@") === -1) {
    document.getElementById("err-email").style.display = "block";
    isValid = false;
  }

  let methodButtons = documents.getElementByName("method").value();
  let count = 0;
  for (let methodButton of methodButtons) {
    if (methodButton.checked) {
      count++;
    }
  }
  if (count === 0) {
    document.getElementById("err-method").style.display = "block";
    isValid = false;
  }

  let size = document.getElementById("size").value;
  if (size === "none") {
    document.getElementById("err-size").style.display = "block";
    isValid = false;
  }

  return isValid;
};

function clearErrors() {
  let errors = document.getElementsByClassName("error");
  for (let error of errors) {
    error.style.display = "none";
  }
}
