// Get the Bingo card container element
const bingoCard = document.getElementById("bingo-card");

// Function to generate a grid of 25 squares
function generateGrid() {
    for (let i = 0; i < 25; i++) {
        const square = document.createElement("div");
        square.classList.add("bingo-square");
        bingoCard.appendChild(square);
    }
}

// Call the generateGrid function to create the grid
generateGrid();
