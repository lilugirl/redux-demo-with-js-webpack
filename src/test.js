function* idMaker(){
    let index = 0;
    while(true)
        yield index++;
}

let gen = idMaker(); // "Generator { }"

const getNextId=()=>gen.next().value

console.log(getNextId());
// 0
console.log(getNextId());
// 1
console.log(getNextId());
// 2
// ...