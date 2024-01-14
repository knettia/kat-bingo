const bingoCard = document.getElementById("bingo-card");
let possibleItems;

fetch('cells.json')
  .then(response => response.json())
  .then(data => {
    possibleItems = data;
    generateBingoCard();
  })
  .catch(error => console.error('Error fetching cells.json:', error));

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

    return possibleItems[possibleItems.length - 1];
}

function generateBingoCard() {
    const selectedIndices = new Set();

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
                    textElement.innerHTML = "<p>" + selectedItem.text + "</p>"; // TODO: add each word individually, not important as it works right now!
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
            markImage2.src = "textures/kat_logo_new.png";
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

async function write_img(clip) {
    try {
        const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

        if (isFirefox) {
            if (typeof ClipboardItem == "undefined") {
                alert('Clipboard write is not supported in your Firefox. Please use a different browser or set "clipboardItem" to true in about:config.');
                return;
            }
        }

        const data = await fetch(clip);
        const blob = await data.blob();

        if (document.getElementById('downloadCheckbox').checked) {
            const a = document.createElement('a');
            a.href = clip;
            a.download = 'bingo_card.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            console.log("Image downloaded.");
        } else {
            await navigator.clipboard.write([
                new ClipboardItem({
                    [blob.type]: blob,
                }),
            ]);
            console.log("Should fix html2canvas lib problems!.");
        }
    } catch (err) {
        console.error(err.name, err.message);
    }
}

function capture_card() {
    const bingoCard = document.getElementById('bingo-container');

    html2canvas(bingoCard).then(
       function(canvas) {
            write_img(canvas.toDataURL('image/png'));
        }
    );
}

const captureButton = document.getElementById('captureButton');
captureButton.addEventListener('click', function () {
    capture_card();
});

