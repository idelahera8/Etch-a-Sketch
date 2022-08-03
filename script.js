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
        gridSquare.style.backgroundColor = "rgb(255, 255, 255)"
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
    allGridSquares.forEach(gridSquare => gridSquare.addEventListener("mouseover", function(){
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

// Not allowing for dragging (which was breking the flow)
window.addEventListener("dragstart", function(e){
    e.preventDefault()
})





// ------------ PAINT SQUARE ------------------ //
function paintSquare(gridSquare) {
    if (mode == "colorMode") {
        color = colorInput.value
    }
    else if(mode == "rainbowMode") {
        color = randomColor()
    }
    else if (mode == "darkerMode") {
        color = modifyColor(getRGBValues(gridSquare.style.backgroundColor), mode)
    }
    else if (mode == "brighterMode") {
        color = modifyColor(getRGBValues(gridSquare.style.backgroundColor), mode)
    }
    else {
        color = "rgb(255, 255, 255)"
    }
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

// Clear grid
clearButton.addEventListener("click", function(){
    allGridSquares.forEach(gridSquare => gridSquare.style.backgroundColor = "rgb(255, 255, 255)")
})





// ---------- CHANGE STYLE OF BUTTONS TO STANDARD -------------- //
function unselectButtons() {
    let allButtons = document.querySelectorAll("button")
    allButtons.forEach(button => button.classList.remove("selectedButton"))
}





// ---------------- CHANGE COLOR ------------- //

// Set color to color in input
colorInput.addEventListener("change", function(){
    color = colorInput.value
})

function randomColor() {
    let r = Math.floor(Math.random() * 255)
    let g = Math.floor(Math.random() * 255)
    let b = Math.floor(Math.random() * 255)
    return `rgb(${r}, ${g}, ${b})`
}

//Get the r, g, b values from a rgb string
function getRGBValues(str) {
    var vals = str.substring(str.indexOf('(') +1, str.length -1).split(', ');
    return {
      r: vals[0],
      g: vals[1],
      b: vals[2]
    };
  }

// A function that makes a color 10% darker or brighter
function modifyColor(colorToModify, mode) {
    // Get the color values
    let rColor = parseInt(colorToModify.r)
    let gColor = parseInt(colorToModify.g)
    let bColor = parseInt(colorToModify.b)
    // If darker mode, make the color 10% darker
    if (mode == "darkerMode"){
        if (rColor >= 25) {
            rColor -= 25
        } else {
            rColor = 0
        }
        if (gColor >= 25) {
            gColor -= 25
        } else {
            gColor = 0
        }
        if (bColor >= 25) {
            bColor -= 25
        } else {
            bColor = 0
        }
    // If brighter mode, make the color 10% brighter    
    } else if (mode == "brighterMode") {
        if (rColor <= 230) {
            rColor += 25
        } else {
            rColor = 255
        }
        if (gColor <= 230) {
            gColor += 25
        } else {
            gColor = 255
        }
        if (bColor <= 230) {
            bColor += 25
        } else {
            bColor = 255
        }
    }
    return `rgb(${rColor}, ${gColor}, ${bColor})`
}

/*
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
*/