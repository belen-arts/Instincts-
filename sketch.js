let port;
let connectBtn;
let myVal = 0;
let shape = "";

function setup() {
  createCanvas(800, 800);

  port = createSerial();

  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(80, 200);
  connectBtn.mousePressed(connectBtnClick);


  function draw() {
    background(220);
    fill(50);
    rect(50, 50, 50, 50);

    let shape = port.readUntil("\n").trim(); // Read each line and trim whitespace
   
    // Shapes.. 
    if (shape === "circle") {
      ellipse(width / 2, height / 2, 100, 100); // Circle
    } else if (shape === "square") {
      square(width / 2 - 50, height / 2 - 50, 100, 100); // Square
    } else if (shape === "triangle") {
      triangle(width / 2, height / 2 - 50, width / 2 - 50, height / 2 + 50, width / 2 + 50, height / 2 + 50); // Triangle
    } else if (shape === "rectangle") {
      rect(width / 2 - 50, height / 2 - 50, 200, 100); // Rectangle
    }

  function connectBtnClick() {
    if (!port.opened()) {
      port.open('Arduino', 9600);
    } else {
      port.close();
    }
  }
}
}
