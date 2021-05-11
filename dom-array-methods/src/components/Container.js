import Aside from "./Aside.js";
import Main from "./Main.js";
import Loading from "./Loading.js";

export default class Container {
  constructor({ $app }) {
    this.state = {
      people: [],
      total: 0,
      isTotal: false,
      isLoading: false,
    };
    this.$target = document.createElement("div");
    this.$target.className = "container";
    $app.appendChild(this.$target);

    this.aside = new Aside({
      $container: this.$target,
      onClick: (nodeId) => {
        if (nodeId === "add-user") {
          this.addUser();
        } else if (nodeId === "double") {
          const newPeople = this.state.people.map((person) => ({
            name: person.name,
            wealth: person.wealth * 2,
          }));
          this.setState({
            ...this.state,
            people: newPeople,
            total: this.getArrayTotal(newPeople, "wealth"),
          });
        } else if (nodeId === "show-millionaires") {
          const newPeople = this.state.people.filter(
            (person) => person.wealth >= 1000000
          );
          this.setState({
            ...this.state,
            people: newPeople,
            total: this.getArrayTotal(newPeople, "wealth"),
          });
        } else if (nodeId === "sort") {
          this.setState({
            ...this.state,
            people: this.state.people.sort((a, b) => b.wealth - a.wealth),
          });
        } else if (nodeId === "calculate-wealth") {
          this.setState({
            ...this.state,
            total: this.state.people.reduce((acc, cur) => acc + cur.wealth, 0),
            isTotal: !this.state.isTotal,
          });
        }
      },
    });

    this.main = new Main({
      $container: this.$target,
      initialState: {
        people: this.state.people,
        total: this.state.total,
        isTotal: this.state.isTotal,
      },
    });

    this.loading = new Loading({
      $container: this.$target,
      intialState: {
        isLoading: this.state.isLoading,
      },
    });

    this.init();
  }

  getArrayTotal(array, key) {
    return array.reduce((acc, cur) => acc + cur[key], 0);
  }

  async addUser() {
    this.setState({
      ...this.state,
      isLoading: true,
    });
    try {
      const { results } = await (
        await fetch("https://randomuser.me/api/")
      ).json();
      const person = {
        name: `${results[0].name.first} ${results[0].name.last}`,
        wealth: parseInt(Math.random() * 999999 + 100000, 10),
      };
      const newPeople = [...this.state.people, person];
      this.setState({
        ...this.state,
        people: newPeople,
        total: this.getArrayTotal(newPeople, "wealth"),
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }
  }

  setState(nextState) {
    this.state = nextState;
    this.main.setState({
      people: this.state.people,
      total: this.state.total,
      isTotal: this.state.isTotal,
    });
    this.loading.setState({
      ...this.state,
      isLoading: this.state.isLoading,
    });
  }

  init() {
    this.addUser();
    this.addUser();
    this.addUser();
  }
}
