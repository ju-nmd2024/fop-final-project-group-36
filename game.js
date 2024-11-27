let x = 100;
let y = 100;
let state = "start";
speed = 5;

function setup() {
  createCanvas(800, 700);
}

function draw() {
  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "You died!" || state === "You win!") {
    resultScreen();
  }
}

function startScreen() {
  background(103, 127, 191);
  textSize(90);
  fill(233, 123, 191);
  textFont("Starborn");
  text("Star Dash", x + 100, y);
  textSize(40);
  text("click to start", x + 200, y + 400);

  // Set the center of the canvas
  translate(x + 600 / 2, y + 400 / 2);

  rotate(-PI / 2);
  // Set stroke color for the star
  noStroke();
  fill(244, 207, 105);

  // Draw the star
  beginShape();
  let points = 5; // 5 points for a simple star
  let radius1 = 100; // Outer radius of the star
  let radius2 = 40; // Inner radius of the star
  let angle = -PI / points; // Angle between each point of the star

  for (let i = 0; i < points * 2; i++) {
    // Alternate between outer and inner points
    let radius = i % 2 === 0 ? radius1 : radius2;
    let x = radius * cos(i * angle);
    let y = radius * sin(i * angle);
    vertex(x, y);
  }

  endShape(CLOSE);
}

function gameScreen() {
  background(0, 0, 0);
  textSize(90);
  fill(233, 123, 191);

  rect(x + 241, y + 428, 90, 20, 20);

  if (keyIsDown(37)) {
    x = x - speed;
  } else if (keyIsDown(39)) {
    x = x + speed;
  }
  push();
  drawStar(x + 200, y + 200, 30, 15, 5);
  function drawStar(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;

    beginShape();
    for (let a = -PI / 2; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
    pop();
  }
  
}

function resultScreen() {
  if (state === "You died!") {
    background(3, 90, 1);
    textSize(90);
    fill(233, 123, 191);
    textFont("Starborn");
    text("You died!", x + 100, y);
  } else if (state === "You win!") {
    background(3, 90, 1);
    textSize(90);
    fill(233, 123, 191);
    textFont("Starborn");
    text("You win!", x + 100, y);
  }
}

function mouseClicked() {
  if (state === "start") {
    state = "game";
  } else if (state === "game") {
    state = "You died!";
  } else if (state === "you died!" || state === "You win!") {
    state = "game";
  }
}
