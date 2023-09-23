class Event {
  constructor() {
    this.handlers = new Map();
    this.count = 0;
  }

  /**
   *
   * @param {*} handler - call back that will be triggered when this Event is invoked
   */
  subscribe(handler) {
    this.handlers.set(++this.count, handler);
    return this.count;
  }

  unsubscribe(index) {
    this.handlers.delete(index);
  }
  /**
   *
   * @param {*} sender - who triggered the event
   * @param {*} args - event arguments
   */
  fire(sender, args) {
    this.handlers.forEach((handler, k) => {
      handler(sender, args);
    });
  }
}

class FallsIllArgs {
  constructor(address) {
    this.address = address;
  }
}

class Person {
  constructor(address) {
    this.address = address;
    this.fallsIll = new Event();
  }
  /**
   * We need a notification when catchCold gets called
   */
  catchCold() {
    this.fallsIll.fire(this, new FallsIllArgs(this.address));
  }
}

const person = new Person("Arya Nagar");

let sub = person.fallsIll.subscribe((sender, fallsIllArgs) => {
  console.log(`A doctor has been called to address ${fallsIllArgs.address}`);
});

person.catchCold();
person.catchCold();

person.fallsIll.unsubscribe(sub);
person.catchCold();
