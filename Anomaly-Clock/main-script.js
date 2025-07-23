
const timeInterval = 420; // interval in milliseconds to update the clock

const eleHours = document.getElementById("hours");
const eleMinutes = document.getElementById("minutes");
const eleSeconds = document.getElementById("seconds");

let hours, minutes, seconds;
let h1 = document.getElementById('hour-1');
let h2 = document.getElementById('hour-2');
let m1 = document.getElementById('minute-1');
let m2 = document.getElementById('minute-2');
let s1 = document.getElementById('second-1');
let s2 = document.getElementById('second-2');

const rootStyles = getComputedStyle(document.documentElement);
const fclockSize = parseFloat(rootStyles.getPropertyValue('--flip-clock-size'));

function SetFlipClock(hours, minutes, seconds) {
    const h1v = Math.floor(hours / 10);
    const h2v = hours % 10;

    const m1v = Math.floor(minutes / 10);
    const m2v = minutes % 10;

    const s1v = Math.floor(seconds / 10);
    const s2v = seconds % 10;

    h1.style.transform = `translateY(-${h1v * fclockSize}px)`;
    h2.style.transform = `translateY(-${h2v * fclockSize}px)`;
    m1.style.transform = `translateY(-${m1v * fclockSize}px)`;
    m2.style.transform = `translateY(-${m2v * fclockSize}px)`;
    s1.style.transform = `translateY(-${s1v * fclockSize}px)`;
    s2.style.transform = `translateY(-${s2v * fclockSize}px)`;
}


function SetRotation(ele, value, rotationValue = 1) {
    const rotateDirection = ele.getAttribute("data-rotate-direction") || "left"; // default to reverse if not set

    let newRotation = value * rotationValue * 360;
    if (rotateDirection === "left") { newRotation -= 360; } // Comment this line to see what happens to the clock

    ele.style.transform = `translate(-50%, -100%) rotate(${newRotation}deg)`;
    ele.setAttribute("data-rotate-direction", (rotateDirection === "left" ? "right" : "left")); // toggle the rotation direction for next time
}

setInterval(() => {
    seconds = Math.floor(Math.random() * 43200) + 1;

    minutes = 0; hours = 0;
    while (seconds >= 60) {
        minutes++;
        seconds -= 60;
    }
    while (minutes >= 60) {
        hours++;
        minutes -= 60;
    }

    SetFlipClock(hours, minutes, seconds)

    SetRotation(eleSeconds, seconds, 1 / 60); // 1 second = 6 degrees, 60 seconds in a full rotation  
    SetRotation(eleMinutes, minutes, 1 / 60); // 1 minute = 6 degrees, 60 minutes in a full rotation
    SetRotation(eleHours, hours, 1 / 12); // 1 hour = 30 degrees, 12 hours in a full rotation

    // console.log(now.toLocaleTimeString());
}, timeInterval);
