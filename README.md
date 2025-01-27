'downloaded' - a project BY Belén Fernández
TO BE USED WITH THIS ATTACHED ARDUINO C++ CODE. 

const int analogPin = A0; // Analog pin to measure voltage
const float Vref = 5.0;  // Reference voltage
const int adcResolution = 1023; // ADC resolution for Arduino

  void setup() {
  Serial.begin(9600);
}

void loop() {
  int adcValue = analogRead(analogPin); // Read the ADC value
  float voltage = (adcValue * Vref) / adcResolution; // Convert ADC value to voltage
  
  // Determine the shape based on voltage
  int shape;
  if (voltage == 0.00 ) {
    shape = 1; // 12k + 560 - Rectangle
  } else if (voltage >= 3.70 && voltage < 3.99) {
    shape = 4; // 12K + 220K - Triangle
  } else if (voltage >= 4.15 && voltage < 4.31) {
    shape = 3; // 12k + 12k - Square
  } else if (voltage >= 4.32 && voltage < 4.50) {
    shape = 2; // 12k + 1k - Circle
  } else {
    shape = 0.01; // No Shape = no resitor reading
  }

  Serial.println(shape);
  

  delay(50); // Wait before the next reading
}



