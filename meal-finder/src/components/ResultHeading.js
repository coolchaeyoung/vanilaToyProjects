export default class ResultHeading {
  constructor({ $container, initialState }) {
    this.state = initialState;
    this.$target = document.createElement("div");
    $container.appendChild(this.$target);
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  render() {
    this.$target.innerHTML = `<h2>Search results for '${this.state}'</h2>`;
    this.$target.style.display = this.state ? "block" : "none";
  }
}
