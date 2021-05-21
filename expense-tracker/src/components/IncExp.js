export default class IncExp {
  constructor({ $container, initialState }) {
    this.state = initialState;
    this.$target = document.createElement("div");
    this.$target.className = "inc-exp-container";
    $container.appendChild(this.$target);
    this.render();
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  render() {
    this.$target.innerHTML = `<div>
    <h4>Income</h4>
    <p id="money-plus" class="money plus">+$${this.state.income}</p>
  </div>
  <div>
    <h4>Expense</h4>
    <p id="money-minus" class="money minus">-$${this.state.expense}</p>
  </div>`;
  }
}
