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

let nature;
let rot;

let backgroundClock;
let millisRolloverTime, prevSec;

let randomList = [];
let width = window.innerWidth;
let height = window.innerHeight;

// my own make shift 'timer' for events that should occur at specific times e.g. a welcome page
let timer = 0;

// if game is paused
let isPaused = false;

// for menu icons
let homeIcon, settingsIcon, helpIcon;

/**
 * Before the site is loaded to the user, the sprites are loaded and created.
 */
function preload() {
  Musketeer = new Sprite(width/2, 0, 128, 128);

  // loading all the animations into musketeer
  for (let i = 0; i < NUM_IMAGES; i++){
    Musketeer.addAni(animationTypes[i], imagePaths[i], { frameSize: [SPRITE_SIZE, SPRITE_SIZE], frames: numFrames[i]});
  }
  Musketeer.changeAni('idle');

  // mouse character
  let face = loadImage('images/candleCursor.png');

  let mouseCandle = new Sprite();
  
  mouseCandle.draw = () => {
    for (let i=1; i<=4; i++){
      push();
      rotate(mouseCandle.direction);
      fill(237, 166, 66, (i*30)); // orangeish fading
      ellipse(0, 0, (i*15) + mouseCandle.speed, (i*15) - mouseCandle.speed);
      pop();
    }
    image(face, mouseCandle.vel.x, mouseCandle.vel.y+15);
  };

  mouseCandle.update = () => {
    mouseCandle.moveTowards(mouse, 0.07);
  };

  mouseCandle.overlaps(Musketeer);

  // images menu
  helpIcon = createImg('images/helpIcon.png', 'help/info button');
  homeIcon = createImg('images/homeIcon.png', 'home button');
  settingsIcon = createImg('images/settingsIcon.png', 'settings button');
  
}

/**
 * Same as preload function, however is for everything else that should be initialized only once,
 * like random functions.
 */
function setup() {
  // Populate the static randomList array
  for (let i = 0; i < 999; i++){
      randomList.push(random(0, width));
  }

  createCanvas(width-4, height-4);

	world.gravity.y = 10;

  // make the pretty yard
  noStroke();
  let ground = new Sprite(0, height-5, width*2, 5, 'static');
  brown = color(115, 58, 17);
  ground.color = brown;
  nature = new yard();

  noCursor();

}

/**
 * This is on loop continuously, basically a rendering function which displays everything
 * to the user on the browser.
 */
function draw() {
  frameRate(60);
  clear();

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
  else if (kb.pressing('right')&& Musketeer.x < width) Musketeer.vel.x = 2;
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
  if (Musketeer.x >= width){
    Musketeer.x = 1;
  }
  else if (Musketeer.x <= 0){
    Musketeer.x = width-1;
  }

  // draw the nature yard
  nature.update();
  nature.drawtrees(randomList);

  drawMenu();
}

let homeIconDiam = 40, settingsIconDiam = 40, helpIconDiam = 40;
/**
 * 'home', 'settings' and 'help' buttons on the top left hand corner.
 */
function drawMenu(){
  fill(255, 233, 80); // suns color for rectangle

  homeIcon.mouseOver( function() { homeIcon.size(50, 50); homeIconDiam = 60; } );
  homeIcon.mouseOut( function() { homeIcon.size(32, 32); homeIconDiam = 40; } );
  homeIcon.position(width/70, height/60);
  rect(width/70-5, height/60-5, homeIconDiam, homeIconDiam, 20);

  settingsIcon.mouseOver( function() { settingsIcon.size(50, 50); settingsIconDiam = 60; } );
  settingsIcon.mouseOut( function() { settingsIcon.size(32, 32); settingsIconDiam = 40; } );
  settingsIcon.position(width/70, height/60+(height/12));
  rect(width/70-5, height/60+(height/12)-5, settingsIconDiam, settingsIconDiam, 20);

  helpIcon.mouseOver( function() { helpIcon.size(50, 50); helpIconDiam = 60; } );
  helpIcon.mouseOut( function() { helpIcon.size(32, 32); helpIconDiam = 40; } );
  helpIcon.position(width/70, height/60+(2*height/12));
  rect(width/70-5, height/60+(2*height/12)-5, helpIconDiam, helpIconDiam, 20);
}

function keyPressed() {
  // this is the space bar
  if (keyCode == 32){
    if (isPaused){
      loop();
      noCursor();
      isPaused = false;
    }
    else {
      noLoop();
      cursor();
      isPaused = true;
    }
  }
}


// function keyReleased() {
//   noLoop();
// }