/*
NOTE:
for adding multiple people, each person is an object
storing all classes they take in any order
then at runtime, each person's class days is split into each day object
then element height can be calculated by number of people per day object
*/

const clockElement = document.getElementById("clockElement");
const timePeriodElement = document.getElementById("timePeriodElement");
const monElement = document.getElementById("monElement");
const tuesElement = document.getElementById("tuesElement");
const wedElement = document.getElementById("wedElement");
const thursElement = document.getElementById("thursElement");
const friElement = document.getElementById("friElement");


const updateRate = 500;
const timetableDuration = 600
const timetableWidth = 1500;
const pixelPerMin = timetableWidth / timetableDuration


function getTimeString() {
    const date = new Date();
    const hourString = date.getHours().toString();
    const minString = date.getMinutes().toString().padStart(2, "0");
    const secString = date.getSeconds().toString().padStart(2, "0");
    
    
    return (
        hourString + ":" +
        minString + ":" +
        secString
    );
};

function numToPixel(num) {
    return num.toString() + "px";
};

function minsToString(mins) {
    return (Math.floor(mins / 60)).toString() + ":" + (mins % 60).toString().padStart(2, "0")
}

function stringToMins(string) {
    return parseInt(string.split(":")[0]) * 60 + parseInt(string.split(":")[1])
}

function initialTimetableFormat() {
    const elements = [timePeriodElement, monElement, tuesElement, wedElement, thursElement, friElement];

    for (let i = 0; i < 6; i++) {
        elements[i].style.width = numToPixel(timetableWidth);
        if (elements[i] == timePeriodElement) { elements[i].style.height = "50px" }
        else { elements[i].style.height = "100px" };
    };
};

function addPeriodElement(day, periodInfo, startTime, endTime) {
    const periodElement = document.createElement("div");

    periodElement.classList.add("period");
    periodElement.style.width 

    for (let i = 0; i < periodInfo.length; i++) {
        const periodElementContent = document.createElement("div");
        periodElementContent.appendChild(document.createTextNode(periodInfo[i]));
        periodElement.appendChild(periodElementContent);
    };
    
    document.getElementById(day).appendChild(periodElement);
}

function addTimeIntervals(startTime, endTime) {
    const startMins = stringToMins(startTime);
    const endMins = stringToMins(endTime);
    const timeInterval = 30;
    const intervalCount = (endMins - startMins) / timeInterval + 1
    
    for (let mins = startMins; mins <= endMins; mins += timeInterval) {
        const timeIntervalElement = document.createElement("div");

        timeIntervalElement.classList.add("intervals");
        timeIntervalElement.style.width = numToPixel(timetableWidth / intervalCount);
        timeIntervalElement.style.left = numToPixel(
            timetableWidth / intervalCount * ((mins - startMins) / timeInterval)
        );

        timeIntervalElement.appendChild(document.createTextNode(minsToString(mins)));
        timePeriodElement.appendChild(timeIntervalElement);
    };
};


initialTimetableFormat();
addTimeIntervals("8:00", "18:00");
addPeriodElement("monElement", ["WJK", "NS-C2-3", "Physics"], "9:00", "10:00");

(function update() {
    setTimeout(() => {
        clockElement.textContent = getTimeString();

        update();
    }, 500);
})();