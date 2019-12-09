//create Canvas and draw on it
//render the game inside 
//storing a reference to the <gameCanvas> creating ctx variable
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

//add border to canvas
canvas.style.border = "1px solid #0ff";
//add thickness to canvas
ctx.lineWidth = 3;

//set up variables ans constants in Global Scope
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
//paddle setup
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

//set up the brick variables
let brickRowCount = 7;
let brickColumnCount = 3;
let brickWidth = 70;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
//color of ball i wanted it to change colors everytime it hit the wall
let color = 'green';
//set up score and lives variables
//must create drawScore function
let score = 0;
let lives = 3;
//brick drwaing funtion in an array data type
//making bricks disappear after the are hot
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  //loop through the rows and columns set x and y position
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
  //status property if status is 1 then draw it 
  //but if its 0 then it was hit by the ball dont show up
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

//set up event listener for mouse movements
//default is false 
//when keyDown event is fired on any of the keys on keybard the keyDownHandler and keyUpHandler woll be executed
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
  //pressed buttins  are defined and initialized with boolean variables
  //default is false 
  leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}
function mouseMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}
//set up collision detection for canvas walls except platform floor

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
    //involve brick status the status is 1
    //if collision happens it is active
    //using b through out the formula will keep bricks active
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
        //if collision occurs set the status of brick to 0, it will not be painted on screen
          b.status = 0;
          score++;
          if (score == brickRowCount * brickColumnCount) {
            alert("Winner Winner, CONGRATS!. That's right, it\'s not over until I win");
            document.location.reload();
          }
        }
      }
    }
  }
}
//collision detection for creating ball 
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);//draw ball inside function
  //color = (contact === true ? (color === 'green' ? 'pink' : 'green'): color);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}
//define the paddle to hit the ball
function drawPaddle() {
  ctx.beginPath();
  //if the y-value of ball position is lower than zero, change direction
  //of the movement on y-axis by setting it equal to itself
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#42f5cb";
  ctx.fill();
  ctx.closePath();
}
//function for drawBricks based on veriables set up 
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        let brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#f542d4";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function drawScore() {
  ctx.font = "22px Fantasy";
  ctx.fillStyle = "#6942f5";
  //similar to css styling 10 and 20 are coordinates where text is placed on canvas
  ctx.fillText("Score: " + score, 10, 20);
}
//drwaing life counter
//instead of ending the game immmediately, decrease the number of lives until gine
function drawLives() {
  ctx.font = "20px Fantasy";
  ctx.fillStyle = "red";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}
//function to draw
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);//clears 
  drawBricks();
  drawBall();//add a call to function bewteen clearing the Camvas and draw
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();//add the call to function
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  //if the ball hits the bottom edge of Canvas we need to check whether it hits the paddle
  if (y + dy < ballRadius) {
    dy = -dy;
  //if yes the it bounces off just like we want
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
    //ball hits the bottom edge of screen, subtract one life 
      lives--;
    //if there are no lives left, the game is loft
      if (!lives) {
        alert("WAH WAH, GAME OVER!");
        document.location.reload();
      } else {
        //if there are lives left, then position of the ball and the paddle are reset
        //along with movement of ball
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 3; //physics ya'll
        dy = -3; //physics ya'll this is direcional velocity
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  x += dx;
  y += dy;
  //the draw function is executed again and again, giving control back to browser
  //it will sync the framerate and render the shapes only when needed
  requestAnimationFrame(draw);
}
//rendering the game
draw();//function draw will be called