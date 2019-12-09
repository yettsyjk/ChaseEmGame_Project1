//console.log("connected new game app");
const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

//create the unit 
const box = 32; //pixel of snake head and body size

//load image
const ground = new Image();
ground.src = "triangles.png";

const foodImg = new Image();
foodImg.src = "food.png";

//create the snake
let snake = []; //array
snake[0] = { //initiate snake with index 0 is the head
    x: 2 * box,
    y: 10 * box
};

//create the food randomly
let food = { //object with x and y positions
    x: Math.floor(Math.random()*17+1) * box,
    y: Math.floor(Math.random()*15+3) * box
}

//create the score tracker
let score = 0;

//conrtol the snake
let d;//declare d variable outside the function

document.addEventListener("keydown", direction);//control the snake
function direction(event){
    let key = event.keyCode;
        
    if(key == 37 && d != "LEFT") {
        left.play();
        d = "LEFT";
    } else if (key == 38 && d != "DOWN"){//new condition prevent opposite direction
        d = "UP";
        up.play();
    } else if(key == 39 && d != "RIGHT") {
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP") {
        d = "DOWN";
        down.play();
    }
}

//check collision function, head was running into wall
function collision(head, array){ //two param array
//new head has same position as cell of the snake
    for(let i = 0; i <array.length; i++){

        if(head.x == array[i].x && head.y == array[i].y) {
//collision
            return true;
        }
    }
    //no collision
    return false;
}
//draw everything on the canvas
function draw(){

    ctx.drawImage(ground, 0, 0);

    for(let i= 0; i <snake.length; i++){
        ctx.fillStyle = (i == 0)? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);//x position for every cell

        ctx.strokeStyle = "red"; //draw a stroke with red color
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.drawImage(foodImg, food.x, food.y);//food takes random places

    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //which direction
    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    //if the snake eats the food it get bigger
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random()*17+1) * box,
            y: Math.floor(Math.random()* 15 + 3) * box
        }
        //we dont remove the tail
    }else {
        //remove tail and gets smaller
        snake.pop();
    }
    //add a new head
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    //snake is an array 
    //game over rules greater than 17boxes or smaller than 3 boxes  
    if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)){
        clearInterval(game);
        dead.play();
        }
        snake.unshift(newHead);

        ctx.fillStyle = "white";
        ctx.font = "45px Changa one";
        ctx.fillText("Score: "+ score, 2 * box, 1.6 * box);
}

//call the function every 100ms
let game = setInterval(draw, 100);