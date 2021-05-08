import Game from "./components/Game.js";
import Popup from "./components/Popup.js";
import Notification from "./components/Notification.js";

const WORDLIST = ["became", "arrow", "article", "therefore"];

export default class App {
  constructor($app) {
    this.state = {
      isPopup: false,
      popupMessage: "",
      isNotification: false,
      inputKeyList: [],
      word: WORDLIST[parseInt(Math.random() * WORDLIST.length, 10)],
      rightCount: 0,
      wrongList: [],
      wrongCount: 0,
    };

    this.game = new Game({
      $app,
      initialState: {
        word: this.state.word,
        inputKeyList: this.state.inputKeyList,
        wrongList: this.state.wrongList,
        wrongCount: this.state.wrongCount,
      },
    });

    this.popup = new Popup({
      $app,
      initialState: {
        isPopup: this.state.isPopup,
        popupMessage: this.state.popupMessage,
        word: this.state.word,
      },
      onClick: () => {
        this.reset();
      },
    });

    this.notification = new Notification({
      $app,
      initialState: this.state.isNotification,
    });

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  setState(nextState) {
    this.state = nextState;
    this.game.setState({
      word: this.state.word,
      inputKeyList: this.state.inputKeyList,
      wrongList: this.state.wrongList,
      wrongCount: this.state.wrongCount,
    });
    this.popup.setState({
      isPopup: this.state.isPopup,
      popupMessage: this.state.popupMessage,
      word: this.state.word,
    });
    this.notification.setState(this.state.isNotification);
  }
  reset() {}
  handleKeyDown(e) {
    const keyChar = String.fromCharCode(e.keyCode).toLowerCase();
    if (this.state.inputKeyList.includes(keyChar)) {
      this.setState({
        ...this.state,
        isNotification: true,
      });
    } else {
      const newKeyList = [...this.state.inputKeyList, keyChar];
      if (this.state.word.includes(keyChar)) {
        let count = 0;
        this.state.word
          .split("")
          .forEach((el) => (el === keyChar ? ++count : count));
        this.setState({
          ...this.state,
          isPopup: this.state.rightCount + count === this.state.word.length,
          popupMessage: "Congratulations! You won! 😃",
          rightCount: this.state.rightCount + count,
          isNotification: false,
          inputKeyList: newKeyList,
        });
      } else {
        this.setState({
          ...this.state,
          isPopup: this.state.wrongCount + 1 === 5,
          popupMessage: "Unfortunately you lost. 😕",
          wrongCount: this.state.wrongCount + 1,
          wrongList: [...this.state.wrongList, keyChar],
          isNotification: false,
          inputKeyList: newKeyList,
        });
      }
    }
  }
  reset() {
    this.setState({
      isPopup: false,
      popupMessage: "",
      isNotification: false,
      inputKeyList: [],
      word: WORDLIST[parseInt(Math.random() * WORDLIST.length, 10)],
      rightCount: 0,
      wrongList: [],
      wrongCount: 0,
    });
  }
}
