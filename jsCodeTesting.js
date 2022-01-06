const map = new Map()

map.set("a", 1)
map.set("b", 2)

const ma = [...map]

for (hello = 0; hello < ma.length; hello++) {
  console.log(ma[hello])
}

console.log(ma, ma.length)