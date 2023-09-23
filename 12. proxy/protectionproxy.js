class Car{
    drive(){
        console.log(`Car is being driven`);
    }
}


class Driver{
    constructor(age){
        this.age=age;
    }
}
/**
 * Proxy to restrict user to check if driver is available and above legal age
 */ 
class CarProxy{
    constructor(driver){
        this.driver=driver;
        this._car=new Car();
    }
    drive(){
        if(this.driver.age>=18){
            this._car.drive();
        }else{
            console.log(`Drive under age`);
        }
    }
}

let car = new Car();
car.drive();

let carProxy = new CarProxy(new Driver(15));
carProxy.drive();
let carProxy2 = new CarProxy(new Driver(19));
carProxy2.drive();