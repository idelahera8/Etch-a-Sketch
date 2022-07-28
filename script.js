// Select the mainGrid in the DOM
const mainGrid = document.getElementById("mainGrid")

// Select the buttons in the DOM
const clearButton = document.getElementById("clearButton")

// Start all variables
let size = 50
let mouseClicked = false

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
        this.style.backgroundColor = "black"
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
            this.style.backgroundColor = "black"
        }
    })

    // When a user drags over a square, it will paint all squares over which we are
    // dragging. This is needed because when dragging, the mousedown event is not
    // triggered. We also need to set the mouseClicked to true so it doesnt get out
    // of sync
    gridSquare.addEventListener("dragenter", function(e){
        mouseClicked = true
        this.style.backgroundColor = "black"
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