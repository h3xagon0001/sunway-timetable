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
const barElement = document.getElementById("barElement");
const dummyElement = document.getElementById("dummyElement")

const updateRate = 500;
const timetableDuration = 21 * 30; // number of periods times length of each period
const timetableWidth = 1500;
const periodHeight = 75;
const pixelPerMin = timetableWidth / timetableDuration

const people = [
    {
        name: "WJK",
        classes: [
            { info: ["SE-4-11", "Math"], time: ["mon", "8:05", "9:05"] },
            { info: ["NC-2-32", "CS"], time: ["mon", "9:05", "11:05"] },
            { info: ["NS-C3-1", "Physics"], time: ["mon", "12:05", "13:05"] },
            { info: ["NS-C3-1", "Math"], time: ["mon", "13:05", "14:05"] },
            { info: ["NS-C3-1", "FM"], time: ["mon", "14:05", "16:05"] },

            { info: ["NS-C3-1", "FM"], time: ["tues", "8:05", "10:05"] },
            { info: ["Physics Lab 2", "Physics"], time: ["tues", "10:05", "12:05"] },
            { info: ["NE-5-9", "Math"], time: ["tues", "12:05", "13:05"] },

            { info: ["NE-2-14", "Math"], time: ["wed", "12:05", "13:05"] },
            { info: ["NE-2-14", "FM"], time: ["wed", "13:05", "14:05"] },

            { info: ["UW-2-2", "CS"], time: ["thurs", "8:05", "10:05"] },
            { info: ["NE-2-14", "Math"], time: ["thurs", "10:05", "11:05"] },
            { info: ["NE-2-14", "FM"], time: ["thurs", "11:05", "12:05"] },
            { info: ["NS-C3-1", "Physics"], time: ["thurs", "13:05", "14:05"] },
            { info: ["NS-C3-1", "Math"], time: ["thurs", "14:05", "15:05"] },

            { info: ["NS-C3-1", "Physics"], time: ["fri", "11:05", "13:05"] },
            { info: ["NE-3-5", "CS"], time: ["fri", "13:05", "15:05"] },         
        ]
    },
    {
        name: "JX",
        classes: [
            { info: ["NE-2-10", "Econs"], time: ["wed", "15:00", "17:00"] },
            { info: ["NE-4-7", "Econs"], time: ["thurs", "13:00", "15:00"] },
            { info: ["NE-2-10", "Comm"], time: ["mon", "10:30", "12:30"] },
            { info: ["NE-2-10", "Comm"], time: ["wed", "10:30", "12:30"] },
            { info: ["NW-3-24", "CT"], time: ["tues", "15:00", "17:00"] },
            { info: ["NE-4-17", "CT"], time: ["thurs", "15:00", "16:00"] },
            { info: ["NE-4-17", "Math"], time: ["tues", "8:30", "10:30"] },
            { info: ["Auditorium 6", "Math"], time: ["thurs", "10:30", "12:30"] },
        ]
    },
        {
        name: "DGBB",
        classes: [
            { info: ["NE-2-10", "Chem"], time: ["mon", "8:30", "10:30"] },
            { info: ["NC-2-25", "Writing"], time: ["mon", "10:30", "12:30"] },
            { info: ["NC-2-29", "Ethics"], time: ["mon", "15:00", "17:00"] },

            { info: ["NW-3-23", "CT"], time: ["tues", "13:00", "15:00"] },

            { info: ["NC-2-25", "Math"], time: ["wed", "13:00", "15:00"] },
            { info: ["NC-2-29", "Writing"], time: ["wed", "15:00", "17:00"] },

            { info: ["NE-2-10", "Math"], time: ["thurs", "8:30", "10:30"] },
            { info: ["CHEM 4", "Chem"], time: ["thurs", "10:30", "12:30"] },
            
            { info: ["NE-2-10", "Ethics"], time: ["fri", "9:30", "10:30"] },
            { info: ["NW-3-20", "Chem"], time: ["fri", "10:30", "12:30"] },
            { info: ["NC-2-25", "CT"], time: ["fri", "13:00", "14:00"] },
        ]
    },
        {
        name: "RT",
        classes: [
            { info: ["NS-C2-2", "FM"], time: ["mon", "8:05", "10:05"] },
            { info: ["NW-TR1-3B", "Physics"], time: ["mon", "10:05", "12:05"] },
            { info: ["NS-C2-2", "Math"], time: ["mon", "12:05", "13:05"] },
            { info: ["NS-C2-2", "Econs"], time: ["mon", "15:05", "16:05"] },

            { info: ["NS-C3-1", "Math"], time: ["tues", "10:05", "11:05"] },
            { info: ["Physics Lab 3", "Physics"], time: ["tues", "12:05", "14:05"] },
            { info: ["NS-C2-2", "FM"], time: ["tues", "14:05", "15:05"] },
            { info: ["NS-C2-2", "Econs"], time: ["tues", "15:05", "16:05"] },

            { info: ["NS-C3-1", "Math"], time: ["wed", "11:05", "12:05"] },
            { info: ["NS-C2-2", "Econs"], time: ["wed", "12:05", "13:05"] },
            { info: ["SE-4-15", "Physics"], time: ["wed", "13:05", "14:05"] },
            { info: ["NS-C2-2", "FM"], time: ["wed", "15:05", "16:05"] },

            { info: ["NS-C2-2", "FM"], time: ["thurs", "8:05", "9:05"] },
            { info: ["NS-C2-2", "Math"], time: ["thurs", "9:05", "10:05"] },
            { info: ["NS-C2-2", "Econs"], time: ["thurs", "10:05", "12:05"] },
            { info: ["NW-TR1-3B", "Physics"], time: ["thurs", "13:05", "14:05"] },
            { info: ["NS-C3-1", "Math"], time: ["thurs", "16:05", "17:05"] },

            { info: ["NS-C2-2", "Econs"], time: ["fri", "8:05", "9:05"] },
            { info: ["NS-C2-2", "FM"], time: ["fri", "9:05", "10:05"] },
            { info: ["NS-C2-2", "Math"], time: ["fri", "12:05", "13:05"] },
        ]
    }
]

