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
const timetableDuration = 21 * 30; // number of periods times length of each period
const timetableWidth = 1500;
const periodHeight = 60;
const pixelPerMin = timetableWidth / timetableDuration

const people = [
    {
        name: "WJK",
        classes: [
            { info: ["NS-C2-1", "Physics"], time: ["mon","9:00", "11:00"] },
            { info: ["NE-2-5", "Physics"], time: ["tues","11:00", "13:30"] },
        ]
    },
    {
        name: "Jon",
        classes: [
            { info: ["SW-C3-1", "Math"], time: ["mon","8:00", "11:00"] },
            { info: ["PT-2-5", "Further Science"], time: ["tues","10:00", "12:30"] },
        ]
    },
]

let timetable = {
    mon: [],
    tues: [],
    wed: [],
    thurs: [],
    fri: []
}

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
    const days = ["mon", "tues", "wed", "thurs", "fri"];

    timePeriodElement.style.width = numToPixel(timetableWidth);
    timePeriodElement.style.height = numToPixel(periodHeight * 0.5);

    for (const day in timetable) {
        elements[i].style.width = numToPixel(timetableWidth);
        if (elements[i] == timePeriodElement) { elements[i] }
        else { elements[i].style.height = numToPixel(periodHeight * timetable) };
    };
};

function addPeriodElement(day, periodInfo, startTime, endTime) {
    const periodElement = document.createElement("div");

    periodElement.classList.add("period");
    periodElement.style.width = numToPixel((stringToMins(endTime) - stringToMins(startTime)) * pixelPerMin);
    periodElement.style.height = numToPixel(periodHeight);
    periodElement.style.left = numToPixel((15 + stringToMins(startTime) - stringToMins("8:00")) * pixelPerMin);
    console.log(periodHeight)
    periodElement.style.fontSize = numToPixel(periodHeight / 3 * 0.75);

    for (let i = 0; i < periodInfo.length; i++) {
        const periodElementContent = document.createElement("div");
        periodElementContent.classList.add("period-info");
        periodElementContent.style.height = numToPixel(periodHeight / periodInfo.length);
        periodElementContent.appendChild(document.createTextNode(periodInfo[i]));
        periodElement.appendChild(periodElementContent);
    };
    
    document.getElementById(day).appendChild(periodElement);
}

function addTimeIntervals() {
    const startMins = stringToMins("8:00");
    const endMins = stringToMins("18:00");
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

function prebuildTimetable() {
    for (let i = 0; i < people.length; i++) {
        for (let j = 0; j < people[i].classes.length; j++) {
            let currentClass = people[i].classes[j];
            let classInfo = {
                name: people[i].name,
                info: currentClass.info,
                time: [currentClass.time[1], currentClass.time[2]]
            };
            if (currentClass.time[0] === "mon") {
                timetable.mon.push(classInfo);
            }
            else if (currentClass.time[0] === "tues") {
                timetable.tues.push(classInfo);
            }
            else if (currentClass.time[0] === "wed") {
                timetable.wed.push(classInfo);
            }
            else if (currentClass.time[0] === "thurs") {
                timetable.thurs.push(classInfo);
            }
            else if (currentClass.time[0] === "fri") {
                timetable.fri.push(classInfo);
            }
        };
    };
};

console.log(timetable);

prebuildTimetable();
initialTimetableFormat();
addTimeIntervals();


(function update() {
    setTimeout(() => {
        clockElement.textContent = getTimeString();

        update();
    }, 500);
})();