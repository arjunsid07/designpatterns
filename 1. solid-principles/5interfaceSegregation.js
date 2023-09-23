/**
 * The interface segregation principle states that an entity should never be forced 
 * to implement an interface that contains elements which it will never use.
 */

class Machine{
    constructor(){
        if(this.constructor.name==="Machine"){
            throw new Error("Abstract class can't have constructor");
        }
        }
    startMachine(){
    }

    stopMachine(){
    }

    getFuel(){
    }
}


class Printer extends Machine{
    startMachine(){
        console.log("Printer has started");
    }

    stopMachine(){
        console.log("Printer has stopped");
    }

    /**
     * This method is not logical for Printer class, so Printer shouldn't extend Machine class, 
     * instead Printer should be a separate class.
     * Currently, Printer class is breaking interface segregation principle 
     */
    getFuel(){
    }
}