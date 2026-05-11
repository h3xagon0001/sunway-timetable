const clockElement = document.getElementById("clockElement");
const timePeriodElement = document.getElementById("timePeriodElement");
const monElement = document.getElementById("monElement");
const tuesElement = document.getElementById("tuesElement");
const wedElement = document.getElementById("wedElement");
const thursElement = document.getElementById("thursElement");
const friElement = document.getElementById("friElement");


const updateRate = 500;



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

function initialTimetableFormat() {
    const elements = [timePeriodElement, monElement, tuesElement, wedElement, thursElement, friElement];

    for (let i = 0; i < 6; i++) {
        elements[i].textContent = i;
        elements[i].style.width = "1000px"
    };
};


initialTimetableFormat();


(function update() {
    setTimeout(() => {
        clockElement.textContent = getTimeString();

        update();
    }, 500);
})();