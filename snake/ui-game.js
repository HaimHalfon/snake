const pointsElements = [];
const buttons = document.querySelector(".top-menu");
const fastRange = document.querySelector("#fast-range");
let flagAction = false;

/*****************************************************/

//
// events:
//

document.addEventListener('keydown', (ev) => {
    switch (ev.keyCode) {
        case 37: // left
            clickOnArrow("left");
            break;
        case 38: // up
            clickOnArrow("up");
            break;
        case 39: // right
            clickOnArrow("right");
            break;
        case 40: // down
            clickOnArrow("down");
            break;
    }
});

buttons.addEventListener("click", (ev) => {
    if (!ev.target.classList.contains("btn")) {
        return;
    }
    clickOnArrow(ev.target.dataset.direction);
});

function clickOnArrow(direction) {
    [...buttons.children].forEach((btn) => {
        if (btn.dataset.direction == direction) {
            btn.classList.add("btn-on");
        } else {
            btn.classList.remove("btn-on")
        }
    });
    changeDirection(direction); // logic call

    // beginning of the game (do once)
    if (!flagAction) {
        flagAction = true;
        startGame(fastRange.value); // logic call 
    }
}

fastRange.addEventListener("change", (ev) => {
    if (flagAction) {
        pauseGame(); // logic call
        playGame(fastRange.value); // logic call
    }
});

/*****************************************************/

//
// drowing:
//

function drowBoard(container) {
    const boardFrag = document.createDocumentFragment();
    let row, point;
    for (let i = 0; i < ROWS; i++) {
        row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < COLS; j++) {
            point = document.createElement("div");
            point.classList.add("point");
            row.appendChild(point);
            pointsElements[i * COLS + j] = point;
        }
        boardFrag.appendChild(row);
    }
    container.appendChild(boardFrag);
}

function fillPoint(index, color) {
    pointsElements[index].classList.add(color);
}

function clearPoint(index, color) {
    pointsElements[index].classList.remove(color);
}