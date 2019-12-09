console.log('connected_the_game_function');

function Game(userPlatform, scoreBoard) { //end of function Game curly brace
    this.debug = false;

    //
    this.userPlatform = userPlatform;
    this.scoreBoard = scoreBoard;

    this.reset = function() { //this.reset = function()
        this.gameActive = false;
        this.scoreBoard.reset();
        this.bubble = [];
        this.projectiles = [];

        this.bubbleDensity = 0.985;
        this.bubbleDensityInc = 0.0001;

        this.bubbleMinSpeed = 0.25;
        this.bubbleMinSpeedInc = 0.0001;

        this.bubbleMaxSpeed = 2;
        this.bubbleMaxSpeedInc = 0.0001;

        this.bubbleMinSize = 25;
        this.bubbleMaxSize = 125;
    } //this.reset = function() end curly brace

        this.isActive = function() {
            return this.gameActive;
        }

        this.start = function() {
            this.gameActive = true;
        }
//styling
        this.showWelcomeScreen = function() {
            welcome_msg = "Chase 'Em";
            textSize(random(65, 68));
            text(welcome_msg, width / 2, height / 2);
            action_msg = "Click to Start, Click to Play."
            textSize(25);
            text(action_msg, width / 2, height / 2);
            score_msg = "Your previous score was: " + this.score_board.score + ".";
            textSize(25);
            text(score_msg, width / 2, height / 4 * 3);
        }


        this.createNewBubble = function() {
            if (random() > this.bubbleDensity) {
                //pick random color, speed, size and horizontal position
                bubbleColor = color(random(255), ramdom(255), random(255), 50);
                speed = random(this.bubbleMinSpeed, this.bubbleMaxSpeed);
                size = random(this.bubbleMinSize, this.bubbleMaxSize);
                x = random(0 + size / 2, width - size / 2);
                //vertical position is fixed
                y = -size /2;
                //hectic behavior***not entered
                hectic = random(0.5, 1.5);
                //create a new Bubble
                this.bubble.push(new Bubble(x, y, size, speed, bubbleColor, hectic));
            }
        };


        this.updateAndDisplayBubbles = function() {
            for(let i = this.bubble.length - 1; i >= 0; i--) {
                this.bubble[i].move();
                this.bubble[i].display();
            }
        };

        this.updateAndDisplayProjectiles = function() {
            for(let i = this.projectiles.length - 1; i >= 0; i--) {
                this.projectiles[i].move();
                this.projectiles[i].display();
            }
        };

        this.updateAndDisplayUserPlatform = function() {
            this.user_platform.updatePosition();
            this.user_platform.display();
    };

        this.displayScoreBoard = function() {
            this.scoreBoard.display();
        };

        this.shoot = function() {
            this.projectiles.push(this.userPlatform.shoot());
        }

        this.stopIfBubbleHitGround = function() {
            //iterate through all the bubbles
            for(let i = this.bubble.length -1; i >= 0; i--) {
                //when bubble hits gound game ends
                if(this.bubble[i].y > height) {
                    this.gameActive = false;
                }
            }
        };


        this.removesLostProjectiles = function() {
            //iterate through all the projectiles
            for(let i = this.projectiles.length - 1; i >= 0; i--){
             //if projectile passes the screen top it is lost can delete.
             if(this.projectiles[i].y < 0)
             this.projectiles.splice(i, 1);   
            }
        };

        this.detectSuccessfulShots = function() {
            //iterate through all the meteors
            for(let i = this.bubble.length - 1; i >= 0; i--) {
                //for each bubble, now is considered all projectiles
                for(let j = this.projectiles.length - 1; j >= 0; j--) {
                    //was there a hit?
                    if(this.bubble[i].intersects(this.projectiles[j])) {
                    //destroy both the projectiles and bubbles
                    this.bubble[i].destroy();
                    this.projectiles[j].destroy();
                    //increment score 
                    this.scoreBoard.incrementScore();
                    //increment game difficulty yikes better get this right
                    this.bubbleMinSpeed += this.bubbleMinSpeedInc;
                    this.bubbleMaxSpeed += this.bubbleMaxSpeedInc;
                    this.bubbleDensity -= this.bubbleDensityInc;
                }
            }
        }
    };

        this.removeKilledBubbles = function() {
            //remove bubbles scheduled for removal
            for(let i = this.bubble.length - 1; i >= 0; i--) {
                if(!this.bubble[i].alive)
                this.bubble.splice(i, 1);
            }
        };

        this.removUsedProjectiles = function() {
            for(let i = this.projectiles.length -1; i >= 0; i--) {
                if(!this.projectiles[i].alive)
                this.projectiles.splice(i, 1);
            }
        };

        this.setDebug = function(v) {
            this.debug = v;
        }

        this.showDebugInfo = function() {
            if(this.debug == true) {
                print('# bubbles: ' + this.bubble.length);
                print('# projectiles: ' + this.projectiles.length);
            }
        }
    }//end of function Game curly brace
    // const scoreboard = new scoreBoard(0,0)
    // const platform = new userPlatform(10, 600)
    // game = new Game(platform, scoreboard);
    // game.start();
    // console.log(game.isActive())
    // game.showWelcomeScreen()
    setup();

        
/*first attempt ****************
$( () => { //begin jQuery
//create a function for the_game
    $(document).ready()
    the_game = (the_game) => {
//bubble1 function
        if(check_bubble_hits_floor(bubble1) || check_bubble_hits_platform(bubble1)) {
            set_bubble_to_initial_position(bubble1);
            console.log('123'); //true
        } else {
            bubble_down(bubble1); //return false
        }
    //bubble2 function
        if(check_bubble_hits_floor(bubble2) || check_bubble_hits_platform(bubble2)) {
            set_bubble_to_initial_position(bubble2);//true
        } else {
            bubble_down(bubble2);//return false
        }
    //bubble 3 function
        if(check_bubble_hits_floor(bubble3) || check_bubble_hits_platform(bubble3)) {
            set_bubble_to_initial_position(bubble3); //true
        } else {
            bubble_down(bubble3);
        }
//check life amount
        if(life > 0) {
            bubble_id = requestAnimationFrame(the_game);
        } else {
            stop_the_game();
        };
        //end of the game function
    bubble_id = requestAnimationFrame(the_game);
    }
});//end of Jquery curly braces
first attempt
*/