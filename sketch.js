let port;
let connectBtn;
let val  = 0; // Declare shape as a int not a string!


function setup() {
  createCanvas(windowHeight, windowWidth);
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
    shape = rawData;
  }
  if (shape === 1) {
    fill(255, 0, 0); // Red color
    rect(width / 2 - 100, height / 2 - 50, 200, 100); // Rectangle shape
  } else if (shape === 2) {
    fill(0, 255, 0); // Green color
    ellipse(width / 2, height / 2, 150, 150); // Circle shape
  } else if (shape === 3) {
    fill(0, 0, 255); // Blue color
    rect(width / 2 - 75, height / 2 - 75, 150, 150); // Square shape
  } else if (shape === 4) {
    fill(255, 255, 0); // Yellow color
    triangle(width / 2 - 75, height / 2 + 75, width / 2 + 75, height / 2 + 75, width / 2, height / 2 - 75); // Triangle shape
  } else {
    textSize(32);
    fill(0);
    text("No Shape", width / 2 - 80, height / 2); // Display no shape message
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

