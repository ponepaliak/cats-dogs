"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractInhabitant_1 = require("./AbstractInhabitant");
class Buldozer extends AbstractInhabitant_1.AbstractInhabitant {
    constructor(worldActions) {
        super();
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
}
exports.Buldozer = Buldozer;
//# sourceMappingURL=Buldozer.js.map