export default class Main {
  constructor({ $container, initialState }) {
    this.state = initialState;
    this.$target = document.createElement("main");
    $container.appendChild(this.$target);

    this.render();
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  formatNum(number) {
    return `$${number.toLocaleString("ko-KR")}.00`;
  }
  render() {
    const total = this.state.isTotal
      ? `<h3>Total Wealth: <strong>${this.formatNum(
          this.state.total
        )}</strong></h3>`
      : "";
    this.$target.innerHTML = `<h2><strong>Person</Strong>Wealth</h2>${this.state.people
      .map(
        (person) =>
          `<div class="person"><strong>${person.name}</strong>${this.formatNum(
            person.wealth
          )}</div>`
      )
      .join("")}${total}`;
  }
}
