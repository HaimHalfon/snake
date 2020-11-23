const ROWS = 25;
const COLS = 40;
const snake = [
    { i: 0, j: 3, prevI: undefined, prevJ: undefined },
    { i: 0, j: 2, prevI: undefined, prevJ: undefined },
    { i: 0, j: 1, prevI: undefined, prevJ: undefined },
    { i: 0, j: 0, prevI: undefined, prevJ: undefined },
];
const direction = { left: 0, up: 0, right: 1, down: 0 };
let foodPoint = { i: 0, j: 0 };
let timer;

function startGame(fast) {
    throwFood();
    playGame(fast);
}

function playGame(fast) {
    let nextPoint;
    timer = setInterval(() => {
        for (let i = 0; i < snake.length; i++) {
            if (i == 0) {
                nextPoint = {
                    i: snake[0].i - direction.up + direction.down,
                    j: snake[0].j - direction.left + direction.right,
                    prevI: snake[0].i,
                    prevJ: snake[0].j,
                };
                if (checkCollision(nextPoint)) {
                    gameOver(); // ui call
                    clearInterval(timer);
                    return;
                }
                if (equalPoint(nextPoint, foodPoint)) {
                    snake.unshift(nextPoint);
                    throwFood();
                } else {
                    snake[0] = nextPoint;
                }
                fillPoint(snake[0].i * COLS + snake[0].j, "white"); // ui call
            } else {
                snake[i].prevI = snake[i].i;
                snake[i].prevJ = snake[i].j;
                snake[i].i = snake[i - 1].prevI;
                snake[i].j = snake[i - 1].prevJ;
                fillPoint(snake[i].i * COLS + snake[i].j, "white"); // ui call
                if (i == snake.length - 1) {
                    clearPoint(snake[i].prevI * COLS + snake[i].prevJ, "white"); // ui call
                }
            }
        }
    }, 350 / fast);
}

function pauseGame() {
    clearInterval(timer);
}

function changeDirection(d) {
    if (direction[d] != 0) {
        return;
    }
    direction.left = 0;
    direction.up = 0;
    direction.right = 0;
    direction.down = 0;
    direction[d] = 1;
}

function throwFood() {
    let rndPoint;
    do {
        rndPoint = { i: getRandom(0, ROWS), j: getRandom(0, COLS) };
    } while (snake.some((p) => equalPoint(p, rndPoint)));

    clearPoint(foodPoint.i * COLS + foodPoint.j, "yellow"); // ui call  
    foodPoint = rndPoint;
    fillPoint(foodPoint.i * COLS + foodPoint.j, "yellow"); // ui call
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function checkCollision(point) {
    return (
        point.i >= ROWS ||
        point.j >= COLS ||
        point.i < 0 ||
        point.j < 0 ||
        snake.some((p) => equalPoint(p, point))
    );
}

function equalPoint(p1, p2) {
    return (
        p1.i == p2.i &&
        p1.j == p2.j
    );
}
