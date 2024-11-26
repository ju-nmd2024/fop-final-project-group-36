let x = 100;
let y = 100;
let state = "start";


function setup() {
  createCanvas(800, 600);
}

function draw() {
  if (state=== "start"){
    startScreen();
  }else if (state === "game"){
    gameScreen();
    
  }else if (state === "result"){
    resultScreen();

  }
  
  
}

function startScreen() {
background (103, 127, 191);
  textSize(90);
  fill(233, 123, 191);
  textFont('Starborn');
  text("Star Dash",x+100,y);
  textSize(40);
  text("click to start",x+200,y+400);

    // Set the center of the canvas
    translate(x+600/ 2, y+400 / 2);
    
    rotate(-PI/2);
    // Set stroke color for the star
    noStroke();
    fill(244, 207, 105);
    
    // Draw the star
    beginShape();
    let points = 5; // 5 points for a simple star
    let radius1 = 100; // Outer radius of the star
    let radius2 = 40;  // Inner radius of the star
    let angle = -PI / points; // Angle between each point of the star

    for (let i = 0; i < points * 2; i++) {
        // Alternate between outer and inner points
        let radius = (i % 2 === 0) ? radius1 : radius2;
        let x = radius * cos(i * angle);
        let y = radius * sin(i * angle);
        vertex(x, y);
    }

    endShape(CLOSE);
}


function gameScreen(){
background(0,0,0);
}

function resultScreen() {
background (3,90,1);
}