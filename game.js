let x = 100;
let y = 100;
let speedX = 0;
let speedY = 0;
let gravity = 0.1;
let state = "start";
let speed = 5;
let starX = 400;
let starY = 400;
let starSpeedY = 3;
let starSpeedX = 4;
let paddleX = 100;
let paddleY = 600;
let paddleSpeed = 5;
let rotation = 0;
let lives = 3;
let score = 0;
let bricks = [];

//brick dimensions
let brickWidth = 60;
let brickHeight = 20;
let rows = 7;
let cols = 8;

function setup() {
  createCanvas(600, 750);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      bricks.push({
        x: i * (brickWidth + 10) + 30,
        y: j * (brickHeight + 5) + 30,
        isHit: false,
      });
    }
  }
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
}

function gameScreen() {
  background(0, 0, 0);

  //lives and scores
  textSize(20);
  fill(233, 123, 191);
  text("Lives: " + lives, 20, height - 20);
  text("Score: " + score, width - 120, height - 20);

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

  if (starX > width || starX < 0) {
    starSpeedX *= -1;
  }
  if (starY > height) {
    lives--;
    if (lives <= 0) {
      state = "You died!";
    } else {
      resetBall();
    }
  }
  if (starY > 0) {
    starSpeedY *= -1;
  }

  if (
    starY + 15 > paddleY &&
    starY + 15 < paddleY + 20 &&
    starX > paddleX &&
    starX < paddleX + 90
  ) {
    starSpeedY *= -1;
    let bounceOffCenter = (starX - (paddleX + 45)) / 45;
    starSpeedX += bounceOffCenter * 2;
  }

  for (let i = 0; i < bricks.length; i++) {
    let brick = bricks[i];
    if (
      !brick.isHit &&
      starX > brick.x &&
      starX < brick.x + brickWidth &&
      starY > brick.y &&
      starY < brick.y + brickHeight
    ) {
      brick.isHit = true;
      starSpeedY *= -1;
      score += 10;
    }
  }
  //bricks
  for (let i = 0; i < bricks.length; i++) {
    let brick = bricks[i];
    if (!brick.isHit) {
      fill(175, 238, 238);
      rect(brick.x, brick.y, brickWidth, brickHeight);
    }
  }

  //star
  fill(244, 207, 105);
  drawStar(starX, starY, 30, 15, 5, rotation);

  rotation += 0.03;
}
function drawStar(x, y, radius1, radius2, npoints, rotation) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;

  push();
  translate(x, y);
  rotate(rotation);

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

function resetBall() {
  starX = width / 2;
  starY = height / 2;
  starSpeedX = random(2, 4);
  starSpeedY = 4;
}

function mouseClicked() {
  if (state === "start") {
    state = "game";
  } else if (state === "game") {
    state = "You died!";
  } else if (state === "you died!" || state === "You win!") {
    state = "game";
    lives = 3;
    score = 0;
    bricks.forEach((brick) => (brick.isHit = false));
  }
}
