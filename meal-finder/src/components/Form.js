export default class Form {
  constructor({ $container, onSubmit, onClick }) {
    this.onClick = onClick;
    this.onSubmit = onSubmit;
    this.$target = document.createElement("div");
    this.$target.className = "flex";
    $container.appendChild(this.$target);

    this.render();
    this.$target.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      const $input = e.target.querySelector("input");
      this.onSubmit($input.value);
      $input.value = "";
    });
    this.$target
      .querySelector("#random")
      .addEventListener("click", this.onClick);
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  render() {
    this.$target.innerHTML = `<form class="flex" id="submit">
      <input
        type="text"
        id="search"
        placeholder="Search for meals or keywords"
      />
      <button class="search-btn" type="submit">
        <i class="fas fa-search"></i>
      </button>
    </form>
    <button class="random-btn" id="random">
      <i class="fas fa-random"></i>
    </button>`;
  }
}
