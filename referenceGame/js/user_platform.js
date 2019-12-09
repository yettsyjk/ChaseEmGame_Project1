console.log('connected_user_platform.js');

function userPlatform(x, y) {
    //ship position
    this.x = x;
    this.y = y;
    //width and height
    this.width = 25;
    this.height = 50;

    this.display = function() { //styling
        fill(color(255, 0, 0, 50));
        stroke(0);
        strokeweight(1);
        triangle(this.x - this.width, this.y,this.x, this.y - this.height,this.x + this.width, this.y);
    };

    //updated position based of mouse
    this.updatePosition = function() {
        this.x = mouseX;
        this.y = height - 10;
    };
//shooting at bubble
this.shoot = function() {//create class
    projectile = new Bubble(this.x, this.y - 50, 10,-10,0,0);
    return projectile; //true
    } 
}