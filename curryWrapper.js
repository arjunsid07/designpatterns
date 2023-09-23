const sum = (x, y) => (x || 0) + (y || 0);
const curryWrapper = (func) =>
  function close(...args) {
    console.log(args);
    // if (args.length <= func.length) {
    //   return func.apply(this, args);
    // } else {
    return (...args2) => {
      console.log(args2, "args2");
      return close.apply(this, args.concat(args2));
    };
    // }
  };

const sumWrapper = curryWrapper(sum);
console.log(sumWrapper(1, 2, 3, 4, 5)(2)()(78));
