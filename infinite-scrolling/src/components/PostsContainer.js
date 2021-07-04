export default class PostContainer {
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
    const rendering = this.state
      .map((post) => {
        return `<div class="post">
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
          </div>`;
      })
      .join("");
    this.$target.innerHTML = rendering;
  }
}
