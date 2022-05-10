import "./a.js";
require("./index.less");

let fn = (obj) => {
  console.log(obj?.name);
};

fn({ name: "wlf" });

@log
class A {
  a = 1;
}

console.log(new A().a);

function log(target) {
  console.log(target);
}
