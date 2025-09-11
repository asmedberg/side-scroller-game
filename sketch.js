// variables
const canvasHeight = 337.5;
const canvasWidth = 600;

let obsticles = [];

let score = 0;
let speed = 5;

let player = {
  yStart: canvasHeight - 100,
  x: 100,
  y: canvasHeight - 100,
  size: 24,
  isJumping: false,
  jumpTime: 0,
  jumpDuration: 60,
  jumpHeight: 175,

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
  rectMode(CENTER);
  ellipseMode(CENTER);
}

function draw() {
  background(220);
  Scene();
  Score();

  if (frameCount % 60 === 0) {
    obsticles.push(new Obsticle());
  }

  for (let i = 0; i < obsticles.length; i++) {
    if (obsticles[i].x < -obsticles[i].w) {
      obsticles.slice(i, 1);
    }
    obsticles[i].display();
    obsticles[i].update();
  }

  player.display();
  player.update();
}

function Scene() {
  push();
  stroke(0);
  strokeWeight(1);
  line(0, canvasHeight - 88, canvasWidth, canvasHeight - 88);
  pop();
}

function Score() {
  push();
  textSize(20);
  text(score, 10, 25);
  pop();
}

function Obsticle() {
  this.w = random(32, 100);
  this.h = random(48, 100);
  this.x = canvasWidth + this.w / 2;
  this.y = random(165, canvasHeight - 100 - this.h / 2);

  this.potential = true;

  this.display = function () {
    push();
    stroke(0);
    strokeWeight(2);
    rect(this.x, this.y, this.w, this.h);
    pop();

    // Add scoring
    if (this.potential && player.x - player.size / 2 > this.x + this.w / 2) {
      score++;
      this.potential = false;
    }

    // Collision with player
    if (
      player.x + player.size / 2 > this.x - this.w / 2 &&
      player.x - player.size / 2 < this.x + this.w / 2 &&
      player.y + player.size / 2 > this.y - this.h / 2 &&
      player.y - player.size / 2 < this.y + this.h / 2
    ) {
      console.log("boop");
      noLoop();
    }
  };

  this.update = function () {
    this.x = this.x - speed;
  };
}

function mousePressed() {
  player.jump();
}
