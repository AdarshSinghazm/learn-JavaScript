// for in loop on map
const map = new Map();
map.set('IN','India')
map.set('US','Americe')
map.set('FR','France')
console.log(map);

for (const key in map) {
    console.log(map[key]);
}
