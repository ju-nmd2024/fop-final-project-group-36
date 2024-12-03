//the star
//https://chatgpt.com/share/674f03cb-4440-800d-8b9f-d6139484a540
// we had help with the brick and paddle collison from a friend named lars




let x = 100;
let y = 100;
let gravity = 0.1;
let state = "start";
let speed = 5;
let paddleX = 100;
let paddleY = 600;
let paddleSpeed = 5;
let lives = 3;
let score = 0;
let bricks = []; 
let starRadius = 12;

 
//brick dimensions 
let brickWidth = 60;
let brickHeight = 20; 
let rows = 7;
let cols = 8;

class Star {
  constructor() {
    this.x = width / 2;
    this.y = height - 30;
    this.speed = createVector(3, -3);
    this.radius = starRadius;
  } 
  update() {
    this.x += this.speed.x;
    this.y += this.speed.y;

    if (this.x - this.radius < 0 || this.x + this.radius > width) {
      this.speed.x *= -1;
    }

    if (this.y - this.radius < 0) {
      this.speed.y *= -1;
    }
  }

  drawStar(x, y, radius1, radius2, npoints) {
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

  checkPaddleCollision(paddle) {
    if (
      this.y + this.radius >= paddle.y &&
      this.x >= paddle.x &&
      this.x <= paddle.x + paddle.width
    ) {
      this.speed.y *= -1;

      this.speed.x *= 1.1;
      this.speed.y *= 1.1;
    }
  }

  checkBrickCollision(brick) {
    if (
      this.x > brick.x &&
      this.x < brick.x + brickWidth &&
      this.y - this.radius < brick.y + brickHeight &&
      this.y + this.radius > brick.y
    ) {
      this.speed.y *= -1;
      return true;
    }
    return false;
  }
  reset() {
    this.x = width / 2;
    this.y = height - 30;
    this.speed = createVector(3, -3);
  }
}

let star = new Star();

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
  } else if (state === "You died!") {
    resultScreen();
  }
}

function startScreen() {
  background(13, 19, 38);

for (let i = 0; i < 100; i ++) {
  let starX = random(width);
  let starY = random (height);
  let starSize = random (1,3);
  fill (225);
  noStroke();
  ellipse(starX,starY,starSize, starSize);
}

  textSize(120);
  fill(233, 123, 191);
  textFont("Orbitron");  
  text("stardash", x + 10, y+300);
  
  textSize(20);
  text("click to start", x + 160, y + 350);

}

function gameScreen() {
  background(13, 19, 38);

  function createStars(){
    for (let i = o; i < 100; i ++){
      stars.push (new Star(random(width),random(height),random(2,5)));
    }
  }
  
  
  
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
  noStroke();
  star.update();

  if (star.y + star.radius > height) {
    lives--;
    if (lives <= 0) {
      state = "You died!";
    } else {
      star.reset();
    }
  }

  //star collision
  if (
    star.y + star.radius > paddleY &&
    star.y + star.radius < paddleY + 20 &&
    star.x > paddleX &&
    star.x < paddleX + 90
  ) {
    star.speed.y *= -1;
    let bounceOffCenter = (star.x - (paddleX + 45)) / 45;
    star.speed.x += bounceOffCenter * 2;
  }

  //brick collision
  for (let i = 0; i < bricks.length; i++) {
    let brick = bricks[i];
    if (
      !brick.isHit &&
      star.x > brick.x &&
      star.x < brick.x + brickWidth &&
      star.y > brick.y &&
      star.y < brick.y + brickHeight
    ) {
      brick.isHit = true;
      star.speed.y *= -1;
      score += 10;
    }
  }

  //draw bricks
  for (let i = 0; i < bricks.length; i++) {
    let brick = bricks[i];
    if (!brick.isHit) {
      fill(175, 238, 238);
      rect(brick.x, brick.y, brickWidth, brickHeight);
    }
  }

  //draw star
  fill(245, 194, 66);
  star.drawStar(star.x, star.y, star.radius / 2, star.radius, 5);
}

function resultScreen() {
  if (state === "You died!") {
    background(13, 19, 38);
    textSize(90);
    
    fill(233, 123, 191);
    textFont("Starborn");
    text("Game over!", x-20, y+200);

    textSize(40);
    text ("Your score: " + score, x+70, y+300);

    textSize (20);
    text ("Click to play again", x+110, y+350);

  }

}

function resetBall() {
  star.reset();
}

function mouseClicked() {
  if (state === "start") {
    state = "game";
  } else if (state === "You died!") {
    state = "game";
    lives = 3;
    score = 0;
    bricks.forEach((brick) => (brick.isHit = false));
    resetGame();
  }
}

function resetGame () {
paddleX = 100;
paddleY = 600;
lives = 3;
score = 0;
bricks.forEach((brick) => (brick.isHit = false));
star.reset();
}
  