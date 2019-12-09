console.log('connected_bubble_function.js');

function Bubble(x, y, size, speed, bubbleColor){
    //position of bubble
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.bubbleColor = bubbleColor;
    //
    this.alive = true;
    this.hectic = hectic;

    //schedule ball for to destroy
    this.destroy = function() {
        this.alive = false;
    }
    this.setSpeed = function(newSpeed) {
        this.speed = newSpeed;
    }
    this.display = function() { //putting styling within css
        strokeWeight(1);
        stroke(0);
        fill(this.bubbleColor);
        ellipse(this.x, this.y, this.size, this.size);
    };

    //move bubble down
    this.move = function() {
        this.y += this.speed;
        this.size += random(-this.hectic, this.hectic);
    };


    //detects intersection with another Bubble
    this.intersects = function(other){
        bubbleDistance = dist(this.x, this.y, other.x, other.y);
        bubbleRadius1 = this.size / 2;
        bubbleRadius2 = other.size / 2;
        if (bubbleDistance > bubbleRadius1 + bubbleRadius2)
        return true
        else
        return false
    }
};


 /////////////////////////////////////////////////
 /*this was first attempt to make bubble work but didnt
 //$( () => {jQuery 
//create function for bubble down
//add event listener for mousemove
    $show_bulls_eye(document).mousemove (function(event) { 
        $show_bulls_eye("span").tex(event.pageX + ", " + event.pageY);
    })

const $bubble_down = (bubble) => {
    bubble_current_position = parseInt(bubble.css('top'));
    bubble.css('top', bubble_current_position + speed);
} //end of $bubble_down
//create function bubble hits the floor
const $check_bubble_hits_floor = (bubble) => {
    if(collision(bubble, floor)) {
        show_bulls_eye(bubble);//of which bubble
        decrement_life();
        return true;
    }
    return false;
    
};//end bubble hits floor function

//create bubble to initial position
const $set_bubble_to_initial_position = (bubble) => {
    bubble.css('top', bubble_initial_position);  
}

//create bulls eye good hit
const $show_bulls_eye = (bubble) => {
    bullseye_num = bubble.attr('data-bullseye');

}//jQuery listener end curly braces
    console.log($bubble_down); //functionused to print any kind of variable before
    console.log($check_bubble_hits_floor); 
    console.log($set_bubble_to_initial_position);
    console.log($show_bulls_eye);
    */ 