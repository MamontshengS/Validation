const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');
const passwordVisibleCheckbox = document.getElementById('password-visible');
const eyeIcon = document.getElementById('eye-icon');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Clear previous error messages
  const errors = document.querySelectorAll('.error');
  errors.forEach((error) => {
    error.textContent = '';
    error.classList.remove('error');
  });

  // Validate username
  if (!username.value.trim()) {
    setError(username, 'Username is required');
    return;
  }

  // Validate email
  if (!validateEmail(email.value.trim())) {
    setError(email, 'Invalid email');
    return;
  }

  // Validate password
  if (!validatePassword(password.value.trim())) {
    setError(password, 'Password must be between 7 and 12 characters, contain at least one uppercase letter, one lowercase letter, and one special character');
    return;
  }

  // Validate confirmation password
  if (password.value !== cpassword.value) {
    setError(cpassword, 'Passwords do not match');
    return;
  }

  // Submit form if all fields are valid
  form.submit();
});

function setError(input, message) {
  const error = input.nextElementSibling;
  error.textContent = message;
  error.classList.add('error');
  input.classList.add('error');
}

function setSuccess(input) {
  const error = input.nextElementSibling;
  error.textContent = '';
  error.classList.remove('error');
  input.classList.remove('error');
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialCharacter = /[\*\_\#\&\!]/.test(password);
  const length = password.length;

  return length >= 7 && length <= 12 && hasUppercase && hasLowercase && hasSpecialCharacter;
}

passwordVisibleCheckbox.addEventListener('change', () => {
  if (passwordVisibleCheckbox.checked) {
    password.type = 'text';
    eyeIcon.classList.add('fa-eye-slash');
    eyeIcon.classList.remove('fa-eye');
  } else {
    password.type = 'password';
    eyeIcon.classList.add('fa-eye');
    eyeIcon.classList.remove('fa-eye-slash');
  }
});