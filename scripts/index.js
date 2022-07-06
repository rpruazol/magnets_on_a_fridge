'use strict'

const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

let counter = 0;

const root = document.getElementById('root')
root.ondrop = drop_handler;
root.ondragover = dragover_handler;

document.getElementById('reset').addEventListener('click', () => {
    counter = 0;
    console.log('reset')
    localStorage.clear()
    while (root.firstChild) {
        root.removeChild(root.firstChild)
    }
    render(root, letters)
})

document.getElementById('save').addEventListener('click', () => {
    let allChildNodesArray = [...document.querySelector('#root').childNodes]
    const output = allChildNodesArray.map(value => {
        return value.outerHTML
    })
    output.shift()
    localStorage.setItem('letters', JSON.stringify(output))
})

function dragover_handler(ev) {
    ev.preventDefault();
    return false
}


function generateLetter(letter){
    const letterElement = document.createElement('p')
    letterElement.setAttribute('class', 'letter')
    const newLetter = document.createTextNode(letter)
    letterElement.append(newLetter)
    letterElement.style.color = randomColor()

    return letterElement
}

function randomColor(){
    return `rgb(${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(255)})`
}

function randomNumber(max, min=0){
    return Math.floor(Math.random() * (max - min) + min)
}


function addEventListeners(element) {
    element.addEventListener('dragstart', onDragStart);
	element.addEventListener('dragend', onDragEnd, false);
    element.addEventListener('dragover', dragover_handler, false)
    element.addEventListener('drop', drop_handler, false)
}

function onDragStart(event) {
    console.log(event)
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
        console.log(dm)
        dm.style.left = (event.clientX + parseInt(targetData[0],10)) + 'px';
        dm.style.top = (event.clientY + parseInt(targetData[1],10)) + 'px';
        event.preventDefault();
        return false;
}

function renderParent(parent){
    //letter-content === dropdown
    const root = document.createElement('div')
    root.setAttribute('class', 'letter-content')
    parent.appendChild(root)
    addEventListeners(root)
    root.style.top = `${randomNumber(window.innerHeight-250)}px`
    root.style.left = `${randomNumber(window.innerWidth-150)}px`
    root.setAttribute('draggable', 'true')
    return root
}

function renderDropdown(parent, root){
    const divEl = document.createElement('div')
    divEl.setAttribute('class', 'dropdown-content')
    parent.appendChild(divEl)

    const dupEl = document.createElement('a')
    dupEl.textContent = '+'
    dupEl.addEventListener("click", (() => {
        // const cloned = parent.cloneNode(true)
        // cloned.setAttribute('id', counter++ )
        // root.appendChild(cloned)
        console.log(parent.childNodes[0].textContent)
        render(root, [parent.childNodes[0].textContent])
    }))
    divEl.appendChild(dupEl)

    const removeEl = document.createElement('a')
    removeEl.textContent = '-'
    removeEl.addEventListener("click", (() => {
        parent.remove()
    }))
    divEl.appendChild(removeEl)
}

function render(root, alphabet) {
    if(localStorage.getItem('letters'))
        {
            console.log('localstorage found')
            addEventListeners(root)
            const rawLetterData = JSON.parse(localStorage.getItem('letters'))
            console.log(rawLetterData)
            rawLetterData.forEach(value => {
                root.insertAdjacentHTML("beforeend", value)
            })
            return
        } else {

    for(let i = 0; i<alphabet.length; i++){
        console.log('initial render')
        const parent = renderParent(root)
        const newLetter = generateLetter(alphabet[i], parent)
        parent.appendChild(newLetter)
        renderDropdown(parent, root)
        parent.setAttribute('id', counter++)
        counter++
    }
    }
}

render(root, letters)