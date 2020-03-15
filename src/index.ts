import {InhabitantsFactory} from "./Factory/InhabitantsFactory";
import {Universe} from "./InhabitantsContainer/Universe";

console.log('import');

let firstFactory = new InhabitantsFactory();
let secondFactory = new InhabitantsFactory();
let universeItem = new Universe();
let firstWorld = universeItem.createWorld(firstFactory);
let secondWorld = universeItem.createWorld(secondFactory);

let dogFfw = firstWorld.createDog();
let catFfw = firstWorld.createCat();
let catSfw = firstWorld.createCat();
let bulFfw = firstWorld.createBuldozer();

let catFsw = secondWorld.createCat();

dogFfw.eatCat(catFfw);
// console.log(dogFfw.getEatenCatsNumber());
// console.log(dogFfw.worldActions);
// console.log(dogFfw["worldActions"]);
// //
// for (let item in dogFfw) {
//     if (item === "worldActions") {
//         console.log(dogFfw[item]);
//     }
// }

dogFfw.eatCat(catSfw);
console.log(dogFfw.getEatenCatsNumber());

bulFfw.destroyDog(dogFfw);
console.log(bulFfw.getEatenCatsByDogsNumber());
console.log(bulFfw.getDestroyedDogsNumber());



