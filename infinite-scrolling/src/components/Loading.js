export default class Loading {
  constructor({ $app, initState }) {
    this.state = initState;
    this.$target = document.createElement("div");
    $app.appendChild(this.$target);
    this.render();
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  render() {
    this.$target.innerHTML = ` <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>`;
    this.$target.className = this.state ? "loader show" : "loader";
  }
}
