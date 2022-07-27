// Select the elements in the DOM
const mainGrid = document.getElementById("mainGrid")

let size = 5

// Create all gridSquares needed
for(let i = 0; i < size*size; i++) {
    let gridSquare = document.createElement("div")
    mainGrid.appendChild(gridSquare)
}

mainGrid.style.display = "grid"
mainGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`