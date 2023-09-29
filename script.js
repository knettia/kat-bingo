const bingoCard = document.getElementById("bingo-card");

const possibleItems = [
    { text: "noob using spengy", weight: 5},
    { text: "spengy + flaregun", weight: 1},
    { text: "spengy + crescendo", weight: 1},

    { text: "blatant exploiter", weight: 5},
    { value: '<p>camping <img class="inline-image" src="textures/deathbeam.png" alt="db"></p>', weight: 5},

    { image: "textures/explosive_knife.png", weight: 100},
    { image: "textures/deathbeam.png", weight: 75},
    { image: "textures/tesla.png", weight: 50},

    { text: "taped a brick to their spacebar", weight: 75},
    { text: "200+ ping", weight: 75},
    { text: "rage quit", weight: 100},

    { text: "dabbing", weight: 10},
    { text: "kazotsky kick", weight: 10},

    { text: "shotgun knife", weight: 50},

    { image: "textures/crescendo.png", weight: 50},
    { image: "textures/sanic_knife.png", weight: 50},

    { image: "textures/noob_sign.png", weight: 75},
    { image: "textures/claymore.png", weight: 50},

    { text: "majority of votes are murder", weight: 90},
    { text: "murder 3 times in a row", weight: 10},

    { image: "textures/hyperbeam.png", weight: 2},
    { image: "textures/ban_hammer.png", weight: 2},
    { image: "textures/icytea_knife.png", weight: 75},
    { text: "icytea loadout", weight: 50},

    { text: "godmode glitcher", weight: 20},
    { text: "3 murder maps", weight: 10},

    { text: "\"no life\"", weight: 10},
    { text: "\"team?\"", weight: 10},
    { text: "\"you're cheating\"", weight: 10},

    { text: "accidentally rejoins the same server", weight: 75},
    { text: "gets mad when you pick their weapons", weight: 50},

    { text: "has \"kat\" in their name", weight: 30},

    { text: "more than 3 spengys", weight: 10},
    { text: "backstabs you with dualty", weight: 20},
    { text: "falls to their doom", weight: 50},
    { text: "obviously targeting", weight: 75},
    { text: "camping gun", weight: 15},
    { value: '<p>hysteric <img class="inline-image" src="textures/explosive_knife.png" alt="explosive-knife"> camping</p>', weight: 25},

    { text: "\"bro this game\"", weight: 10},
    { text: "tries to get up the towers", weight: 25},
    { text: "2 guns", weight: 10},
    { text: "2 in 1 shot", weight: 75},

    { text: "leaves in lobby", weight: 50},
    { text: "leaves before even playing", weight: 25},
    { text: "admin knife", weight: 5},

    { text: "accidentally rejoins the same server", weight: 50},

    { text: "tries to juke you", weight: 50},
    { text: "charges at you", weight: 50},

    { text: "\"how 2 trade\"", weight: 5},
    { text: "\"mm2\"", weight: 5},

    { text: "gets confused by the filter", weight: 5},

    { text: "10 kill streak!", weight: 25},
    { text: "20 kill streak!!", weight: 10},

    { text: "messes with your ragdoll", weight: 25},

    { text: "taunts people", weight: 10},
    { text: "doesn't know how zatoichi works", weight: 10},

    { text: "error on open shot", weight: 25},

    { value: '<p><img class="inline-image" src="textures/tesla.png" alt="tesla"> under 10k</p>', weight: 10},
];

function getRandomWeightedItem(possibleItems) {
    const totalWeight = possibleItems.reduce((sum, item) => sum + item.weight, 0);
    const randomValue = Math.random() * totalWeight;

    let currentWeight = 0;
    for (const item of possibleItems) {
        currentWeight += item.weight;
        if (randomValue <= currentWeight) {
            return item;
        }
    }

    // In case of rounding errors, return the last item
    return possibleItems[possibleItems.length - 1];
}

