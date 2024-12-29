let serial; // Variable to hold serial connection
let shape = ""; // Current shape to draw

function setup() {
  createCanvas(800, 800);
  serial = new p5.SerialPort(); // Create a new serial port instance
  serial.open('/dev/ttyUSB0'); // Replace with Arduino port??? no sure if it'll work 
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
  } else if (shape === "star") {
    rect(); // Rectangle
    for (let i = 0; i < 10; i++) {
      let angle = TWO_PI / 10 * i;
      let r = i % 2 === 0 ? 50 : 20;
      vertex(width / 2 + cos(angle) * r, height / 2 + sin(angle) * r);
    }
    endShape(CLOSE);
  }
}

function serialEvent() {
  let data = serial.readLine().trim(); // Read serial data
  if (data) {
    shape = data; // Update shape based on resistor classification
  }
}

