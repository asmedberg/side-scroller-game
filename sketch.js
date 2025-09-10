// variables
const canvasHeight = 400;
const canvasWidth = 400;

let player = {
  yStart: canvasHeight - 100,
  x: 50,
  y: canvasHeight - 100,
  size: 24,
  isJumping: false,
  jumpTime: 0,
  jumpDuration: 60,
  jumpHeight: 200,

  display: function () {
    push();
    noStroke();
    fill(0, 0, 0);
    circle(this.x, this.y, this.size);
    pop();
  },

  update: function () {
    if (this.isJumping) {
      let jumpOffset = sin((this.jumpTime / this.jumpDuration) * PI) * this.jumpHeight;
      this.y = this.yStart - jumpOffset;
      this.jumpTime++;

      if (this.jumpTime >= this.jumpDuration) {
        this.isJumping = false;
        this.jumpTime = 0;
        this.y = this.yStart;
      }
    }
  },

  jump: function () {
    if (!this.isJumping) {
      this.isJumping = true;
      this.jumpTime = 0;
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
  push();
  strokeWeight(1);
  stroke(0, 0, 0);
  line(0, height - 87, width, height - 88);
  pop();
}

function mousePressed() {
  player.jump();
}