function generateBingoCard() {
    const bingoCard = document.getElementById("bingo-card");
    const selectedIndices = new Set(); // To track selected indices

    for (let i = 0; i < 25; i++) {
        const square = document.createElement("div");
        square.classList.add("bingo-square");

        
        if (i !== 12) {
            let selectedIndex;
            do {
                selectedIndex = Math.floor(Math.random() * possibleItems.length);
            } while (selectedIndices.has(selectedIndex));
    
            selectedIndices.add(selectedIndex);
    
            const selectedItem = possibleItems[selectedIndex];
    
            if (selectedItem) {
    
                if("text" in selectedItem) {
                    const textElement = document.createElement("div");
                    textElement.classList.add("square-text");
                    // textElement.style.fontSize = "24px";
                    textElement.textContent = selectedItem.text;
                    square.appendChild(textElement);
                }
    
                if("image" in selectedItem) {
                    const markImage = document.createElement("img");
                    markImage.src = selectedItem.image;
                    markImage.classList.add("square-image");
                    markImage.style.width = "100%";
                    markImage.style.height = "100%";
                    markImage.style.position = "absolute";
                    markImage.style.top = "0";
                    markImage.style.left = "0";
                    markImage.draggable = false;
                    square.appendChild(markImage);
                }
    
                if("value" in selectedItem) {
                    const innerContent = document.createElement("div");
                    innerContent.classList.add("square-text");
                    innerContent.innerHTML = selectedItem.value;
                    square.appendChild(innerContent);
                }
    
                square.addEventListener("click", () => {
                    const hasMark = square.querySelector(".mark-image");
                    if (hasMark) {
                        hasMark.remove();
                    } else {
                        const markImage = document.createElement("img");
                        markImage.src = "textures/mark.png";
                        markImage.classList.add("mark-image");
                        markImage.style.opacity = "0.5";
                        markImage.style.width = "100%";
                        markImage.style.height = "100%";
                        markImage.style.position = "absolute";
                        markImage.style.top = "0";
                        markImage.style.left = "0";
                        markImage.draggable = false;
                        square.appendChild(markImage);
                    }
                });
            }
        } else {
            const markImage2 = document.createElement("img");
            markImage2.src = "textures/kat-logo.png";
            markImage2.classList.add("square-image");
            markImage2.style.width = "100%";
            markImage2.style.height = "100%";
            markImage2.style.position = "absolute";
            markImage2.style.top = "0";
            markImage2.style.left = "0";
            markImage2.draggable = false;
            square.appendChild(markImage2);

            const markImage = document.createElement("img");
            markImage.src = "textures/mark.png";
            markImage.classList.add("mark-image");
            markImage.style.opacity = "0.5";
            markImage.style.width = "100%";
            markImage.style.height = "100%";
            markImage.style.position = "absolute";
            markImage.style.top = "0";
            markImage.style.left = "0";
            markImage.draggable = false;
            square.appendChild(markImage);
        }
       

        bingoCard.appendChild(square);
    }
}

// Call the function to generate the bingo card
generateBingoCard();


// async function write_img(clip) {
//     try {
//         const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

//         if (isFirefox) {
//             if (typeof ClipboardItem == "undefined") {
//                 alert('clipboard write is not supported in your firefox. please use a different browser or set \"clipboardItem\" to true in about:config.');
//                 return;
//             }
//         }

//         const data = await fetch(clip);
//         const blob = await data.blob();

//         await navigator.clipboard.write([
//             new ClipboardItem({
//                 [blob.type]: blob,
//             }),
//         ]);
//         console.log("Fetched image copied.");
//     } catch (err) {
//         console.error(err.name, err.message);
//     }
// }
  
// function capture_card() {
//     const bingoCard = document.getElementById('bingo-container');

//     html2canvas(bingoCard).then(function (canvas) {
//         write_img(canvas.toDataURL('image/png'));
//     });
// }

// const captureButton = document.getElementById('captureButton');
// captureButton.addEventListener('click', function () {
//     capture_card();
// });
