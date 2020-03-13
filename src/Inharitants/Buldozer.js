"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Buldozer {
    constructor(worldActions) {
        this.destroyedDogsNumber = 0;
        this.eatenCatsByDogsNumber = 0;
        this.worldActions = worldActions;
    }
    getWorld() {
        return this.worldActions;
    }
    destroyDog(dog) {
        this.worldActions.checkIfInOneWorld(this, dog);
        this.worldActions.dropDog(dog);
        this.eatenCatsByDogsNumber += dog.getEatenCatsNumber();
        this.destroyedDogsNumber++;
    }
    getDestroyedDogsNumber() {
        return this.destroyedDogsNumber;
    }
    getEatenCatsByDogsNumber() {
        return this.eatenCatsByDogsNumber;
    }
    toJSON() {
        let clone = Object.assign({}, this);
        delete clone["worldActions"];
        return JSON.stringify(clone);
    }
}
exports.Buldozer = Buldozer;
//# sourceMappingURL=Buldozer.js.map