function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  screen();
  player();
}

function player() {
  // start player at bottom left of canvas
  noStroke();
  fill(0, 0, 0);
  circle(50, height - 100, 25);
}
