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
let Musketeer, floor;

function preload() {
  Musketeer = new Sprite(window.innerWidth/2, 0, 500, 128);

  // loading all the animations into musketeer
  for (let i = 0; i < NUM_IMAGES; i++){
    Musketeer.addAni(animationTypes[i], imagePaths[i], { frameSize: [SPRITE_SIZE, SPRITE_SIZE], frames: numFrames[i], frameDelay: 32});
  }
  Musketeer.changeAni('idle');
  
}

function setup() {
  new Canvas(window.innerWidth-4, window.innerHeight-4, 'pixelated x4');

	world.gravity.y = 10;
	allSprites.pixelPerfect = true;

	floor = new Sprite(0, window.innerHeight/2, window.innerWidth, 32, 's');
	floor.color = color(133, 228, 62);
}

function draw() {
  clear();

  if (kb.presses('up')) Musketeer.changeAni('jump');
  if (kb.presses('down')) Musketeer.changeAni('idle');
  
  if (kb.pressing('left')) Musketeer.vel.x = -1;
  else if (kb.pressing('right')) Musketeer.vel.x = 1;
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
}

function mousePressed() {
  // spr.position.x = mouseX;
  // spr.position.y = mouseY;
}