'use strict'



const alphabet = {
    captitalLetters: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    lowerCaseLetters: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
}

const root = document.getElementById("root")
root.ondrop = drop_handler;
root.ondragover = dragover_handler;

function dragover_handler(ev) {
    ev.preventDefault();
    return false
}



function generateLetter(letter){
    const letterElement = document.createElement('p')
    letterElement.setAttribute('class', 'letter')
    letterElement.setAttribute('draggable', 'true')
    letterElement.setAttribute('id', letter)
    const newLetter = document.createTextNode(letter)
    letterElement.append(newLetter)
    letterElement.style.color = randomColor()
    addEventListeners(letterElement)
    letterElement.style.top = `${randomNumber(1000)}px`
    letterElement.style.left = `${randomNumber(1000)}px`
    
    return letterElement
}

function randomColor(){
    return `rgb(${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(255)})`
}

function randomNumber(num){
    return Math.floor(Math.random() * num)
}

function render() {
    for(let i = 0; i<alphabet.captitalLetters.length; i++){
        const newLetter = generateLetter(alphabet.captitalLetters[i])
        root.appendChild(newLetter)
    }
}

function addEventListeners(element) {
    element.addEventListener('dragstart', onDragStart);
	element.addEventListener('dragend', onDragEnd, false);
    element.addEventListener('dragover', dragover_handler, false)
    element.addEventListener('drop', drop_handler, false)
}

function onDragStart(event) {
    let target = event.target;
    var style = window.getComputedStyle(event.target, null);
    var targetValue = (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY) + ',' + target.id;
    console.log(targetValue)
    event.dataTransfer.setData("text/plain",
    (targetValue))
}

function onDragEnd(event) {
	if (event.target && event.target.nodeName == 'p') {
	    // Reset the transparency
	    event.target.style.opacity = '';
	}
}

function drop_handler(event) {
        console.log(event.dataTransfer.getData("text/plain"))
        var targetData = event.dataTransfer.getData("text/plain").split(',');
        console.log(targetData)
        var dm = document.getElementById(targetData[2]);
        dm.style.left = (event.clientX + parseInt(targetData[0],10)) + 'px';
        dm.style.top = (event.clientY + parseInt(targetData[1],10)) + 'px';
        event.preventDefault();
        return false;
}

render()