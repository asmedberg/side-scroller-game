// variables
const canvasHeight = 400;
const canvasWidth = 400;

let isJumping = false;
let jumpTime = 0;

let player = {
  yStart: canvasHeight - 100,
  x: 50,
  y: canvasHeight - 100,
  size: 24,
  jumpDuration: 60,
  jumpHeight: 200,

  display: function () {
    noStroke();
    fill(0, 0, 0);
    circle(this.x, this.y, this.size);
  },

  update: function () {
    if (isJumping) {
      let jumpOffset = sin((jumpTime / this.jumpDuration) * PI) * this.jumpHeight;
      this.y = this.yStart - jumpOffset;
      jumpTime++;

      if (jumpTime >= this.jumpDuration) {
        isJumping = false;
        jumpTime = 0;
        this.y = this.yStart;
      }
    }
  }
};

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(220);
  scene();
  player.display();
  player.update();
}

function scene() {
  strokeWeight(1);
  stroke(0, 0, 0);
  line(0, height - 87, width, height - 88);
}

function mousePressed() {
  if (!isJumping) {
    isJumping = true;
    jumpTime = 0;
  }
}
