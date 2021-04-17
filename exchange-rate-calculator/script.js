const selectTop = document.getElementById("currency-one");
const selectBottom = document.getElementById("currency-two");
const SwapBtn = document.getElementById("swap");
const rate = document.getElementById("rate");
const inputTop = document.getElementById("amount-one");
const inputBottom = document.getElementById("amount-two");

const API_KEY = "0c4c8a92842ee9fa60f11c5d";
let currency;

const swap = (a, b, key) => {
  const tmp = a[key];
  a[key] = b[key];
  b[key] = tmp;
};

const updateInputValue = () => {
  const value = inputTop.value * currency;
  inputBottom.value = value.toFixed(2);
};

const startFetch = async (input, output) => {
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${input}/${output}`
  );
  const { conversion_rate } = await response.json();
  currency = +conversion_rate;
  rate.textContent = `1 ${input} = ${currency} ${output}`;
  updateInputValue();
};

const handleSwapClick = () => {
  startFetch(selectBottom.value, selectTop.value);
  swap(selectTop, selectBottom, "value");
};

const handleSelectChange = () => {
  startFetch(selectTop.value, selectBottom.value);
};

SwapBtn.addEventListener("click", handleSwapClick);
selectTop.addEventListener("change", handleSelectChange);
inputTop.addEventListener("input", updateInputValue);

((a, b) => {
  startFetch(a, b);
})(selectTop.value, selectBottom.value);
