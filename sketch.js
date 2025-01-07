let port;
let connectBtn;
let shape  = "0"; // Declare shape globally

function setup() {
  createCanvas(800, 800);
 port = createSerial();
  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(80, 200);
  connectBtn.mousePressed(connectBtnClick);
}
function draw() {
  background(220);
  fill(100, 150, 255);

  // Display raw serial data for debugging
  if (port.available() > 0) {
    let rawData = port.read();
    console.log("Raw Data:", rawData);
  }

  // Visual feedback for shapes
  if (shape === "2") {
    ellipse(width / 2, height / 2, 100, 100);
  } else if (shape === "3") {
    rect(width / 2 - 50, height / 2 - 50, 100, 100);
  } else if (shape === "4") {
    triangle(
      width / 2, height / 2 - 50,
      width / 2 - 50, height / 2 + 50,
      width / 2 + 50, height / 2 + 50
    );
  } else if (shape === "1") {
    rect(width / 2 - 75, height / 2 - 25, 150, 50);
  } else if (shape === "0") {
    textSize(20);
    textAlign(CENTER, CENTER);
    fill(0);
    text("Insert a resistor!", width / 2, height / 2);
  }
}

function serialEvent() {
  let inData = port.readStringUntil('\n');
  if (inData.length > 0) {
    shape = inData.trim(); // Update shape based on serial input
    console.log("Serial Data Received:", shape); // Log the received shape
  }
}
function connectBtnClick() {
  if (!port.opened()) {
    console.log("Opening port...");
    port.open('Arduino', 9600);
  } else {
    console.log("Closing port...");
    port.close();
  }
}

