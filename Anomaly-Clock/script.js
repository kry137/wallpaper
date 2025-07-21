
const timeInterval = 420; // interval in milliseconds to update the clock

const eleHours = document.getElementById("hours");
const eleMinutes = document.getElementById("minutes");
const eleSeconds = document.getElementById("seconds");
let cachedHours, cachedMinutes;

const now = new Date();
let hours = now.getHours();    // jam (0-23)
let minutes = now.getMinutes(); // menit (0-59)
let seconds = now.getSeconds(); // detik (0-59)

setInterval(() => {
    seconds = Math.floor(Math.random() * 43200) + 1;
    // seconds++;
    while (seconds >= 60) {
        minutes++;
        seconds -= 60;
    }
    while (minutes >= 60) {
        hours++;
        minutes -= 60;
    }

    function SetRotation(ele, value, rotationValue = 1) {
        const rotateDirection = ele.getAttribute("data-rotate-direction") || "left"; // default to reverse if not set

        let newRotation = value * rotationValue * 360;
        if (rotateDirection === "left") { newRotation -= 360; } // reverse the rotation for left direction

        ele.style.transform = `translate(-50%, -100%) rotate(${newRotation}deg)`;
        ele.setAttribute("data-rotate-direction", (rotateDirection === "left" ? "right" : "left")); // toggle the rotation direction for next time
    }

    if (cachedHours != hours) {
        SetRotation(eleHours, hours, 1 / 12); // 1 hour = 30 degrees, 12 hours in a full rotation
        cachedHours = hours;
    }
    if (cachedMinutes != minutes) {
        SetRotation(eleMinutes, minutes, 1 / 60); // 1 minute = 6 degrees, 60 minutes in a full rotation
        cachedMinutes = minutes;
    }
    SetRotation(eleSeconds, seconds, 1 / 60); // 1 second = 6 degrees, 60 seconds in a full rotation  

    // console.log(now.toLocaleTimeString());
}, timeInterval);
