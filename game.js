//the star
//https://chatgpt.com/share/674f03cb-4440-800d-8b9f-d6139484a540
// we had help with the brick and paddle collision from a friend named Lars.
// we had help with the background stars on the startscreen and gamescreen from a teaching assistant in class.

//variables
let x = 100;
let y = 100;
let state = "start";
let speed = 5;
let lives = 3;
let score = 0;
let bricks = []; 
let starRadius = 12;

  
//brick dimensions 
let brickWidth = 60;
let brickHeight = 20; 
let rows = 7;
let cols = 8;

// paddle
class Paddle {
  constructor (x,y, width, height, speed) {
    this.x=x;
    this.y=y;
    this.width= width;
    this.height= height;
    this.speed= speed;
  }
  //key movements
  update () {
    if (keyIsDown (37)) {
      this.x -= this.speed;
    } else if (keyIsDown (39)) {
      this.x += this.speed;
    }

    this.x = constrain(this.x, 0, width - this.width);
  }
// paddle
  draw() {
    fill (233,133,191);
    noStroke();
    rect(this.x, this.y, this.width, this.height, 20);
  }

  checkCollision(star) {
    if (
      star.y + star.radius > this.y &&
      star.y + star.radius < this.y + this.height &&
      star.x > this.x &&
      star.x < this.x + this.width
    ) {
      star.speed.y *= -1;
      let bounceOffCenter = (star.x - (this.x + this.width / 2)) / (this.width / 2);
      star.speed.x += bounceOffCenter * 2;
    }
  }
}

//background stars
let stars = [];
for (let i = 0; i < 100; i ++) {
  const star = {
    starX : random(width),
    starY :random (height),
    starSize : random (5),
  
  };
stars.push(star);
  console.log(stars.length);
}

//the star 
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
let paddle = new Paddle(100,600,90,20,5);

function setup() {
  var canvas = createCanvas(600, 750);
  canvas.parent("myCanvas");
  randomValue = random(100);
  console.log(randomValue);

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

 //background stars
for (let i = 0; i < 100; i ++) {
  let starX = randomValue(width);
  let starY = randomValue (height);
  let starSize = randomValue (1,3);
  fill (225);
  noStroke();
  ellipse(starX,starY,starSize, starSize);
}
// text
  textSize(120);
  fill(233, 123, 191);
  textFont("Orbitron");  
  text("stardash", x + 10, y+300);
  
  textSize(20);
  text("click to start", x + 160, y + 350);

}

function gameScreen() {
  background(13, 19, 38);
  
  //background star
  for (let star of stars) {
    fill (225,225,255);
  noStroke();
  ellipse(star.starX, star.starY, star.starSize, star.starSize);
  }
  
  //lives and scores
  textSize(20);
  fill(233, 123, 191);
  text("Lives: " + lives, 20, height - 20);
  text("Score: " + score, width - 120, height - 20);

  paddle.update();
  paddle.draw();

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

  paddle.checkCollision(star);

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
    text ("Click to play again", x+120, y+350);

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
paddle = new Paddle(100,600,90,20,5);
lives = 3;
score = 0;
bricks.forEach((brick) => (brick.isHit = false));
star.reset();
}
  