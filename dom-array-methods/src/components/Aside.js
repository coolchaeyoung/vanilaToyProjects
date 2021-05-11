export default class Aside {
  constructor({ $container, onClick }) {
    this.$target = document.createElement("aside");
    $container.appendChild(this.$target);
    this.onClick = onClick;
    this.render();

    this.$target.addEventListener("click", (e) => {
      const { nodeId } = e.target.dataset;
      if (nodeId) {
        this.onClick(nodeId);
      }
    });
  }
  render() {
    this.$target.innerHTML = `<button data-node-id="add-user">Add User 👱‍♂️</button>
    <button data-node-id="double">Double Money 💰</button>
    <button data-node-id="show-millionaires">Show Only Millionaires 💵</button>
    <button data-node-id="sort">Sort by Richest ↓</button>
    <button data-node-id="calculate-wealth">Calculate entire Wealth 🧮</button>`;
  }
}
