export default class Loading {
  constructor({ $container, intialState }) {
    this.state = intialState;
    this.$target = document.createElement("div");
    this.$target.className = "loading";
    $container.appendChild(this.$target);

    this.render();
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  render() {
    this.$target.textContent = "Loading...";
    this.$target.style.display = this.state.isLoading ? "block" : "none";
  }
}
