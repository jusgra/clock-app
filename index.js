var hourHand = document.querySelector(".hand-hour");
var minutesHand = document.querySelector(".hand-minute");
var secondHand = document.querySelector(".hand-second");
var clock = document.querySelector(".clock");
const hours = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

var rngInput = document.querySelector(".ranger");
var rngLabel = document.querySelector(".ranger-px");
var hint = document.querySelector(".hint");

var clockDeg = 180;
var hasRotated = false;
hint.addEventListener("click", () => {
  clock.style.transform = `rotateY(${clockDeg}deg)`;
  const textBot = document.querySelector(".textBot>p");
  textBot.style.transform = `rotateX(90deg)`;
  setTimeout(() => {
    textBot.style.transform = `rotateX(0deg)`;
    if (!hasRotated) textBot.textContent = "Clock is running properly now 👍";
    else textBot.textContent = "The clock is running backwards 🔄️";
    hasRotated = !hasRotated;
  }, 500);
  clockDeg += 180;
});

rngInput.addEventListener("input", (e) => {
  document.documentElement.style.setProperty("--clock-size", e.target.value + "px");
  rngLabel.textContent = e.target.value + " px";
});

for (var i = 1; i < 13; i++) {
  const newDiv = clock.insertBefore(document.createElement("p"), clock.firstChild);
  // newDiv.textContent = hours[i - 1];
  newDiv.textContent = i;
  newDiv.classList.add("hr" + i);
  newDiv.classList.add("hour");
  newDiv.style.transform = `rotateY(180deg)`;
}

var res = getDegrees();
secondHand.style.transform = `rotate(${res.secDeg}deg)`;
minutesHand.style.transform = `rotate(${res.minDeg}deg)`;
hourHand.style.transform = `rotate(${res.hrDeg}deg)`;

document.querySelector(".color-input").addEventListener("input", (e) => {
  document.documentElement.style.setProperty("--clock-background-color", e.target.value);
});

//DEV ENV for testing hour mark positions

// secondHand.style.transform = `rotate(210deg)`;

// var deg = 0;
// setInterval(() => {
//   secondHand.style.transform = `rotate(${deg}deg)`;
//   const spinDegree = 30;
//   deg += spinDegree;
//   if (deg > 360) deg = spinDegree;
// }, 500);

setInterval(() => {
  res = getDegrees();
  secondHand.style.transform = `rotate(${res.secDeg}deg)`;
  minutesHand.style.transform = `rotate(${res.minDeg}deg)`;
  hourHand.style.transform = `rotate(${res.hrDeg}deg)`;
}, 500);

function getDegrees() {
  var date = new Date();

  var secDeg = date.getSeconds() * 6;
  var minDeg = date.getMinutes() * 6 + date.getSeconds() * 0.1;
  var hrDeg = date.getHours() * 30 + date.getMinutes() * 0.5 + date.getSeconds() * (360 / 12 / 60 / 60);

  return { secDeg: (secDeg + 180) * -1, minDeg: (minDeg + 180) * -1, hrDeg: (hrDeg + 180) * -1 };
}
