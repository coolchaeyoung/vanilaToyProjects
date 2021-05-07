const figureParts = document.querySelectorAll(".figure-part");
const wrongWordContainer = document.getElementById("wrong-letters");
const wordContainer = document.getElementById("word");
const popup = document.getElementById("popup-container");
const finalMessage = document.getElementById("final-message");
const finalRevealWord = document.getElementById("final-message-reveal-word");
const notification = document.getElementById("notification-container");
const playBtn = document.getElementById("play-button");

const WORDLIST = ["became", "arrow", "article", "therefore"];

let keyDownList = [];
let wrongList = [];
let rightList = [];
let randomWordArr;
let rightCount = 0;
let wrongCount = 0;

const renderRight = (keyChar) => {
  randomWordArr.forEach((wordChar, idx) => {
    if (keyChar === wordChar) {
      rightList[idx] = keyChar;
      ++rightCount;
    }
  });
  wordContainer.innerHTML = rightList
    .map((c) => `<div class="letter">${c}</div>`)
    .join("");
  if (rightCount === randomWordArr.length) {
    finalMessage.textContent = "Congratulations! You won! 😃";
    popup.style.display = "flex";
  }
};

const renderWrong = (keyChar) => {
  figureParts[wrongCount++].style.display = "block";
  wrongWordContainer.innerHTML = `<p>Wrong</p><span>${wrongList.map(
    (wrong) => wrong
  )}</span>`;
  if (wrongCount === 6) {
    finalMessage.textContent = "Unfortunately you lost. 😕";
    popup.style.display = "flex";
  }
};

const handleKeyDown = (e) => {
  const keyChar = String.fromCharCode(e.keyCode + 32);
  if (keyDownList.indexOf(keyChar) === -1) {
    if (randomWordArr.includes(keyChar)) {
      renderRight(keyChar);
    } else {
      wrongList.push(keyChar);
      renderWrong(keyChar);
    }
    keyDownList.push(keyChar);
  } else {
    notification.classList.add("show");
    setTimeout(() => {
      notification.classList.remove("show");
    }, 2000);
  }
};

const wordSet = () => {
  rightList = Array.from({ length: randomWordArr.length }, () => "");
  wordContainer.innerHTML = randomWordArr
    .map((c) => `<div class="letter"></div>`)
    .join("");
};

const init = () => {
  keyDownList = [];
  wrongList = [];
  rightList = [];
  randomWordArr = [];
  rightCount = 0;
  wrongCount = 0;
  popup.style.display = "none";
  figureParts.forEach((el) => (el.style.display = "none"));
  wrongWordContainer.innerHTML = "";
  randomWordArr = WORDLIST[parseInt(Math.random() * WORDLIST.length, 10)].split(
    ""
  );
  wordSet();
};

init();

playBtn.addEventListener("click", init);
window.addEventListener("keydown", handleKeyDown);
