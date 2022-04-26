let str = require('./a')

console.log('hello', str)

require('./index.less')

let fn = (a) => {
  console.log(a?.name)
}

fn({name: 'wlf'})

@log
class A {
  a = 1
}

console.log(new A().a)

function log(target) {
  console.log(target)
}