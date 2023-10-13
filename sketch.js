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

let numFrames = [5, 4, 3, 5, 7, 8, 8];
let animationTypes = ['attack', 'dead', 'hurt', 'idle', 'jump', 'run', 'walk']
let Musketeer;

function preload() {

}

function setup() {
  new Canvas(window.innerWidth-4, window.innerHeight-4);

  Musketeer = new Sprite(100, 100, 100);

  // loading all the animations into musketeer
  for (let i = 0; i < NUM_IMAGES; i++){
    Musketeer.addAni(animationTypes[i], imagePaths[i], { frameSize: [SPRITE_SIZE, SPRITE_SIZE], frames: numFrames[i] });
  }
  
}

function draw() {
  clear();
	Musketeer.debug = mouse.pressing();

	if (kb.pressing('left')) {
		Musketeer.changeAni('run');
		Musketeer.vel.x = -2;
		Musketeer.mirror.x = true;
	} else if (kb.pressing('right')) {
		Musketeer.changeAni('run');
		Musketeer.vel.x = 2;
		Musketeer.mirror.x = false;
	}
  else if (kb.pressing('down')) {
    Musketeer.changeAni('idle');
    Musketeer.vel.y = 2;
  }
  else if (kb.pressing('up')) {
    Musketeer.changeAni('jump');
    Musketeer.vel.y = -2;
  }
  else {
		Musketeer.changeAni('idle');
		Musketeer.vel.x = 0;
    Musketeer.vel.y = 0;
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