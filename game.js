let x = 100;
let y = 100;
let speedX = 0;
let speedY = 0;
let gravity = 0.1;
let state = "start";
speed = 5;
let starX = 400;
let starY = 100; 
let starSpeedY = 3;
let starSpeedX = 4;
let paddleX = 100;
let paddleY = 500;
let paddleSpeed = 5;

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

  // Draw the star > chat
  beginShape();
  let points = 5;
  let radius1 = 100; 
  let radius2 = 40; 
  let angle = -PI / points; 

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

  push();
  fill(233, 123, 191);
  rect(paddleX, paddleY, 90, 20, 20);

  if (keyIsDown(37)) {
    paddleX -= paddleSpeed;
  } else if (keyIsDown(39)) {
    paddleX += paddleSpeed;
  }
  pop();

  starX += starSpeedX;
  starY += starSpeedY;
  
  if (y > height || x < 0 || x > width) {
    crash = true;
  }

  if (starY <= 0) {
    starspeedY = -starSpeedY;
  }
  if (starY >= height) {
    starSpeedY = -starSpeedY;
  }

  if (starX <= 0 || starX >= width) {
    starSpeedX = -starSpeedX;
  }

  }
  x += speedX;
  y += speedY;

  fill(244, 207, 105);
  drawStar(starX, starY + 200, 30, 15, 5);
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
