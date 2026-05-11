const clockElement = document.getElementById("clockElement");

const updateRate = 500;



function getTimeString() {
    const date = new Date();
    const hourString = date.getHours().toString()
    const minString = date.getMinutes().toString().padStart(2, "0")
    const secString = date.getSeconds().toString().padStart(2, "0")
    
    
    return (
        hourString + ":" +
        minString + ":" +
        secString
    )
}


(function update() {
    setTimeout(() => {
        clockElement.textContent = getTimeString()

        update();
    }, 500);
})();