const dayPeopleCount = [];

let timetable = {
    mon: [],
    tues: [],
    wed: [],
    thurs: [],
    fri: []
}

let timeIntervalWidth = 0;

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

function pixToNum(pix) {
    const num = parseInt(pix.slice(0, pix.length - 2))
    if (isNaN(num)) { return 0 }
    else { return num };
};

function minsToString(mins) {
    return (Math.floor(mins / 60)).toString() + ":" + (mins % 60).toString().padStart(2, "0")
}

function stringToMins(string) {
    return parseInt(string.split(":")[0]) * 60 + parseInt(string.split(":")[1])
}

function initialTimetableFormat() {
    const dayElements = [monElement, tuesElement, wedElement, thursElement, friElement];

    for (const day in timetable) {
        let peopleSet = new Set();

        for (const periods in timetable[day]) {
            peopleSet.add(timetable[day][periods].name);
        };
        dayPeopleCount.push(peopleSet.size);
    }

    timePeriodElement.style.width = numToPixel(timetableWidth);

    for (let i = 0; i < dayElements.length; i++) {
        dayElements[i].style.width = numToPixel(timetableWidth);
        dayElements[i].style.height = numToPixel(periodHeight * dayPeopleCount[i]);
    }
};

function addPeriodElement(day, periodInfo, startTime, endTime, offset, dayIndex) {
    const periodElement = document.createElement("div");

    periodElement.classList.add("period");
    periodElement.style.width = numToPixel((stringToMins(endTime) - stringToMins(startTime)) * pixelPerMin);
    periodElement.style.height = numToPixel(periodHeight - 3 / dayPeopleCount[dayIndex]);
    periodElement.style.left = numToPixel((15 + stringToMins(startTime) - stringToMins("8:00")) * pixelPerMin);
    periodElement.style.top = numToPixel(offset * periodHeight);
    periodElement.style.fontSize = numToPixel(periodHeight / 3 * 0.6);

    for (let i = 0; i < periodInfo.length; i++) {
        const periodElementContent = document.createElement("div");
        periodElementContent.classList.add("period-info");
        periodElementContent.style.height = numToPixel(periodHeight / periodInfo.length * 0.95);
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
        timeIntervalElement.id = "timeInterval_" + mins.toString();
        timeIntervalElement.style.width = numToPixel(timetableWidth / intervalCount);
        timeIntervalElement.style.left = numToPixel(
            timetableWidth / intervalCount * ((mins - startMins) / timeInterval)
        );
        timeIntervalElement.style.height = "100%";

        timeIntervalWidth = timetableWidth / intervalCount

        if (mins === endMins) {
            timeIntervalElement.style.borderRight = "0";
        }

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
            timetable[currentClass.time[0]].push(classInfo);
        };
    };
};

function getPeopleInDay(day) {
    let dayPeople = [];

    for (let i = 0; i < day.length; i++) {
        if (dayPeople.includes(day[i].name)) {}
        else {dayPeople.push(day[i].name)};
    };

    return dayPeople
};

function getElementFromName(elementName) {
    return elementName + "Element"
}

function renderClasses() {
    let dayIndex = 0;
    for (const day in timetable) {
        const dayPeople = getPeopleInDay(timetable[day]);
        
        for (let i = 0; i < timetable[day].length; i++) {
            let periodInfo = timetable[day][i]["info"];
            periodInfo.unshift(timetable[day][i]["name"]);            

            addPeriodElement(
                getElementFromName(day),
                periodInfo,
                timetable[day][i]["time"][0],
                timetable[day][i]["time"][1],
                dayPeople.indexOf(timetable[day][i]["name"]),
                dayIndex
            );
        };

        dayIndex += 1;
    }
}

function drawBar() {
    const dayElements = [monElement, tuesElement, wedElement, thursElement, friElement];
    let barHeight = 0;
    let leftOffset = dummyElement.offsetWidth;

    for (let i = 0; i < dayElements.length; i++) {
        barHeight += pixToNum(dayElements[i].style.height);
    }

    barElement.style.top = numToPixel(timePeriodElement.offsetHeight + 1);    
    barElement.style.height = numToPixel(barHeight - 1);
    barElement.style.width = "4px";

    const context = barElement.getContext("2d");

    context.fillStyle = "white";
    context.fillRect(0, 0, barElement.width, barElement.height);

    barElement.style.left = numToPixel(leftOffset + timeIntervalWidth / 2 +
        (stringToMins(getTimeString().slice(0, getTimeString().length - 3)) - stringToMins("8:00")) * pixelPerMin
    );

    if (pixToNum(barElement.style.left) > timetableWidth) { barElement.style.left = numToPixel(leftOffset + timeIntervalWidth / 2) }

}

function highlightDay() {
    const date = new Date();
    const dayElements = [monElement, tuesElement, wedElement, thursElement, friElement];

    for (const day in dayElements) {
        if (parseInt(day) + 1 === date.getDay()) { dayElements[day].classList.add("highlighted")}
        else { dayElements[day].style.backgroundColor = "var(--background-color)" };
    }    
}

prebuildTimetable();
initialTimetableFormat();
addTimeIntervals();
renderClasses();
highlightDay();

(function update() {
    setTimeout(() => {
        clockElement.textContent = getTimeString();
        
        drawBar();
        update();
    }, 500);
})();