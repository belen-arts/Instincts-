let port;
let connectBtn;
let shape = ""; // Current shape to draw

function setup() {
  createCanvas(800, 800);
  port = createSerial();
  port.open('Arduino', 9600);
  let usedPorts = usedSerialPorts();
if (usedPorts.length > 0) {
  port.open(usedPorts[0], 9600);
}
connectBtn = createButton('Connect to Arduino');
connectBtn.position(80, 200);
connectBtn.mousePressed(connectBtnClick);
}








function draw() {
  background(220);
  // Draw shape based on resistor classification
  fill(100, 150, 255);
  stroke(0);
  strokeWeight(2);

  if (port.opened()) {
    // the port is indeed open
  }
  let str = port.last();

  if (shape === "circle") {
    ellipse(width / 2, height / 2, 100, 100); // Circle
  } else if (shape === "square") {
    rect(width / 2 - 50, height / 2 - 50, 100, 100); // Square
  } else if (shape === "triangle") {
    triangle(width / 2, height / 2 - 50, width / 2 - 50, height / 2 + 50, width / 2 + 50, height / 2 + 50); // Triangle
  } else if (shape === "rectangle") {
    rect(width / 2 - 50, height - 50, 200, 200); // Rectangle
    }
    endShape(CLOSE);
  }

  function serialEvent() {
    if (data) {
      shape = data; // Update shape based on resistor classification
    }
  
    try {
      if (!port.isOpen) { // Assuming isOpen is the correct property
        port.open('Arduino', 9600);
      } else {
        port.close();
      }
    } catch (error) {
      console.error('Error handling serial port:', error);
    }
  }
