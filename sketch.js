let port;
let connectBtn;
let shape  = [1 , 2 , 3 , 4]; // array of possible shapes to be received so they can be temporarily stored in the shape variable - for animal creation later... 
let animal = []; // array to store the selected shapes to then create an animal 
let selectedShapes = []; // array to store the selected shapes so must be empty!
let drawSelectedShapes = [drawRectangle, drawCircle, drawSquare, drawTriangle]; // array of shapes to be drawn

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
  shape = parseInt(receivedData.trim()); // convert string to array 
  console.log("Received Shape Value: " + shape);  
}
  processShapeData ();  

if (selectedShapes.length < 2) {  
  initialShapes();
} else {
  displayAnimals(); 
}
}

function initialShapes() { 
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

function drawRectangle(x, y, size) {
  fill(255, 0, 0);
  rect(x - size / 2, y - size / 4, size, size / 2); // rectangle to draw 
} 
function drawCircle(x, y, size) {
  fill(0, 255, 0);
  ellipse(x, y, size, size); // circle to draw 
}
function drawSquare(x, y, size) {
  fill('#07C');
  rect(x - size / 2, y - size / 2, size, size); // square to draw 
}
function drawTriangle(x, y, size) {
  fill(255, 255, 0);
  triangle(x - size / 2, y + size / 2, // bottom left corner
    x + size / 2, y + size / 2, // bottom right corner
    x, y - size / 2 // top corner
  ); // triangle to draw 
}

function processShapeData() {
  if (shape >=1 && shape <= 4) { 
    console.log("Current Value: " + shape);

    if (selectedShapes.length < 2) { // limit the choices taken into the array 
    selectedShapes.push(shape);
    console.log("Selected Shapes: " + selectedShapes);
  }
   if (selectedShapes.length === 2) {
    combineShapes();
   }
  } else {
  console.log("No shapes selected.");
}
}
  function combineShapes() { // moved outside of draw to avoid being called multiple times. 
    if (selectedShapes.length === 2) {
  let Head = drawSelectedShapes[selectedShapes[0] - 1]; // !! important to relate the shape to draw to the correct index in the array of selected shapes eg. 4 - 1 = 3 so the triangle will be drawn
  let Body = drawSelectedShapes [selectedShapes[1] - 1]; // this gives you the second shape.

  let headSize = 100; 
  let bodySize = 300;

  let headX = width / 2;
  let headY = height / 3;

  let bodyX = width / 2;
  let bodyY = headY + headSize / 2 + bodySize / 2; // body is positioned below the head

  // draw the head and body...
  Head(headX, headY, headSize);
  Body(bodyX, bodyY, bodySize);
  
  selectedShapes = []; // clear the array so it can be used again.
  console.log("Animal created! Head: " + selectedShapes[0] + " Body: " + selectedShapes[1]);
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

