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

// Start all variables
let size = 20
let mouseClicked = false
let color = "black"

// Start the grid
mainGrid.style.display = "grid"
mainGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`

// Create all gridSquares needed
for(let i = 0; i < size*size; i++) {
    let gridSquare = document.createElement("div")
    gridSquare.classList.add("gridSquare")

    // All event listeners to change the background color when hovering over a grid
    // if the mouse is clicked

    // When a user clicks on a square, it is painted
    gridSquare.addEventListener("click", function(){
        this.style.backgroundColor = color
    })

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