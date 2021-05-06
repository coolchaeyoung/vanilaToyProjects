const body = document.querySelector("body");
const navBtn = document.getElementById("toggle");
const signUpBtn = document.getElementById("open");
const closeBtn = document.getElementById("close");
const modal = document.getElementById("modal");

navBtn.addEventListener("click", () => {
  body.classList.toggle("show-nav");
});

signUpBtn.addEventListener("click", () => {
  modal.classList.add("show-modal");
});
closeBtn.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});
modal.addEventListener("click", (e) => {
  if (
    !e.target.closest(".modal") &&
    modal.className.indexOf("show-modal") !== -1
  ) {
    modal.classList.remove("show-modal");
  }
});
