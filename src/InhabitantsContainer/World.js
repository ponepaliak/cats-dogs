"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class World {
    constructor(inhabitantsFactory) {
        this.catsList = [];
        this.dogsList = [];
        this.buldozersList = [];
        this.inhabitantsFactory = inhabitantsFactory;
        this._id = World.count++;
        this.inhabitantsFactory.setWorld(this);
    }
    get id() {
        return this._id;
    }
    createCat() {
        let cat = this.inhabitantsFactory.createCat();
        this.catsList.push(cat);
        return cat;
    }
    catNumbers() {
        console.log(this.catsList.length, this.id);
    }
    createDog() {
        let dog = this.inhabitantsFactory.createDog();
        this.dogsList.push(dog);
        return dog;
    }
    createBuldozer() {
        let buldozer = this.inhabitantsFactory.createBuldozer();
        this.buldozersList.push(buldozer);
        return buldozer;
    }
    checkIfInOneWorld(firstInhabitant, secondInhabitant) {
        if (this.id != secondInhabitant.getWorld().id) {
            this.timeError();
        }
    }
    checkIfInOneWorld_v2(inhabitant) {
        if (this.id != inhabitant.getWorld().id) {
            this.timeError();
        }
    }
    checkIfCatExist(cat) {
        if (this.catsList.indexOf(cat) === -1) {
            this.timeError();
        }
    }
    checkIfDogExist(dog) {
        if (this.dogsList.indexOf(dog) === -1) {
            this.timeError();
        }
    }
    timeError() {
        throw new Error("Time limit error");
    }
    dropCat(cat) {
        delete this.catsList[this.catsList.indexOf(cat)];
    }
    dropDog(dog) {
        delete this.dogsList[this.dogsList.indexOf(dog)];
    }
    some() {
    }
}
exports.World = World;
World.count = 0;
//# sourceMappingURL=World.js.map