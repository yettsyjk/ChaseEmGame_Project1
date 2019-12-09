console.log('connected_score_board.js');
function scoreBoard(x,y) {
    //position
    this.x = x;
    this.y = y;

    //initial score
    this.score = 0;

    this.display = function() { //styling
        noStroke();
        fill(0);
        textAlign(RIGHT);
        textFont("Fanstasy");
        text("score: " + this.score,this.x,this.y);
    };
    this.incrementScore = function() {
        this.score++;
    };

    this.reset = function() {
        this.score = 0;
    }
}


// console.log(scoreboard.score)
// // scoreboard.incrementScore()
// console.log(scoreboard.score)
// const menu = canvas.getContext('2d');
// menu.font = "64px Fantasy";
// menu.fillText("Current Score: "+scoreboard.score, 10, 120);

// console.log(menu);
