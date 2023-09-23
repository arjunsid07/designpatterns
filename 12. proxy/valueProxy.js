class Percentage{
    constructor(percent){
        this.percent = percent;
    }
    toString(){
        return `${this.percent}%`;
    }
    /**
     * Value Proxy
     * Modifies the value of this.percentage to perform desired calculation
     */
    valueOf(){
        return this.percent/100;
    }
}

const fivePercent = new Percentage(5);

console.log(fivePercent.toString());
console.log(`5% of 50 is ${50*fivePercent}`); // Calls valueOf function