class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
  honk() {
    return "Beep";
  }
  toString() {
    return `This vehicle is a ${this.make} ${this.model} from ${this.year}`;
  }
}
let myFirstVehicle = new Vehicle("Toyota", "Camry", 2015);

class Car extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
    this.numWheels = 4;
  }
}

let myFirstCar = new Car("Toyota", "Corolla", 2017);

class Motorcycle extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
    this.numWheels = 2;
  }
  revEngine() {
    return "VROOM!!!";
  }
}

let firstMotorcycle = new Motorcycle("Honda", "Nighthawk", 2000);

class Garage {
  constructor(num) {
    this.vehicles = [];
    this.capacity = num;
  }
  add(newVehicle) {
    if (!(newVehicle instanceof Vehicle)) {
      throw new Error("Only vehicles allowed");
    }
    if (this.vehicles.length === this.capacity) {
      throw new Error("Sorry, we're full");
    } else {
      this.vehicles.push(newVehicle);
      return "Vehicle added!";
    }
  }
}

let firstGarage = new Garage(4);

class Boat {
  constructor(name, length) {
    if (name instanceof Vehicle) {
      throw new Error("Arr matey, that's no boat!");
    }
    this.name = name;
    this.length = length;
    this.sailsRaised = false;
  }
  raiseSails() {
    console.log("Aye Cap'n!");
    return (this.sailsRaised = true);
  }
  lowerSails() {
    if (this.sailsRaised === false) {
      return "Uhh Cap'n sails are already down...";
    }
    console.log("Aye! Lower'n sails!");
    return (this.sailsRaised = false);
  }
}

let firstBoat = new Boat("Salt-Life", "40ft");
