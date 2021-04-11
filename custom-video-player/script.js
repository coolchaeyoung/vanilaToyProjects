const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const stopBtn = document.getElementById("stop");
const timeBar = document.querySelector("input");
const timestamp = document.getElementById("timestamp");

let isPlay;

const handleTime = () => {
  let minutes = Math.floor(video.currentTime / 60);
  let seconds = Math.floor(video.currentTime - minutes * 60);
  let minuteValue;
  let secondValue;

  minuteValue = minutes < 10 ? `0${minutes}` : minutes;
  secondValue = seconds < 10 ? `0${seconds}` : seconds;
  timestamp.textContent = `${minuteValue}:${secondValue}`;
  timeBar.value = (video.currentTime / video.duration) * 100;
};

const handlePlayBtn = () => {
  if (video.paused) {
    playBtn.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    video.play();
    isPlay = true;
  } else {
    playBtn.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    video.pause();
    isPlay = false;
  }
};

const handleStopBtn = () => {
  video.pause();
  video.currentTime = 0;
  playBtn.innerHTML = '<i class="fa fa-play fa-2x"></i>';
};

video.addEventListener("click", handlePlayBtn);
video.addEventListener("timeupdate", handleTime);
video.addEventListener("ended", handleStopBtn);
playBtn.addEventListener("click", handlePlayBtn);
stopBtn.addEventListener("click", handleStopBtn);
timeBar.addEventListener("input", (e) => {
  video.currentTime = (e.target.value * video.duration) / 100;
});
timeBar.addEventListener("mousedown", (e) => {
  playBtn.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  video.pause();
});
timeBar.addEventListener("mouseup", (e) => {
  if (isPlay) {
    playBtn.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    video.play();
  }
});
