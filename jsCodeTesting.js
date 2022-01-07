const map = new Map()

map.set("a", 1)
map.set("b", 2)

const ma = [...map]

for (hello = 0; hello < ma.length; hello++) {
  console.log(ma[hello])
}

console.log(ma, ma.length)

let arr = [
  [1, 2, 3],
  [4, 5, 6],
]

var empArr = [].concat(...arr)

// EMP's Answer:
const empArr2 = arr.flat()

console.log(empArr, empArr2)
