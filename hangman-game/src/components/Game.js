import Figure from "./Figure.js";
import WrongLetter from "./WrongLetter.js";
import WordContainer from "./WordContainer.js";

export default class Game {
  constructor({ $app, initialState }) {
    this.state = initialState;
    this.$target = document.createElement("div");
    this.$target.className = "game-container";
    $app.appendChild(this.$target);

    this.figure = new Figure({
      $game: this.$target,
      initialState: {
        wrongCount: this.state.wrongCount,
      },
    });
    this.wrongLetter = new WrongLetter({
      $game: this.$target,
      initailState: {
        wrongList: this.state.wrongList,
      },
    });
    this.wordContainer = new WordContainer({
      $game: this.$target,
      initialState: {
        word: this.state.word,
        inputKeyList: this.state.inputKeyList,
      },
    });
  }
  setState(nextState) {
    this.state = nextState;
    this.figure.setState({
      wrongCount: this.state.wrongCount,
    });
    this.wrongLetter.setState({
      wrongList: this.state.wrongList,
    });
    this.wordContainer.setState({
      word: this.state.word,
      inputKeyList: this.state.inputKeyList,
    });
  }
}
