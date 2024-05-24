// a reference is made to the video elements to it can be played and paused
const myVideo = document.querySelector("#custom-video-player");
// the in-built video controls from the browser are disabled
myVideo.removeAttribute("controls");
console.log(myVideo);

//--------------------------------------------------------------------------
// The following code block allows us to play and pause video on a click

// creates a reference to the play button element
const playPauseButton = document.querySelector("#play-pause-button");
console.log(playPauseButton);

// creates a reference to the play button image on the button so it can be changed
const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);

// listens for when the play button is pressed to run the play function
playPauseButton.addEventListener("click", togglePlaying);

// play and pause function
function togglePlaying() {
  // first will check to see if the video isnt already playing and start playing it
  if (myVideo.paused || myVideo.ended) {
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v2.png";
    myVideo.play();
    console.log("video play");
  } else {
    // if the video is already playing it will pause it
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v2.png";
    myVideo.pause();
    console.log("video pause");
  }
}

//--------------------------------------------------------------------------
// The following code block allows us to mute or unmute a video on a click

// a reference is made to the mute button element
const muteUnmuteButton = document.querySelector("#mute-unmute-button");
console.log(muteUnmuteButton);

// runs the toggle sound function when the mute button is pressed
muteUnmuteButton.addEventListener("click", toggleSound);

function toggleSound() {
  if (myVideo.muted) {
    // sets the button's background to the same as the page to indicate the video is unmuted
    muteUnmuteButton.style.backgroundColor = "#1a1a1a";
    // unmutes the video
    myVideo.muted = false;
  } else {
    // sets the button's background colour to a light pink to indicate the video is currently muted
    muteUnmuteButton.style.backgroundColor = "#683b56";
    // mutes the video
    myVideo.muted = true;
  }
}

//--------------------------------------------------------------------------
//following code allows us to control volume of the video
const increaseVolumeButton = document.querySelector("#increase-volume-button");
console.log(increaseVolumeButton);

// runs the increase volume function when the increase volume button is pressed
increaseVolumeButton.addEventListener("click", increaseVolume);

//volume ranges from 0 to 1 with increment of 0.1
function increaseVolume() {
  // finds if the current volume isnt maxed out at 1
  if (myVideo.volume < 0.9) {
    myVideo.volume += 0.1;
  }
}

const decreaseVolumeButton = document.querySelector("#decrease-volume-button");
console.log(decreaseVolumeButton);

// runs the decrease volume function when the decrease volume button is pressed
decreaseVolumeButton.addEventListener("click", decreaseVolume);

//volume ranges from 0.1 to 1 with increment of 0.1
function decreaseVolume() {
  // finds if the current volume isnt at the minimum value of 0.1
  if (myVideo.volume > 0.11) {
    myVideo.volume -= 0.1;
  }
}

// after the increase or decrease buttons have been pressed, it runs the
// update volume function to send the current volume variable value to the console
myVideo.addEventListener("volumechange", updateVolume);

function updateVolume() {
  console.log("current volume is", myVideo.volume);
}

// --------------------------------------------------------------------------

// these are the functions i wrote completely by myself
// i used w3schools to figure out how to implement the setTimeout function

// timer button functions
// these are the references to the button elements
const play5Button = document.querySelector("#play-5-button");
const play25Button = document.querySelector("#play-25-button");
const play50Button = document.querySelector("#play-50-button");
console.log(play5Button);
console.log(play25Button);
console.log(play50Button);

// these will run the appropriate function for each button it hears is pressed
play5Button.addEventListener("click", playVideo5);
play25Button.addEventListener("click", playVideo25);
play50Button.addEventListener("click", playVideo50);

// the timer variable needs to be created before it is referenced in
// the functions to prevent the functions calling a nonexistent variable
timer = null;

// this is the function for setting a 5 minute timer
function playVideo5() {
  // this button only plays the video instead of toggling pause so i can just set
  // the image to the play icon without issue
  playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v2.png";
  //   the video is played
  myVideo.play();
  console.log("video play");
  //   the timer variable is cleared to prevent issues with the user pressing
  // multiple timer buttons before the timer is done counting down
  clearTimeout(timer);
  //   the timer is set to 5 minutes (300000 millisenconds) and will run the pause video function at the end
  timer = setTimeout(pauseVideo, 300000);
}

// this is the 25 minutes timer button
// it is a copy of the 5 minute timer with the setTimeout timer length changed
function playVideo25() {
  playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v2.png";
  myVideo.play();
  console.log("video play");
  clearTimeout(timer);
  //   the timer is set to 25 minutes (1500000 milliseconds)
  timer = setTimeout(pauseVideo, 1500000);
}

// this is the 50 minutes timer button
// it is a copy of the 5 minute timer with the setTimeout timer length changed
function playVideo50() {
  playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v2.png";
  myVideo.play();
  console.log("video play");
  clearTimeout(timer);
  //   the timer is set to 50 minutes (3000000 milliseconds)
  timer = setTimeout(pauseVideo, 3000000);
}

// after the timers are up they run this function
function pauseVideo() {
  // set the play icon back to the pause icon
  playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v2.png";
  //   pause the video
  myVideo.pause();
  console.log("video pause");
}
