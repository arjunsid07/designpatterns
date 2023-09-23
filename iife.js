const iife = (function () {
  let count = 0;
  return function () {
    console.log(count++, "count");
  };
})();

iife();
iife();
iife();
iife();
iife();
