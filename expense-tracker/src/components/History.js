export default class History {
  constructor({ $container, initialState, onClick }) {
    this.state = initialState;
    this.onClick = onClick;
    this.$target = document.createElement("div");
    $container.appendChild(this.$target);
    this.render();
    this.$target.addEventListener("click", (e) => {
      if (e.target && e.target.nodeName === "BUTTON") {
        const { nodeId } = e.target.dataset;
        this.onClick(nodeId);
      }
    });
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  isPlus(strNumber) {
    return parseInt(strNumber, 10) >= 0 ? true : false;
  }
  render() {
    this.$target.innerHTML = `<h3>History</h3>
    <ul id="list" class="list">
      ${this.state
        .map(
          (li, idx) =>
            `<li class=${this.isPlus(li.amount) ? "plus" : "minus"}>${
              li.text
            }<span>${this.isPlus(li.amount) ? "+" : ""}${
              li.amount
            }</span><button data-node-id=${idx} class="delete-btn">x</button></li>`
        )
        .join("")}
    </ul>`;
  }
}
