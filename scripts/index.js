'use strict'



const alphabet = {
    captitalLetters: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    lowerCaseLetters: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
}

const root = document.getElementById("root")




function generateLetter(letter){
    const letterElement = document.createElement('p')
    letterElement.setAttribute('class', 'letter')
    letterElement.setAttribute('draggable', 'true')
    const newLetter = document.createTextNode(letter)
    letterElement.append(newLetter)
    letterElement.style.color = randomColor()
    addEventListeners(letterElement)
    
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
	element.addEventListener('dragend', onDragEnd);
}

function onDragStart(event) {
    let target = event.target;
	if (target && target.nodeName == 'P') {
        // Store a ref. on the dragged elem
	    const pSrc = target.textContent;
	    // parkingSimulation.dragged = target;
	    event.dropEffect = 'linkMove';
	    event.dataTransfer.setData('text/uri-list', pSrc);
	    event.dataTransfer.setData('text/plain', pSrc);

	    // Make it half transparent
	    event.target.style.opacity = .1;
	}
}

function onDragEnd(event) {
	if (event.target && event.target.nodeName == 'P') {
	    // Reset the transparency
	    event.target.style.opacity = '';
	}
}

render()