"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const universe = __importStar(require("../InhabitantsContainer/Universe"));
const inhabitantsFactory = __importStar(require("../Factory/InhabitantsFactory"));
describe('Test cats and dogs', function () {
    let firstFactory = new inhabitantsFactory.InhabitantsFactory();
    let secondFactory = new inhabitantsFactory.InhabitantsFactory();
    let universeItem = new universe.Universe();
    let firstWorld = universeItem.createWorld(firstFactory);
    let secondWorld = universeItem.createWorld(secondFactory);
    let dogFfw = firstWorld.createDog();
    let catFfw = firstWorld.createCat();
    let catSfw = firstWorld.createCat();
    let bulFfw = firstWorld.createBuldozer();
    let catFsw = secondWorld.createCat();
    it('Ate 1 cat', function () {
        dogFfw.eatCat(catFfw);
        assert.equal(dogFfw.getEatenCatsNumber(), 1);
    });
    it('Ate 2 cat', function () {
        dogFfw.eatCat(catSfw);
        assert.equal(dogFfw.getEatenCatsNumber(), 2);
    });
    it('Destroyed 1 dog', function () {
        bulFfw.destroyDog(dogFfw);
        assert.equal(bulFfw.getDestroyedDogsNumber(), 1);
    });
    it('Destroyed dog was eaten 2 cats', function () {
        assert.equal(bulFfw.getEatenCatsByDogsNumber(), 2);
    });
});
//# sourceMappingURL=test.js.map