import { getLocal, saveLocal } from "../util/localStorage.js";
import Balance from "./Balance.js";
import History from "./History.js";
import IncExp from "./IncExp.js";
import Transaction from "./Transaction.js";

const HISTORY = "history";

export default class Container {
  constructor($app) {
    this.state = {
      balance: 0,
      income: 0,
      expense: 0,
      histories: [],
    };
    this.$target = document.createElement("div");
    this.$target.className = "container";
    $app.appendChild(this.$target);

    this.balance = new Balance({
      $container: this.$target,
      initialState: this.state.balance,
    });

    this.incexp = new IncExp({
      $container: this.$target,
      initialState: { income: this.state.income, expense: this.state.expense },
    });

    this.history = new History({
      $container: this.$target,
      initialState: this.state.histories,
      onClick: (nodeId) => {
        console.log(nodeId);
        const intAmount = parseInt(this.state.histories[nodeId].amount, 10);
        const histories = this.state.histories.filter(
          (_, idx) => idx !== +nodeId
        );
        saveLocal(HISTORY, histories);
        this.setState({
          ...this.state,
          balance: this.state.balance - intAmount,
          income:
            intAmount > 0 ? this.state.income - intAmount : this.state.income,
          expense:
            intAmount < 0 ? this.state.expense - intAmount : this.state.expense,
          histories,
        });
      },
    });

    this.transaction = new Transaction({
      $container: this.$target,
      onSubmit: (text, amount) => {
        const intAmount = parseInt(amount, 10);
        const histories = [...this.state.histories, { text, amount }];
        saveLocal(HISTORY, histories);
        this.setState({
          ...this.state,
          balance: this.state.balance + intAmount,
          income:
            intAmount > 0 ? this.state.income + intAmount : this.state.income,
          expense:
            intAmount < 0 ? this.state.expense + intAmount : this.state.expense,
          histories,
        });
      },
    });

    this.init();
  }
  setState(nextState) {
    this.state = nextState;
    this.balance.setState(this.state.balance);
    this.incexp.setState({
      income: this.state.income,
      expense: this.state.expense,
    });
    this.history.setState(this.state.histories);
  }
  init() {
    const histories = getLocal(HISTORY) || [];
    console.log(histories);
    let income = 0;
    let expense = 0;
    histories.forEach((el) => {
      const amount = parseInt(el.amount, 10);
      if (amount > 0) income += amount;
      else expense += amount;
    });
    this.setState({
      ...this.state,
      balance: income + expense,
      income,
      expense,
      histories,
    });
  }
}
