/**
 * Class to calculate range of a vehicle bases on fuel capacity and efficiency.
 */

class Vehicle {
    constructor(fuelCapacity, fuelEfficiency) {
        this.fuelCapacity = fuelCapacity;
        this.fuelEfficiency = fuelEfficiency;
    }

    getRange() {
        return this.fuelCapacity * this.fuelEfficiency;
    }
}

const standardVehicle = new Vehicle(10, 15);

console.log(standardVehicle.getRange()); // Outputs '150'

// ------------------------------------------------------------------

/**
 * Now if we need to calculate range of a hybrid vehicle we may modify the code like
 */

class Vehicle {
    constructor(fuelCapacity, fuelEfficiency) {
        this.fuelCapacity = fuelCapacity;
        this.fuelEfficiency = fuelEfficiency;
    }

    getRange() {
        let range = this.fuelCapacity * this.fuelEfficiency;

        if (this instanceof HybridVehicle) {
            range += this.electricRange;
        }
        return range;
    }
}

class HybridVehicle extends Vehicle {
    constructor(fuelCapacity, fuelEfficiency, electricRange) {
        super(fuelCapacity, fuelEfficiency);
        this.electricRange = electricRange;
    }
}

const standardVehicle = new Vehicle(10, 15);
const hybridVehicle = new HybridVehicle(10, 15, 50);

console.log(standardVehicle.getRange()); // Outputs '150'
console.log(hybridVehicle.getRange()); // Outputs '200'

/**
 * This breaks open close principle as base code is updated. 
 */

// --------------------------------------------------------

/**
 * Correct method will be, without modifying the base class we'll be extending it to new class to add
 * new functionalities by overriding 'getRange()' function.
 */

class Vehicle {
    constructor(fuelCapacity, fuelEfficiency) {
        this.fuelCapacity = fuelCapacity;
        this.fuelEfficiency = fuelEfficiency;
    }

    getRange() {
        return this.fuelCapacity * this.fuelEfficiency;
    }
}

class HybridVehicle extends Vehicle {
    constructor(fuelCapacity, fuelEfficiency, electricRange) {
        super(fuelCapacity, fuelEfficiency);
        this.electricRange = electricRange;
    }

    getRange() {
        return super.getRange() + this.electricRange;
    }
}

const standardVehicle = new Vehicle(10, 15);
const hybridVehicle = new HybridVehicle(10, 15, 50);

console.log(standardVehicle.getRange()); // Outputs '150'
console.log(hybridVehicle.getRange()); // Outputs '200'