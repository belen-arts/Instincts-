let port;
let connectBtn;
let shape  = 0; // Declare shape as a int not a string!

function setup() {
  createCanvas(windowHeight, windowWidth);
  port = createSerial();
  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(20, 20);
  connectBtn.mousePressed(connectBtnClick);
}
function draw() {
  background(220);

let receivedData = port.readUntil('\n');
if (receivedData) {
  shape = parseInt(receivedData.trim()); // Parse the data into an integer
  console.log("Received Shape Value: " + shape); // Log the parsed value directly
}
  if (shape === 1) {
    fill(255, 0, 0); // Red color
    rect(width / 2 - 100, height / 2 - 50, 200, 100); // Rectangle shape
  } else if (shape === 2) {
    fill(0, 255, 0); // Green color
    ellipse(width / 2, height / 2, 150, 150); // Circle shape
  } else if (shape === 3) {
    fill('#07C'); // Blue color
    rect(width / 2 - 75, height / 2 - 75, 150, 150); // Square shape
  } else if (shape === 4) {
    fill(255, 255, 0); // Yellow color
    triangle(width / 2 - 75, height / 2 + 75, width / 2 + 75, height / 2 + 75, width / 2, height / 2 - 75); // Triangle shape
  } else {
    fill(0);
    textSize(32);
    text("INSERT TWO SHAPES.", 250, 400); 
    fill(255, 0, 0);
    rect(50, 550,200, 100);
    fill (0,255,0);
    ellipse(350, 600, 100, 100, 650, 550);
    fill('#07C');
    rect(450,525,150,150);
    fill(255,255,0);
    triangle(700, 600, 800, 600, 750, 500);
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

