// ------- SELECTORS -------- //

// Select the mainGrid in the DOM
const mainGrid = document.getElementById("mainGrid")

// Select the buttons in the DOM
const colorButton = document.getElementById("colorModeButton")
const rainbowButton = document.getElementById("rainbowButton")
const darkerButton = document.getElementById("darkerButton")
const brighterButton = document.getElementById("brighterButton")
const eraserButton = document.getElementById("eraserButton")
const clearButton = document.getElementById("clearButton")

// Select the inputs
const colorInput = document.getElementById("colorModeInput")
const brushInput = document.getElementById("brushSizeInput")
const gridSizeInput = document.getElementById("gridSizeInput")
const gridSizeText = document.getElementById("gridSizeText")





// --------- INITIALIZATION --------- //

// Start all variables
let size = 45
let mode = "colorMode"
let mouseClicked = false
let color = "black"
let allGridSquares
let gridSquare

// Start grid
createGrid(size)





// ---------- GRID SIZE MANIPULATION --------- //

// The text of the grid size changes continuously
gridSizeInput.addEventListener("input", function(){
    size = gridSizeInput.value
    gridSizeText.textContent = `${size} X ${size}`
})

// The grid size doesn-t actually change until the user stops moving the range. This
// makes the program less resource heavy
gridSizeInput.addEventListener("change", function() {
    clearGrid()
    createGrid(size)
})

// Function to create all the elements of the grid. Each element is listening
function createGrid (size) {
    mainGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    for (let i = 0; i < size * size; i++) {
        gridSquare = document.createElement("div")
        gridSquare.classList.add("gridSquare")
        mainGrid.appendChild(gridSquare)
    }
    allGridSquares = document.querySelectorAll(".gridSquare")
    gridSquareListener()
}

// Function to remove all grid elements. Necessary to first remove all elements
// before creating new
function clearGrid() {
    allGridSquares.forEach(gridSquare => gridSquare.remove())
}





// ------------ GRID SQUARES LISTENING EVENTS -----------//

// A function that puts a gridSquare to listen for clicks, hover and drags 
function gridSquareListener() {
    // Listen for click
    allGridSquares.forEach(gridSquare => gridSquare.addEventListener("click", function(){
        paintSquare(this)
    }))

    // Listen for hover
    allGridSquares.forEach(gridSquare => gridSquare.addEventListener("mouseenter", function(){
        if (mouseClicked) {
            paintSquare(this)
        }
    }))
}





// ------- WINDOW LISTENERS FOR MOUSE UP/DOWN ---------//

// Listen for mousedown. We only want to paint when the user is clicking the mouse
// so we set a mouseClicked flag to true
window.addEventListener("mousedown", function() {
    mouseClicked = true
})

// Listen for mouseup. We set the mouseClicked flag to false
window.addEventListener("mouseup", function() {
    mouseClicked = false
})





// ------------ PAINT SQUARE ------------------ //
function paintSquare(gridSquare) {
    gridSquare.style.backgroundColor = color
}





// ------------ BUTTON LISTENERS ---------------- //

// Change the mode on Color Mode button click
colorButton.addEventListener("click", function() {
    mode = "colorMode"
    unselectButtons()
    this.classList.add("selectedButton")
})

// Change the mode on Rainbow Mode button click
rainbowButton.addEventListener("click", function() {
    mode = "rainbowMode"
    unselectButtons()
    this.classList.add("selectedButton")
})

// Change the mode on Darker Mode button click
darkerButton.addEventListener("click", function() {
    mode = "darkerMode"
    unselectButtons()
    this.classList.add("selectedButton")
})

// Change the mode on Brighter Mode button click
brighterButton.addEventListener("click", function() {
    mode = "brighterMode"
    unselectButtons()
    this.classList.add("selectedButton")
})

// Change the mode on Eraser Mode button click
eraserButton.addEventListener("click", function() {
    mode = "eraserMode"
    unselectButtons()
    this.classList.add("selectedButton")
})





// ---------- CHANGE STYLE OF BUTTONS TO STANDARD -------------- //
function unselectButtons() {
    let allButtons = document.querySelectorAll("button")
    console.log(allButtons)
    allButtons.forEach(button => button.classList.remove("selectedButton"))
}

/*

// Create all gridSquares needed
for(let i = 0; i < size*size; i++) {
    let gridSquare = document.createElement("div")
    gridSquare.classList.add("gridSquare")

    // All event listeners to change the background color when hovering over a grid
    // if the mouse is clicked

    // When a user clicks on a square, it is painted
    gridSquare.addEventListener("click", paintSquare(this, color))

    // When a user presses the mouse over a square, a boolean refering to the mouse
    // is set to true
    gridSquare.addEventListener("mousedown", function(){
        mouseClicked = true
    })

    // When a user releases the mouse over a square, a boolean refering to the mouse
    // is set to false
    gridSquare.addEventListener("mouseup", function(){
        mouseClicked = false
    })

    // When a user enters a new square, if the mouse is clicked, it will be painted
    gridSquare.addEventListener("mouseenter", function(){
        if (mouseClicked) {
            this.style.backgroundColor = color
        }
    })

    // When a user drags over a square, it will paint all squares over which we are
    // dragging. This is needed because when dragging, the mousedown event is not
    // triggered. We also need to set the mouseClicked to true so it doesnt get out
    // of sync
    gridSquare.addEventListener("dragenter", function(e){
        mouseClicked = true
        this.style.backgroundColor = color
    })

    // When a user stops dragging, we set the mouseClicked to false so it doesnt
    // get out of sync
    gridSquare.addEventListener("dragend", function(){
        mouseClicked = false
    })

    mainGrid.appendChild(gridSquare)
}

// Clear grid
clearButton.addEventListener("click", function(){
    let allGridSquares = document.querySelectorAll(".gridSquare")
    allGridSquares.forEach(gridS => gridS.style.backgroundColor = "white")
})

// Set color to color in input
colorInput.addEventListener("change", function(){
    color = colorInput.value
    console.log(color)
})

*/

function paintSquare(gridSquare, mode) {
    if (mode == "rainbowMode") {
        color = rgb(Math.random()*255, Math.random()*255, Math.random()*255)
    }
    gridSquare.style.backgroundColor = color
}