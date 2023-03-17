//These are the game constants and game variables
let inputDir = { x: 0, y: 0 };
let foodsound = new Audio("/music/food.mp3");
let gameOver = new Audio("/music/gameover.mp3");
let movesound = new Audio("/music/move.mp3");
let bgsound = new Audio("music/bg.mp3");
let speed = 11;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let score = 0;


//game function
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine()
}

function isCollide(snake) {
  // If you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // If you bump into the wall
  if (
    snake[0].x >= 20 ||
    snake[0].x <= 0 ||
    snake[0].y >= 20 ||
    snake[0].y <= 0
  ) {
    return true;
  }

  return false;
}

function gameEngine() {
  //part 1 : updating the snake array variour location of the body part
  if (isCollide(snakeArr)) {
    gameOver.play();
    // bgsound.pause();
    inputDir = { x: 0, y: 0 };
    let ele = document.createElement("p");
    ele.innerText = "Game Over:"
    document.body.appendChild(ele);
    alert("GameOver, Press any key for restart");
    // bgsound.play();
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
  }

  //if snake eaten the food the regenrate the food and increment the snake
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    foodsound.play();
    score += 1;
      if(score>highscoreval){
        highscoreval=score;
        hiscoreBox.innerHTML="HiSore"+highscoreval;
      }
    scoreBox.innerHTML = "score:" + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 18;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //for moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //part 2 : display the snake and food
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //display food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//main logic starts here

let highscore = localStorage.getItem("highscore");
if(highscore===null)
{
  highscoreval=0;
  localStorage.setItem("highscore",JSON.stringify(highscoreval))
}
else{
  highscoreval=JSON.parse(highscore);
  hiscoreBox.innerHTML="HiSore"+highscore
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  // bgsound.play();
  movesound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      console.log("up");
      break;

    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      console.log("dn");
      break;

    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      console.log("left");
      break;

    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      console.log("right");
      break;
  }
});
