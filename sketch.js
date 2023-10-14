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
  ground.color = color(115, 58, 17);
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
  
  if (kb.pressing('left')) Musketeer.vel.x = -2;
  else if (kb.pressing('right')) Musketeer.vel.x = 2;
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


	if (kb.pressing('space')) {
		Musketeer.ani.stop();
	} else {
		Musketeer.ani.play();
	}


  grass.update();
}



// function keyPressed() {
//   loop();
// }

// function keyReleased() {
//   noLoop();
// }