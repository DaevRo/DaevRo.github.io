// Log in

// Variables
let txtuser = document.querySelector('.txtuser')
let txtpass = document.querySelector('.txtpass')
let submit = document.querySelector('.submit')
let message = document.querySelector('.message');

function myFunc() {
    // declares variables to match element ids
    const username = document.getElementById("txtuser")
    const password = document.getElementById("txtpwd")
        // gets username and password from local storage
    let user = localStorage.getItem('username', username.value);
    let pass = localStorage.getItem('password', password.value);
    //if username.value is the same as user and password.value is the same as pass
    //display login successfull
    //open new window to home.html
    if (username.value == user && password.value == pass) {
        message.innerHTML = "<span style='color: green;'>Login Successful</span>";
        window.open("/html/home.html", "_self")
            //if user name and password doesn't match then display message "username or password is invalid"
    } else {
        message.innerHTML = "<span style='color: red;'>Username or Password Is Invalid</span>";
    }

}
// Sign up 
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error messages
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}
// Show success
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}
// Check to see if email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}
// Check required inputs
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}
// Check length of input if input isn't long enough or if its too long show error message or else show success
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} must be less than ${max} characters`
        );
    } else {
        showSuccess(input);
    }

}
// Check password input 1 and 2 match
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}
// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
// storing inputs to local storage
function store() {
    localStorage.setItem('username', username.value);
    localStorage.setItem('email', email.value);
    localStorage.setItem('password', password.value);
}
// event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
    if (password.value === password2.value && password.value.length > 5 && password.value.length < 25 && username.value.length > 2 && username.value.length < 15 && email.value) {
        alert('Signup succesfull.');
        store();
        window.open("/html/signin.html", "_self")
    } else {
        alert('ERROR.');
    }
});