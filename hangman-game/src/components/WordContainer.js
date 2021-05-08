export default class wordContainer {
  constructor({ $game, initialState }) {
    this.state = initialState;
    this.$target = document.createElement("div");
    this.$target.className = "word";
    $game.appendChild(this.$target);
    this.render();
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  render() {
    this.$target.innerHTML = `${this.state.word
      .split("")
      .map(
        (el) =>
          `<div class="letter">${
            this.state.inputKeyList.includes(el) ? el : ""
          }</div>`
      )
      .join("")}`;
  }
}
