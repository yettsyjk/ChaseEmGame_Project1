console.log('connected_variables_created');

let game;

function setup() {
    createCanvas(windowWidth, windowHeight);
    userPlatform = new UserPlatform(width / 2, height / 2);
    scoreBoard = new ScoreBoard(width -10, 20);
    game = new Game(userPlatform, scoreBoard);
    game.reset();
    game.setDebug(true);
}

function draw() {
    if(game.isActive()) {//styling
        background(255);
        //create bubble
        game.createNewBubble();
        //update position of and display stuff (bubble, projectile, userPlatform
        game.updateAndDisplayBubble();
        game.updateAndDisplayProjectiles();
        game.updateAndDisplayUserPlatform();

        //display the scoredbaord
        game.displayScoreBoard();

        //display projectiles
        game.removeLostProjectiles();

        game.detectSuccessfulShots();

        game.removeKilledBubble();

        game.removeUsedProjectiles();
        game.stopIfBubbleHitGround();

        game.showDebugInfo();

    } else {
        game.showWelcomeScreen();
    }
}
function mouseClicked() {
    //when game is active clicking the mouse hots
    if(game.gameActive)
    game.shoot();
    //when game is inactive, clicking the mouse restarts the game
    else {
        game.reset();
        game.start();
    }
}

/////////////////////////////////////////
    //start JQuery curly braces begin declaring variables
    //const variables must be assigned a value when they are declared
    //create a function that returns an object that has an object
  /*  ////////////////////////this was my attempt tocreate variables
  const user_platform = $('#user_platform');
//set up variables for platform
    const container = $('#container');
//set up variables for bubble 1,2, 3
    const bubble = $('.bubble');
//set up variables for restart
    const restart = $('#restart');
//set up variables for score_1
    const score_1 = $('#score_1');
//set up variables for life_span
    const life = $('#life');
//set up variables for floor
    const floor_span = $('#floor');

    //saving initial setup
//set up variables for height of container
    const container_width = parseInt(container.width());
    const container_height = parseInt(container.height());
//set up variables for bubble height  
    const bubble_height = bubble.height();
//set up variables for initial position
    const bubble_initial_position = parseInt(bubble.css('top'));
    const bubble_initial_height = parseInt(bubble.css('height'));
//set up variables for score initial
    const score = 0;
//set up variables for life max
    //const life = 5;
//set up variables for players
    //NEED HELP HERE**************************************************
//set up variables for max_speed
    const speed = 2;
    const max_speed = 15;
//set up variables for counter
    const counter = 0;
//set up variables for user_id
    const user_id = 0;
//set up variables for score_updated
    score_updated = false;
//set up variables for the_game
    const the_game = 0;
//set up variables for bubble_current_position
    const bubble_current_position = 0;
//set up variables for bullseye_num
    const bullseye_num = 0;
    $('life_span').text(life);
//});end JQuery curly braces




console.log($('$user_platofrm'));*/