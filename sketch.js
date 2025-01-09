let port;
let connectBtn;
let shape  = [1 , 2 , 3 , 4]; // array of possible shapes to be received so they can be temporarily stored in the shape variable - for animal creation later... 
let animal = [];
let selectedShapes = [];

function setup() {
  createCanvas(windowHeight, windowWidth);
  textAlign(CENTER, CENTER);

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
function join {
  if (shape === 1 || shape === 2 || shape === 3 || shape === 4) {
    selectedShapes.push(shapes[int(animal) - 1]);

  if (selectedShapes.lenght === 1) {
    create.animal = shape 
  
  if (selectedShapes.length === 2) { // ensure that the selected shapes are only two and not more or less?
    animals.push(new Animal(selectedShapes[0], selectedShapes[1]));
    selectedShapes = [];
}
}
} 
}

// Where does this go? in another function before or after the joining of shapes to creat an animal? These are the 'if' statements for the received Data. 
// }
//   if (shape === 1) {
//     fill(255, 0, 0); 
//     rect(width / 2 - 100, height / 2 - 50, 200, 100); // Rectangle shape
//   } else if (shape === 2) {
//     fill(0, 255, 0); // Green color
//     ellipse(width / 2, height / 2, 150, 150); // Circle shape
//   } else if (shape === 3) {
//     fill('#07C'); // Blue color
//     rect(width / 2 - 75, height / 2 - 75, 150, 150); // Square shape
//   } else if (shape === 4) {
//     fill(255, 255, 0); // Yellow color
//     triangle(width / 2 - 75, height / 2 + 75, width / 2 + 75, height / 2 + 75, width / 2, height / 2 - 75); // Triangle shape
//   } else {
//     fill(0);
//     textSize(32);
//     text("INSERT TWO SHAPES.", 250, 400); 
//     fill(255, 0, 0);
//     rect(50, 550,200, 100);
//     fill (0,255,0);
//     ellipse(350, 600, 100, 100, 650, 550);
//     fill('#07C');
//     rect(450,525,150,150);
//     fill(255,255,0);
//     triangle(700, 600, 800, 600, 750, 500);
//   }
// }

function connectBtnClick() {
  if (!port.opened()) {
    console.log("Opening port...");
    port.open('Arduino', 9600);
  } else {
    console.log("Closing port...");
    port.close();
  }
}

