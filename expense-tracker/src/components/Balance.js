export default class Balance {
  constructor({ $container, initialState }) {
    this.state = initialState;
    this.$target = document.createElement("div");
    $container.appendChild(this.$target);
    this.render();
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  render() {
    this.$target.innerHTML = `<h4>Your Balance</h4><h1>$${this.state}.00</h1>`;
  }
}
