let portName = '/dev/cu.usbmodem101'; // Serial port name
let serial; // Variable to hold serial connection
let shape = ""; // Current shape to draw

function setup() {
  createCanvas(800, 800);
  serial = new p5.SerialPort(); // Create a new serial port instance
  serial.open('/dev/cu.usbmodem101'); // Replace with Arduino port??? no sure if it'll work 
  serial.on('data', serialEvent); // Callback for when new data arrives
}
function draw() {
  background(220);

  // Draw shape based on resistor classification
  fill(100, 150, 255);
  stroke(0);
  strokeWeight(2);

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
  let data = serial.readLine().trim(); // Read serial data
  if (data) {
    shape = data; // Update shape based on resistor classification
  }
}

