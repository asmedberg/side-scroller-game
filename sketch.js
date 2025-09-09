// variables
let isJumping = false;
let jumpTime = 0;
const jumpDuration = 60;
const jumpHeight = 100;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  scene();
  player();

  // update jump physics
  if (isJumping) {
    jumpTime++;
    if (jumpTime >= jumpDuration) {
      isJumping = false;
      jumpTime = 0;
    }
  }
}

function scene() {
  strokeWeight(1);
  stroke(0, 0, 0);
  line(0, height - 87, width, height - 88);
}

function player() {
  let yPos = height - 100; // default y position

  if (isJumping) {
    let jumpOffset = sin((jumpTime / jumpDuration) * PI) * jumpHeight;
    yPos -= jumpOffset;
  }

  // start player at bottom left of canvas
  noStroke();
  fill(0, 0, 0);
  circle(50, yPos, 24);
}

function mouseClicked() {
  if (!isJumping) {
    isJumping = true;
    jumpTime = 0;
  }
}
