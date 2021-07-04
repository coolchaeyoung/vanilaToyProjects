export default class FilterContainer {
  constructor({ $app, onChange }) {
    this.onChange = onChange;
    this.$target = document.createElement("div");
    this.$target.className = "filter-container";
    $app.appendChild(this.$target);
    this.render();
    this.$target.querySelector("input").addEventListener("input", (e) => {
      this.onChange(e.target.value);
    });
  }
  render() {
    this.$target.innerHTML = `<input
    type="text"
    id="filter"
    class="filter"
    placeholder="Filter posts..."
  />`;
  }
}
