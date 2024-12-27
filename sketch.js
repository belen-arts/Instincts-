let serial; // Variable to hold serial connection
let shape = ""; // Current shape to draw

function setup() {
  createCanvas(800, 800);
  serial = new p5.SerialPort(); // Create a new serial port instance
  serial.open('/dev/ttyUSB0'); // Replace with Arduino port.
  serial.on('data', serialEvent); // Callback for when new data arrives
}
function draw() {
  background(220);

  // Draw shape based on resistor classification
  fill(100, 150, 255);
  stroke(0);
  strokeWeight(2);
}