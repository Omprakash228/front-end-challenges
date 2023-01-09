const targetDate = new Date().setHours(new Date().getHours() + 24*7.5)

const compDivs = [document.querySelector("[data-days]"), 
              document.querySelector("[data-hours]"), 
              document.querySelector("[data-minutes]"),
              document.querySelector("[data-seconds]")];

let [daysDiv, hoursDiv, minutesDiv, secondsDiv] = compDivs;
const initialDiff = computeDifference();
let comps = computeReadableTime(initialDiff);
setInitialTime();

setInterval(() => {
    flipAllCards(computeDifference());    
}, 250);

function setInitialTime() {
    compDivs.forEach((c, i) => {
        const top = c.querySelector(".top");
        const bottom = c.querySelector(".bottom");
        top.textContent = bottom.textContent = comps[i];
    })
}

function computeDifference() {
    const currentDate = new Date();
    const diff = Math.ceil((targetDate - currentDate) / 1000);
    return diff;
}

function computeReadableTime(time) {
    const seconds = padNumber(time % 60, 2, 0);
    const minutes = padNumber(Math.floor(time / 60) % 60, 2, 0);
    const hours = padNumber(Math.floor(time / 3600) % 24, 2, 0);
    const days = padNumber(Math.floor(time / 86400), 2, 0);

    return [days, hours, minutes, seconds];
}

function padNumber(num, length, fill) {
    return num.toString().padStart(length, fill);
}

function flipAllCards(time) {
    const [days, hours, minutes, seconds] = computeReadableTime(time);

    flip(document.querySelector("[data-days]"), days);
    flip(document.querySelector("[data-hours]"), hours);
    flip(document.querySelector("[data-minutes]"), minutes);
    flip(document.querySelector("[data-seconds]"), seconds);
}

function flip(card, update) {
    const top = card.querySelector(".top");
    const bottom = card.querySelector(".bottom");

    const current = parseInt(top.textContent);
    if(current == update) return;

    const topFlip = document.createElement("div");
    const bottomFlip = document.createElement("div");
    topFlip.classList.add("top-flip");
    bottomFlip.classList.add("bottom-flip");

    topFlip.textContent = padNumber(current, 2, 0);
    bottomFlip.textContent = update;

    topFlip.addEventListener("animationstart", e => {
        top.textContent = update;
    });

    topFlip.addEventListener("animationend", e => {
        topFlip.remove();
    });

    bottomFlip.addEventListener("animationend", e => {
        bottom.textContent = update;
        bottomFlip.remove();
    });

    card.append(topFlip, bottomFlip);
}