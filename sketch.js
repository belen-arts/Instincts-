let port;
let connectBtn;
let shape = "NO SHAPE"; // Declare shape globally
let voltage = 0 

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

  // Draw shapes based on currentShape
  if (shape === "Circle") {
    ellipse(width / 2, height / 2, 100, 100); 
  } else if (shape === "Square") {
    rect(width / 2 - 50, height / 2 - 50, 100, 100); 
  } else if (shape === "Triangle") {
    triangle(
      width / 2, height / 2 - 50,
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
  console.log("serialEvent called"); // Log to ensure function is called
  let inData = port.readLine().trim(); // Read the incoming serial data
  if (inData) { // Ensure data is not empty
    console.log("Received:", inData); // Log the received data to the console
    if (inData.startsWith("Voltage:")) {
      let voltage = inData.split(":")[1].trim(); // Extract and process voltage data if needed
      console.log("Voltage:", voltage); // Log the voltage data to the console
    } else if (inData.startsWith("Shape:")) {
      shape = inData.split(":")[1].trim(); // Update shape based on received data
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

// Ensure serialEvent is called when data is available
// port.on('data', serialEvent);
// function serialEvent() {
//   let inData = port.readLine().trim(); // Read the incoming serial data
//   if (inData) { // Ensure data is not empty
//     console.log("Received:", inData); // Log the received data to the console
//     if (inData.startsWith("Voltage:")) {
//       let voltage = inData.split(":")[1].trim(); // Extract and process voltage data if needed
//       console.log("Voltage:", voltage); // Log the voltage data to the console
//     } else if (inData.startsWith("Shape:")) {
//       shape = inData.split(":")[1].trim(); // Update shape based on received data
//     }
//   }
// }
// function connectBtnClick() {
//   if (!port.opened()) {
//     port.open('Arduino', 9600);
//   } else {
//     port.close();
//   }
// }