/**
 * The Liskov substitution principle states that any class should be substitutable 
 * for its parent class without unexpected consequences. 
 */

class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    setHeight(newHeight) {
        this.height = newHeight;
    }
}


/**
 * Square is also rectangle but it'll fail the condition in certain scenarios
 */
class Square extends Rectangle {} 

const rectangle = new Rectangle(4, 5);
const square = new Square(4, 4);

console.log(`Height: ${rectangle.height}, Width: ${rectangle.width}`); // Outputs 'Height: 4, Width: 5' (correct)
console.log(`Height: ${square.height}, Width: ${square.width}`); // Outputs 'Height: 4, Width: 4' (correct)

square.setHeight(5);
console.log(`Height: ${square.height}, Width: ${square.width}`); // Outputs 'Height: 5, Width: 4' (wrong)


/**
 * the real cause of the issue is that Square is not a good child class of Rectangle, 
 * and that in reality, perhaps both shapes should inherit from a Shape class instead.
 */