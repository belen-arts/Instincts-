let port;
let connectBtn;
let shape  = 0; // Declare shape as a int not a string!


function setup() {
  createCanvas(800, 800);
 port = createSerial();
  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(80, 200);
  connectBtn.mousePressed(connectBtnClick);
}
function draw() {
  background(220);

  // Display raw serial data for debugging
  if (port.available() > 0) {
    let rawData = port.read();
    console.log("Raw Data:", rawData);
  }

  // Visual feedback for shapes
  if (shape === 2) {
    ellipse(width / 2, height / 2, 100, 100);
  } else if (shape === 3) {
    rect(width / 2 - 50, height / 2 - 50, 100, 100);
  } else if (shape === 4) {
    triangle(
      width / 2, height / 2 - 50,
      width / 2 - 50, height / 2 + 50,
      width / 2 + 50, height / 2 + 50
    );
  } else if (shape === 1) {
    rect(width / 2 - 75, height / 2 - 25, 150, 50);
  } else if (shape === 0) {
    textSize(20);
    textAlign(CENTER, CENTER);
    fill(0);
    text("Insert a resistor!", width / 2, height / 2);
  }
}

function serialEvent() { // Called whenever data is available
  let rawData = port.readStringUntil('\n');
  if (rawData) {
    rawData = rawData.trim(); // Clean any whitespace or newline
    console.log("Received Data:", rawData); // Log the raw data
    if ([0, 1, 2, 3, 4].includes(rawData)) {
      shape = rawData; // Update shape if valid
    } else {
      console.log("Invalid Data Received:", rawData); // Log invalid data
    }
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

