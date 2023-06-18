var hourHand = document.querySelector(".hand-hour");
var minutesHand = document.querySelector(".hand-minute");
var secondHand = document.querySelector(".hand-second");
var clock = document.querySelector(".clock");
var sizeInput = document.querySelector(".size-input");
var sizeLabel = document.querySelector(".size-input-label");
var colorInput = document.querySelector(".color-input");
var hint = document.querySelector(".hint");
var help = document.querySelector(".help");

var clockDeg = 180;
var hasRotated = false;
var timeRunning;

for (var i = 1; i < 13; i++) {
  const newDiv = clock.insertBefore(document.createElement("p"), clock.firstChild);
  newDiv.classList.add("hr" + i);
  newDiv.classList.add("hour");
  newDiv.style.transform = `rotate(${30 * i}deg)`;
}

//DEV ENV for testing hour mark positions

// secondHand.style.transform = `rotate(30deg)`;

// var deg = 0;
// setInterval(() => {
//   secondHand.style.transform = `rotate(${deg}deg)`;
//   const spinDegree = 30;
//   deg += spinDegree;
//   if (deg > 360) deg = spinDegree;
// }, 500);

var res = getDegrees();
setClockHands(res);

setInterval(() => {
  res = getDegrees();
  setClockHands(res);
}, 100);

hint.addEventListener("click", () => {
  clock.style.transform = `rotateY(${clockDeg}deg)`;
  clockDeg += 180;

  const textBot = document.querySelector(".text-bot>p");
  textBot.style.transform = `rotateX(90deg)`;
  setTimeout(() => {
    if (!hasRotated) {
      textBot.innerHTML = "Clock is running properly now👍 It's <span class='text-bot-time'>" + getTime() + "</span> now";
      timeRunning = setInterval(() => {
        textBot.innerHTML = "Clock is running properly now👍 It's <span class='text-bot-time'>" + getTime() + "</span> now";
      }, 100);
    } else {
      textBot.innerHTML = "The clock is running backwards🔄️But it still shows the correct time";
      clearInterval(timeRunning);
    }

    hasRotated = !hasRotated;
    textBot.style.transform = `rotateX(0deg)`;
  }, 500);
});

help.addEventListener("click", () => {
  document.querySelector(".alert-background").style.visibility = "visible";
  document.querySelector(".alert-container").classList.toggle("alert-container-toggle");
});

document.querySelector(".alert-close").addEventListener("click", () => {
  document.querySelector(".alert-background").style.visibility = "hidden";
  document.querySelector(".alert-container").classList.toggle("alert-container-toggle");
});

sizeInput.addEventListener("input", (e) => {
  document.documentElement.style.setProperty("--clock-size", e.target.value + "px");
  sizeLabel.textContent = e.target.value + " px";
});

colorInput.addEventListener("input", (e) => {
  document.documentElement.style.setProperty("--clock-background-color", e.target.value);
});

function getDegrees() {
  var date = new Date();

  var secDeg = date.getSeconds() * 6;
  var minDeg = date.getMinutes() * 6 + date.getSeconds() * 0.1;
  var hrDeg = date.getHours() * 30 + date.getMinutes() * 0.5 + date.getSeconds() * (360 / 12 / 60 / 60);

  return { secDeg: (secDeg + 180) * -1, minDeg: (minDeg + 180) * -1, hrDeg: (hrDeg + 180) * -1 };
}

function setClockHands(res) {
  secondHand.style.transform = `rotate(${res.secDeg}deg)`;
  minutesHand.style.transform = `rotate(${res.minDeg}deg)`;
  hourHand.style.transform = `rotate(${res.hrDeg}deg)`;
}

function getTime() {
  return new Date().toLocaleTimeString("en-GB");
}
