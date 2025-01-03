let port;
let connectBtn;
let shape = "NO SHAPE"; // Declare shape globally

function setup() {
  createCanvas(800, 800);
// Initialize the serial port
port = new p5.WebSerial();

// List available ports
port.getPorts();

// Open the port when available
port.on('portavailable', () => {
  port.open().then(() => {
    console.log('Port opened');
  });
});

// Attach the serialEvent callback
port.on('data', serialEvent);

connectBtn = createButton('Connect to Arduino');
connectBtn.position(80, 200);
connectBtn.mousePressed(connectBtnClick);
}
  // PREVIOUS CODE - NOT WORKING PORT
//   port = createSerial();
//   port.on('data', serialEvent); // Attach the serialEvent callback ???? giving ERROR 
//   connectBtn = createButton('Connect to Arduino');
//   connectBtn.position(80, 200);
//   connectBtn.mousePressed(connectBtnClick);


function draw() {
  background(220); 
  fill(100, 150, 255); 

  // Draw shapes based on currentShape
  if (shape === "Circle") {
    ellipse(width / 2, height / 2, 100, 100); 
  } else if (shape === "Square") {
    rect(width / 2 - 50, height / 2 - 50, 100, 100); 
  } else if (shape === "Triangle") {
    triangle(
      width / 2, height / 2 - 50,          
      width / 2 - 50, height / 2 + 50,
      width / 2 + 50, height / 2 + 50
    );
  } else if (shape === "Rectangle") {
    rect(width / 2 - 75, height / 2 - 25, 150, 50);
  } else if (shape === "NO SHAPE") {
      textSize(20);             
      textAlign(CENTER, CENTER);
      fill(0);
      text("Insert a resistor!", width / 2, height / 2);
}
}
function serialEvent() {
  let inData = port.readLine().trim(); // Read the incoming serial data
  if (inData) { // Ensure data is not empty
    console.log("Received:", inData); // Log the received data to the console
    if (inData.startsWith("Shape:")) {
      shape = inData.split(":")[1].trim(); // Update shape based on received data
    }
  }
}
function connectBtnClick() {
  if (!port.isOpen()) {
    port.requestPort().then(() => {
      port.open().then(() => {
        console.log('Port opened');
      });
    });
  } else {
    port.close();
    console.log('Port closed');
  }
}


// TRYOING NEW PORT COMMUNICATION
//function connectBtnClick() {
//   if (!port.opened()) {
//     port.open('Arduino', 9600);
//     console.log("Connected let's go!");
//   } else {
//     port.close();
//   }
// }
