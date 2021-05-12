export default class MealsPresenter {
  constructor({ $container, initialState, onClick }) {
    this.state = initialState;
    this.onClick = onClick;
    this.$target = document.createElement("div");
    this.$target.className = "meals";
    $container.appendChild(this.$target);

    this.$target.addEventListener("click", (e) => {
      const meal = e.target.closest(".meal-info");
      if (meal) {
        const { mealid } = meal.dataset;
        const selectMeal = this.state.find((meal) => meal.idMeal === mealid);
        if (selectMeal) {
          this.onClick(selectMeal);
        }
      }
    });
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  render() {
    this.$target.innerHTML = this.state
      .map(
        (meal) =>
          `<div class="meal">
      <img src=${meal.strMealThumb} alt=${meal.strMeal}/>
      <div class="meal-info" data-mealid=${meal.idMeal}>
        <h3>${meal.strMeal}</h3>
      </div>
    </div>`
      )
      .join("");
  }
}
