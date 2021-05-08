export default class WrongLetter {
  constructor({ $game, initailState }) {
    this.state = initailState;
    this.$target = document.createElement("div");
    this.$target.className = "wrong-letters-container";
    $game.appendChild(this.$target);
    this.render();
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  render() {
    this.$target.innerHTML =
      this.state.wrongList.length > 0
        ? `<p>Wrong</p><span>${this.state.wrongList.join(" ")}</span>`
        : "";
  }
}
