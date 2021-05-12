export default class SingleMeal {
  constructor({ $container, initialState }) {
    this.state = initialState;
    this.$target = document.createElement("div");
    $container.appendChild(this.$target);
  }
  setState(nextState) {
    if (Boolean(nextState)) {
      this.state = nextState;
      this.render();
    }
  }
  getLi() {
    const str = [];
    for (let i = 1; i <= 20; ++i) {
      const ingre = this.state[`strIngredient${i}`];
      const measure = this.state[`strMeasure${i}`];
      if (!ingre) break;
      str.push(`<li>${ingre} - ${measure}</li>`);
    }
    return str;
  }
  render() {
    const h1 = `<h1>${this.state.strMeal}</h1>`;
    const img = `<img src=${this.state.strMealThumb} alt=${this.state.strMeal}>`;

    const pCategory = `<p>${this.state.strCategory}</p>`;
    const pArea = `<p>${this.state.strArea}</p>`;

    const pInstruction = `<p>${this.state.strInstructions}</p>`;
    const h2 = `<h2>Ingredients</h2>`;
    const li = ``;
    this.$target.innerHTML = `<div class="single-meal">${h1}${img}
    <div class="single-meal-info">${pCategory}${pArea}</div><div class="main">${pInstruction}${h2}<ul>${this.getLi().join(
      ""
    )}</ul></div>
    </div>`;
  }
}
