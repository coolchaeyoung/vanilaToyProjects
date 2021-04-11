const movie = document.getElementById("movie");
const seats = document.querySelectorAll(".container .seat");
const count = document.getElementById("count");
const total = document.getElementById("total");

const initScreen = (saveInfo) => {
  movie.value = saveInfo.movie;
  count.innerText = saveInfo.count;
  total.innerText = saveInfo.count * saveInfo.movie;
  saveInfo.seats.forEach((seat, idx) => {
    if (seat.indexOf("seat selected") !== -1) {
      seats[idx].className = "seat selected";
    }
  });
};

const saveLocal = () => {
  const array = [];
  seats.forEach((seat) => array.push(seat.outerHTML));
  localStorage.setItem(
    "movieInfo",
    JSON.stringify({
      count: count.innerText,
      movie: movie.value,
      seats: array,
    })
  );
};

const handleClick = (e) => {
  if (e.target.className === "seat") {
    e.target.className = "seat selected";
    count.innerText = parseInt(count.innerText, 10) + 1;
  } else if (e.target.className === "seat selected") {
    e.target.className = "seat";
    count.innerText = parseInt(count.innerText, 10) - 1;
  }
  total.innerText = count.innerText * movie.value;
  saveLocal();
};

const handleChange = () => {
  total.innerText = parseInt(count.innerText * movie.value, 10);
  saveLocal();
};

const init = () => {
  const saveInfo = JSON.parse(localStorage.getItem("movieInfo"));
  if (saveInfo) {
    initScreen(saveInfo);
  }
  seats.forEach((seat) => seat.addEventListener("click", handleClick));
  movie.addEventListener("change", handleChange);
};

init();
