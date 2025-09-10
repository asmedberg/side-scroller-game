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

let object = {
  w: 48,
  h: 64,
  xStart: canvasWidth + 16,
  x: canvasWidth + 16,
  y: canvasHeight - 100,

  display: function () {
    push();
    stroke(0);
    strokeWeight(2);
    rect(this.x, canvasHeight - this.h - 88, this.w, this.h);
    pop();
  },

  update: function () {
    this.x = this.x - 3;
    if (this.x < -this.w) {
      this.x = this.xStart;
    }
  }
};

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(220);
  scene();
  object.display();
  object.update();
  player.display();
  player.update();
}

function scene() {
  push();
  stroke(0);
  strokeWeight(1);
  line(0, canvasHeight - 88, canvasWidth, canvasHeight - 88);
  pop();
}

function mousePressed() {
  player.jump();
}
