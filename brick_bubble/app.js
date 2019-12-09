console.log("connected sheet");

//create a main loop: did something happen, what changed?
//instantiate the game by creating a 480 by 320 box
var game = new Phaser.Game(480, 320, 
    //load assets and print them on screen
    //the width and height of the game in pixels
    Phaser.AUTO, 
    //the parent element of the game, referenced in the html page
    null, 
    {
    preload: preload,//the preloading function will runt 1 time
    create: create, //the creation function, will run 1 time
    update: update //the update (game-loop) function, will run entire
});
///////////////////////////////////////

//create variables for the game
//track the state of a lot of variables
const ball = ball;
const paddle = paddle;
const bricks = bricks;
const newBricks = newBricks;
const score = 0;
const scoreText = scoreText;
const lives = 5;
const livesText = livesText;
const killCount = 0;
var lifeLostText = lifeLostText;
const playing = false;
const startButton = startButton;


const brickInfo = {
    width: 50,
    height: 20,
    count: {
        row: 7,
        col: 3
    },
    offset: {
        top: 50,
        left: 60
    },
    padding: 10
};
//function preload that was created at the beginning 
//load image. it follows the background
//preload function sets up al the 
function preload() { 
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    //load background sky
    game.stage.backgroundColor = 'coral';
    game.load.image('triangles', 'triangles-1430105_640.png');
    
    game.load.image('ball', 'bowling-ball-64.png');
    game.load.image('platform', 'platformship.png');
    game.load.image('brick', 'brick-wall-48.png');
    //didnt load the wobble effect image or button image
    //need to get images for the paddle and button
}
//
function initBricks() {
     bricks = game.add.group();
     console.log('initBricks');
     for(let c = 0; c < brickInfo.col; c++){
         //
         for(let r = 0; r < brickInfo.count.row; r++){
             const brickX = (r * (brickInfo.width + brickInfo.padding)) + brickInfo.offset.left;
             const brickY = (c * (brickInfo.height + brickInfo.padding)) + brickInfo.offset.top;

             newBrick = game.add.sprite(brickX, brickY, 'brick');
             game.physics.enable(newBrick, Phaser.Physics.ARCADE);
             newBrick.body.immovable = true;
             newBrick.anchor.set(.5);
             bricks.add(newBrick);
         }
     }
}
//create ballLeaveScreen
function ballLeaveScreen() {
    lives--;
    //create boolean
    if(lives === 0){
        alert('Game Over!');
        location.reload();
    }else {
        livesText.setText('Lives: ' + lives);
        ball.reset(game.world.width * .5, game.world.height - 25);
        paddle.reset(game.world.width * .5. game.world.height - 5);
        lifeLostText.visible = true;
        game.input.onDowm.addOnce( function() {
            lifeLostText.visible = false;
            ball.body.velocity.set(150, -150);
        });
    }
}

//create function for ballHitBrick
function ballHitBrick(ball, brick) {//this sets the coordinates x and y
    console.log(brick.scale);
    const killTween = game.add.tween(brick.scale);
    killTween.to({
        x: 0,
        y: 0
    }
    ,200,
     Phaser.Easing.Linear.None);
    killTween.onComplete.addOnce( function() {
        brick.kill();
    });
    killTween.start();
    score += 10;
    scoreText.setText('Points: ' + score);

    //set winning conditions
    killCount++;
    if(killCount === bricks.children.length){
        alert('You won the game, congratulations you big winner!');
        location.reload();
    }
}
//function
function ballHitpaddle(ball, paddle){
    ball.animations.play('wobble');//Phaser allows this cool animation
    ball.body.velocity.x = 10 * (ball.x - paddle.x);
}
//funtion startGame
function startGame() {
    startButton.destroy();
    ball.body.velocity.set(150, -150);
    playing = true;
}


//function create, the order the sprites are created are the order they will show up
function create() {
    //enable physics oh yeah
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //add sprites
    ball = game.add.sprite(game.world.width * .5, game.world.height - 25, 'ball');
    ball.animations.add('wobble', [0,1,0,2,0,1,0,2,0], 24);
    paddle = game.add.sprite(game.world.width * .5, game.world.height - 5, 'paddle');
    initBricks();

    //config Physics
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    game.physics.enable(paddle, Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision.down = false;

    //config ball
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);
    ball.checkWorldBounds = true;
    ball.events.onOutOfBounds.add(ballLeaveScreen);
    ball.anchor.set(.5);

    //config the paddle
    paddle.anchor.set(.5, 1);
    paddle.body.immovable = true;

    //config text functions
    const textStyles = {
        font:'18px Fantasy', 
        fill: '#0095DD'
    };
    scoreText = game.add.text(5,5, 'Points: ' + score, textStyles);
    livesText = game.add.text(game.world.width - 5, 5, ' Lives: ' + lives, textStyles);
    lifeLostText = game.add.text(game.world.width * .5, game.world.height * .5, 'Life lost wah wah, click to continue', 
    textStyles);
    lifeLostText = anchor.set(.5);
    lifeLostText.visible = false;
    livesText.anchor.set(1, 0);
    
    //config the start button, still need an image 
    startButton = game.add.button(game.world.width * .5, game.world.height * .5, 'button', startGame, this, 1, 0,2);
    startButton.anchor.set(.5);
}
//get ready 
function update() {
    game.physics.arcade.collide(ball, paddle, ballHitpaddle);
    game.physics.arcade.collide(ball, bricks, ballHitBrick);
    if(playing){
        paddle.x = game.input.x || game.world.width * .5;
    }
}
let game = new Phaser.Game();