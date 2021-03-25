"use strict";

const config = {
    field: {
        rowCount: 40,
        colCount: 40,
        
        tile: {
            size: 30,
            isBody: false,
            isWall: false
        }
    },
    snake: {
        length: 3,
        x: 20,
        y: 10,
        direction: 'down'
    }
}

const field = document.getElementsByClassName("field")[0];
const snake = document.getElementsByClassName("snake");
let snakeDirection = config.snake.direction;

const generateField = () => {
    
    const rowCount = config.field.rowCount;
    const colCount = config.field.colCount;

    for (let i = 0; i < rowCount; i++) {
        const tileRow = document.createElement("div");
        tileRow.classList.add("row");
        field.append(tileRow);
        
        for (let j = 0; j < colCount; j++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tileRow.append(tile);
        }
    }
};

const generateWall = () => {
    
    const tileRows = document.getElementsByClassName("row");
    const colCount = config.field.colCount;
    const rowCount = config.field.colCount;

    for (let i = 0; i < rowCount; i++) {
        const tiles = tileRows[i].childNodes;
        
        tiles.forEach((tile) => {
            const firstTile = 0;
            const lastTile = colCount - 1;

            if (i == firstTile || i == lastTile) {
                tile.classList.add("wall");
            } else {
                tiles[firstTile].classList.add("wall");
                tiles[lastTile].classList.add("wall");
            }
        });
    }
    
};

const chooseTileByCoordinate = (coordX, coordY) => {
    const tileRows = document.getElementsByClassName("row");
    const tile = tileRows[coordY].childNodes[coordX];
    return tile;
}

const generateSnake = () => {
    
    let startX = config.snake.x;
    let startY = config.snake.y;
    const snakeLength = config.snake.length;
    
    for (let i = 0; i < snakeLength; i++) {
        const snakeBody = document.createElement("div");
        
        if (i == 0) {
            snakeBody.classList.add("snake-head");
        }
        
        snakeBody.classList.add("snake");
        chooseTileByCoordinate(startX, startY).append(snakeBody);
        startY--;
    }

};

const getCurrentCoordinates = snakePart => {
    const rowCount = config.field.rowCount;
    const colCount = config.field.colCount;
    
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            if (chooseTileByCoordinate(col, row) === snakePart.parentNode) {
                return [col, row]
            }
        }
    }

};

const defineSnakeDirection = () => {
    document.addEventListener('keydown', event => {
        
        if (event.code == 'KeyW' || event.code == 'ArrowUp') {
            snakeDirection = 'up';
        } else if (event.code == 'KeyA' || event.code == 'ArrowLeft') {
            snakeDirection = 'left';
        } else if (event.code == 'KeyS' || event.code == 'ArrowDown') {
            snakeDirection = 'down';
        } else if (event.code == 'KeyD' || event.code == 'ArrowRight') {
            snakeDirection = 'right';
        }

    });
};

const getNextPosition = (snakeX, snakeY) => {

    if (snakeDirection == 'up') {
        return chooseTileByCoordinate(snakeX, --snakeY);
    } else if (snakeDirection == 'left') {
        return chooseTileByCoordinate(--snakeX, snakeY);
    } else if (snakeDirection == 'down') {
        return chooseTileByCoordinate(snakeX, ++snakeY);
    } else if (snakeDirection == 'right') {
        return chooseTileByCoordinate(++snakeX, snakeY);
    }
    
};

const moveSnake = () => {
    let snakeX = 0;
    let snakeY = 0;
    let previousSnakeX = 0;
    let previousSnakeY = 0;
    let nextPosition;
    const snakeHeadIndex = snake.length - 1;
    
    for (let i = snakeHeadIndex; i >= 0; i--) {
        [snakeX, snakeY] = getCurrentCoordinates(snake[i]);

        if (i == snakeHeadIndex) {
            nextPosition = getNextPosition(snakeX, snakeY);
        } else {
            nextPosition = chooseTileByCoordinate(previousSnakeX, previousSnakeY)
        }
        
        nextPosition.append(snake[i]);
        previousSnakeX = snakeX;
        previousSnakeY = snakeY;
    }

};



const startGameBtn = () => {
    const button = document.getElementsByClassName("btn-start")[0];
    // реализовать позже
    button.onclick = () => {
    }
    
};

const init = () => {
    generateField();
    generateWall();
    generateSnake();
    defineSnakeDirection();
    moveSnake();
    setInterval(moveSnake, 200);
    // startGameBtn();
};

init();