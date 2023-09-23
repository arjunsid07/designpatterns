class NumberExpression {
  constructor(value) {
    this.value = value;
  }

  print(buffer) {
    buffer.push(this.value.toString());
  }
}

class AdditionExpression {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  print(buffer) {
    buffer.push("(");
    this.left.print(buffer);
    buffer.push("+");
    this.right.print(buffer);
    buffer.push(")");
  }
}

// 1 + (2+3)
/**
 * We want to print this, we'll be using buffer(an array outside)
 */
/**
 * Buffer will be visitor, as buffer has to visit all the objects
 */
/**
 * Violation of
 * 1. Separation of concerns
 * 2. Open close principle
 * both in AdditionExpression class due to print method addition
 */
let e = new AdditionExpression(
  new NumberExpression(1),
  new AdditionExpression(new NumberExpression(2), new NumberExpression(3))
);
let buffer = []; // visitor
e.print(buffer);
console.log(buffer.join(""));
