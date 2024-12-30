let port;
let connectBtn;
let shape = ""; // Declare shape globally

function setup() {
  createCanvas(800, 800);

  port = createSerial();

  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(80, 200);
  connectBtn.mousePressed(connectBtnClick);
}

function draw() {
  background(220);
  fill(50);
  rect(50, 50, 50, 50);

  // Removed the commented-out line
  // let shape = port.readUntil("\n"); //read each line

  // Shapes info here 
  if (shape === "Circle") {
    ellipse(width / 2, height / 2, 100, 100); // Circle
  } else if (shape === "Square") {
    square(width / 2 - 50, height / 2 - 50, 100, 100); // Square
  } else if (shape === "Triangle") {
    triangle(width / 2, height / 2 - 50, width / 2 - 50, height / 2 + 50, width / 2 + 50, height / 2 + 50); // Triangle
  } else if (shape === "Rectangle") {
    rect(width / 2 - 50, height - 50, 200, 200); // Rectangle
  }
}

function serialEvent() {
  let data = port.readUntil("\n").trim(); // Read and trim data
  if (data) {
    shape = data; // Update shape based on resistor classification
  }
}

function connectBtnClick() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}