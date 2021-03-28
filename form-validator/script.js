const SUCCESS = "success";
const ERROR = "error";

const classRemoveAdd = (element, removeClass, addClass) => {
  element.classList.remove(removeClass);
  element.classList.add(addClass);
};

const getValues = (input) => {
  const value = input.value;
  const form = input.parentNode;
  const small = input.parentNode.querySelector("small");
  return [value, form, small];
};

const checkUsername = () => {
  const usernameInput = document.getElementById("username");
  const [username, usernameForm, usernameSmall] = getValues(usernameInput);
  if (username.length < 3) {
    classRemoveAdd(usernameForm, SUCCESS, ERROR);
    usernameSmall.innerText = "Username must be at least 3 characters";
    return;
  }
  classRemoveAdd(usernameForm, ERROR, SUCCESS);
};

const emailCheck = () => {
  const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const emailInput = document.getElementById("email");
  const [email, emailForm, emailSmall] = getValues(emailInput);
  if (!emailRegex.test(email)) {
    classRemoveAdd(emailForm, SUCCESS, ERROR);
    emailSmall.innerText = "Email is not valid";
    return;
  }
  classRemoveAdd(emailForm, ERROR, SUCCESS);
};

const pswdCheck = () => {
  const pswdInput = document.getElementById("password");
  const [pswd, pswdForm, pswdSmall] = getValues(pswdInput);
  if (pswd.length < 6) {
    classRemoveAdd(pswdForm, SUCCESS, ERROR);
    pswdSmall.innerText = "Password must be at least 6 characters";
    return;
  }
  classRemoveAdd(pswdForm, ERROR, SUCCESS);
};

const confirmPswdCheck = () => {
  const pswd = document.getElementById("password").value;
  const confirmPswdInput = document.getElementById("password2");
  const [confirmPswd, confirmPswdForm, confirmPswdSmall] = getValues(
    confirmPswdInput
  );
  if (!confirmPswd) {
    classRemoveAdd(confirmPswdForm, SUCCESS, ERROR);
    confirmPswdSmall.innerText = "Confirm Password is required";
    return;
  }
  if (pswd !== confirmPswd) {
    classRemoveAdd(confirmPswdForm, SUCCESS, ERROR);
    confirmPswdSmall.innerText = "Passwords do not match";
    return;
  }
  classRemoveAdd(confirmPswdForm, ERROR, SUCCESS);
};

const handleSubmit = (e) => {
  e.preventDefault();
  checkUsername();
  emailCheck();
  pswdCheck();
  confirmPswdCheck();
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
