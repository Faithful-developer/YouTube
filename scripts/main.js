var playButton = document.querySelector('#play');
var videoPlayer = document.querySelector('#video_player');
var stopButton = document.querySelector('#pause');
var currentTimeBar = document.querySelector('#current_time-bar');
var fullVideoTimeHours = document.querySelector('#hours')
var fullVideoTimeMinuts = document.querySelector('.minutes');
var fullVideoTimeSeconds = document.querySelector('.seconds');
var volumeRange = document.querySelector('#volume_bar');
var volumeImg = document.querySelector('#volume_img');
var fullScreenBtn = document.querySelector('.fullscreen');
var topStopBtn = document.querySelector('#top_btn');
var reklamaImg = document.querySelector('.reklama');
var currentHour = document.querySelector('#hours_current');
var currentMinut = document.querySelector('#minutes_current')
var currentSecond = document.querySelector('#seconds_current')

var durationVideoplayer = null;
var videoMinutes = null;
var videoSeconds = null;

document.addEventListener("keydown", function(event) {
  console.log(event.which);
  switch(true){
    case event.which == 83:
      videoPlayer.pause();
      break;
    case event.which == 32:
      videoPlayer.play()
      break;
    case event.which == 48:
      volumeRange.value + 10;
      break;
    case event.which == 57:
      volumeRange.value - 10;
      break;
  } 
})

topStopBtn.addEventListener('click', function(){
  videoPlayer.play();
  topStopBtn.classList.remove('active')
  reklamaImg.classList.remove('active')
})

fullScreenBtn.addEventListener('click', function() {
  videoPlayer.requestFullscreen()
})

function videoCurrentTimeShower() {
  currentTimeBar.value = (videoPlayer.currentTime * 100) / videoPlayer.duration;
  currentTimeInSeconds = videoPlayer.currentTime;
  currentHours = Math.floor(currentTimeInSeconds / 3600);
  currentMinuts = Math.floor((currentTimeInSeconds / 60) - (currentHours * 60))
  currentSeconds = Math.floor(currentTimeInSeconds % 60)
  currentHour.textContent = currentHours;
  currentMinut.textContent = currentMinuts;
  currentSecond.textContent = currentSeconds;
}

window.addEventListener('load', function () {
  currentTimeBar.value = 0.4;
  videoPlayer.setAttribute('src', './images/videos/videoplayback.mp4');
  volumeRange.value = 100;
});

videoPlayer.addEventListener('loadedmetadata', () => {
  durationVideoplayer = videoPlayer.duration;
  videoHours = Math.floor(durationVideoplayer / 3600);
  videoMinutes = Math.floor(durationVideoplayer / 60);
  videoSeconds = Math.floor(durationVideoplayer % 60);
  fullVideoTimeMinuts.textContent = Math.floor((durationVideoplayer / 60) - (videoHours * 60));
  fullVideoTimeHours.textContent = videoHours;
  fullVideoTimeSeconds.textContent = videoSeconds;
});

playButton.addEventListener('click', function () {
  videoPlayer.play();
  videoCurrentTimeShower();
  reklamaImg.classList.remove('active')
  topStopBtn.classList.remove('active')
});

stopButton.addEventListener('click', function () {
  videoPlayer.pause();
  reklamaImg.classList.add('active')
  topStopBtn.classList.add('active')
});

setInterval(function() {
    videoCurrentTimeShower()
}, 1000);

currentTimeBar.addEventListener('change', function () {
  videoPlayer.currentTime = (currentTimeBar.value * videoPlayer.duration) / 100;
});

volumeRange.addEventListener('change', function () {
  videoPlayer.volume = volumeRange.value / 100;
  volumeImgSwitcher(volumeRange.value);
});

function volumeImgSwitcher(number) {
  switch (true) {
    case number > 80:
      volumeImg.setAttribute(
        'src',
        './images/volume-up-interface-symbol-1.svg'
      );
      break;
    case number < 80 && number > 50:
      volumeImg.setAttribute(
        'src',
        './images/volume-up-interface-symbol-2.svg'
      );
      break;
    case number < 50 && number > 20:
      volumeImg.setAttribute(
        'src',
        './images/volume-up-interface-symbol-3.svg'
      );
      break;
    case number < 20:
      volumeImg.setAttribute(
        'src',
        './images/volume-up-interface-symbol-4.svg'
      );
      break;
    default:
      volumeImg.setAttribute(
        'src',
        './images/volume-up-interface-symbol-1.svg'
      );
  }
}