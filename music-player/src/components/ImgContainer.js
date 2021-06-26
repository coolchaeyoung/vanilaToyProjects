export default class ImgContainer {
  constructor({ $app, initialState }) {
    this.state = initialState;
    this.$target = document.createElement("div");
    this.$target.className = "img-container";
    $app.appendChild(this.$target);
    this.render();
  }
  setState(nextState) {
    if (this.state !== nextState) {
      this.state = nextState;
      this.render();
    }
  }
  render() {
    this.$target.innerHTML = ` <img src="images/${this.state}.jpg" alt="music-cover" id="cover" />`;
  }
}
