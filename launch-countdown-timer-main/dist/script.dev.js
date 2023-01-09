"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var targetDate = new Date().setHours(new Date().getHours() + 24 * 7.5);
var compDivs = [document.querySelector("[data-days]"), document.querySelector("[data-hours]"), document.querySelector("[data-minutes]"), document.querySelector("[data-seconds]")];
var daysDiv = compDivs[0],
    hoursDiv = compDivs[1],
    minutesDiv = compDivs[2],
    secondsDiv = compDivs[3];
var initialDiff = computeDifference();
var comps = computeReadableTime(initialDiff);
setInitialTime();
setInterval(function () {
  flipAllCards(computeDifference());
}, 250);

function setInitialTime() {
  compDivs.forEach(function (c, i) {
    var top = c.querySelector(".top");
    var bottom = c.querySelector(".bottom");
    top.textContent = bottom.textContent = comps[i];
  });
}

function computeDifference() {
  var currentDate = new Date();
  var diff = Math.ceil((targetDate - currentDate) / 1000);
  return diff;
}

function computeReadableTime(time) {
  var seconds = padNumber(time % 60, 2, 0);
  var minutes = padNumber(Math.floor(time / 60) % 60, 2, 0);
  var hours = padNumber(Math.floor(time / 3600) % 24, 2, 0);
  var days = padNumber(Math.floor(time / 86400), 2, 0);
  return [days, hours, minutes, seconds];
}

function padNumber(num, length, fill) {
  return num.toString().padStart(length, fill);
}

function flipAllCards(time) {
  var _computeReadableTime = computeReadableTime(time),
      _computeReadableTime2 = _slicedToArray(_computeReadableTime, 4),
      days = _computeReadableTime2[0],
      hours = _computeReadableTime2[1],
      minutes = _computeReadableTime2[2],
      seconds = _computeReadableTime2[3];

  flip(document.querySelector("[data-days]"), days);
  flip(document.querySelector("[data-hours]"), hours);
  flip(document.querySelector("[data-minutes]"), minutes);
  flip(document.querySelector("[data-seconds]"), seconds);
}

function flip(card, update) {
  var top = card.querySelector(".top");
  var bottom = card.querySelector(".bottom");
  var current = parseInt(top.textContent);
  if (current == update) return;
  var topFlip = document.createElement("div");
  var bottomFlip = document.createElement("div");
  topFlip.classList.add("top-flip");
  bottomFlip.classList.add("bottom-flip");
  topFlip.textContent = padNumber(current, 2, 0);
  bottomFlip.textContent = update;
  topFlip.addEventListener("animationstart", function (e) {
    top.textContent = update;
  });
  topFlip.addEventListener("animationend", function (e) {
    topFlip.remove();
  });
  bottomFlip.addEventListener("animationend", function (e) {
    bottom.textContent = update;
    bottomFlip.remove();
  });
  card.append(topFlip, bottomFlip);
}