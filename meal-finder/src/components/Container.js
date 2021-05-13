import { randomAPI, searchAPI } from "../api/api.js";
import Form from "./Form.js";
import ResultHeading from "./ResultHeading.js";
import MealsPresenter from "./MealsPresenter.js";
import SingleMeal from "./SingleMeal.js";
import Loading from "./Loading.js";

const cache = {};

export default class Container {
  constructor($app) {
    this.state = {
      meal: null,
      meals: [],
      searchWord: "",
      isLoading: false,
    };
    this.$target = document.createElement("div");
    this.$target.className = "container";
    this.$target.innerHTML = `<h1>Meal Finder</h1>`;
    $app.appendChild(this.$target);

    this.form = new Form({
      $container: this.$target,
      onSubmit: async (searchWord) => {
        this.setState({
          ...this.state,
          isLoading: true,
        });
        try {
          if (cache[searchWord]) {
            this.setState({
              ...this.state,
              searchWord,
              meals: cache[searchWord],
            });
          } else {
            const { meals } = await searchAPI(searchWord);
            console.log(meals);
            this.setState({
              ...this.state,
              searchWord,
              meals,
            });
            cache[searchWord] = meals;
          }
        } catch (e) {
          console.log(e);
        } finally {
          this.setState({
            ...this.state,
            isLoading: false,
          });
        }
      },
      onClick: async () => {
        this.setState({
          ...this.state,
          isLoading: true,
        });
        try {
          const { meals } = await randomAPI();
          this.setState({
            ...this.state,
            meals: [],
            meal: meals[0],
            searchWord: "",
          });
        } catch (e) {
          console.log(e);
        } finally {
          this.setState({
            ...this.state,
            isLoading: false,
          });
        }
      },
    });

    this.loading = new Loading({
      $container: this.$target,
      initialState: false,
    });

    this.resultHeading = new ResultHeading({
      $container: this.$target,
      initialState: this.state.searchWord,
    });

    this.mealsPresenter = new MealsPresenter({
      $container: this.$target,
      initialState: this.state.meals,
      onClick: (selectMeal) => {
        this.setState({
          ...this.state,
          meal: selectMeal,
        });
      },
    });

    this.singleMeal = new SingleMeal({
      $container: this.$target,
      initialState: this.state.meal,
    });
  }
  setState(nextState) {
    this.state = nextState;
    this.loading.setState(this.state.isLoading);
    this.resultHeading.setState(this.state.searchWord);
    this.mealsPresenter.setState(this.state.meals);
    this.singleMeal.setState(this.state.meal);
  }
}
