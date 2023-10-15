const SPRITE_SIZE = 128;
const NUM_IMAGES = 7;

let imagePaths = [
  '/images/Musketeer/Attack_1.png',
  '/images/Musketeer/Dead.png',
  '/images/Musketeer/Hurt.png',
  '/images/Musketeer/Idle.png',
  '/images/Musketeer/Jump.png',
  '/images/Musketeer/Run.png',
  '/images/Musketeer/Walk.png'];

let numFrames = [5, 4, 3, 1, 7, 8, 8];
let animationTypes = ['attack', 'dead', 'hurt', 'idle', 'jump', 'run', 'walk']
let Musketeer;

let grass;
let rot;

let backgroundClock;
let millisRolloverTime, prevSec;

let randomList = [];

// for trees
let theta;
var brown;

// my own make shift 'timer' for events that should occur at specific times e.g. a welcome page
let timer = 0;

/**
 * Before the site is loaded to the user, the sprites are loaded and created.
 */
function preload() {
  Musketeer = new Sprite(window.innerWidth/2, 0, 500, 128);

  // loading all the animations into musketeer
  for (let i = 0; i < NUM_IMAGES; i++){
    Musketeer.addAni(animationTypes[i], imagePaths[i], { frameSize: [SPRITE_SIZE, SPRITE_SIZE], frames: numFrames[i]});
  }
  Musketeer.changeAni('idle');
  
  
}

/**
 * Same as preload function, however is for everything else that should be initialized only once,
 * like random functions.
 */
function setup() {
  // Populate the static randomList array
  for (let i = 0; i < 999; i++){
      randomList.push(random(0, window.innerWidth));
  }

  createCanvas(window.innerWidth-4, window.innerHeight-4);

	world.gravity.y = 10;

  // make the pretty grass
  noStroke();
  let ground = new Sprite(0, window.innerHeight-5, window.innerWidth*2, 5, 'static');
  brown = color(115, 58, 17);
  ground.color = brown;
  grass = new yard();

}

/**
 * This is on loop continuously, basically a rendering function which displays everything
 * to the user on the browser.
 */
function draw() {
  frameRate(60);
  clear();
  background(20, 13, 38);

  // calculate millis
  // Note that this is more correct than using millis()%1000;
  if (prevSec != second()) {
    millisRolloverTime = millis();
  }
  prevSec =  second();
  mils = floor(millis() - millisRolloverTime);
  // make pretty background from my previous work
  backgroundClock = new clock(12, minute(), second(), mils, randomList); // TODO switch to hour()

  console.log(Musketeer.ani.name);
  if (kb.pressing('up')) {
    // TODO change jump to left and right jumping so it looks right
    Musketeer.changeAni('jump');
  }

  // make it loop only once
  if (Musketeer.ani.name == 'jump' && Musketeer.ani.frame == 6){
    Musketeer.ani.frame = 0;
    Musketeer.changeAni('idle');
  }
  
  if (kb.pressing('left') && Musketeer.x > 0) Musketeer.vel.x = -2;
  else if (kb.pressing('right')&& Musketeer.x < window.innerWidth) Musketeer.vel.x = 2;
  else Musketeer.vel.x = 0;
  
  if (Musketeer.ani.name != 'jump') {
    if (kb.pressing('left')) {
      Musketeer.changeAni('run');
      Musketeer.mirror.x = true;
    } else if (kb.pressing('right')) {
      Musketeer.changeAni('run');
      Musketeer.mirror.x = false;
    } else {
      Musketeer.changeAni('idle');
    }
  }

  // if the player walks outside of the screen - puts them in the opposite side.
  if (Musketeer.x >= window.innerWidth){
    Musketeer.x = 1;
  }
  else if (Musketeer.x <= 0){
    Musketeer.x = window.innerWidth-1;
  }


	if (kb.pressing('space')) {
		Musketeer.ani.stop();
	} else {
		Musketeer.ani.play();
	}
  

  // trees
  drawtrees();

  grass.update();
}

/**
 * Draws the background trees randomly placing them.
 */
function drawtrees(){
  let treeAngles = randomList.filter(p=> p < 80 && p > 5); // so when it zooms out, there aren't heaps of random clouds
  for (let i=0; i<5; i++){
    push();
    stroke(brown);
    
    // Let's pick an angle 0 to 90 degrees based on the mouse position
    
    let a = treeAngles[i];
    // Convert it to radians
    theta = radians(a);
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
    branch(30);
    pop();
  
  }
}

function branch(h) {
  // Each branch will be 2/3rds the size of the previous one
  h *= 0.66;

  // when the length of the branch is 2 pixels or less, leave recursion
  if (h > 2) {
    push();    // Save the current state of transformation (i.e. where are we now)
    rotate(theta);   // Rotate by theta
    line(0, 0, 0, -h);  // Draw the branch
    translate(0, -h); // Move to the end of the branch
    branch(h);       // Ok, now call myself to draw two new branches!!
    pop();     // Whenever we get back here, we "pop" in order to restore the previous matrix state

    // Repeat the same thing, only branch off to the "left" this time!
    push();
    rotate(-theta);
    line(0, 0, 0, -h);
    translate(0, -h);
    branch(h);
    pop();
  }
}

// function keyPressed() {
//   loop();
// }

// function keyReleased() {
//   noLoop();
// }