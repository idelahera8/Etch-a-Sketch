// Select the mainGrid in the DOM
const mainGrid = document.getElementById("mainGrid")

// Select the buttons in the DOM
const clearButton = document.getElementById("clearButton")

// Start all variables
let size = 50
// let mouseClicked = false

// Start the grid
mainGrid.style.display = "grid"
mainGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`

// Create all gridSquares needed
for(let i = 0; i < size*size; i++) {
    let gridSquare = document.createElement("div")
    gridSquare.classList.add("gridSquare")

    // 
 //   gridSquare.addEventListener("mousedown", function(){
//        mouseClicked = true
//        console.log(mouseClicked)
//    })

//    gridSquare.addEventListener("mouseup", function(){
//        mouseClicked = false
//        console.log(mouseClicked)
//    })

    gridSquare.addEventListener("mouseenter", function(){
//        if (mouseClicked) {
            this.style.backgroundColor = "black"
 //       }
        
    })
    mainGrid.appendChild(gridSquare)
}

// Clear grid
clearButton.addEventListener("click", function(){
    let allGridSquares = document.querySelectorAll(".gridSquare")
    allGridSquares.forEach(gridS => gridS.style.backgroundColor = "white")
})