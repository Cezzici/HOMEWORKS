function validateForm() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById("emailError").innerHTML = "E-mail invalid";
    return false;
  } else {
    document.getElementById("emailError").innerHTML = "";
  }

  var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    document.getElementById("passwordError").innerHTML = "Parolă invalidă";
    return false;
  } else {
    document.getElementById("passwordError").innerHTML = "";
  }

  if (password !== confirmPassword) {
    document.getElementById("confirmPasswordError").innerHTML = "Parolele nu coincid";
    return false;
  } else {
    document.getElementById("confirmPasswordError").innerHTML = "";
  }

  alert("Formularul este valid! Poți să îl trimiți.");
  
  function resetForm() {

  index = 0;
}
  return true;
}
