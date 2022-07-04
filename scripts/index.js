'use strict'



const alphabet = {
    captitalLetters: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    lowerCaseLetters: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
}

const root = document.getElementById("root")


function render() {
    for(let i = 0; i<=alphabet.captitalLetters.length; i++){
        randomColor()
        const letterElement = document.createElement('p')
        letterElement.setAttribute('class', 'letter')
        const letter = document.createTextNode(alphabet.captitalLetters[i]);
        letterElement.append(letter)
        // value="letter"

        root.appendChild(letterElement)
    }
}


function randomColor(){
    return
}

render()