/**
 * Creates drifting grass on the bottom of the screen. Inspired from DrawMakeCode on YouTube.
 * @link https://www.youtube.com/watch?v=FH59hqrvWxU
 */
class yard {
    constructor() {
        angleMode(RADIANS);

        this.grass = [];
        this.roff = [];
        this.rwave = [];
        this.size = [];
        this.seg = [];

        this.index = 0;
        this.population = 300;

        for (let x = 0; x < window.innerWidth; x += window.innerWidth / this.population) {
            this.index++;
            this.grass.push(x);
            this.roff.push((this.index * 0.065) + 0.015);
            this.rwave.push(0);
            this.size.push(random(30, 50));
            this.seg.push(0.85); // to deprecate blades by more make this less
        }

        // for trees
        this.theta = 0;
        this.brown = color(115, 58, 17);
    }
    
    /**
     * Is called in the draw loop, so grass moves slightly each time.
     */
    update = function () {
        for (let i = 0; i < this.index; i++) {
            let len = this.size[i];

            push();
            // change '0.99' to move vertical position on screen
            translate(this.grass[i], window.innerHeight * 0.99);
            this.blade(len, i);
            pop();
        }
    };

    /**
     * Makes a blade of grass.
     * @param len the size of the grass.
     * @param ind number which determines type of blade of grass it will be.
     */
    blade = function (len, ind) {

        // blueish green grass
        if (ind / 2 == int(ind / 2)) {
            // if you increase this offset, grass will move faster
            this.roff[ind] += 0.002;
            stroke(0, 200 - (len * 2.5), len * 1.0);
            rot = map(noise(this.roff[ind]), 0, 1, -QUARTER_PI * 0.3, QUARTER_PI * 0.25);
        } else {
            // darker green grass
            this.roff[ind] += 0.002;
            stroke(55 - (len * 2.5), len * 2.5, 10);
            // the decimals by the quarter pi changes angle of grass
            rot = map(-cos(this.roff[ind]), -1, 1, -QUARTER_PI * 0.2, QUARTER_PI * 0.18);
        }

        strokeWeight(len * 2 * 0.1);
        rotate(rot);
        line(0, 0, 0, -len);
        translate(0, -len);

        // makes blades shorter
        if (len > 35) {
            this.blade(len * this.seg[ind], ind);
        }
    };

    /**
     * Draws the background trees randomly placing them.
     * @link reference creator here
     */
    drawtrees(randomList){
        let treeAngles = randomList.filter(p=> p < 80 && p > 5);
        for (let i=0; i<5; i++){
            push();
            stroke(this.brown);
            
            // Let's pick an angle 0 to 90 degrees based on the mouse position
            let a = treeAngles[i];
            // Convert it to radians
            this.theta = radians(a);
            // Start the tree from the bottom of the screen
            translate(randomList[i], height);
        
            scale(4);
            // Draw a line 120 pixels
            strokeWeight(2);
            line(0,0,0,-120);
            // Move to the end of that line
            translate(0,-120);
            // Start the recursive branching!
            strokeWeight(1.5);
            stroke(36, 89, 35); // dark green
            this.branch(30);
            pop();
        
        }
    }

    branch(h) {
        // Each branch will be 2/3rds the size of the previous one
        h *= 0.66;
      
        // when the length of the branch is 2 pixels or less, leave recursion
        if (h > 2) {
          push();    // Save the current state of transformation (i.e. where are we now)
          rotate(this.theta);   // Rotate by theta
          line(0, 0, 0, -h);  // Draw the branch
          translate(0, -h); // Move to the end of the branch
          this.branch(h);       // Ok, now call myself to draw two new branches!!
          pop();     // Whenever we get back here, we "pop" in order to restore the previous matrix state
      
          // Repeat the same thing, only branch off to the "left" this time!
          push();
          rotate(-this.theta);
          line(0, 0, 0, -h);
          translate(0, -h);
          this.branch(h);
          pop();
        }
    }
}