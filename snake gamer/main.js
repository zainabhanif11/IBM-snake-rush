// button popup styling
// Get the modal and button elements
const gameModal = document.getElementById("gameModal");
const startButton = document.getElementById("startButton");

// Game ko start karne ka function
function startGame() {
    console.log("Game started!");
    // Yahan apna game start hone ka code likhein
}

// Start button par click event listener
startButton.addEventListener("click", () => {
    gameModal.style.display = "none"; // Modal ko hide kar dein
    startGame(); // Game start karne ka function call kar dein
});
// finish



// game contants and variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 9;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];

food = { x: 6, y: 7 }; //food array nhe hai


//Game functions
function main(ctime) { //current time
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // if u bump into urself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) { //dono coordinate match kr liye hn, x or y, for collision
            return true;
        }
    }
    //if u bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {//wall se tarana, apni grid 0 se 18 tk hai , value jo dee hai, wo 0 se choti or 18 se baari nhe honi chahye
        return true;
    }
}


function gameEngine() {
    // part 1: Updating the snake array & food
    if (isCollide(snakeArr)) {
        gameOverSound.play(); 
        musicSound.pause(); 
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press OK to play again!");
        snakeArr = [{ x: 13, y: 15 }]; /* initial/head position given*/
        musicSound.play(); 
        score = 0;

    }

    // if you have eaten the food, increment the score & regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1; //score brhe ga, jese jese food khayega
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score: " + hiscoreval;
        }
        scoreBox.innerHTML = "score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y }); // ab khana kha liya tu update krne prega food ki location ko //
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }; // ye generate krega a se lekr b tk random number // //yahan food bn rha hai //
        // mjy wahan se wahan tk radom number add krna hai jahan se jaahn tk meri grid hai, 0 - 18 tk hau meri grid, lkn meu random number 2-16 tk rakhun gi, //
    }

    // moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // part 2: Display the snake and food
    // display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head'); // means jb index 0 ho tou snake tu app add krein hee sath mei head bhi add krein
        } else {
            snakeElement.classList.add('snake'); //wrna head 
        }
        board.appendChild(snakeElement);
    });
    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}




//Main logic starts here")
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
   hiscoreBox.innerHTML = "High Score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } // start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});