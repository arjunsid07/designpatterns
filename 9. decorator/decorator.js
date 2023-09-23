class Shape {}

class Circle extends Shape
{
  constructor(radius=0)
  {
    super();
    this.radius = radius;
  }

  resize(factor)
  {
    this.radius *= factor;
  }

  toString()
  {
    return `A circle of radius ${this.radius}`;
  }
}

class Square extends Shape
{
  constructor(side=0)
  {
    super();
    this.side = side;
  }

  toString()
  {
    return `A square with side ${this.side}`;
  }
}
/**
 * Now, we need to add color to the shapes
 * One option we've  is to add color to Shape class and then modify every underlying's class and toString method
 * Other option is to create a decorator, that will accept a shape Object and the color and will modify toString method
 * So, whenever we need a colored shape, we'll first create the shape then pass it to ColoredShape with the desired color
 * In this way, we're maintaining both Open/Close and Single Responsibility Principles. 
 */

// we don't want ColoredSquare, ColoredCircle, etc.
class ColoredShape extends Shape
{
  constructor(shape, color)
  {
    super();
    this.shape = shape;
    this.color = color;
  }

  toString()
  {
    return `${this.shape.toString()} ` +
      `has the color ${this.color}`;
  }
}

/**
 * Now we want to add transparency also, so in similar way we'll be able to create another decorator, that again
 * will accept the shape and transparency
 */
class TransparentShape extends Shape
{
  constructor(shape, transparency)
  {
    super();
    this.shape = shape;
    this.transparency = transparency;
  }

  toString()
  {
    return `${this.shape.toString()} has ` +
      `${this.transparency * 100.0}% transparency`;
  }
}

let circle = new Circle(2);
console.log(circle.toString());

let redCircle = new ColoredShape(circle, 'red');
console.log(redCircle.toString());

// impossible: redHalfCircle is not a Circle
// redHalfCircle.resize(2);
/**
 * We may add multiple decorators to have multiple functionalities
 */
let redHalfCircle = new TransparentShape(redCircle, 0.5);
console.log(redHalfCircle.toString());

