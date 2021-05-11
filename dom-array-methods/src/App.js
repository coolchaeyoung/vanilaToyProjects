import Container from "./components/Container.js";

export default class App {
  constructor($app) {
    this.container = new Container({ $app });
  }
}
