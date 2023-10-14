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

function preload() {
  Musketeer = new Sprite(window.innerWidth/2, 0, 500, 128);

  // loading all the animations into musketeer
  for (let i = 0; i < NUM_IMAGES; i++){
    Musketeer.addAni(animationTypes[i], imagePaths[i], { frameSize: [SPRITE_SIZE, SPRITE_SIZE], frames: numFrames[i]});
  }
  Musketeer.changeAni('idle');
  
  
}

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

function draw() {
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
  backgroundClock = new clock(hour(), minute(), second(), mils, randomList);

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

function drawtrees(){
  for (let i=0; i<5; i++){
    if (randomList[i] > window.innerWidth/2.5 || randomList[i] < window.innerWidth/2){
      push();
      stroke(brown);
      strokeWeight(8);
      // Let's pick an angle 0 to 90 degrees based on the mouse position
      let a = (randomList[i] / this.innerWidth) * 70;
      // Convert it to radians
      theta = radians(a);
      // Start the tree from the bottom of the screen
      translate(randomList[i], height);
      // Draw a line 120 pixels
      line(0,0,0,-120);
      // Move to the end of that line
      translate(0,-120);
      // Start the recursive branching!
      stroke(36, 89, 15); // dark green
      branch(150);
      pop();
    }
  }
}

function branch(h) {
  // Each branch will be 2/3rds the size of the previous one
  h *= 0.66;

  // All recursive functions must have an exit condition!!!!
  // Here, ours is when the length of the branch is 2 pixels or less
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