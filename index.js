const gameBox = document.querySelector("#gamebox");
const context = gameBox.getContext("2d");
const scoreText = document.querySelector("#scoretext");
const retartBtn = document.querySelector("#restartbtn");
const pauseBtn = document.querySelector("#pausebtn");
const resumeBtn = document.querySelector("#resumebtn");
const levelOne = document.querySelector("#levelone");
const levelTwo = document.querySelector("#leveltwo");
const levelThree = document.querySelector("#levelthree");
const startText = document.querySelector("#starttext");
const gameWidth = gameBox.width;
const gameHeight = gameBox.height;
let boardBGcolor = "rgba(14, 171, 14, 0.596)";
let snakeColor = "#333";
const snakeBorder = "white";
let foodColor = "red";
const unitSize = 25;
let running = false;
let level1 = false;
let level2 = false;
let level3 = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let intervalId;
let intervalIdTwo;
let intervalIdThree;
let score = 0;
let snake =[
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];

window.addEventListener("keydown", changeDirection);
retartBtn.addEventListener("click", restartGame);
pauseBtn.addEventListener("click", pauseGame);
resumeBtn.addEventListener("click", resumeGame);
levelOne.addEventListener("click", speedOne);
levelTwo.addEventListener("click", speedTwo);
levelThree.addEventListener("click", speedThree);

function speedOne(){
    level1 = true;
    if(level1){
    restartGame1();
    startGame();
    nextTick();
    }
}
function speedTwo(){
    level2 = true;
    if(level2){
    restartGame1();
    startGame();
    nextTickTwo();
    }
}
function speedThree(){
    level3 = true;
    if(level3){
    restartGame1();
    startGame();
    nextTickThree();
    }
}
function startGame(){
    running = true;
    scoreText.textContent = score;
    startText.textContent = "";
    createFoodPost();
    drawFood();
};
function nextTick(){
    clearInterval(intervalId);
    if(running) {
         intervalId =  setTimeout(() =>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 250);   
    }
    else{
        displayGameOver();
    }
};
function nextTickTwo() {
    clearInterval(intervalIdTwo);
  if(running) {
    intervalIdTwo =  setTimeout(() =>{
          clearBoard();
          drawFood();
          moveSnake();
          drawSnake();
          checkGameOver();
          nextTickTwo();
      }, 150);   
  }
  else{
      displayGameOver();
  }
}
function nextTickThree(){
    clearInterval(intervalIdThree);
    if(running) {
        intervalIdThree =  setTimeout(() =>{
              clearBoard();
              drawFood();
              moveSnake();
              drawSnake();
              checkGameOver();
              nextTickThree();
          }, 75);   
      }
      else{
          displayGameOver();
      };
}
function clearBoard(){
    context.fillStyle = boardBGcolor;
    context.fillRect(0, 0, gameWidth, gameHeight);
};
function createFoodPost(){
    function randomFoodPost(min, max){
        const randomNum = Math.round((Math.random() * (max - min) + min) /unitSize) * unitSize;
        return randomNum;
    }
    foodX = randomFoodPost(0, gameWidth - unitSize);
    foodY = randomFoodPost(0, gameWidth - unitSize);  
};
function drawFood(){
    context.fillStyle = foodColor;
    context.fillRect(foodX, foodY, unitSize, unitSize);
};
function drawSnake(){ 
    context.fillStyle = snakeColor;
    context.strokeStyle = snakeBorder; 
    snake.forEach(snakePart => {
        context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};
    snake.unshift(head);
    //If snake chop/eat food
    if(snake[0].x == foodX && snake[0].y == foodY){
        score+=1;
        scoreText.textContent = score;
        createFoodPost();
    }
    else{
        snake.pop();
    }
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == RIGHT && !goingLeft):
           xVelocity = unitSize;
           yVelocity = 0;
           break;
        case(keyPressed == UP && !goingDown):
          yVelocity = -unitSize;
          xVelocity = 0;
          break;
        case(keyPressed == DOWN && !goingUp):
        yVelocity = unitSize;
        xVelocity = 0;
        break;
    }
};
function checkGameOver(){
    switch (true) {
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = 0;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
        }
    }
};
function displayGameOver(){
    context.font = "50px cursive";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText("GAME OVER", gameWidth / 2, gameHeight / 2);
    running = false;
};
function colorChange(){
    let randomColor = Math.round(Math.random() * 4 + 1);
    switch(true){
        case randomColor == 1:
            snakeColor = "blue";
            foodColor = "yellow";
            boardBGcolor = " rgb(185, 58, 16)";
            break;
        case randomColor == 2:
            snakeColor = "rgba(7, 7, 7, 0.701)";
            foodColor = "green";
            boardBGcolor = "yellow";
            break;
        case randomColor == 3:
            snakeColor = " rgb(185, 58, 16)";
            foodColor = "purple";
            boardBGcolor = "white";
            break;
        case randomColor == 4:
            snakeColor = "green";
            foodColor = "red";
            boardBGcolor = "gray";
            break;
    }

}
function resumeGame(){
    if (running) {
        running = true;
        if(level1 == true){
            nextTick();
        }else if(level2 == true){
            nextTickTwo();
        }else if(level3 == true){
            nextTickThree();
        }
    } 
    };
function pauseGame(){
    if(running){
    context.font = "50px cursive";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText("PAUSED", gameWidth / 2, gameHeight / 2);
    clearInterval(intervalId);
    clearInterval(intervalIdTwo);
    clearInterval(intervalIdThree);
    }
};
function restartGame1(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake =[
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    colorChange ();
}
function restartGame(){
   restartGame1();
    startGame();
    nextTick();
};
