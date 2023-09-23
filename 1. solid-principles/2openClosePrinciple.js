/**
 * code should be open for extension, but closed for modification. 
 * A class is allowed to be extended but is not allowed to be modified if new features are to be added. 
 */

/**
 * JavaScript Doesn't have enums, so we use Object.freeze
 */

let Color = Object.freeze({
    red:'red',
    green:'green',
    blue:'blue'
});
let Size = Object.freeze({
    small:'small',
    medium:'medium',
    large:'large'
});

class Product{
    constructor(name,color,size){
        this.name=name;
        this.color=color;
        this.size=size;
    }
}

// Open for extension, closed for modification
class ProductFilter{
    filterByColor(products,color){
            return products.filter((product) => product.color===color);
    }
    filterBySize(products,size){
        return products.filter((product) => product.size===size);
}
}

let apple = new Product("Apple",Color.red,Size.small);
let tree = new Product("Tree",Color.green,Size.large);
let house = new Product("House",Color.blue,Size.large);

let products = [apple,tree,house];

let pf = new ProductFilter();

console.log("Red Products(Old):");
console.log(pf.filterByColor(products,Color.red));

/**
 * If we want to add combinations of these filters, and say more properties are added so more combinations
 * will be there. 
 * To overcome the problem of creating multiple filters and not violating the open close principle we'll be using sepration of concerns
 * and create new classes handling each filter
 */

class FilterByColor{
    constructor(color){
    this.color=color;
    }
    isSatisfied(product){
        return product.color===this.color;
    }
}

class FilterBySize{
    constructor(size){
        this.size=size;
    }
    isSatisfied(product){
        return product.size===this.size;
    }
}

class AndCombinator{
    constructor(...specs){
        this.specs=specs;
    }

    isSatisfied(product){
        return this.specs.every((spec) => spec.isSatisfied(product))
    }
}

class NewFilter{
    filter(products,spec){
        return products.filter((product)=> spec.isSatisfied(product))
    }
}

let nf = new NewFilter();

console.log("Red Products(New):");
console.log(nf.filter(products,new FilterByColor(Color.red)));


const andCombinator  = new AndCombinator(new FilterByColor(Color.blue),new FilterBySize(Size.large));

console.log("Blue and Large Products:");

console.log(products.filter((product)=> andCombinator.isSatisfied(product)));
