let port;
let connectBtn;
let shape  = [1 , 2 , 3 , 4]; // array of possible shapes to be received so they can be temporarily stored in the shape variable - for animal creation later... 
let animals = []; // array to store the selected shapes to then create an animal 
let selectedShapes = []; // array to store the selected shapes so must be empty!
let drawSelectedShapes = [drawRectangle, drawCircle, drawSquare, drawTriangle]; // array of shapes to be drawn
let showNextQuestion = false; // Flag to show the question after first shape selection

function setup() {
  createCanvas(windowWidth, windowHeight);
  
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
  processShapeData(selectedShapes);  
}
// check if there are any animals in the array!!!!!!1
if (animals.length > 0) {
  displayAnimals();  // Display animals if any are in the animals array
} else {
  // Draw the initial shapes if there are no animals
  initialShapes();
}
 // 1 shape selected promt next question
 if (showNextQuestion) {
  displayNewQuestion();
} // display the next question if the flag is true (heplful for debugging)
for (let animal of animals) {
  animal.display();
}
}
function initialShapes() {
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Which shape is the most important?", width / 2, height / 5); // Centered prompt

  // Draw rectangle (randomly placed)
  fill(255, 0, 0);
  rectMode(CENTER);
  rect(random(width), random(height), 150, 100); // Random position with fixed size

  // Draw circle (randomly placed)
  fill(0, 255, 0);
  ellipseMode(CENTER);
  ellipse(random(width), random(height), 100, 100); // Random position with fixed size

  // Draw square (randomly placed)
  fill('#07C');
  rectMode(CENTER);
  rect(random(width), random(height), 100, 100); // Random position with fixed size

  // Draw triangle (scaled to match 100x100 size)
  fill(255, 255, 0);
  let x1 = random(width);
  let y1 = random(height);
  let size = 100;
  triangle(
    x1, y1 + size / 2, // Bottom left
    x1 + size, y1 + size / 2, // Bottom right
    x1 + size / 2, y1 - size // Top
  ); // Triangle with the same size as the square and circle
}

let debounceTime = 5000; // debounce time to allow more time to pick shapes 
 let lastInputTime = 0;  

function processShapeData() {
  let currentTime = millis(); //time in milliseconds
  if (currentTime - lastInputTime > debounceTime) { // only process next shape if enough time has passed 
   if (shape >= 1 && shape <= 4 && selectedShapes.length < 2) {
    selectedShapes.push(shape);
    console.log("Selected Shapes:", selectedShapes);

    if (selectedShapes.length === 1) {
      showNextQuestion = true; // enable the next question display
      console.log("First shape selected. Showing next question.......");

   // delay added before allowing the second shape as this was too fast. 
   setTimeout(() => { // built in function in Javascript (just call it!)
    showNextQuestion = false;
    // console.log("Ready to select the second shape."); - if needed to check the delay
  }, 10000); // 10 seconds delay between shapes decisions
}
if (selectedShapes.length === 2 && !showNextQuestion) {
  combineShapes();
}
  }
  lastInputTime = currentTime; // update the last input time
  } else {
  console.log("No shapes selected.");
  }
}

  function combineShapes() { // moved outside of draw to avoid being called multiple times. 
    console.log("Combining shapes......................"); // function being called!!
    if (selectedShapes.length === 2) {
  let Head = drawSelectedShapes[selectedShapes[0] - 1]; // !! important to relate the shape to draw to the correct index in the array of selected shapes eg. 4 - 1 = 3 so the triangle will be drawn
  let Body = drawSelectedShapes [selectedShapes[1] - 1]; // this gives you the second shape.

  let headSize = 100; 
  let bodySize = 300;

  let headX = width / 2; // center horizontally
  let headY = height / 3; // 1/3 from the top

  let bodyX = width / 2;
  let bodyY = headY + headSize / 2 + bodySize / 2; // body is positioned below the head
  
  
  let newAnimal = new Animal(Head, Body, headX, headY, headSize, bodySize);
    animals.push(newAnimal); // add the new animal to the array of animals
    console.log("Animal created! Head: " + selectedShapes[0] + " Body: " + selectedShapes[1]); // check results

  selectedShapes = []; // clear the array so it can be used again.
  }
  }

  class Animal { // completely new to me .. - class to create an animal

    constructor(headFunc, bodyFunc, headX, headY, headSize, bodySize) {
      this.head = headFunc; // function to draw the head
    this.body = bodyFunc; // function to draw the body
  this.headX = headX; // x position of the head
      this.headY = headY; // y position of the head - same as body
this.bodyX = headX; // x position of the body - same as head
      this.bodyY = headY + headSize / 2 + bodySize / 2; // y position of the body - below the head
      this.headSize = headSize; // size of the head
    this.bodySize = bodySize; // size of the body

      this.xVel = random(-2, 2); // random X speed
      this.yVel = random(-2, 2); // random Y speed
    }
    update() { // update the position of the head and body to velocity 
      this.headX += this.xVel;
      this.headY += this.yVel;
      this.bodyX += this.xVel;
      this.bodyY += this.yVel;
  
      if (this.headX < 0 || this.headX > width) this.xVel *= -1;
      if (this.headY < 0 || this.headY > height) this.yVel *= -1; // bounce off the edges.
    }

    display() { // display the head and body
      this.head(this.headX, this.headY, this.headSize);
      this.body(this.bodyX, this.bodyY, this.bodySize);
    }
  }

function displayAnimals() {
  for (let animal of animals) {
    // for each animal in the array of animals
    animal.update();
    animal.display();
  }
}
function displayNewQuestion() {
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(0);
  text("What shape will the next person select?", width / 2, height / 2 + 100); 
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
    x, y - size / 2);  //
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

