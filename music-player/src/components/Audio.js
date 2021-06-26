export default class Audio {
  constructor({ $app, initialState, handleProgress, onClickProgress }) {
    this.state = initialState;
    this.onClickProgress = onClickProgress;
    this.handleProgress = handleProgress;
    this.$target = document.createElement("audio");
    this.$target.src = `music/${this.state.music}.mp3`;
    $app.appendChild;
    this.$target.addEventListener("timeupdate", () => {
      const progresBar =
        (this.$target.currentTime / this.$target.duration) * 100;
      this.handleProgress(progresBar);
    });
    this.play();
  }
  setState(nextState) {
    if (this.state.music !== nextState.music)
      this.$target.src = `music/${nextState.music}.mp3`;
    this.state = nextState;
    this.play();
  }
  setCurrentTime(currentPercent) {
    this.$target.currentTime = this.$target.duration * currentPercent;
    const progressBar =
      (this.$target.currentTime / this.$target.duration) * 100;
    this.handleProgress(progressBar);
  }
  play() {
    if (this.state.play) this.$target.play();
    else this.$target.pause();
  }
}
