export default class Popup {
  /*
    state
    isPopup
    finalMessage
    word
    */
  constructor({ $app, initialState, onClick }) {
    this.state = initialState;
    this.onClick = onClick;
    this.$target = document.createElement("div");
    this.$target.className = "popup-container";
    $app.appendChild(this.$target);

    this.render();

    this.$target.addEventListener("click", (e) => {
      if (e.target.id === "play-button") {
        this.onClick();
      }
    });
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  render() {
    this.$target.innerHTML = `<div class="popup">
    <h2 id="final-message">${this.state.popupMessage}</h2>
    <h3 id="final-message-reveal-word">${this.state.word}</h3>
    <button id="play-button">Play Again</button></div>`;
    this.$target.style.display = this.state.isPopup ? "flex" : "none";
  }
}
